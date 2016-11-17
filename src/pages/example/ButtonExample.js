import {
    React,
    BaseComponent,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Icon,
    Button,
} from '../../core/Libraries';

export default class ButtonExample extends BaseComponent {

    constructor(props) {
        super(props, '按钮示例');
        this.isShowLeftButton = false;
    }

    render() {
        return (
            <View style={styles.container}>

                <Button title="普通按钮" style={styles.btn} />

                <Button
                    title="左对齐按钮"
                    style={[styles.btn, {justifyContent: 'flex-start'}]}
                />
                
                <Button
                    title="左对齐按钮"
                    style={[styles.btn, {justifyContent: 'flex-start', backgroundColor: window.theme.embellishmentColor}]}
                />

                <Button
                    style={styles.btn}
                    style={[styles.btn, {justifyContent: 'space-between', backgroundColor: window.theme.embellishmentColor}]}
                 >
                    <Text style={window.theme.whiteText}>图标按钮</Text>
                    <Icon name="ios-checkmark" />
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    btn: {
        marginTop: 12,
    },
});
