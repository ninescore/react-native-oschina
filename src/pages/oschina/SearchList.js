import {
    React,
    BaseComponent,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ListView,
} from '../../core/Libraries';
import RefreshListView from '../../components/RefreshListView';
import NewsDetail from './NewsDetail';
import BlogDetail from './BlogDetail';

export default class NewsList extends BaseComponent {

    constructor(props) {
        super(props, '搜索列表');
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            pageSize: 20,
            pageCount: 0,
            loaded: false,
            q: null,
        }
        this.listData = [];
        this.catalog = 'news';
        this.rightButton = [{
            id: 1,
            name: '类别',
            selectedId: 'news',
            children: [{
                id: 'news',
                name: '资讯',
                onPress: this.onPressRightButton.bind(this, 1),
            }, {
                id: 'blog',
                name: '博客',
                onPress: this.onPressRightButton.bind(this, 2),
            }, {
                id: 'project',
                name: '开源软件',
                onPress: this.onPressRightButton.bind(this, 3),
            }, {
                id: 'post',
                name: '帖子、问答',
                onPress: this.onPressRightButton.bind(this, 3),
            }]
        }];
    }

    async onFetch(pageNo) {
    	if (!this.state.q) {
    		this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.listData),
            });
    		return false;
    	}
        if (pageNo == 1)
            this.listData = [];
        let params = {
            access_token: window.accessToken,
            catalog: this.catalog,
            q: this.state.q,
            page: pageNo,
            pageSize: this.state.pageSize,
            dataType: 'json',
        };
        let url = `${window.domain}/action/openapi/search_list?${Object.parseParam(params)}`;
        let response = await this.request(url);
        this.listData = this.listData.concat(response.searchlist);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.listData),
            pageCount: 999999,
            loaded: true,
        });
    }

    onPress(id, type) {
    	let component = null;
    	switch (type) {
    	case 'news':
			component = NewsDetail;
			break;
    	case 'blog':
			component = BlogDetail;
			break;
    	case 'project':
			component = NewsDetail;
			break;
    	case 'post':
			component = NewsDetail;
			break;
    	}
    	if (!component)
    		return false;
        this.props.navigator.push({
            component: NewsDetail,
            params: {
                id,
            },
        });
    }

    onPressRightButton(id) {
        this.catalog = id;
        this.onSearch();
    }

    async onSearch() {
        this.listData = [];
        window.loading.show(true);
    	await this.onFetch(1);
        window.loading.show(false);
    }

    renderRow(rowData) {
    	if (!rowData)
    		return null;
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={this.onPress.bind(this, rowData.id, rowData.type)}
                >
                <Text style={[window.theme.text, styles.title]}>{rowData.title}</Text>
                <Text style={window.theme.subText}>{rowData.pubDate}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
            	<View style={[styles.search, {borderBottomColor: window.theme.embellishmentColor}]}>
		            <TextInput
		            	style={styles.input}
		            	defaultValue={this.state.q}
		            	onChange={(event) => {
		            		this.setState({q: event.nativeEvent.text});
		            	}}
		            	placeholder="请输入关键字"
		            	placeholderTextColor={window.theme.subColor}
		            	underlineColorAndroid="transparent"
		            />
		            <TouchableOpacity
		                style={[styles.btn, {backgroundColor: window.theme.embellishmentColor}]}
		                onPress={this.onSearch.bind(this)}>
		                <Text style={window.theme.whiteText}>搜索</Text>
		            </TouchableOpacity>
            	</View>
            	{
            		this.state.loaded && this.state.dataSource.getRowCount() == 0 ?
            			<View style={styles.message}>
            				<Text style={window.theme.subText}>暂无记录</Text>
            			</View>
            		:
            			<RefreshListView
		                    dataSource={this.state.dataSource}
		                    renderRow={this.renderRow.bind(this)}
		                    onFetch={this.onFetch.bind(this)}
		                    pageCount={this.state.pageCount}
	                    />
            	}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        marginBottom: 1,
        padding: 12,
        backgroundColor: '#fff',
    },
    title: {
    	marginBottom: 5,
    },
    search: {
    	flexDirection: 'row',
    	borderBottomColor: '#ccc',
    	borderBottomWidth: 1,
    	margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
    	paddingHorizontal: 15,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
    	flex: 1,
    	height: 35,
    	fontSize: 15,
        padding: 5,    
    },
    message: {
    	padding: 12,
    	alignItems: 'center',
        justifyContent: 'center',
    },
});
