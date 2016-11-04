import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import Application from './src/core/Application';

class oschina extends Component {

    render() {
        return <Application/>;
    }

}

AppRegistry.registerComponent('oschina', () => oschina);
