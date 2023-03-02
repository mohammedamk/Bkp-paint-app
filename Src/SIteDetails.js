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
import { DataTable } from 'react-native-paper';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Loader from './loader';
import ImagePicker from 'react-native-image-crop-picker';
import PopupDialog from 'react-native-popup-dialog'

export default class SiteDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      customerData: {},
      tableData: [],
      QuotationData: [],
      modalVisible: true,
      sub_details: '',
      imagesArray: [],
      usertype: 'Select'
    }
  }

  renderCards(item) {
    // console.log(item);
    if (item.count === 0) {
      return;
    }
    else
      return (
        <View style={{ width: responsiveWidth(50) }}>
          <Card
            titleNumberOfLines={1}
            title={item.name}
          >
            {
              (item.count === 0) ?
                <Button
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                  titleStyle={{ fontFamily: '' }}
                  title={"0"}
                  onPress={() => {
                    this.navigateTo(item)
                  }} />
                :
                <Button
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                  titleStyle={{ fontFamily: '' }}
                  title={item.count} onPress={() => {
                    this.navigateTo(item)
                  }} />}
          </Card>
        </View>)
  }

  async getsiteDetails() {
    this.popupDialog.show();
    var url = PostUrl.url + '/getSiteInfo';
    try {
      const retrieved = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(
          {
            "kycid": this.props.navigation.state.params.item.KYC_ID
          })
      }).then(function (response) {
        return response.json();
      }).then(function (result_data) {
        // console.log(result_data.title);
        if (result_data != null) {
          // console.log(result_data.code);
          return result_data;
        }
      })
      this.setState({
        data: retrieved,
        customerData: retrieved.customer,
        QuotationData: retrieved.kych_data,
        tableData: retrieved.kycd_data,
        imagesArray: retrieved.SiteImages
      });
      console.log(retrieved);
      // console.log(this.state.customerData);
      this.popupDialog.dismiss();
    } catch (err) {
      console.log('Error fetching data-----------', err);
    }
  }

  componentDidMount() {
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('siteinfo')
      return true;
    });
    setTimeout(() => {
      this.getsiteDetails();
    }, 200);
  }

  componentWillReceiveProps(props) {
    this.props.navigation.closeDrawer()
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('siteinfo')
      return true;
    });
  }

  componentWillUnmount() {
    this.backButton.remove();
  }

  makeVisible() {
    return this.setState({ modalVisible: true })
  }

  openImagePicker() {
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
      console.log(
        // "URI", responseImage.data,
        // "type", `${'\n', responseImage.type}`,
        "FileName", (newPath[newPath.length - 1].replace('"', "")) ,
        // "Complete", responseImage
      )
      return responseImage;
    })
  }

  openGallery = async () => {
    const userid = await AsyncStorage.getItem('mo_num');
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      includeBase64: true,
      maxFiles: 1,
      mediaType: "Photo",
      // cropperCircleOverlay: true,
    }).then(responseImage => {
      var oldPath = JSON.stringify(responseImage.path);
      var newPath = oldPath.split(/[\s/]+/);
      console.log(
        // "URI", responseImage.data,
        // "type", `${'\n', responseImage.type}`,
        "FileName", (newPath[newPath.length - 1].replace('"', "")) ,
        // "Complete", responseImage
      );
      const imageData = new FormData();
      imageData.append('fileType', 'site_image');
      imageData.append('kycId', this.props.navigation.state.params.item.KYC_ID);
      imageData.append('userId', userid);
      imageData.append('file', {
        uri: responseImage.path,
        type: responseImage.mime,
        name: (newPath[newPath.length - 1].replace('"', ""))
      });
      imageData.append('site_description', this.state.sub_details)
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
          // console.log(userid);
          this.getsiteDetails();
          this.popupImageDialog.dismiss()
          return responseJson;
        }).catch((error) => {
          // console.error(error);
        });
    });
  }


  renderImages(item) {
    if (item.IMAGE_URL === 'null' || item.IMAGE_URL === '') {
      return null;
    }
    else
      // console.log("http://139.59.56.122" + item.IMAGE_URL)
      var newImageUrl = 'http://139.59.56.122' + item.IMAGE_URL;
    return (
      <TouchableOpacity
        onPress={() => [this.props.navigation.navigate('viewimages', item), console.log("Images")]}
        style={{
          height: responsiveHeight(10), width: responsiveWidth(25),
          marginHorizontal: responsiveWidth(3), borderWidth: 0.3
        }}
      >
        <Image
          resizeMode="contain"
          style={{ resizeMode: "contain", flex: 1 }}
          source={{ uri: newImageUrl }}
        />
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Loader component={this} />
          <View style={styles.navigator_custom_menu}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
              // onPress={() => { Actions.drawerOpen({ data: this.state.data }); }}
              style={styles.navigator_custom_menu_content}>
              <Feather name='menu' size={30} color={_blue} />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}>Site Details</Text></View>
            <TouchableOpacity style={styles.navigator_custom_menu_content}
              onPress={async () => { await api.logoutCall(); }}
            >
              <Feather name='log-out' size={30} color={_blue} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{backgroundColor: '#fff'}}>
          <StatusBar transluent={true} />
          <View style={{ backgroundColor: '#fff', height: responsiveHeight(98), marginHorizontal:"5%"}}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style=
                  {styles.detailshead}>
                  Customer Details
                  </Text>
                <View style={styles.detailTextSeparator}>
                  <Text>Name :</Text>
                  <Text>{this.state.customerData.USER_NAME}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Number :</Text>
                  <Text>{this.state.customerData.USER_ID}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>E-mail :</Text>
                  <Text>{this.state.customerData.EMAIL_ID}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Entered By :</Text>
                  <Text>{this.state.customerData.ENTERED_BY}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Entry Date :</Text>
                  <Text>{this.state.customerData.ENTRY_DATE}</Text>
                </View>
                <Text style={styles.detailshead}>Site Details</Text>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Customer ID :</Text>
                  <Text>{this.state.QuotationData.CUSTOMER_ID}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Customer Name :</Text>
                  <Text>{this.state.QuotationData.CUSTOMER_NAME}</Text>
                </View>

                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Architech ID :</Text>
                  <Text>{this.state.QuotationData.ARCHITECH_ID}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Architech Name :</Text>
                  <Text>{this.state.QuotationData.ARCHITECH_NAME}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Contractor ID :</Text>
                  <Text>{this.state.QuotationData.CONTRACTOR_ID}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Contractor Name :</Text>
                  <Text>{this.state.QuotationData.CONTRACTOR_NAME}</Text>
                </View>
                {this.separator()}
                <View style={styles.detailTextSeparator}>
                  <Text>Entered By :</Text>
                  <Text>{this.state.QuotationData.entered_by}</Text>
                </View>
                <Text style={styles.detailshead}>Quotation Details</Text>
              </View>
              {/* <View style={{ height: responsiveHeight(20) }}> */}
              <ScrollView horizontal={true} style={{ marginHorizontal: "2.4%" }}>
                <DataTable style={{ marginTop: 20, borderWidth: 2, borderColor: 'black' }}>
                  <DataTable.Header>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(20) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Type</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>SubType</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Room</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Length</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Width</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Height</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Blank Space</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Total Sq.Ft</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Rate</Text></DataTable.Title>
                    <DataTable.Title style={{ padding: 5, width: responsiveWidth(25) }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Total</Text></DataTable.Title>
                  </DataTable.Header>
                  {this.state.tableData.map(function (siteinfo) {
                    // console.log(siteinfo, "text")
                    return (
                      <DataTable.Row>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(20) }}>{siteinfo.type_name}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.subtype_name}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.ROOM}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.LENGTH}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.WIDTH}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.HEIGHT}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.QTY}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.TOTSQRFEET}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.RATE}</DataTable.Cell>
                        <DataTable.Cell style={{ padding: 5, width: responsiveWidth(25) }}>{siteinfo.AMOUNT}</DataTable.Cell>
                      </DataTable.Row>
                    )
                  })}
                </DataTable>
              </ScrollView>
              {/* </View> */}
              {/* {console.log(this.state.imagesArray)} */}
              <FlatList
                scrollEnabled
                horizontal={true}
                style={{}}
                data={this.state.imagesArray}
                contentContainerStyle={{ marginTop: 10 }}
                showsVerticalScrollIndicator={false}
                // numColumns={3}
                renderItem={({ item }) => (this.renderImages(item))}
                keyExtractor={item => item.IMAGE_URL}
              />

          </View>
        </ScrollView>
        {(this.props.navigation.state.params.item.APPROVE_STATUS === "1") ?
          <FloatingAction
            actions={actions}
            color={_blue}
            ref={(Floater) => { this.Floater = Floater; }}
            visible={this.state.modalVisible}
            // floatingIcon={<Feather name='image' size={25} color={"#fff"} />}
            onPressItem={(name) => {
              switch (name) {
                case 'bt_upload_image':
                  console.log("Image Upload");
                  this.popupImageDialog.show(() => this.setState({ modalVisible: false }));
                  // this.setState({ modalVisible: false });
                  break;
                case 'bt_raise_query':
                  console.log("Raise Query")
                  this.popupQueryDialog.show(() => this.setState({ modalVisible: false }));
                  // this.setState({ modalVisible: false });
                  break;
                default:
                  break;
              }
            }
            }
          />
          : null
        }
        <PopupDialog
          onDismissed={() => {this.setState({ modalVisible: true }); console.log('test');
          }}
          dismissOnTouchOutside={true}
          dismissOnHardwareBackPress={false}
          overlayOpacity={0.9}
          overlayBackgroundColor="#A9A9A9"
          width={responsiveWidth(90)}
          containerStyle={{ left: 0, right: 0, marginBottom: 10 }}
          dialogStyle={{ left: 5, right: 5 }}
          height={responsiveHeight(70)}
          ref={(popupImageDialog) => { this.popupImageDialog = popupImageDialog; }}
        >
          <View style={{}}>
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity style={{
                position: 'absolute',
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                right: 10,
                // zIndex: 9,
                borderRadius: 25
              }}
                onPress={() => this.popupImageDialog.dismiss()}>
                <Feather name='x' size={25} color={"#000"} />
              </TouchableOpacity>
              <Card title="Write a reference for a Photo" containerStyle={{ top: 45 }}>
                <Input
                  placeholder="Write here about Site"
                  multiline
                  onChangeText={(inputData) => this.setState({ sub_details: inputData })}
                ></Input>
                <Button onPress={() => this.openGallery()} style={{ position: "relative", marginTop: 200, float: "left", clear: "both" }} title="Upload Image" />
              </Card>
            </View>
          </View>
        </PopupDialog>
        <PopupDialog
          // onDismiss={this.makeVisible()}
          dismissOnTouchOutside={true}
          onDismissed={() => {this.setState({ modalVisible: true }); console.log('test2');
          }}
          dismissOnHardwareBackPress={false}
          overlayOpacity={0.9}
          overlayBackgroundColor="#A9A9A9"
          width={responsiveWidth(90)}
          containerStyle={{ left: 0, right: 0, marginBottom: 10, alignContent: "center" }}
          dialogStyle={{ left: 5, right: 5 }}
          height={responsiveHeight(70)}
          ref={(popupQueryDialog) => { this.popupQueryDialog = popupQueryDialog; }}
        >
          <Text style={{
            textAlign: "center", alignSelf: "center", fontSize: responsiveFontSize(2), marginTop: "4%"
          }}>
            Raise Query
                </Text>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", margin: "auto" }}>
              <Text numberOfLines={1} style={{
                alignItems: "center",
                justifyContent: "center", alignSelf: "center", marginRight: '5%'
                , marginLeft: "3%", width: responsiveWidth(12)
              }}>User Type</Text>
              <Picker
                style={{
                  height: 50, width: responsiveWidth(30),
                  marginLeft: responsiveWidth(2)
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ usertype: itemValue })
                }>
                <Picker.Item label="Select" value="Select" />
                <Picker.Item label="CC" value="CC" />
                <Picker.Item label="CCA" value="CCA" />
              </Picker>
            </View>
            <View style={{ flexDirection: "row", margin: "auto" }}>
              <Text style={{
                alignItems: "center",
                justifyContent: "center", alignSelf: "center", marginRight: '5%'
                , marginLeft: "3%", width: responsiveWidth(12)
              }}>{this.state.usertype}</Text>
              <Picker
                style={{ height: 50, width: responsiveWidth(30), marginLeft: responsiveWidth(2) }}
              // onValueChange={(itemValue, itemIndex) =>
              //   this.setState({ usertype: itemValue })}
              >
                <Picker.Item label="Select" value="CC" />
                <Picker.Item label="Name 1" value="CC" />
                <Picker.Item label="Name 2" value="CCA" />
              </Picker>
            </View>
            <View style={{ flexDirection: "row", margin: "auto" }}>
              <Text style={{
                alignItems: "center",
                justifyContent: "center", alignSelf: "center", marginRight: '5%'
                , marginLeft: "3%", width: responsiveWidth(12)
              }}>KYC ID</Text>
              <Picker
                style={{ height: 50, width: responsiveWidth(30), marginLeft: responsiveWidth(2) }}
              // onValueChange={(itemValue, itemIndex) =>
              //   this.setState({ usertype: itemValue })}
              >
                <Picker.Item label="Select" value="CC" />
                <Picker.Item label="1231231" value="CC" />
                <Picker.Item label="8498492" value="CCA" />
              </Picker>
            </View>
            <View style={{ flexDirection: "row", margin: "auto" }}>
              <Text style={{
                alignItems: "center",
                justifyContent: "center", alignSelf: "center", marginRight: '5%'
                , marginLeft: "3%", width: responsiveWidth(12)
              }}>Query</Text>
              <Input multiline numberOfLines={3}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={{
                  height: 40, width: responsiveWidth(45), borderWidth: 1, borderColor: _blue
                }} />
            </View>
            <View style={{ flexDirection: "row", margin: "auto", marginTop: 20 }}>
              <Text style={{
                alignItems: "center",
                justifyContent: "center", alignSelf: "center", marginRight: '5%'
                , marginLeft: "3%", width: responsiveWidth(12)
              }}>Description</Text>
              <Input multiline numberOfLines={3}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={{
                  height: 80, width: responsiveWidth(45), borderWidth: 1, borderColor: _blue
                }} />
            </View>
          </View>
          <View style={{
            flexDirection: "row", justifyContent: 'center',
            alignItems: 'center', alignContent: "center",
            marginLeft: responsiveWidth(2), marginTop: responsiveHeight(2)
          }}>
            <Button buttonStyle={{ width: responsiveWidth(20), marginRight: 10 }} title="Browse" />
            <Text>No File Selected</Text>
          </View>
          <Button icon={<FontAwesome5 name='telegram-plane' size={25} color={"#fff"} />}
            buttonStyle={{ width: responsiveWidth(35), alignSelf: "center", marginTop: responsiveHeight(6) }}
            title="  Post" />
        </PopupDialog>
      </View>
    );
  }
  separator = () => {
    return (
      <View
        style={{
          backgroundColor: '#000000',
          marginTop: '1%',
          marginBottom: '0.8%',
        }}
      />
    );
  }
}
const actions = [
  {
    text: "Upload Image",
    icon: require("./Images/upload.png"),
    name: "bt_upload_image",
    position: 1,
    color: _blue
  },
  {
    text: "Raise Query",
    icon: require("./Images/questionMark.png"),
    name: "bt_raise_query",
    position: 2,
    color: _blue
  }
];