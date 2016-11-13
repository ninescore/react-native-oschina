import React, {
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    H1,
} from '../components/Libraries';

export default class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    onLayout(event) {
    	if (window.height > event.nativeEvent.layout.height)
    		window.isSupportStatusBarTransparency = false;
    }

    render() {
        return (
            <View style={styles.container}
            	onLayout={this.onLayout.bind(this)}>
                <H1 style={window.theme.whiteText}>欢迎来到{window.appName}</H1>
                <Text style={window.theme.whiteText}>By React Native</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: window.theme.primaryColor,
    },
});
