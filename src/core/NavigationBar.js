/**
 * 导航栏
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Navigator,
    Animated,
    Linking,
    Dimensions,
} from 'react-native';
import * as CommonUtil from '../utils/CommonUtil';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftButton: null,
            title: null,
            rightButton: null,
            isShowLeftButton: true,
        };
        window.navigationBar = this;
    }

    goBack() {
        CommonUtil.BackAndroidUtil.defaultBackFn();
    }

    goHome() {
        window.navigation.popToTop();
    }

    switchScene(route) {
        if (!route.componentInstance)
            return false;
        if (route.componentInstance.rightButton) {
            route.componentInstance.rightButton.forEach((m) => {
                m.children && m.children.forEach((n) => {
                    if (m.selectedId == n.id) {
                        m.displayName = `${m.name} - ${n.name}`;
                    }
                });
            });
        }
        this.setState({
            title: route.componentInstance.title,
            isShowLeftButton: route.componentInstance.isShowLeftButton === undefined ? true : route.componentInstance.isShowLeftButton,
            rightButton: route.componentInstance.rightButton,
        });
    }

    onPressRightButton(menu) {
        if (menu.onPress) {
            menu.onPress();
            return false;
        }
        window.popMenu.show(menu, (subMenu) => {
            menu.selectedId = subMenu.id;
            menu.displayName = `${menu.name} - ${subMenu.name}`;
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
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.goHome.bind(this)}>
                    <Text style={window.theme.navigationBarText}>{this.state.title}</Text>
                </TouchableOpacity>
                <View style={styles.right}>
                    {this.renderRight()}
                </View>
            </View>
        );
    }

    renderLeft() {
        if (!this.state.isShowLeftButton)
            return null;
        let buttons = [];
        buttons.push(
            <TouchableOpacity
                key={1}
                style={styles.btn}
                onPress={this.goBack.bind(this)}>
                <Text style={window.theme.navigationBarText}>返回</Text>
            </TouchableOpacity>
        );
        buttons.push(<View key={2} style={styles.cutLine}></View>);
        // buttons.push(<Text key={2} style={window.theme.text}>|</Text>);
        return buttons;
    }

    renderRight() {
        if (!this.state.rightButton)
            return null;
        return this.state.rightButton.map((m, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={styles.btn}
                    onPress={this.onPressRightButton.bind(this, m)}
                    >
                    <Text style={window.theme.navigationBarText}>
                        {m.displayName}
                    </Text>
                </TouchableOpacity>
            );
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cutLine: {
        alignSelf: 'stretch',
        width: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(255,255,255,0.9)',
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
        paddingHorizontal: 10,
    },
});