import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text as RNText,
} from 'react-native';

export default class Text extends Component {

    render() {
        return (
            <RNText {...this.props}
                style={[window.theme.text, this.props.style]}>
                {this.props.children}
            </RNText>
        );
    }

}