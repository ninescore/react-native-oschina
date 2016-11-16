import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text as Text0,
} from 'react-native';

export class Text extends Component {

    render() {
        return (
            <Text0 {...this.props}
                style={[window.theme.text, this.props.style]}>
                {this.props.children}
            </Text0>
        );
    }

}