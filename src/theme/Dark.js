import Base from './Base';

export default class Dark extends Base {

    static navigationBarHeight = 40;

    static navigationBarContainer = {
        height: Dark.navigationBarHeight,
        backgroundColor: '#666',
    }

    static navigationBarText = {
        color: '#ddd',
        fontSize: 14,
    }

    // --------------------------------------------------
    // content
    // --------------------------------------------------

    static contentContainer = {
        flex: 1,
        backgroundColor: '#999',
    }

}