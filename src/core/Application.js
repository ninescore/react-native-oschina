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
    StatusBar,
} from './Libraries';

import Config from './Config';
import CustomPrototypes from './CustomPrototypes';
import Navigation from './Navigation';
import NavigationBar from './NavigationBar';
import Toast from '../components/Toast';
import Loading from '../components/Loading';
import PopMenu from '../components/PopMenu';

import * as Utils from './Utils';
import Welcome from './Welcome';

export default class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWelcome: true,
        };
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('rgba(255, 255, 255, 0)', true);
        window.application = this;
    }

    componentDidMount() {
        Utils.BackAndroidUtil.bind();
        setTimeout(() => {
            this.setState({ isWelcome: false, });
            StatusBar.setHidden(false);
        }, 500);
    }

    componentWillUnmount() {
        Utils.BackAndroidUtil.unbind();
    }

    render() {
        if (this.state.isWelcome)
            return <Welcome />;
        return (
            <View style={[styles.container, {marginTop: window.isSupportStatusBarTransparency ? 0 : -window.statusBarHeight}]}>
                <Navigation />
                <PopMenu />
                <Toast />
                <NavigationBar />
                <Loading />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
