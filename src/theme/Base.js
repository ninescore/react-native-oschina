
export default class Base {

    static primaryColor = '#15a230';
    static secondaryColor = '#4eaa4c';
    static embellishmentColor = '#f5a623';

    // --------------------------------------------------
    // navigationBar
    // --------------------------------------------------

    static navigationBarHeight = 40;
    static navigationBarContainer = {
        height: Base.navigationBarHeight,
        backgroundColor: Base.primaryColor,
    }
    static navigationBarTextColor = '#fff';
    static navigationBarText = {
        color: Base.navigationBarTextColor,
        fontSize: 14,
    }

    // --------------------------------------------------
    // content
    // --------------------------------------------------

    static contentColor = '#ededed';
    static contentContainer = {
        flex: 1,
        backgroundColor: Base.contentColor,
    }
    static text = {
        color: '#464646',
        fontSize: 14,
    }
    static subText = {
        color: '#999',
        fontSize: 14,
    }
    static link = {
        color: Base.primaryColor,
        fontSize: 14,
    }

}