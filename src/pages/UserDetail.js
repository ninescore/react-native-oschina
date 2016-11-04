import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    ScrollView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Navigator,
    Animated,
    Linking,
    Dimensions,
    WebView,
} from 'react-native';
import BaseComponent from '../core/BaseComponent';
import CommentList from './CommentList';

export default class NewsDetail extends BaseComponent {

    constructor(props) {
        super(props, '资讯详情');
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
        let url = `${window.domain}/action/openapi/news_detail?${Object.parseParam(params)}`;
        let response = await this.request(url);
        if (response && response.body) {
            let body = response.body.replace(/font-size/g, 'f');
            response.body = `<style>p { font-size: 14px; } img { width: 100%; }</style> ${body}`;
        }
        this.setState({
            bean: response,
        });
        window.loading.show(false);
    }

    onPressAuthor() {

    }

    onPressComment() {
        this.props.navigator.push({
            component: CommentList,
            params: {
                id: this.state.bean.id,
                catalog: 1,
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
                    <Text style={window.theme.text}>{this.state.bean.title}</Text>
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
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    subTitle: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
    },
    btn: {
        marginLeft: 10,
    },
});
