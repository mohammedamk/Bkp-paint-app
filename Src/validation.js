import React from 'react';
import {
    ActivityIndicator,
    BackHandler,
    StatusBar,
    Image,
    TouchableOpacity,
    View,
    Text,
    FlatList, ScrollView,
    Dimensions,
} from 'react-native'
import { styles } from './styles';
import {
    ApplicationProvider,
    Layout
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { ProgressBar } from './component/progressBar';
import { splashStyles } from "./myStyles";
import { scale } from './Utils/scale';
import AsyncStorage from '@react-native-community/async-storage';
import { _statusbar } from './Utils/Colors';

let timeFrame = 500;
export default class Validation extends React.Component {
    constructor(props) {
        super(props);
        // console.log(JSON.stringify(this.props) + "Props in Logged In");
        this.state = {
            isLoading: false,
            isLoggedIn: true,
            data: null,
            date: null,
            progress: 0

        }
    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem('mo_num');
        if (value !== null) {
            // console.log(value);
            this.loadSplash('home')
        }
        else {
            this.loadSplash('login')
        }
    }


    loadSplash(nav) {
        console.log("in splash load")
        StatusBar.setHidden(true, 'none');

        this.timer = setInterval(() => {
            // console.log('in interval')
            if (this.state.progress === 1) {
                clearInterval(this.timer);
                setTimeout(() => {
                    StatusBar.setHidden(false, 'slide');
                    this.props.navigation.navigate(nav)
                }, timeFrame);
            } else {
                let random = Math.random() * 0.5;
                let progress = this.state.progress + random;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
            }
        }, timeFrame)

    }

    componentWillUnmount() {
    }


    render() {
        let width = Dimensions.get('window').width;
        return (
            <ApplicationProvider
                mapping={mapping}
                theme={lightTheme}>
                <Layout style={{ backgroundColor: '#fff', flex: 1 }}>
                    <StatusBar backgroundColor={_statusbar} translucent={false} barStyle={"dark-content"} />
                    <View style={splashStyles.container}>
                        <StatusBarPaddingIOS />
                        <View>
                            <Image style={[splashStyles.image, { width: width }]} source={require('./Images/final-logo.png')} />
                            {/* <View style={splashStyles.text}>
                                <Text style={splashStyles.appName}>PMS</Text>
                                <Text style={splashStyles.hero}></Text>
                            </View> */}
                        </View>
                        <ProgressBar
                            color="#48A7D6"
                            style={splashStyles.progress}
                            progress={this.state.progress} width={scale(320)} />
                    </View>
                </Layout>
            </ApplicationProvider>
        );
    }
}