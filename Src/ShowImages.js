import React from 'react';
import {
    ActivityIndicator,
    BackHandler,
    StatusBar,
    Image,
    TouchableOpacity, Modal,
    View, AsyncStorage,
    Text, Picker,
    FlatList, ScrollView
} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { _blue } from './Utils/Colors';
import Lightbox from 'react-native-lightbox';


export default class ViewImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesArray: [],
        }
    }

    componentWillReceiveProps(props) {
        this.props.navigation.closeDrawer()
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack(null)
            return true;
        });
    }

    componentDidMount() {
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack(null)
            return true;
        });
        // goBack(null)
        console.log(this.props.navigation.state.params.IMAGE_URL, " && ", this.props.navigation.state.params.DESCRIPTION)
    }
    render() {
        return (
            <View style={{ backgroundColor: "#000" }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('sitedetails')}
                    style={{
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: 30,
                        top: 30,
                        zIndex:999
                    }}>
                    <Feather onPress={() => this.props.navigation.navigate('sitedetails')}
                        name='x-circle' size={30} color={"white"} />
                </TouchableOpacity>
                {/* <Lightbox swipeToDismiss={true} underlayColor="white"> */}
                <Image
                    style={{ height: responsiveHeight(90), width: responsiveWidth(100), resizeMode: "contain" }}
                    resizeMode="contain"
                    source={{ uri: 'http://139.59.56.122' + this.props.navigation.state.params.IMAGE_URL }}
                />
                {/* </Lightbox> */}
                <Text style={{
                    color: "#fff", textAlign: "center", height: responsiveHeight(10),
                    // marginHorizontal: responsiveHeight(5),
                }}>
                    {this.props.navigation.state.params.DESCRIPTION}
                </Text>
            </View>
        );
    }
}