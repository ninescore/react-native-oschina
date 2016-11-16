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
    Icon,
    Button,
} from '../../core/Libraries';
import NewsList from './NewsList';
import BlogList from './BlogList';
import SearchList from './SearchList';
import Base from '../../theme/Base';
import Dark from '../../theme/Dark';
import ButtonExample from '../example/ButtonExample';

export default class Index extends BaseComponent {

    constructor(props) {
        super(props, '首页');
        this.isShowLeftButton = false;
    }

    render() {
        return (
            <View style={styles.container}>

                <Button
                    title="按钮示例"
                    style={styles.btn}
                    justifyContent="flex-start"
                    backgroundColor={window.theme.embellishmentColor}
                    onPress={() => {
                        this.props.navigator.push({
                            component: ButtonExample,
                        });
                    }}
                />

                <Button
                    title="Toast"
                    style={styles.btn}
                    justifyContent="flex-start"
                    backgroundColor={window.theme.embellishmentColor}
                    onPress={() => {
                        window.toast.show('Toast测试');
                    }}
                />

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
                            name: '主题',
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
                            window.application.forceUpdate();
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
        padding: 12,
    },
    btn: {
        marginTop: 12,
    },
});
