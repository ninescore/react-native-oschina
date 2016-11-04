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
} from 'react-native';
import BaseComponent from '../core/BaseComponent';
import RefreshListView from '../components/RefreshListView';
import NewsDetail from './NewsDetail';

export default class NewsList extends BaseComponent {

    constructor(props) {
        super(props, '资讯列表');
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            pageSize: 20,
            pageCount: 0,
        }
        this.listData = [];
        this.catalog = 1;
        this.rightButton = [{
            id: 1,
            name: '类别',
            selectedId: 1,
            children: [{
                id: 1,
                name: '全部',
                onPress: this.onPressRightButton.bind(this, 1),
            }, {
                id: 2,
                name: '综合资讯',
                onPress: this.onPressRightButton.bind(this, 2),
            }, {
                id: 3,
                name: '软件更新',
                onPress: this.onPressRightButton.bind(this, 3),
            }]
        }];
    }

    async onFetch(pageNo) {
        if (pageNo == 1)
            this.listData = [];
        let params = {
            access_token: window.accessToken,
            catalog: this.catalog,
            page: pageNo,
            pageSize: this.state.pageSize,
            dataType: 'json',
        };
        let url = `${window.domain}/action/openapi/news_list?${Object.parseParam(params)}`;
        let response = await this.request(url);
        this.listData = this.listData.concat(response.newslist);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.listData),
            pageCount: 999999,
        });
    }

    onPress(id) {
        this.props.navigator.push({
            component: NewsDetail,
            params: {
                id
            },
        });
    }

    onPressRightButton(id) {
        this.catalog = id;
        this.onFetch(1);
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={this.onPress.bind(this, rowData.id)}
                >
                <Text style={window.theme.text}>{rowData.title}</Text>
                <Text style={window.theme.text}>{rowData.pubDate}</Text>
            </TouchableOpacity>
        );
    }

    render() {
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
        marginBottom: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
});
