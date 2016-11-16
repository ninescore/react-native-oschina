/**
 * 导航栏
 */
import {
    React,
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Icon,
    Button,
} from './Libraries';
import * as Utils from './Utils';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftButton: null,
            title: '首页',
            rightButton: null,
            isShowLeftButton: false,
        };
        window.navigationBar = this;
    }

    goBack() {
        Utils.BackAndroidUtil.defaultBackFn();
    }

    goHome() {
        window.navigation.popToTop();
    }

    switchScene(route) {
        if (!route.componentInstance)
            return false;
        this.setState({
            title: route.componentInstance.title,
            isShowLeftButton: route.componentInstance.title == '首页' ? false : true,
//            isShowLeftButton: route.componentInstance.isShowLeftButton === undefined ? true : route.componentInstance.isShowLeftButton,
            rightButton: route.componentInstance.rightButton,
        });
    }

    onPressRightButton(menu) {
        if (menu.onPress) {
            menu.onPress();
            return false;
        }
        window.popMenu.show(menu, 'toDown', (subMenu) => {
            menu.selectedId = subMenu.id;
            this.setState({
                rightButton: this.state.rightButton,
            });
        });
    }

    render() {
        if (!this.state.title)
            return null;
        return (
            <View style={[window.theme.navigationBarContainer, styles.container]}>
                {this.renderLeft()}
                <Button
                    title={this.state.title}
                    disabled={this.state.title == '首页' ? true : false}
                    onPress={this.goHome.bind(this)}
                />
                <View style={styles.right}>
                    {this.renderRight()}
                </View>
            </View>
        );
    }

    renderLeft() {
        if (!this.state.isShowLeftButton)
            return null;
        return (
            <Button
                onPress={this.goBack.bind(this)}>
                <Icon name="ios-arrow-round-back" />
            </Button>
        );
    }

    renderRight() {
        if (!this.state.rightButton)
            return null;
        return this.state.rightButton.map((m, i) => {
            return (
                <Button
                    key={i}
                    title={m.name}
                    onPress={this.onPressRightButton.bind(this, m)}
                />
            );
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btn: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
});