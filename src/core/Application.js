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

import CustomPrototypes from './CustomPrototypes';
import Navigation from './Navigation';
import NavigationBar from './NavigationBar';
import Toast from '../components/Toast';
import Loading from '../components/Loading';
import PopMenu from '../components/PopMenu';

import Config from './Config';
import * as CommonUtil from '../utils/CommonUtil';
import Welcome from './Welcome';

export default class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWelcome: false,
        };
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('rgba(255, 255, 255, 0)', true);
        window.application = this;
    }

    componentDidMount() {
        CommonUtil.BackAndroidUtil.bind();
        setTimeout(() => {
            this.setState({ isWelcome: false, });
            StatusBar.setHidden(false);
        }, 3000);
    }

    componentWillUnmount() {
        CommonUtil.BackAndroidUtil.unbind();
    }

    reload() {
        this.setState({ r: Date.now() });
    }

    render() {
        if (this.state.isWelcome)
            return <Welcome />;
        return (
            <View style={styles.container}>
                <NavigationBar />
                <Navigation />
                <PopMenu />
                <Loading />
                <Toast />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
