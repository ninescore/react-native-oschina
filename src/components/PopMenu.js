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
    Button,
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
        this.popDirection = popDirection || 'toDown';
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
        let btnStyle = [styles.btn];
        if (this.popDirection == 'toUp')
            btnStyle.push({ marginBottom: 1 });
        else
            btnStyle.push({ marginTop: 1 });
        let arr = [];
        arr.push(
            <Button key={-1}
                disabled={true}
                style={btnStyle}>
                <Text style={window.theme.whiteText}>请选择{this.state.menu.name}：</Text>
            </Button>
        );
        this.state.menu.children.map((m, i) => {
            arr.push(
                <Button
                    key={i}
                    style={btnStyle}
                    onPress={this.onPressMenu.bind(this, m)}>
                    <Text style={window.theme.whiteText}>{m.name}</Text>
                    {
                        this.state.menu.selectedId != m.id ? null : <Icon name="ios-checkmark" />
                    }
                </Button>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    main: {
        position: 'absolute',
        left: 0,
    },
    btn: {
        width: window.width,
        justifyContent: 'space-between',
    },
});
