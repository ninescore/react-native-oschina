import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { Text } from './Text';

export class Button extends Component {

    // justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
    static propTypes = {
        title: PropTypes.string,
        backgroundColor: PropTypes.string,
        style: PropTypes.object,
        inStyle: PropTypes.object,
        justifyContent: PropTypes.string,
        onPress: PropTypes.function,
    };

    static defaultProps = {
        justifyContent: 'center',
    };

    constructor(props) {
        super(props);
        this.state = {
            bg: 'transparent',
        }
    }

    onPress() {
        this.props.onPress && this.props.onPress();
    }

    onPressIn() {
        this.setState({
            bg: 'rgba(50, 50, 50, 0.1)',
        });
    }

    onPressOut() {
        this.setState({
            bg: 'transparent',
        });
    }

    render() {
        let outStyles = [
            this.props.style,
            { backgroundColor: this.props.backgroundColor || window.theme.primaryColor }
        ];
        let inStyles = [
            styles.inStyle,
            this.props.inStyle,
            {
                backgroundColor: this.state.bg,
                justifyContent: this.props.justifyContent,
            }
        ];

        return (
            <TouchableWithoutFeedback
                {...this.props}
                onPress={this.onPress.bind(this)}
                onPressIn={this.onPressIn.bind(this)}
                onPressOut={this.onPressOut.bind(this)}
                >
                <View style={outStyles}>
                    <View style={inStyles}>
                        {this.renderContent()}
                    </View>
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
    inStyle: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingHorizontal: 12,
        minHeight: 42,
    },
});