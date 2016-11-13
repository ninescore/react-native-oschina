import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

export class H1 extends Component {

    render() {
        return (
    		<TouchableOpacity
                style={styles.item}
                onPress={() => {
                    this.props.navigator.push({
                        component: NewsList,
                    });
                } }>
                <Text>新闻</Text>
            </TouchableOpacity>
            <Text {...this.props}
                style={[this.props.style, styles.text]}>
                {
                    React.Children.map(this.props.children, (child) => {
                        return child;
                    })
                }
            </Text>
        );
    }

}

const styles = StyleSheet.create({
	text: {
        fontSize: 24,
    },
});