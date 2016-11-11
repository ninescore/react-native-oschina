import React, {
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ListView,
} from '../components/Libraries';
import BaseComponent from '../core/BaseComponent';
import RefreshListView from '../components/RefreshListView';
import UserDetail from './UserDetail';

export default class CommentList extends BaseComponent {

    constructor(props) {
        super(props, '评论列表');
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            pageSize: 20,
            pageCount: 0,
            loaded: false,
        }
        this.listData = [];
    }

    async onFetch(pageNo) {
        let params = {
            access_token: window.accessToken,
            id: this.props.id,
            catalog: this.props.catalog,
            page: pageNo,
            pageSize: this.state.pageSize,
            dataType: 'json',
        };
        let url = `${window.domain}/action/openapi/comment_list?${Object.parseParam(params)}`;
        let response = await this.request(url);
        if (response.commentList) {
            response.commentList.forEach((m) => {
                m.content = m.content.replace(/<div class=\'detail\'>/g, '')
                    .replace(/<\/div>/g, '')
                    .replace(/<br\/>/g, '');
                // TODO html内容展示，表情显示
            });
        }
        this.listData = this.listData.concat(response.commentList);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.listData),
            pageCount: parseInt((this.state.pageCount + this.state.pageSize - 1) / this.state.pageSize),
            loaded: true,
        });
    }

    onPressAuthor(id) {
    	this.props.navigator.push({
    		component: UserDetail,
    		params: {
    			id,
    		}
    	});
    }
    
    renderRow(rowData) {
        return (
            <View style={styles.listItem}>
                <Image
                    style={styles.image}
                    source={{ uri: rowData.commentPortrait }}
                    />
                <View style={styles.listItemMain}>
                    <Text>{rowData.content}</Text>
                    <View style={styles.listItemMainBottom}>
                        <Text style={[window.theme.subText, styles.pubDate]}>
                            {rowData.pubDate}
                        </Text>
                        <TouchableOpacity
	                        onPress={this.onPressAuthor.bind(this, rowData.commentAuthorId)}>
	                        <Text style={window.theme.link}>
		                        {rowData.commentAuthor}
		                    </Text>
	                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
    	if (this.state.loaded && this.state.dataSource.getRowCount() == 0) {
    		return (
    			<View style={styles.message}>
    				<Text style={window.theme.subText}>暂无评论</Text>
    			</View>
    		);
    	}
        return (
            <View style={styles.container}>
                <RefreshListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    onFetch={this.onFetch.bind(this)}
                    pageCount={this.state.pageCount}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    listItemMain: {
        flex: 1,
        marginLeft: 10,
    },
    listItemMainBottom: {
        flexDirection: 'row',
        marginTop: 3,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        backgroundColor: '#ddd',
    },
    pubDate: {
        marginRight: 10,
    },
    message: {
    	padding: 12,
    	alignItems: 'center',
        justifyContent: 'center',
    },
});
