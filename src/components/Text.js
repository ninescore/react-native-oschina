import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text as TextComponent,
} from 'react-native';

export class Text extends Component {

    render() {
        return (
            <TextComponent {...this.props}
                style={[window.theme.text, this.props.style]}>
                {
                    React.Children.map(this.props.children, (child) => {
                        return child;
                    })
                }
            </TextComponent>
        );
    }

}