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
    PixelRatio,
} from 'react-native';
import Base from '../theme/Base';
import Dark from '../theme/Dark';

window.theme = Base;
window.toast = null;
window.navigation = null;
window.navigationBar = null;

window.width = Dimensions.get('window').width;
window.height = Dimensions.get('window').height;
window.contentHeight = window.height - window.theme.navigationBarHeight - 25;
window.pixelRatio = PixelRatio.get();

window.appName = '开源中国(rn版)';
window.domain = 'https://www.oschina.net';
window.accessToken = '9be34f00-5395-4e13-945d-18264159778d';