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
} from '../components/Libraries';

export default class Welcome extends Component {

    constructor(props) {
        super(props);
        StatusBar.setHidden(true);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>欢迎来到{window.appName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
