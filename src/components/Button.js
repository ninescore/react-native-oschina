import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { Text } from './Text';
import Color from 'color';

export class Button extends Component {

    static propTypes = {
        title: PropTypes.string,
        style: PropTypes.oneOfType([
            React.PropTypes.number, React.PropTypes.object, React.PropTypes.array
        ]),
        onPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.backgroundColor = this.getBackgroundColorFromStyle(this.props.style);
        this.state = {
            backgroundColor: this.backgroundColor,
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.backgroundColor = this.getBackgroundColorFromStyle(nextProps.style);
        this.state.backgroundColor = this.backgroundColor;
        let color = Color(this.backgroundColor);
        this.darkenColor = color.darken(0.1).rgbString();
    }

    getBackgroundColorFromStyle(propsStyle) {
        let style = StyleSheet.flatten(propsStyle);
        if (!style || !style.backgroundColor)
            return window.theme.primaryColor;
        return style.backgroundColor;
    }

    onPress() {
        this.props.onPress && this.props.onPress();
    }

    onPressIn() {
        if (!this.darkenColor) {
            let color = Color(this.state.backgroundColor);
            this.darkenColor = color.darken(0.1).rgbString();
        }
        this.setState({
            backgroundColor: this.darkenColor,
        });
    }

    onPressOut() {
        this.setState({
            backgroundColor: this.backgroundColor,
        });
    }

    render() {
        let containerStyles = [styles.container, this.props.style];
        if (this.state.backgroundColor) {
            containerStyles.push({ backgroundColor: this.state.backgroundColor });
        }
        return (
            <TouchableWithoutFeedback
                {...this.props}
                onPress={this.onPress.bind(this)}
                onPressIn={this.onPressIn.bind(this)}
                onPressOut={this.onPressOut.bind(this)}
                >
                <View style={containerStyles}>
                    {this.renderContent()}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderContent() {
        if (!this.props.title)
            return this.props.children;
        return (
            <Text style={window.theme.whiteText}>{this.props.title}</Text>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        minHeight: 42,
    },
});