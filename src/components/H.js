import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Text } from './Text';

export class H1 extends Component {

    render() {
        return (
            <Text {...this.props}
                style={[this.props.style, styles.h1]}>
                {this.props.children}
            </Text>
        );
    }

}

export class H2 extends Component {

    render() {
        return (
            <Text {...this.props}
                style={[this.props.style, styles.h2]}>
                {this.props.children}
            </Text>
        );
    }

}

const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
    },
    h2: {
        fontSize: 20,
    },
});