import {
    cyan500,
    cyan700,
    cyan900,
    blueGrey400,
    blueGrey600,
    blueGrey900,
    brown700,
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
        accent1Color: blueGrey400,
        accent2Color: blueGrey600,
        accent3Color: blueGrey900,
        textColor: fullWhite,
        secondaryTextColor: fade(fullWhite, 0.7),
        alternateTextColor: brown700,
        canvasColor: brown700,
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
