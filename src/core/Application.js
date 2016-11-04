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

import CustomPrototypes from './CustomPrototypes';
import Navigation from './Navigation';
import NavigationBar from './NavigationBar';
import Toast from '../components/Toast';
import Loading from '../components/Loading';
import PopMenu from '../components/PopMenu';

import Config from './Config';
import * as CommonUtil from '../utils/CommonUtil';

export default class Application extends Component {

    constructor(props) {
        super(props);
        window.application = this;
    }

    componentDidMount() {
        CommonUtil.BackAndroidUtil.bind();
    }

    componentWillUnmount() {
        CommonUtil.BackAndroidUtil.unbind();
    }

    reload() {
        this.setState({r: Date.now()});
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar />
                <Navigation />
                <PopMenu />
                <Loading />
                <Toast />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
