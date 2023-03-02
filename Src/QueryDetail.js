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
import { styles } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { _blue } from './Utils/Colors'
import { Card, Button, Icon, Input } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import { api } from './apiController';
import { PostUrl } from './Utils/config';
import { DataTable, TextInput } from 'react-native-paper';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Loader from './loader';
import ImagePicker from 'react-native-image-crop-picker';
import PopupDialog from 'react-native-popup-dialog'

const url="http://139.59.56.122/App/MobileQueryController"

export default class QueryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username:'',
      userid:'',
      messsage:'',
      filedetails:'',
      querydetails:[],
    }
  }

  async componentDidMount() {
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('querylist')
      return true;
    });

      this.getqueryDetails()
  }

  componentWillReceiveProps(props) {
    this.props.navigation.closeDrawer()
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('querylist')
      return true;
    });
  }

  async getqueryDetails(){
    console.log(this.props.navigation.state.params.queryid)
    var id = this.props.navigation.state.params.queryid

    const retrieved = await fetch( url + '/getquery_details', {
        method: 'POST',
        body: JSON.stringify({ "queryid": id})
    })
    .then(function (response) {
    return response.json();
    }).then(function (result_data) {
      //console.log('dropdown data',result_data);
          if (result_data != null) {
            console.log('querydetails',result_data);
            return result_data;
          }
    })

    if(retrieved.code == 200){
      this.setState({
        data:retrieved.response.queryd_data,
        username:retrieved.response.queryh_data.SENDERNAME,
        userid:retrieved.response.queryh_data.SENDER_ID,
        querydetails:retrieved.response.queryh_data

      })
    }
  }

  sendfile(){

         ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            maxFiles: 1,
            mediaType: "Photo",
            // cropperCircleOverlay: true,
        }).then(responseImage => {

            var oldPath = JSON.stringify(responseImage.path);
            var newPath = oldPath.split(/[\s/]+/);

            this.setState({

                filedetails:{
                    uri: responseImage.path,
                    type: responseImage.mime,
                    name: (newPath[newPath.length - 1].replace('"', ""))
                }
            },()=>{
                console.log(this.state.filedetails)
            })
        })
  }

  async sendmessage(){
    
    var id = this.props.navigation.state.params.queryid

     const imageData = new FormData();
    imageData.append('REPLY_EXP', this.state.messsage);
    imageData.append('QUERY_ID', id);
    imageData.append('SENDER_ID', this.state.userid);
    imageData.append('userfile', this.state.filedetails);

    console.log(imageData)

    const retrieved = await fetch( url + '/responsequery', {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: imageData
    })
    .then(function (response) {
    return response.json();
    }).then(function (result_data) {
      //console.log('dropdown data',result_data);
          if (result_data != null) {
            console.log('response after send',result_data);
            return result_data;
          }
    })

     if(retrieved.code == 200){
      this.setState({
        messsage:'',
        filedetails:'',
      },()=>{
        this.getqueryDetails()
      })
    }
  }

  render() {
    const user = this.state.username
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={{height:responsiveHeight(10),backgroundColor:_blue}}>
          
          <Text style={{fontSize:responsiveFontSize(1.9),padding:'4%',color:'#fff',fontWeight:'bold',marginTop:'2%'}}>For The Issue {this.state.querydetails.QUERY_TITLE}</Text>
        </View>
        <ScrollView 
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
        }} 
        style={{flex:1,marginTop:'3%',marginBottom:'15%'}}>
         { 
          this.state.data.map(function (details) {
            const image ='http://139.59.56.122/App/adminassets/media/query_image/'+details.ATTACHMENT;
            //console.log('image url',image)
              if(details.USER_NAME != user ) {
               // console.log(details.USER_NAME)
                return(
                      <View style={{marginLeft:'1%'}}>
                        <Text style={{fontSize:responsiveFontSize(1.6),paddingLeft:'2%',fontWeight:'bold'}}>{details.USER_NAME}</Text>
                        <View style={{width:responsiveWidth(80),backgroundColor:'#e2e2e2',borderRadius:5,marginBottom:'2%',justifyContent:'flex-start',alignItems:'flex-start'}}>
                         <Text style={{fontSize:responsiveFontSize(1.9),width:responsiveWidth(75),padding:'2%'}}>{details.REPLY_EXP}</Text>
                         <Text style={{fontSize:responsiveFontSize(1.4),alignSelf:'flex-end',padding:'2%'}}>{details.REPLY_DATE}</Text>
                        </View>
                        {details.ATTACHMENT !=null && 
                          <View style={{ width:responsiveWidth(65),height:responsiveHeight(35),borderWidth:1,borderColor:'#e2e2e2',justifyContent:"center",margin:'2%',borderRadius:5}}>
                            <Image  source={{uri: image}} resizeMode="contain"  style={{width:responsiveWidth(60),height:responsiveHeight(30)}} />
                          </View>
                        }
                      </View>
                )
              }else if(details.USER_NAME === user ){
                return(
                  <View style={{marginRight:'1%'}}>
                    <Text style={{fontSize:responsiveFontSize(1.6),paddingLeft:'2%',fontWeight:'bold',alignSelf:'flex-end'}}>{details.USER_NAME}</Text>
                    <View style={{width:responsiveWidth(80),backgroundColor:_blue,borderRadius:5,marginBottom:'2%',alignSelf:'flex-end'}}>
                     <Text style={{fontSize:responsiveFontSize(1.9),width:responsiveWidth(75),padding:'2%',color:'#fff'}}>{details.REPLY_EXP}</Text>
                     <Text style={{fontSize:responsiveFontSize(1.4),alignSelf:'flex-end',padding:'2%',color:'#fff'}}>{details.REPLY_DATE}</Text>
                    </View>
                    {details.ATTACHMENT !=null && 
                      <View style={{ width:responsiveWidth(65),height:responsiveHeight(35),borderWidth:1,borderColor:'#e2e2e2',justifyContent:"center",margin:'2%',borderRadius:5,alignSelf:'flex-end'}}>
                        <Image  source={{uri: image}} resizeMode="contain"  style={{width:responsiveWidth(60),height:responsiveHeight(30)}} />
                      </View>
                    }
                 </View>
               )
              }
            })
          }
        </ScrollView>
        <View style={{ flexDirection: "row",bottom: 5,position: "absolute",flex: 1,justifyContent:"center",alignContent:"center",alignSelf:"center",display:"flex"}}>
          <TextInput
            placeholder={"Type Here"}
            underlineColorAndroid="rgba(0,0,0,0)"
            value={this.state.messsage}
            onChangeText={(msg) => this.setState({ messsage: msg })}
            style={{
              maxWidth: responsiveWidth(75),
              width: responsiveWidth(75),
              backgroundColor: "#fff",
              borderRadius: 20, borderColor: _blue, borderWidth: 1,
              borderTopEndRadius: 20, borderTopStartRadius: 20,
              height: responsiveHeight(7.5)
            }}
          />
          <TouchableOpacity style={{marginLeft:'1%',
            maxWidth: responsiveWidth(11),width: responsiveWidth(11),
          }} onPress={() => this.sendfile()}>
            <Feather style={{ marginVertical:5,}} name={'image'} color={_blue} size={35} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            maxWidth: responsiveWidth(11),width: responsiveWidth(11),
          }} onPress={() => this.sendmessage()}>
            <Feather style={{ marginVertical:5,}} name={'send'} color={_blue} size={35} />
          </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: "row", bottom: 0, position: "absolute", flex: 1 }}>
          <Input
            multiline
            placeholder={"Type here"}
            inputContainerStyle={{
              maxWidth: responsiveWidth(85),
              marginBottom: 8,
              borderRadius: 20, borderColor: _blue, borderWidth: 1
            }}
          />
          <Feather name={'send'} color={"#000"} size={20} />

          <TouchableOpacity style={{ backgroundColor: _blue }} onPress={() => alert("hhh")}>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}