import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
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
import ListViewPage from './ListViewPage';
import NewsList from './NewsList';
import Base from '../theme/Base';
import Dark from '../theme/Dark';

export default class Index extends BaseComponent {

    constructor(props) {
        super(props, '首页');
        this.isShowLeftButton = false;
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.item}
                    onPress={() => {
                        window.toast.show('提示信息测试');
                    } }>
                    <Text>Toast</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        window.loading.show(true);
                    } }>
                    <Text>Loading</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        this.props.navigator.push({
                            component: ListViewPage,
                        });
                    } }>
                    <Text>ListView</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        this.props.navigator.push({
                            component: NewsList,
                        });
                    } }>
                    <Text>新闻</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        let menu = {
                            selectedId: 1,
                            children: [{
                                id: 1,
                                name: '普通',
                            }, {
                                id: 2,
                                name: '夜间',
                            }]
                        };
                        PopMenu.show(menu, (m) => {
                            if (m.id == 1)
                                window.theme = Base;
                            else if (m.id == 2)
                                window.theme = Dark;
                            // Navigation.resetTo({
                            //     component: Index,
                            // });
                            window.application.reload();
                            // TODO 
                        });
                    } }>
                    <Text>切换主题</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    item: {
        margin: 10,
        padding: 10,
        backgroundColor: '#ccc',
    },
});