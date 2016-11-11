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
    BackAndroid,
} from 'react-native';

/**
 * Android手机后退事件操作
 * 默认后退操作为defaultBackFn方法。
 * 如需自定义后退方法，请在自己页面将自定义后退方法添加到当前路由的backFn属性中。
 * 或者调用BackAndroidUtil.setBackFn方法。
 */
export let BackAndroidUtil = {
    lastDate: null,
    bind: () => {
        BackAndroid.addEventListener('hardwareBackPress', BackAndroidUtil.defaultBackFn);
    },
    unbind: () => {
        BackAndroid.removeEventListener('hardwareBackPress', BackAndroidUtil.defaultBackFn);
    },
    setBackFn: (backFn) => {
        let curRouter = BackAndroidUtil.getCurrentRoute();
        if (curRouter)
            curRouter.backFn = backFn;
    },
    getCurrentRoute: () => {
        if (!window.navigation)
            return null;
        const routers = window.navigation.getCurrentRoutes();
        return routers[routers.length - 1];
    },
    defaultBackFn: () => {
        let curRouter = BackAndroidUtil.getCurrentRoute();
        if (curRouter.backFn) {
            let result = curRouter.backFn();
            // 如果返回null，则执行完自定义方法后，继续执行默认操作
            if (result !== null)
                return true;
        }
        let isHideMenu = window.popMenu.hide();
        if (isHideMenu)
            return true;
        if (window.navigation.getCurrentRoutes().length == 1) {
            if (BackAndroidUtil.lastDate && BackAndroidUtil.lastDate + 2000 >= Date.now()) {
                return false;
            }
            window.toast.show('再按一次退出应用');
            BackAndroidUtil.lastDate = Date.now();
            return true;
        }
        window.navigation.pop();
        return true;
    }
};