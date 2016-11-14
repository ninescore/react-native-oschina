import React, { Component, PropTypes } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default class Icon extends Component {

    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string,
        lib: PropTypes.string,
    };

    static defaultProps = {
        size: 30,
        color: "#fff",
        lib: "Ionicons",
    };

    constructor(props) {
        super(props);
    }

    getComponent(lib) {
        switch (lib) {
            case "Entypo":
                return Entypo;
            case "EvilIcons":
                return EvilIcons;
            case "FontAwesome":
                return EntyFontAwesomepo;
            case "Foundation":
                return Foundation;
            case "Ionicons":
                return Ionicons;
            case "MaterialIcons":
                return MaterialIcons;
            case "Octicons":
                return Octicons;
            case "Zocial":
                return Zocial;
            case "SimpleLineIcons":
                return SimpleLineIcons;
        }
    }

    render() {
        let IconComponent = this.getComponent(this.props.lib);
        return (
            <IconComponent name={this.props.name}
                size={this.props.size}
                color={this.props.color}
            />
        );
    }

}