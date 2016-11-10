
export default class Base {

    static primaryColor = '#2ecc71';
    static secondaryColor = '#27ae60';
    static embellishmentColor = '#e67e22';

    // --------------------------------------------------
    // navigationBar
    // --------------------------------------------------

    static navigationBarHeight = 68;
    static navigationBarContainer = {
        height: Base.navigationBarHeight,
        backgroundColor: Base.primaryColor,
    }

    // --------------------------------------------------
    // content
    // --------------------------------------------------

    static contentColor = '#ecf0f1';
    static subColor = '#bbb';
    static contentContainer = {
        flex: 1,
        backgroundColor: Base.contentColor,
    }
    static text = {
    	color: '#666',
        fontSize: 15,
    }
    static textWhite = {
    	color: '#fff',
        fontSize: 15,
    }
    static subText = {
        color: '#bbb',
        fontSize: 13,
    }
    static link = {
        color: Base.embellishmentColor,
        fontSize: 13,
    }

}