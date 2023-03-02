import React from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  View, AsyncStorage,
  Text,
  FlatList, ScrollView
} from 'react-native'
import { styles } from './styles';

// import { api } from '../../api/apiController'
import Feather from 'react-native-vector-icons/Feather';
import { _blue, _statusbar } from './Utils/Colors'
import { Card, Button, Icon } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import Dashboard from './Custom_Dashboard';
import { api } from './apiController';
import {
  ApplicationProvider,
  Layout
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { PostUrl } from './Utils/config';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Loader from './loader';
import NetInfo from "@react-native-community/netinfo";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // console.log(JSON.stringify(this.props) + "Props in Logged In");
    this.state = {
      isLoading: false,
      isLoggedIn: true,
      data: null,
      date: null,
      dashboard: [],
      isRefreshing: false,
      userData: [],
      mobile_number: null,
      profile_pic: '',
      isLoading: true,
      username: null,
      userType: null
    }
    { console.disableYellowBox = true }
  }

  async getDashboardData() {
    if (NetInfo.isConnected) {
      var date = new Date().getDate();
      this.setState({ date: date });
      this.popupDialog.show()
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const userid = await AsyncStorage.getItem('mo_num');
      // console.log("Home", username, password)
      fetch(PostUrl.url + '/getDashboard',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userid": userid,
            "username": username,
            "password": password
          })
        }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.code == 200) {
            this.popupDialog.dismiss();
            // console.log(responseData)
            // this.setState({ dashboard: [] }, () => {

            // })
            var dataArr = []
            responseData.dashboard.map(async function (data, index) {
              console.log("Latest", data)
              if (data.count !== 0) {
                // responseData.dashboard.splice(index, 1)
                dataArr.push(data)
              }
            })

            this.setState({
              dashboard: dataArr
            })

          } else {
            this.popupDialog.dismiss();
            alert(`Something went wrong,${'\n'}Please Contact administrator`)
          }
        });
    }
    else {
      alert(`Connect to the Internet`)
    }
  }

  async componentDidMount() {
    this.getuserProfile()
    this.getDashboardData()
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp()
      return true;
    });
  }

  componentWillReceiveProps(props) {
    this.props.navigation.closeDrawer()
    this.getDashboardData()
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp()
      return true;
    });
  }

  async getuserProfile() {
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
        return response.json();
      }).then(function (result_data) {
        if (result_data != null) {
          return bu = result_data.data;
        }
      })
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

      });
      return retrieved;
    } catch (err) {
      // console.log('Error fetching data-----------', err);
    }
  }
  componentWillUnmount() {
    this.backButton.remove();
  }

  navigateTo(data) {
    if (data.module === "PROJECTSTATUS") {
      this.props.navigation.navigate('siteinfo')
    }
    else {
      this.props.navigation.navigate('userlist', { type: data.module })
    }
  }

  renderCards(item) {
    console.log(item);
    if (item.count != 0) {

      return (
        <View style={{ width: responsiveWidth(50) }}>
          <Card
            titleNumberOfLines={1}
            title={item.name}
            titleStyle={{fontFamily: 'CeraPro-Regular'}}
            containerStyle={{borderColor:_blue,borderWidth:2}}
          ><Button
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              titleStyle={{ fontFamily: 'CeraPro-Regular' }}
              title={item.count} onPress={() => {
                this.navigateTo(item)
              }} />
          </Card>
        </View>)
    }
  }

  onRefresh() {
    this.setState({ isRefreshing: true }, async () => {
      this.getDashboardData()
      this.setState({ isRefreshing: false })
    })
  }

  render() {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <Layout style={{ backgroundColor: '#f2f3f8', flex: 1 }}>
          <StatusBar backgroundColor={_statusbar} translucent={false} barStyle={"dark-content"} />
          <View>
            <ImageBackground source={require('./Images/darkImagebackground.png')} style={{width:responsiveWidth(100),height:responsiveHeight(35)}}>
              <View>
                <View style={{justifyContent: 'space-between',flexDirection: 'row',width:responsiveWidth(100)}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}
                    // onPress={() => { Actions.drawerOpen({ data: this.state.data }); }}
                    style={{width:responsiveWidth(30),margin:'2%'}}>
                    <Feather name='menu' size={30} color={_blue} />
                  </TouchableOpacity>
                  <View style={{ justifyContent: 'center',width:responsiveWidth(30) }}>
                    <Text style={{ textAlign: 'center',color:'#fff', fontSize: responsiveFontSize(2) }}>Home</Text>
                  </View>
                  <TouchableOpacity style={{width:responsiveWidth(30),alignItems:'flex-end',padding:'2%'}}
                    onPress={async () => { await api.logoutCall(); }}
                  >
                    <Feather name='log-out' size={30} color={_blue} />
                  </TouchableOpacity>
                </View>
                {/*<StatusBar transluent={true} />*/}
              </View>
               <View style={{width: responsiveWidth(100)}}>
              <View
                style={{
                  //backgroundColor: '#f3f5f8',
                  // paddingBottom: '13%',
                  marginLeft: responsiveWidth(4),
                  marginBottom: responsiveHeight(4),
                  alignContent: 'flex-start',
                  alignItems: 'center'
                }}>
                <TouchableOpacity style={{
                  borderWidth: 1, borderRadius: 50,
                  borderColor:'#fff'
                  //  padding: 5
                }}>
                  {(this.state.userData.TYPE === "Customer") || (this.state.userData.TYPE === "CUSTOMER") ?
                    <View style={{
                      alignSelf: "center", justifyContent: "center", alignItems: "center",
                      alignContent: "center"
                    }}>
                      <Text style={{
                        padding: responsiveHeight(1),
                        height: 70,color:'#fff', width: 70, borderRadius: 35, fontSize: responsiveFontSize(5), textAlign: "center"
                      }}>
                        {this.state.username.charAt(0).toUpperCase()}
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
                <Text style={[styles.userinfo_mainname, { marginVertical: 2 }]}>
                  {this.state.username}
                </Text>
                <Text style={{ marginVertical: 2,fontFamily:'CeraPro-Light', fontSize: responsiveFontSize(2),color:'#fff' }}>
                  {this.state.userType}
                </Text>
                <Text style={[styles.userinfo_userid, { marginTop: 3,fontFamily:'CeraPro-Light' }]}>
                  {this.state.mobile_number}
                  {/* {alert(JSON.stringify(this.state.mobile_number))} */}
                  {/* {(JSON.stringify(this.state.userData.USER_ID)).charAt(0) + ((this.state.userData.USER_ID).toLowerCase()).slice(1) } */}
                </Text>
              </View>
            </View>
            </ImageBackground>
            <Loader component={this} />
            <View style={{
              borderTopStartRadius: responsiveWidth(6),
              borderTopEndRadius: responsiveWidth(6),
              backgroundColor: "#fff"
            }}>
              <FlatList
                scrollEnabled
                data={this.state.dashboard}
                contentContainerStyle={{ paddingBottom: '60%', marginTop: 10 }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => (this.renderCards(item))}
                keyExtractor={item => item.name}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
              />
            </View>
          </View>
          {/* <FloatingAction
            actions={actions}
            visible={false}
            color={_blue}
            floatingIcon={<Text>{this.state.date}</Text>}
            onPressItem={name => {
              switch (name) {
                case 'bt_reg':
                  console.log(name);
                  this.props.navigation.navigate('todays_registered');
                  break;
                case 'bt_consult':
                  console.log(name);
                  this.props.navigation.navigate('todays_consultation');
                  break;
                case 'bt_converted_sites':
                  console.log(name);
                  this.props.navigation.navigate('todays_converted');
                  break;
              }
            }}
          /> */}
        </Layout>
      </ApplicationProvider >
    );
  }
  separator = () => (
    <View
      style={{
        backgroundColor: '#000000',
        marginTop: '1%',
        marginBottom: '0.8%',
        // paddingBottom: '0.2%',
        // paddingTop: '0.2%'
        //margin: '0.1%',
      }}
    />
  );
}

const capitalize = (s) => {
  setTimeout(() => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }, 2000);
}

const actions = [
  {
    color: _blue,
    text: "Today's Registered User's",
    name: 'bt_reg',
    // icon: { uri: 'https://image.flaticon.com/icons/svg/747/747310.svg' },
    position: 1,
    icon: require("./Images/new_user.png")
  },
  {
    color: _blue,
    text: "Today's Consultations",
    name: 'bt_consult',
    position: 2,
    icon: require("./Images/consultation.png")
  },
  {
    color: _blue,
    text: "Today's Converted Sites",
    name: 'bt_converted_sites',
    position: 3,
    icon: require("./Images/repeat.png")
  }
];