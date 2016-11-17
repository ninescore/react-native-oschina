import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import { Text } from './Text';

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
                    { toValue: window.theme.navigationBarHeight, duration: 200 }
                ),
                Animated.delay(2000),
            ]).start(() => {
                this.setState({
                    text: null,
                    fadeAnim: new Animated.Value(0),
                });
            });
        });
    }

    render() {
        if (!this.state.text)
            return null;
        let style = [
            styles.container,
            {
                backgroundColor: window.theme.primaryColor,
                borderTopColor: window.theme.whiteColor,
                top: this.state.fadeAnim,
            }
        ];
        return (
            <Animated.View
                style={style}>
                <Text style={window.theme.whiteText}>{this.state.text}</Text>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        width: window.width,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
    },
});