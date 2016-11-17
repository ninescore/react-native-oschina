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
    H2,
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

                <H2>组件示例</H2>

                <Button
                    title="按钮示例"
                    style={[styles.btn, { backgroundColor: window.theme.embellishmentColor, }]}
                    onPress={() => {
                        this.props.navigator.push({
                            component: ButtonExample,
                        });
                    } }
                />
                <Button
                    title="Toast"
                    style={[styles.btn, { backgroundColor: window.theme.embellishmentColor, }]}
                    onPress={() => {
                        window.toast.show('Toast测试');
                    } }
                />
                <Button
                    title="Loading"
                    style={[styles.btn, { backgroundColor: window.theme.embellishmentColor, }]}
                    onPress={() => {
                        window.loading.show(true);
                    } }
                />
                <Button
                    title="切换主题"
                    style={[styles.btn, { backgroundColor: window.theme.embellishmentColor, }]}
                    onPress={() => {
                        let menu = {
                            name: '主题',
                            selectedId: window.themeSelectedId || 1,
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
                            window.themeSelectedId = m.id;
                            // Navigation.resetTo({
                            //     component: Index,
                            // });
                            window.application.forceUpdate();
                            // TODO 
                        });
                    } }
                />

                <H2>开源中国</H2>

                <Button
                    title="新闻"
                    style={[styles.btn]}
                    onPress={() => {
                        this.props.navigator.push({
                            component: NewsList,
                        });
                    } }
                />
                <Button
                    title="博客"
                    style={[styles.btn]}
                    onPress={() => {
                        this.props.navigator.push({
                            component: BlogList,
                        });
                    } }
                />
                <Button
                    title="搜索"
                    style={[styles.btn]}
                    onPress={() => {
                        this.props.navigator.push({
                            component: SearchList,
                        });
                    } }
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    btn: {
        marginTop: 5,
        marginBottom: 5,
        justifyContent: "flex-start",
    },
});
