import {
    React,
    Component,
    PropTypes,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Modal,
    Icon,
} from '../core/Libraries';

export default class PopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: null,
            fadeAnim: new Animated.Value(-100),
        };
        this.callback = null;
        this.toValue = null;
        this.animatedStyle = null;
        window.popMenu = this;
    }
    
    componentDidMount() {
    	if (window.navigation) {
    		window.navigation.navigationContext.addListener('willfocus', () => {
    			this.hide();
    		})
    	}
    }

    // popDirection (default: 'toDown')
    show(menu, popDirection, callback) {
        this.callback = callback;
        this.toValue = window.theme.navigationBarHeight;
        this.animatedStyle = { top: this.state.fadeAnim };
        if (popDirection == 'toUp') {
            this.toValue = 0;
            this.animatedStyle = { bottom: this.state.fadeAnim };
        }

        this.setState({
            menu,
        }, () => {
            Animated.sequence([
                Animated.timing(
                    this.state.fadeAnim,
                    { toValue: this.toValue, duration: 200 }
                ),
            ]).start();
        });
    }

    hide() {
        let isShow = this.state.menu != null ? true : false;
        this.setState({
            menu: null,
            fadeAnim: new Animated.Value(-100),
        });
        return isShow;
    }

    onPressSpace() {
        this.hide();
    }

    onPressMenu(menuObj) {
        menuObj.onPress && menuObj.onPress();
        this.callback && this.callback(menuObj);
        this.hide();
        return false;
    }

    render() {
        if (!this.state.menu)
            return null;
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.onPressSpace.bind(this)}>
                <Animated.View
                    style={[
                        styles.main,
                        { backgroundColor: window.theme.whiteColor },
                        this.animatedStyle
                    ]}>
                    {this.renderMenu()}
                </Animated.View>
            </TouchableOpacity>
        );
    }

    renderMenu() {
        let arr = [];
        arr.push(
            <View key={-1}
                style={[
                    styles.btn,
                    { backgroundColor: window.theme.primaryColor },
                    styles.btnFirst
                ]}>
                <Text style={window.theme.whiteText}>请选择{this.state.menu.name}：</Text>
            </View>
        );
        this.state.menu.children.map((m, i) => {
            arr.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.btn,
                        { backgroundColor: window.theme.primaryColor }
                    ]}
                    onPress={this.onPressMenu.bind(this, m)}>
                    <Text style={window.theme.whiteText}>{m.name}</Text>
                    {
                        this.state.menu.selectedId != m.id ? null : <Icon name="ios-checkmark" />
                    }
                </TouchableOpacity>
            );
        });
        return arr;
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: window.width,
        height: window.height,
    },
    main: {
        position: 'absolute',
        left: 0,
        marginTop: 1,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: window.width,
        paddingHorizontal: 12,
        height: 45,
        alignItems: 'center',
        marginTop: 1,
    },
    btnFirst: {
        marginTop: 0,
    },
});
