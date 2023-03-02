import {
    StyleSheet
} from 'react-native';
import { scaleVertical } from '../Utils/scale';

let styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: 'space-between',
        flex: 1
    },
    image: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: scaleVertical(100),
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    hero: {
        fontSize: 37,
    },
    appName: {
        fontSize: 62,
    },
    progress: {
        alignSelf: 'center',
        marginBottom: 35,
        backgroundColor: '#e5e5e5'
    }
});

export default styles;
