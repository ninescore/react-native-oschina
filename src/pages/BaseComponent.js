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
} from '../core/Libraries';

export class BaseComponent extends Component {

    constructor(props, title) {
        super(props);
        this.title = title;
        this.isShowLeftButton = true;
    }

    componentWillMount() {
        const routes = this.props.navigator.getCurrentRoutes();
        let route = routes[routes.length - 1];
        route.componentInstance = this;
        window.navigationBar && window.navigationBar.switchScene(route);
        // console.log('super.componentWillMount');
    }

    componentDidMount() {
        // console.log('super.componentDidMount');
    }

}
