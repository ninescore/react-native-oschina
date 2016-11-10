/**
 * 提示信息
 * --------------------------------------------------
 * Toast.show('提示信息');
 * --------------------------------------------------
 */
import React, {
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
} from './Libraries';

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
            ]).start(() => {
                this.setState({
                    text: null,
                });
            });
        });
    }

    render() {
        return !this.state.text ? null : (
            <Animated.View style={[styles.container, { backgroundColor: window.theme.primaryColor }, { opacity: this.state.fadeAnim }]}>
                <Text style={window.theme.textWhite}>{this.state.text}</Text>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // left: window.width * 0.3 / 2,
        // top: 80,
        // width: window.width * 0.7,
        left: 0,
        top: window.theme.navigationBarHeight + 1,
        width: window.width,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});