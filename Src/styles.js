import React from 'react';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { StyleSheet, Dimensions } from 'react-native';
import { _blue, _red } from './Utils/Colors'
import { _fixedBoldFont, _fixedLightFont } from './Utils/fonts';


const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  layout_style: {
    flex: 1,
    flexDirection: 'column'
  },
  detailTextSeparator: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  layoutscreen: {
    backgroundColor: '#fff',
    flex: 1
  },
  detailshead:
  {
    marginTop: "2%",
    textAlign: "center",
    fontSize: responsiveFontSize(2)
  },
  textheading: {
    fontFamily: _fixedBoldFont,
    // letterSpacing: 1,
    color: _blue,
    marginVertical: '0.9%',
    //fontWeight:'bold',
    fontSize: responsiveFontSize(1.6),
  },
  textheading1: {
    fontFamily: 'CeraPro-Medium',
    // letterSpacing: 1,
    color: _blue,
    marginVertical: '0.9%',
    //fontWeight:'bold',
    fontSize: responsiveFontSize(1.9),
  },
  textdata: {
    fontFamily: _fixedLightFont,
    // letterSpacing: 1,
    marginVertical: '0.5%',
    //color:'#ee201e',//red
    color: '#000',
    fontSize: responsiveFontSize(1.65)
  },
  textdata1: {
    fontFamily: _fixedLightFont,
    // letterSpacing: 1,
    marginVertical: '0.5%',
    //color:'#ee201e',//red
    color: '#000',
    fontSize: responsiveFontSize(1.65)
  },
  imagewrapper: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 60,
  },
  boldtext: {
    fontFamily: _fixedLightFont,
    // letterSpacing: 0.5,
    //fontWeight:'bold',
    color: '#333333',
    fontSize: responsiveFontSize(1.8)
  },
  smalltext: {
    fontFamily: _fixedLightFont,
    // letterSpacing: 1,
    fontSize: responsiveFontSize(1.5)
  },
  activityindicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: (Dimensions.get('window').height / 2)
  },
  LoginLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '15%',
    width: '100%',
    height: '20%'
  },
  tabView: {
    bottom: 0,
    backgroundColor: '#ffffff'
  },
  tabBar: {
    // backgroundColor: _blue
  },
  tabViewIndicator: {
    backgroundColor: '#000'
  },
  bottomNavigation: {
    backgroundColor: 'white',
    bottom: 0,
    position: "absolute"
  },
  indicator: {
    backgroundColor: 'black'
  },
  sidepanel_content_img: {
    //borderRadius: 100,
    //resizeMode: 'contain',
    //alignSelf: 'flex-start',
    // marginTop: '5%',
    // alignSelf:'baseline',
    // width: '40%',
    // height: '70%',
    resizeMode: 'cover',
    height: 70,
    width: 70,
    borderRadius: 35
  },
  input_fields: {
    //width:('100%'),
    // textAlign: 'left',
    // alignContent: 'center',
    color: '#000000',
    // borderWidth: 0.8,
    // borderRadius: responsiveWidth(5),
    marginHorizontal: '5%',
    backgroundColor: '#fff'
  },
  touch_button: {
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#000',
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  loader: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: (deviceHeight * 40) / 100,
  },
  sidepanel_content_text: {
    marginHorizontal: (deviceHeight * 1.2) / 100,
    fontSize: responsiveFontSize(1.9),
    alignSelf: 'flex-start',
    color:'#000',
    // letterSpacing: 1,
    fontFamily: _fixedLightFont,
    // paddingVertical: (deviceHeight * 2) / 100
  },
  welcome_string: {
    textAlign: 'center',
    marginVertical: 20,
    padding: 10,
    fontFamily: _fixedLightFont,
    fontSize: 20,
    lineHeight: 29,
    color: '#4e4f56',
    letterSpacing: 2
  },
  sidepanel_content_wrapper: {
    marginHorizontal: (Dimensions.get('screen').height * 1.2) / 100,
    alignSelf: 'flex-start',
    // letterSpacing: 1,
    flexDirection: "row",
    paddingVertical: (Dimensions.get('screen').height * 2) / 100
  },
  navigator_custom_menu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff'

    // flexWrap: 'wrap'
  },
  navigator_custom_menu_content: {
   width: 40,
   height: 40,
   margin: 8
  },
  nav_menu_images: {
    width: 35,
    height: 35,
    padding: 20,
    resizeMode: 'contain'
  },
  list_item_renderer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userInfo_page_data_container: {
    flexDirection: 'column',
    marginHorizontal: '4%',
  },
  userinfo_profile_text: {
    color: '#0b1629',
    fontSize: responsiveFontSize(3),
    alignSelf: 'center',
    alignContent: 'center'
  },
  userinfo_profile_image: {
    /*padding:10,*/
    // alignItems:'center',
    resizeMode: 'cover',
    height: 70,
    width: 70,
    borderRadius: 35
  },
  text_content_container: {
    flexDirection: 'row',
    alignContent: 'space-between',
    backgroundColor: '#c8ede6', //InnerColor
    borderColor: '#92e8d8',
    borderWidth: 1,
    borderRadius: 5,
    padding: '1%',
    marginBottom: '2%',
    paddingHorizontal: '2%',
  },
  userinfo_default_text_container: {
    paddingVertical: '5%',
    marginVertical: '1%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  userinfo_default_text: {
    fontSize: responsiveFontSize(2),
    fontFamily: _fixedLightFont,
    fontWeight: 'bold',
    // letterSpacing: 1,
    color: _blue,
  },
  userinfo_text_data: {
    fontFamily: _fixedLightFont,
    // letterSpacing: 1,
    fontSize: responsiveFontSize(2),
  },
  userinfo_userid: {
    fontSize: responsiveFontSize(2),
    fontFamily: _fixedLightFont,
    // letterSpacing: 1,
    color: '#fff'
  },
  userinfo_mainname: {
    fontSize: responsiveFontSize(3),
    // letterSpacing: 1,
    fontFamily: _fixedLightFont,
    color: '#fff',
    //fontWeight: 'bold',
  },
  csr_item_card: {
    borderRadius: 5,
    borderWidth: 0.6,
    marginHorizontal: '2%',
    padding: '2%',
  },
  separator: {
    height: '0.16%',
    backgroundColor: '#e3e3e3'
  },
   separatornav: {
    height: '0.16%',
    //backgroundColor: '#e3e3e3'
  },
  separator2: {
    height: '0.5%',
    backgroundColor: '#000'
  },
  cardBottom: {
    //alignItems: 'baseline',
    paddingVertical: '2%',
    //paddingHorizontal: '2%'
  },
  cardCenter: {
    //paddingHorizontal: '5%',
    paddingVertical: '5%'
  },
  cardTop: {
    justifyContent: 'space-between',
    paddingVertical: '2%',
    //paddingHorizontal: '2%',f6cc00
    flexDirection: 'row'
  },
  cardHolder: {
    // paddingHorizontal: '5%',
    // borderRadius: 20
    //backgroundColor:'#b1e5f9'
    //backgroundColor:'#004aab' //darkest blue
    //backgroundColor:'#006eff'
  },
  topcard: {
    fontFamily: 'CeraPro-Medium',
    color: _blue,
    marginVertical: '0.5%',
    fontSize: responsiveFontSize(1.6), marginRight: '20%',
  },
  bottomcard: {
    fontFamily: 'CeraPro-Medium',
    // letterSpacing: 1,
    color: _blue,
    marginVertical: '0.9%',//fontWeight: 'bold',
    fontSize: responsiveFontSize(1.6), marginRight: '3.8%',
  },
  home_card: {
    // backgroundColor:_blue,
    width: '44%',
  },
  textVal: {
    fontFamily: _fixedBoldFont,
    // letterSpacing: 1,
    color: '#000',
    marginVertical: '0.9%',
    //fontWeight:'bold',
    fontSize: responsiveFontSize(1.6),
  },
  textVal1: {
    fontFamily: _fixedBoldFont,
    // letterSpacing: 1,
    color: '#000',
    marginVertical: '0.9%',
    marginTop:'1%',
    //fontWeight:'bold',
    fontSize: responsiveFontSize(1.6),
  },
  floaterStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: _blue,
    borderRadius: 30
  }

})

export { styles }