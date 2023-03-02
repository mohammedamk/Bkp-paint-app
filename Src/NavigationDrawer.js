import React, { Component } from 'react';
import {
  StyleSheet,
  Text, TouchableOpacity,
  Image,
  View, TouchableHighlight,
  AsyncStorage,
  StatusBar, ScrollView,
  ImageBackground
} from 'react-native';
import { styles } from './styles'
// import { api } from '../api/apiController';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { _blue } from './Utils/Colors'
import {
  ApplicationProvider,
  Layout
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { api } from './apiController';
import { PostUrl } from './Utils/config';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class NavigationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_type: '',
      data: null,
      iscontractor: false,
      userData: [],
      username: '',
      userType: ''
    }
  }

  checkUserType = async () => {
    const getType = await AsyncStorage.getItem('usr_type');
    if (getType != null) {
      this.setState({ user_type: getType });
      if (getType == 'CONTRACTOR') {
        this.setState({ iscontractor: true });
      }
    }
  }

  async getUserData() {
    var url = PostUrl.url + '/getUserProfile';
    const mobile_number = await AsyncStorage.getItem('mo_num');
    const userType = await AsyncStorage.getItem('usr_type');
    console.log('Drawer', mobile_number, userType)
    this.setState({ mobile_number: mobile_number });
    try {
      const retrieved = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(
          {
            "userid": mobile_number,
          })
      }).then(function (response) {
        console.log(response, 'Response from fetched from Navigation');
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
        // console.log((this.state.userType).charAt(0))
      });
      return retrieved;
    } catch (err) {
      // console.log('Error fetching data-----------', err);
    }
  }

  componentDidMount() {
    this.checkUserType();
    this.getUserData()
  }


  componentWillReceiveProps(props) {
    this.checkUserType()
    this.getUserData()
  }


  render() {
    const cont = 'CONTRACTOR';
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <Layout style={{ backgroundColor: '#fff', flex: 1 }}>
          <ImageBackground source={require('./Images/darkImagebackground.png')} style={{height:responsiveHeight(25), flexDirection: 'row', alignContent: 'flex-start', alignItems: 'center'}}>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('profile')} style={[styles.imagewrapper,{marginLeft:'5%'}]}>

                    {(this.state.userData.TYPE === "Customer") || (this.state.userData.TYPE === "CUSTOMER") ?
                      <View style={{
                        alignSelf: "center", justifyContent: "center", alignItems: "center",
                        alignContent: "center"
                      }}>
                        <Text style={{
                          padding: responsiveHeight(1),color:'#fff',fontFamily:'CeraPro-Regular',
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
                  </TouchableHighlight>
                  <View>
                    <Text style={{ marginLeft: '10%', textAlign: 'left', fontFamily:'CeraPro-Black',color:'white',fontSize: responsiveFontSize(2.2)}}>{this.state.userData ? this.state.username : ''}</Text>
                    <Text style={{ marginLeft: '10%', textAlign: 'left', fontFamily:'CeraPro-Medium',color:'white',fontSize: responsiveFontSize(1.8),marginTop:'2%'}}>{this.state.userData ? this.state.userData.CONTACT_NO : ''}</Text>
                  </View>
          </ImageBackground>
          <View style={styles.separator}></View>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ margin: 15, marginTop: StatusBar.currentHeight, marginBottom: '10%' }}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('home')}
                  style={{}}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Feather name='home' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>Home</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.separatornav}></View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('siteinfo')}
                  style={{}}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Feather name='info' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>Site Information</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.separatornav}></View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('profile')}
                  style={{}}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Feather name='user' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>Profile</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.separatornav}></View>
                {this.state.iscontractor && <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('events')}
                  style={{ display: "none" }}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Feather name='book' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>Event List</Text>
                  </View>
                </TouchableOpacity>}
                <View style={styles.separatornav}></View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('consultationreport')}
                  style={{}}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Feather name='book' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>Consultation Report</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.separatornav}></View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('querylist')}
                  style={{}}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Fontisto name='comment' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>Query</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.separatornav}></View>
                <TouchableOpacity
                  onPress={() => { alert("Logged out"); api.logoutCall(); }}
                  style={{}}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Feather name='log-out' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>Logout</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.separatornav}></View>
                {/* <Text>{this.state.user_type}</Text>    */}
              </View>
            </View>
          </ScrollView>
        </Layout>
      </ApplicationProvider>
    );
  }
}
/***
 *                 <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('kycdata')}
                  style={{}}>
                  <View style={styles.sidepanel_content_wrapper}>
                    <Feather name='book-open' size={24} color={_blue} />
                    <Text style={styles.sidepanel_content_text}>KYC Data</Text>
                  </View>
                </TouchableOpacity>
 */