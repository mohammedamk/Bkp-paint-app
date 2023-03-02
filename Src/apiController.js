import React from 'react'
import { AsyncStorage, Text } from 'react-native'
import { PostUrl } from './Utils/config'
import RNRestart from 'react-native-restart';
class ApiController {

  errorReports() {
    return (
      alert("Please Check fields")
    );
  }

  logoutCall = async () => {
    AsyncStorage.removeItem('mo_num')
    AsyncStorage.removeItem('usr_type')
    AsyncStorage.removeItem('username')
    AsyncStorage.removeItem('password')
    RNRestart.Restart();
  }

  // sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  loginCall(props) {
    console.log("From Login" ,props);
    props.popupDialog.show();
    fetch('http://139.59.56.122/App/MobileApiController/login', {
      method: 'POST',
      body: JSON.stringify({
        "username": props.state.input_uname,
        "password": props.state.input_pass
      })
    }).then(function (response) {
      console.log(response);
      return response.json();
    }).then(function (result) {
      console.log(result);
      if (!result.error) {
        let user_mobile_number = result.data.CONTACT_NO;
        let user_type_details = result.data.TYPE;
        // console.log("url:" + url);
        storeData = async () => {
          try {
            await AsyncStorage.setItem('mo_num', user_mobile_number);
            await AsyncStorage.setItem('usr_type', user_type_details);
            await AsyncStorage.setItem('username', props.state.input_uname);
            await AsyncStorage.setItem('password', props.state.input_pass);
            props.popupDialog.dismiss();
            props.props.navigation.navigate('home')
            console.log('data saved');
          } catch (error) {
            console.log('Something went wrong while saving data');
          }
        };
        console.log(user_mobile_number);
        console.log(user_type_details);
        storeData()
        if (user_mobile_number != '') {
          props.popupDialog.dismiss();
         
          console.log("User logged In");
          return result;
        }
        //console.log(result);
      } else {
        //console.log(error);
      }
    }).catch(function (error) {
      props.popupDialog.dismiss();
      alert("Invalid Credentials")
      console.log("-------- error ------- " + error);
      return error;
    });
  }
  isAvailable = async () => {
    try {
      const mobile_number = await AsyncStorage.getItem('mo_num');
      const user_type = await AsyncStorage.getItem('usr_type');
      if (mobile_number !== null && user_type != null) {
        console.log(mobile_number + ',' + user_type);
      }
    } catch (error) {
      console.log("Sorry");
    }
  };
  getDataCall = async () => {
    var url = PostUrl.url + '/GetUserData';
    const mobile_number = await AsyncStorage.getItem('mo_num');
    const user_type = await AsyncStorage.getItem('usr_type');
    console.log(mobile_number + ',' + user_type);

    let retrivedata = {};
    retrivedata.u_id = mobile_number //'8087522957'// userMobileNumber
    retrivedata.u_type = user_type//"Admin""cc"ADMIN
    console.log("url:" + url + retrivedata.u_id + retrivedata.u_type);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(
        {
          "userid": retrivedata.u_id,
          "usertype": retrivedata.u_type
        })
    }).then(function (response) {
      console.log(response);
      return response.json();
    }).then(function (result_data) {
      console.log(result_data);
      if (result_data != null) {
        console.log(result_data.data.KychData);
        console.log(result_data.data.SitesInfo);
        console.log(result_data.data.UserInfo);
      }
      //
      if (!result_data.error) {
        //console.log(result);
      } else {
        //console.log(result);
      }
    }).catch(function (error) {
      console.log("-------- error ------- ", error);
      alert("No Network")
    });
  }

  fetchData = async () => {
    var url = PostUrl.url + '/GetUserData';
    const mobile_number = await AsyncStorage.getItem('mo_num');
    const userType = await AsyncStorage.getItem('usr_type');
    if (mobile_number != null) {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(
          {
            "userid": mobile_number,
            "usertype": userType
          })
      }).then(function (response) {
        console.log(response + 'Response from fetched');
        return response.json();
      }).then(function (result_data) {
        console.log(result_data);
        if (result_data != null) {
          // console.log(result_data.data.KychData);
        }
        //
        if (!result_data.error) {
          //console.log(result);
        } else {
          //console.log(result);
        }
        props.props.navigation.navigate('home', {dashboard : result_data})
        return result_data;
      }).catch(function (error) {
        console.log("-------- error ------- ");
        alert("No Network")
      });
    }
  }
}


export let api = new ApiController()