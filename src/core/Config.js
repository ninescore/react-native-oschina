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

window.domain = 'https://www.oschina.net';
window.accessToken = '06f6128f-09ab-4915-b5b3-372392df76cf';

