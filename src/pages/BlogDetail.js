import React, {
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    WebView,
} from '../components/Libraries';
import BaseComponent from '../core/BaseComponent';
import CommentList from './CommentList';
import UserDetail from './UserDetail';

export default class BlogDetail extends BaseComponent {

    constructor(props) {
        super(props, '博客详情');
        this.state = {
            bean: null,
        }
    }

    componentDidMount() {
        this.onFetch();
    }

    async onFetch() {
        window.loading.show(true);
        let params = {
            access_token: window.accessToken,
            id: this.props.id,
            dataType: 'json',
        };
        let url = `${window.domain}/action/openapi/blog_detail?${Object.parseParam(params)}`;
        let response = await this.request(url);
        if (response && response.body) {
            let body = response.body.replace(/font-size/g, 'f');
            response.body = `<style>p { font-size: 15px; } img { width: 100%; }</style> ${body}`;
        }
        this.setState({
            bean: response,
        });
        window.loading.show(false);
    }

    onPressAuthor() {
    	this.props.navigator.push({
    		component: UserDetail,
    		params: {
    			id: this.state.bean.authorid,
    		}
    	});
    }

    onPressComment() {
        this.props.navigator.push({
            component: CommentList,
            params: {
                id: this.state.bean.id,
                catalog: 5,
                commentCount: this.state.bean.commentCount,
            }
        });
    }

    render() {
        if (!this.state.bean)
            return null;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text>{this.state.bean.title}</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={window.theme.subText}>{this.state.bean.pubDate}</Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.onPressAuthor.bind(this)}>
                        <Text style={[window.theme.subText, window.theme.link]}>
                            {this.state.bean.author}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.onPressComment.bind(this)}>
                        <Text style={[window.theme.subText, window.theme.link]}>
                            评论({this.state.bean.commentCount})
                        </Text>
                    </TouchableOpacity>
                </View>
                <WebView
                    style={styles.body}
                    source={{ html: this.state.bean.body }}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    subTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
//        flex: 1,
    },
    btn: {
    	paddingVertical: 10,
    	marginLeft: 10,
    },
});
