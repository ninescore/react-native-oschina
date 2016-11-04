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
import Config from '../core/Config';
import RefreshListView from '../components/RefreshListView';

export default class ListViewPage extends BaseComponent {

    constructor(props) {
        super(props, '刷新列表');
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            pageSize: 400,
            pageCount: 0,
        }
        this.listData = [];
    }

    componentDidMount() {
        // this.onFetch();
    }

    async onFetch(pageNo) {
        if (pageNo == 1)
            this.listData = [];
        // let response = await this.request('https://twelvescore.github.io/jsonData/list.json');
        let url = `http://apis.juhe.cn/cook/query?key=486aa3ee11daba9efbc77a904a5831ac&menu=%E8%A5%BF%E7%BA%A2%E6%9F%BF&rn=${this.state.pageSize}&pn=${(pageNo - 1) * this.state.pageSize}`;
        let response = await this.request(url);
        this.listData = this.listData.concat([response.result.data[0]]);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.listData),
            pageCount: parseInt((Number(response.result.totalNum) + this.state.pageSize - 1) / this.state.pageSize),
        });
    }

    renderRow(rowData) {
        return (
            <View style={styles.listItem}>
                <Text>{rowData.id}</Text>
                <Text>{rowData.title}</Text>
                <Text>{rowData.burden}</Text>
            </View>
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
        margin: 1,
        padding: 10,
        backgroundColor: '#ccc',
    },
});