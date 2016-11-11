
export default class Base {

    primaryColor = '#2ac25f';
    secondaryColor = '#2ed069';
    embellishmentColor = '#e67e22';

    // --------------------------------------------------
    // navigationBar
    // --------------------------------------------------

    navigationBarHeight = 68;
    get navigationBarContainer() {
        return {
            height: this.navigationBarHeight,
            backgroundColor: this.primaryColor,
        }
    }

    // --------------------------------------------------
    // content
    // --------------------------------------------------

    contentColor = '#ecf0f1';
    mainColor = '#666';
    subColor = '#bbb';
    whiteColor = '#fff';

    get contentContainer() {
        return {
            flex: 1,
            backgroundColor: this.contentColor,
        }
    }
    get text() {
        return {
            color: this.mainColor,
            fontSize: 15,
        }
    }
    get whiteText() {
        return {
            color: this.whiteColor,
            fontSize: 15,
        }
    }
    get subText() {
        return {
            color: this.subColor,
            fontSize: 15,
        }
    }
    get link() {
        return {
            color: this.embellishmentColor,
            fontSize: 13,
        }
    }

}