import React, { Component } from 'react';
import { StatusBar, Image, Animated, TextInput, TouchableHighlight, View, Button, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { api } from './apiController'
// import { styles } from '../app/styles';
import PopupDialog from 'react-native-popup-dialog'
import * as Progress from 'react-native-progress';
import { styles } from './styles';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { _blue, _red, _yello, _statusbar } from './Utils/Colors';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Loader from './loader';
import Feather from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';


NetInfo.fetch().then(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

const unsubscribe = NetInfo.addEventListener(state => {
  return (conn = state.isConnected);
});

class Login extends React.Component {

  constructor(props) {
    super(props);
    console.log(JSON.stringify(this.props) + "Props in Login");

    this.state = {
      input_uname: '',
      input_pass: '',
      isLoading: false,
      userMobileNumber: '',
      userType: '',
      credError: false,
      color: [_yello, _blue, _red],
      currentColor: ''
    };

  }

  componentDidMount() {
    // while (1) {
    //   setTimeout(() => {
    //     if (this.state.currentColor === _red) {
    //       this.setState({ currentColor: _yello });
    //     }
    //     else if (this.state.currentColor === _yello) {
    //       this.setState({ currentColor: _blue });
    //     }
    //     else {
    //       this.setState({ currentColor: _red });
    //     }
    //   }, 2000);
    // }
  }
  unsubscribe;
  render() {
    setTimeout(() => {
      if (this.state.currentColor === _red) {
        this.setState({ currentColor: _yello });
      }
      else if (this.state.currentColor === _yello) {
        this.setState({ currentColor: _blue });
      }
      else if (this.state.currentColor === _blue) {
        this.setState({ currentColor: _red });
      }
      else{
        this.setState({ currentColor: _red });
      }
    }, 2000);
    return (
      <ImageBackground
        style={{ width: null, top: 0, height: responsiveHeight(21.5), flex: 1, backgroundColor: '#f7f7f7' }}
        source={require('./Images/smart.png')}
      >
        <StatusBar backgroundColor={_statusbar} translucent={false} barStyle={"dark-content"} />
        <ScrollView style={{
          // flex: 1,
        }}>
          <View style={{
            flex: 1, height: responsiveHeight(78.5), marginHorizontal: '8%', marginTop: responsiveHeight(18)
          }}>
            <View
              style={{ alignContent: 'center' }}>
              <Image
                style={styles.LoginLogo}
                source={require('./Images/final-logo.png')}
              />
              <Text style={styles.welcome_string}>
                Hakimi Paints{"\n"}
                Welcomes you
            </Text>
              {/* {console.log(this.state.credError)} */}
              {this.state.credError === true &&
                <Text style={{ paddingLeft: '5%', alignSelf: 'center', color: 'red' }}>
                  Error occured
           </Text>}
              <Input
                rightIcon={<Feather
                  name="user"
                  color={_blue}
                  size={20}
                />}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                inputStyle={{ fontSize: responsiveFontSize(1.5), marginLeft: '2%', color: '#000' }}
                containerStyle={{ backgroundColor: '#fff', marginBottom: responsiveHeight(2) }}
                placeholderTextColor='#686a6f'
                placeholder="Username"
                textDecorationLine="none"
                onChangeText={(input_uname) => this.setState({ input_uname: input_uname })}
              />
              <Input
                rightIcon={<Feather
                  name="lock"
                  color={_blue}
                  size={20}
                />}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                inputStyle={{ fontSize: responsiveFontSize(1.5), marginLeft: '2%', color: '#000' }}
                containerStyle={{ backgroundColor: '#fff', }}
                secureTextEntry={true}
                onChangeText={(input_pass) => this.setState({ input_pass: input_pass })}
                password={true}
                placeholder="Password"
                placeholderTextColor='#686a6f'
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity alignSelf='center'
                style={{
                  backgroundColor: _blue,
                  width: '100%',
                  alignContent: 'center', alignItems: 'center',
                  // paddingHorizontal: responsiveWidth(5),
                  paddingVertical: responsiveHeight(2.3)
                }}
                onPress={() =>
                  [this.verifyUser(),
                  this.setState({ isLoading: true })]
                }
              ><Text style={{ fontWeight: "bold", color: "white", fontSize: responsiveFontSize(1.8) }}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Loader component={this} />
        </ScrollView>
      </ImageBackground>
    )
  }
  verifyUser = () => {
    if (this.state.input_uname != '') {
      if (this.state.input_pass != '') {
        //alert('Success')
        // this.setState({isLoading:true});
        if (NetInfo.isConnected && unsubscribe) {
          api.loginCall(this);
          return true;
        }
        // setTimeout(function () {
        // { api.getDataCall();
        //  api.fetchData();
        //   }
        //   console.log("After 2 Secs")
        // }, 2000);
      } else {
        this.setState({ credError: true });
        { console.log(this.state.credError) }
      }
    } else {
      this.setState({ credError: true });
      { console.log(this.state.credError) }
      //alert('Please Enter Username');
    }
  }
}
export default Login