/**
 * 刷新列表
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ListView,
    RefreshControl,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Navigator,
    Animated,
    Linking,
    Dimensions,
} from 'react-native';

export default class RefreshListView extends Component {

    static propTypes = {
        dataSource: PropTypes.object.isRequired,
        renderRow: PropTypes.func,
        onFetch: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loading: false,
            pageNo: 1,
            showBackTop: false,
        };
        this.listView = null;
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.onRefresh();
    }

    renderHeader() {
        if (!this.state.refreshing)
            return null;
        return (
            <Text style={styles.message}>正在加载中...</Text>
        );
    }

    renderFooter() {
        if (!this.state.loading)
            return null;
        return (
            <Text style={styles.message}>正在加载中...</Text>
        );
    }

    async onRefresh() {
        if (this.state.refreshing)
            return false;
        this.setState({
            refreshing: true,
            pageNo: 1,
        });
        if (this.props.onFetch) {
            await this.props.onFetch(1);
        }
        this.setState({
            refreshing: false,
            showBackTop: false,
        });
    }

    async onEndReached() {
        if (this.state.refreshing || this.state.loading || this.state.pageNo >= this.props.pageCount)
            return false;
        this.setState({
            loading: true,
        });
        this.state.pageNo += 1;
        if (this.props.onFetch) {
            await this.props.onFetch(this.state.pageNo);
        }
        this.setState({
            loading: false,
        });
    }

    onContentSizeChange(contentWidth, contentHeight) {
        if (contentHeight > Dimensions.get('window').height * 3) {
            if (this.state.showBackTop)
                return false;
            this.setState({
                showBackTop: true,
            });
        }
    }

    onBackTop() {
        this.listView.scrollTo({ y: 0, animated: true });
        this.setState({
            showBackTop: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    {...this.props}
                    ref={listView => this.listView = listView}
                    renderHeader={this.renderHeader}
                    renderFooter={this.renderFooter}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    keyboardDismissMode="on-drag"
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            />
                    }
                    onContentSizeChange={this.onContentSizeChange.bind(this)}
                    />
                {
                    !this.state.showBackTop ? null :
                        <TouchableOpacity
                            style={styles.backTop}
                            onPress={this.onBackTop.bind(this)}>
                            <Text style={styles.backTopTxt}>Top</Text>
                        </TouchableOpacity>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    message: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },
    backTop: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: 'gray',
        padding: 5,
    },
    backTopTxt: {
        color: '#fff',
    },
});
