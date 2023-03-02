import React from 'react';
import {
    Text,
    FlatList,
    View,
    StatusBar,
    AsyncStorage,
    Image,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { styles } from './styles';
import * as Progress from 'react-native-progress';
import Feather from 'react-native-vector-icons/Feather';
// import ImageCropPicker from 'react-native-image-crop-picker';
import { _blue } from './Utils/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { PostUrl } from './Utils/config';
import {
    ApplicationProvider,
    Layout
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import Loader from './loader';
import { api } from './apiController';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            mobile_number: null,
            profile_pic: '',
            isLoading: true,
            username: null,
            userType: null
        }

    }

    openGallery = async () => {
        if(this.state.userType === "Customer" || this.state.userType === "CUSTOMER"  ){
            return;
        }
        else
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            maxFiles: 1,
            mediaType: "Photo",
            cropperCircleOverlay: true,
        }).then(responseImage => {
            var oldPath = JSON.stringify(responseImage.path);
            var newPath = oldPath.split(/[\s/]+/);
            // console.log(
            //     "FileName", (newPath[newPath.length - 1].replace('"', "")) ,
            // );
            const imageData = new FormData();
            imageData.append('file', {
                uri: responseImage.path,
                type: responseImage.mime,
                name: (newPath[newPath.length - 1].replace('"', ""))
            });
            imageData.append('fileType', 'profile_pic');
            imageData.append('userId', this.state.mobile_number);
            // console.log(imageData);
            fetch(PostUrl.url + '/UploadFile', {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: imageData
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log("hii", responseJson);
                    // console.log(this.state.mobile_number);
                    this.setState({ profile_pic: `data:${responseImage.mime};base64,${responseImage.data}` });
                    return responseJson;
                }).catch((error) => {
                    console.error(error);
                });
        });
    }
    componentWillUnmount() {
        this.backButton.remove();
    }
    async componentDidMount() {
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('home');
            return true;
        });
        this.popupDialog.show()
        var url = PostUrl.url + '/getUserProfile';
        const mobile_number = await AsyncStorage.getItem('mo_num');
        const userType = await AsyncStorage.getItem('usr_type');
        // console.log(mobile_number, userType)
        this.setState({ mobile_number: mobile_number });
        try {
            const retrieved = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "userid": mobile_number,
                    })
            }).then(function (response) {
                // console.log(response + 'Response from fetched');
                return response.json();
            }).then(function (result_data) {
                // console.log(result_data);
                if (result_data != null) {
                    return bu = result_data.data;
                }
            })
            // console.log(bu);
            if (bu.PROFILE_PIC != null) {
                this.setState({ profile_pic: "http://139.59.56.122/App/" + bu.PROFILE_PIC });
            }
            this.popupDialog.dismiss()
            var user_nameArr = (retrieved.USER_NAME).split(' ');
            var username = ''
            user_nameArr.map((name, index) => {
                if (index === 0) {
                    username += (name.charAt(0).toUpperCase()) + (name.toLowerCase()).slice(1)
                } else {
                    username += " " + (name.charAt(0).toUpperCase()) + (name.toLowerCase()).slice(1)
                }
            })
            this.setState({
                userData: retrieved,
                username: username,
                mobile_number: retrieved.USER_ID,
                userType: (retrieved.TYPE.charAt(0)) + (retrieved.TYPE.toLowerCase()).slice(1),
                isLoading: false
            }, () => {
                console.log((this.state.userType).charAt(0))
            });
            return retrieved;
        } catch (err) {
            console.log('Error fetching data-----------', err);
        }
    }

    render() {
        return (
            <ApplicationProvider
                mapping={mapping}
                theme={lightTheme}>
                <Layout style={{ backgroundColor: '#fff', flex: 1 }}>
                    <View>
                        {console.log("Mobile Number", this.state.mobile_number)}
                        <View style={styles.navigator_custom_menu}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}
                                // onPress={() => { Actions.drawerOpen({ data: this.state.data }); }}
                                style={styles.navigator_custom_menu_content}>
                                <Feather name='menu' size={30} color={_blue} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navigator_custom_menu_content}
                                onPress={() => { alert("Logged out"); api.logoutCall(); this.props.navigation.navigate('login'); }}
                            >
                                <Feather name='log-out' size={30} color={_blue} />
                            </TouchableOpacity>
                        </View>
                        <StatusBar />
                        <Loader component={this} />
                        <ScrollView>
                            <View style={{ backgroundColor: '#fff', paddingVertical: '13%', alignContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.openGallery()} style={{
                                    borderWidth: 0.1, borderRadius: 50,
                                    //  padding: 5
                                }}>
                                    {(this.state.userData.TYPE === "Customer") || (this.state.userData.TYPE === "CUSTOMER") ?
                                        <View style={{
                                            alignSelf: "center", justifyContent: "center", alignItems: "center",
                                            alignContent: "center"
                                        }}>
                                            <Text style={{
                                                padding:responsiveHeight(1),
                                                height: 70, width: 70, borderRadius: 35, fontSize: responsiveFontSize(5), textAlign: "center"
                                            }}>
                                                {this.state.userData.USER_NAME.charAt(0).toUpperCase()}
                                            </Text>
                                        </View>
                                        :
                                        this.state.profile_pic !== null ?
                                            <View>
                                                <Image style={styles.userinfo_profile_image} source={{ uri: this.state.profile_pic }} >
                                                </Image>
                                            </View>
                                            :
                                            <View>
                                                <Image style={styles.userinfo_profile_image} source={require('./Images/user_pic.png')} >
                                                </Image>
                                                <Feather name='camera' size={28} color='gray' style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end' }} />
                                            </View>
                                    }
                                </TouchableOpacity>
                                <Text style={styles.userinfo_mainname}>{this.state.username}</Text>
                                <Text style={styles.userinfo_userid}>{this.state.userData.USER_ID}</Text>
                            </View>
                            <View style={styles.separator}></View>
                            <View
                                style={styles.userInfo_page_data_container}>
                                <View style={styles.userinfo_default_text_container}>
                                    <Text style={styles.userinfo_default_text}>Date of Birth</Text>
                                    <Text style={styles.userinfo_text_data}>{this.state.userData.DOB}</Text>
                                </View>
                                <View style={styles.separator}></View>
                                <View style={styles.userinfo_default_text_container}>
                                    <Text style={styles.userinfo_default_text}>Date of Marriage</Text>
                                    <Text style={styles.userinfo_text_data}>{this.state.userData.DOM}</Text>
                                </View>
                                <View style={styles.separator}></View>
                                <View style={styles.userinfo_default_text_container}>
                                    <Text style={styles.userinfo_default_text}>Date of Anniversary</Text>
                                    <Text style={styles.userinfo_text_data}>{this.state.userData.DOA}</Text>
                                </View>
                                <View style={styles.separator}></View>
                                <View style={styles.userinfo_default_text_container}>
                                    <Text style={styles.userinfo_default_text}>E-mail ID</Text>
                                    <Text style={styles.userinfo_text_data}>{this.state.userData.EMAIL_ID}</Text>
                                </View>
                                <View style={styles.separator}></View>
                                <View style={styles.userinfo_default_text_container}>
                                    <Text style={styles.userinfo_default_text}>Contact No.</Text>
                                    <Text style={styles.userinfo_text_data}>{this.state.userData.CONTACT_NO}</Text>
                                </View>
                                <View style={styles.separator}></View>
                            </View>
                        </ScrollView>
                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
}



                // ImagePicker.launchImageLibrary( (response) => {

                //   });
                // const uploadData = new FormData;
                // uploadData.append('userId');
                //         RNFetchBlob.fetch('POST', 'http://139.59.56.122/App/MobileApiController/UploadFile', {
                //             Authorization: "Bearer access-token",
                //             otherHeader: "foo",
                //             'Content-Type': 'multipart/form-data',
                //         }, [
                //             {
                //                 // // file: 'avatar-png',
                //                 userId: '7744114455',
                //                 fileType: 'profile_pic',
                //                 data: response
                //             },
                //         ]).then((resp) => {
                //             // ...
                //             console.log("Success" + (resp));
                //         }).catch((err) => {
                //             // 
                //             console.log("Failed"+ err);
                //         })
                //         //   const source = { uri: response.uri };
                //         this.setState({
                //             profile_pic: response.uri,
                //         });