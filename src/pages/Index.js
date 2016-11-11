import React, {
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Icon,
} from '../components/Libraries';

import BaseComponent from '../core/BaseComponent';
import ListViewPage from './ListViewPage';
import NewsList from './NewsList';
import BlogList from './BlogList';
import SearchList from './SearchList';
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
	                    this.props.navigator.push({
	                        component: BlogList,
	                    });
	                } }>
	                <Text>博客</Text>
	            </TouchableOpacity>
	            
	            <TouchableOpacity
	                style={styles.item}
	                onPress={() => {
	                    this.props.navigator.push({
	                        component: SearchList,
	                    });
	                } }>
	                <Text>搜索</Text>
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
                        window.popMenu.show(menu, 'toUp', (m) => {
                            if (m.id == 1)
                                window.theme = new Base();
                            else if (m.id == 2)
                                window.theme = new Dark();
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
