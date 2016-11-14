import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
} from 'react-native';
import Text from './Text';

export default class H1 extends Component {

    render() {
        return (
            <Text {...this.props}
                style={[this.props.style, styles.text]}>
                {this.props.children}
            </Text>
        );
    }

}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
    },
});