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
    ActivityIndicator,
    Modal,
} from 'react-native';

export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        window.loading = this;
    }

    show(visible) {
        if (this.state.visible === visible)
            return false;
        this.setState({ visible });
    }

    render() {
        if (!this.state.visible)
            return null;
        return (
            <View style={styles.container}>
                <Text style={[window.theme.text, styles.text]}>正在加载中...</Text>
                <ActivityIndicator color={window.theme.primaryColor} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.9)',
        position: 'absolute',
        left: 0,
        top: window.theme.navigationBarHeight,
        width: window.width,
        height: window.contentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginBottom: 10,
    },
});
