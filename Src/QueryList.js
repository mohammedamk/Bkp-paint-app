import React, { Component } from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    Image,
    View,
    ScrollView,
    AsyncStorage, Picker,
    StatusBar,
    Dimensions,
    FlatList, BackHandler
} from 'react-native';
// import { styles } from '../Screens/styles'
import { mapping, light as lightTheme } from '@eva-design/eva';
import { styles } from './styles';
import { _blue, _red } from './Utils/Colors'
import * as Progress from 'react-native-progress';
import { PostUrl } from './Utils/config';
import Loader from './loader';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { api } from './apiController';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { DataTable } from 'react-native-paper';
import { Card, Button, Icon, Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import PopupDialog from 'react-native-popup-dialog'

const url="http://139.59.56.122/App/MobileQueryController"
export default class QueryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [111],
            kyc_drpdown:[],
            kycid:'',
            usertype:'-',
            filedetails:'',
            recepient:'',
            title:'',
            description:'',
            eventlist:[],
            isRefreshing:false
            //modalVisible:false
        }
    }

    componentWillUnmount() {
        this.backButton.remove();

    }

    async componentDidMount() {
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('home');
            return true;
        });
        this.getquerylist()
        this.getKycId()

    }

    async getquerylist(){
        console.log('inquerylist')
        const mobile_number = await AsyncStorage.getItem('mo_num');
        const retrieved = await fetch( url + '/getQueryListCustomer', {
            method: 'POST',
            body: JSON.stringify({ "USER_ID": mobile_number})
        })
        .then(function (response) {
        return response.json();
        }).then(function (result_data) {
                if (result_data != null) {
                    console.log('querylist',result_data)
                  return result_data;
                }
        })

        if(retrieved.code == 200){
            this.setState({
               eventlist: retrieved.customerquerylist
            })
        }else{
           alert('Something Went wrong') 
        }


    }

    async getKycId(){
        const mobile_number = await AsyncStorage.getItem('mo_num');

        const retrieved = await fetch( url + '/CustomerMobileKycId', {
            method: 'POST',
            body: JSON.stringify({ "CUSTOMER_ID": mobile_number})
        })
        .then(function (response) {
        return response.json();
        }).then(function (result_data) {
            //console.log('dropdown data',result_data);
                if (result_data != null) {
                  // console.log(result_data.code);
                  return result_data;
                }
        })

        this.setState({
                kyc_drpdown:retrieved.kycid,
            },()=>{
                //console.log('data',this.state.kyc_drpdown)
            })
    }

    setusertype(kyc){
        var type='';
        var data =this.state.kyc_drpdown;
        this.setState({
            kycid:kyc,
        },()=>{
            type = data.filter(function(item) {
               // console.log('items',item)
                return item.KYC_ID == kyc;
            });
            var usrtype = type[0].TYPE +' - ' +type[0].ENTERED_BY
            var rec = type[0].ENTERED_BY
            this.setState({
                usertype:usrtype,
                recepient:rec
            })
        })

    }

    async raise_query(){
        const mobile_number = await AsyncStorage.getItem('mo_num');
        const imageData = new FormData();
        imageData.append('SENDER_ID', mobile_number);
        imageData.append('RECIPIENT_ID', this.state.recepient);
        imageData.append('KYC_ID', this.state.kycid);
        imageData.append('QUERY_TITLE', this.state.title);
        imageData.append('QUERY_DESCRIPTION', this.state.description);
        imageData.append('userfile', this.state.filedetails);

        console.log(JSON.stringify(imageData))

        const retrieved = await fetch( url + '/CustomerRaiseQuery', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: imageData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("hii", responseJson);
            // console.log(this.state.mobile_number);
            return responseJson;
        })

        if(retrieved.code ==200){
            alert("Query Raised Successfully");
            //this.setState({ modalVisible: false })
            this.popupQueryDialog.dismiss()
        }
    }

    browseImage(){

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

    separator = () => {
        return (
            <View style={{ marginBottom: '3%' }}>
            </View>
        )
    }


    renderEmptyContainer(item) {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: '50%' }}>
                <Text style={{}}>No Completed Site Found</Text>
            </View>
        )
    }

    renderEmptyContainer1(item){
        return(
         <View style={{flex:1,alignItems:'center',marginTop:'50%',backgroundColor:'#ebfaff'}}>
             <Text style={{}}>No Data Found</Text>
         </View>
         )
     }

    onRefresh() {
        this.setState({ isRefreshing: true,}, async () => {
              this.getquerylist()
          this.setState({ isRefreshing: false })
        })
      }
    renderQuery(item) {
        var new_desc = item.QUERY_DESCRIPTION;
        //new_desc = desc.replace("\n", ".");
        
        return(
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('querydetails', { queryid: item.QUERY_ID })} style={{backgroundColor:'#ebfaff'}} >
            <Card containerStyle={{ borderRadius: responsiveHeight(2), elevation: 5, marginBottom: '3.5%' }} >
                <View style={styles.cardHolder}>
                    <View style={{ flexDirection: 'row', paddingVertical: '3%' }}>
                        <View style={{ flexDirection: 'column', marginRight: '4%' }}>
                            <Text style={styles.textheading}>KYC ID : </Text>
                            <Text style={styles.textheading}>Created By : </Text>
                            <Text style={styles.textheading}>Query Title : </Text>
                            <Text numberOfLines={3} style={styles.textheading}>Query Description: </Text>
                            <Text style={styles.textheading}>Query Date: </Text>
                            <Text style={styles.textheading}>Query Status: </Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginRight: '4%' }}>
                            <Text style={styles.textVal}>{item.KYC_ID} </Text>
                            <Text style={styles.textVal}>{item.SENDERNAME}</Text>
                            <Text style={styles.textVal}>{item.QUERY_TITLE} </Text>
                            <Text numberOfLines={3} style={styles.textVal}>{new_desc}</Text>
                            <Text style={styles.textVal}>{item.QUERY_DATE}</Text>
                            <Text style={styles.textVal}>{item.STATUS}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>)

    }
    render() {
        let KycItems = this.state.kyc_drpdown.map( (s, i) => {
            return <Picker.Item key={i} value={s.KYC_ID} label={s.KYC_ID} />
        });
        return (
            <ApplicationProvider
                mapping={mapping}
                theme={lightTheme}>
                <Layout style={{ backgroundColor: '#fff', flex: 1 }}>
                    <Loader component={this} />
                    <View>
                        <View style={styles.navigator_custom_menu}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}
                                // onPress={() => { Actions.drawerOpen({ data: this.state.data }); }}
                                style={styles.navigator_custom_menu_content}>
                                <Feather name='menu' size={30} color={_blue} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}>Query List</Text></View>
                            <TouchableOpacity style={styles.navigator_custom_menu_content}
                                onPress={async () => { await api.logoutCall(); }}
                            >
                                <Feather name='log-out' size={30} color={_blue} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                             <FlatList
                                data={this.state.eventlist}
                                shouldItemUpdate={(props, nextProps) => { return props.item !== nextProps.item }}
                                extraData={this.props}
                                ItemSeparatorComponent={() => this.separator()}
                                renderItem={({ item }) => (this.renderQuery(item))}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isRefreshing}
                                keyExtractor={item => item.KYC_ID}
                                ListEmptyComponent={this.renderEmptyContainer(this)}
                            />
                        </ScrollView>
                    </View>
                    <PopupDialog
                        visible={this.state.modalVisible}
                        // onDismiss={this.makeVisible()}
                        dismissOnTouchOutside={true}
                        onDismiss={() => this.setState({ modalVisible: true })}
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
                            {/* <View style={{ flexDirection: "row", margin: "auto" }}>
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
                            </View> */}
                            <View style={{ flexDirection: "row", margin: "auto" }}>
                                <Text style={{
                                    alignItems: "center",
                                    justifyContent: "center", alignSelf: "center", marginRight: '5%'
                                    , marginLeft: "3%", width: responsiveWidth(12)
                                }}>KYC ID</Text>
                                <Picker
                                    style={{ height: 50, width: responsiveWidth(30), marginLeft: responsiveWidth(2) }}
                                    selectedValue={this.state.kycid}
                                    onValueChange={(itemValue, itemIndex) => this.setusertype(itemValue)}
                                    //onValueChange={ (kyc) => (this.setusertype(kyc))}
                                >
                                <Picker.Item label="Select" value="" />
                                {KycItems}
                                </Picker>
                            </View>
                            <View style={{ flexDirection: "row", margin: "auto" , marginTop: 20 }}>
                                <Text style={{
                                    alignItems: "center",
                                    justifyContent: "center", alignSelf: "center", marginRight: '5%'
                                    , marginLeft: "3%", width: responsiveWidth(12)
                                }}>User Type </Text>

                                <Text style={{
                                    alignItems: "center",
                                    justifyContent: "center", alignSelf: "center", marginRight: '5%'
                                    , marginLeft: "3%", width: responsiveWidth(24)
                                }}>{this.state.usertype}</Text>
                                
                            </View>

                            <View style={{ flexDirection: "row", margin: "auto", marginTop: 20  }}>
                                <Text style={{
                                    alignItems: "center",
                                    justifyContent: "center", alignSelf: "center", marginRight: '5%'
                                    , marginLeft: "3%", width: responsiveWidth(12)
                                }}>Query</Text>
                                <Input multiline numberOfLines={3}
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                     onChangeText={(title) => this.setState({ title: title })}
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
                                    onChangeText={(desc) => this.setState({ description: desc })}
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
                            <Button onPress={() => this.browseImage()} buttonStyle={{ width: responsiveWidth(20), marginRight: 10 }} title="Browse" />
                            <Text style={{width: responsiveWidth(20)}} >{this.state.filedetails.name}</Text>
                        </View>
                        <Button icon={<FontAwesome5 name='telegram-plane' size={25} color={"#fff"} />}
                            buttonStyle={{ width: responsiveWidth(35), alignSelf: "center", marginTop: responsiveHeight(6) }}
                            title="  Post" onPress={() => this.raise_query()} />
                    </PopupDialog>
                    <TouchableOpacity onPress={() => this.popupQueryDialog.show()} style={styles.floaterStyle}>
                        <Feather name="plus-circle" size={25} color="#fff" />
                    </TouchableOpacity>
                </Layout>
            </ApplicationProvider>
        );
    }

    onTabSelect = (selectedIndex) => {
        this.setState({ selectedIndex });
        // console.log(selectedIndex);
    };
    separator = () => (
        <View
            style={{
                backgroundColor: '#000000',
                // marginTop: '1.2%',
                // marginBottom: '0.8%',
            }}
        />
    );
}
