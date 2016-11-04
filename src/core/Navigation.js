import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    View,
} from 'react-native';

import Index from '../pages/Index';

export default class RootNavigation extends Component {

    constructor(props) {
        super(props);
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    renderScene(route, navigator) {
        if (!window.navigation)
            window.navigation = navigator;
        let Component = route.component;
        return <Component {...route.params} navigator={navigator} />;
    }

    onWillFocus(route) {
        if (window.navigationBar)
            window.navigationBar.switchScene(route);
    }

    render() {
        return (
            <Navigator
                ref={ref => window.navigation = ref}
                configureScene={this.configureScene}
                initialRoute={{ component: Index }}
                renderScene={this.renderScene}
                sceneStyle={window.theme.contentContainer}
                onWillFocus={this.onWillFocus}
            />
        );
    }

}

const styles = StyleSheet.create({

});
