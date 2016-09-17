import {
    cyan500,
    cyan700,
    cyan900,
    blueGrey200,
    blueGrey400,
    blueGrey100,
    grey100,
    grey500,
    darkBlack,
    white,
    grey300,
    fullBlack,
    fullWhite
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator'


const theme = {
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: cyan900,
        accent1Color: blueGrey200,
        accent2Color: blueGrey400,
        accent3Color: blueGrey100,
        textColor: fullWhite,
        secondaryTextColor: fade(fullWhite, 0.7),
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        borderColor: fade(fullWhite, 0.3),
        disabledColor: fade(fullWhite, 0.3),
        pickerHeaderColor: fade(fullWhite, 0.12),
        clockCircleColor: fade(fullWhite, 0.12),
    },
    appBar: {
        height: 50,
    },
};

export default theme;
