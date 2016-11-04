import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class BaseComponent extends Component {

    constructor(props, title) {
        super(props);
        this.title = title;
        this.isShowLeftButton = true;
    }

    componentWillMount() {
        const routes = this.props.navigator.getCurrentRoutes();
        let route = routes[routes.length - 1];
        route.componentInstance = this;
        window.navigationBar.switchScene(route);
        // console.log('super.componentWillMount');
    }

    componentDidMount() {
        // console.log('super.componentDidMount');
    }

}
