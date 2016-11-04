/**
 * 提示信息
 * --------------------------------------------------
 * Toast.show('提示信息');
 * --------------------------------------------------
 */
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
    WebView,
    Dimensions,
    Animated,
} from 'react-native';

export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: null,
            fadeAnim: new Animated.Value(0),
        };
        window.toast = this;
    }

    show(text) {
        this.setState({
            text,
        }, () => {
            Animated.sequence([
                Animated.timing(
                    this.state.fadeAnim,
                    { toValue: 1, duration: 300 }
                ),
                Animated.delay(2000),
                Animated.timing(
                    this.state.fadeAnim,
                    { toValue: 0, duration: 500 }
                )
            ]).start();
        });
    }

    render() {
        return !this.state.text ? null : (
            <Animated.View style={[styles.container, { opacity: this.state.fadeAnim }]}>
                <Text style={styles.text}>{this.state.text}</Text>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(111,111,111,1)',
        position: 'absolute',
        left: 70,
        top: 100,
        width: window.width - 140,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
});