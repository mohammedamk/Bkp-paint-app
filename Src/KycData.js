import React from 'react';
import { ActivityIndicator, BackHandler, StatusBar, ScrollView, Image, TouchableOpacity, View, Text, FlatList, TouchableHighlight } from 'react-native'
import { _blue } from './Utils/Colors'
import {
    ApplicationProvider,
    Layout
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { styles } from './styles';
import { Card } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { FloatingAction } from "react-native-floating-action";
import Feather from 'react-native-vector-icons/Feather';
import { DataTable } from 'react-native-paper';


export default class KycData extends React.Component {
    constructor(props) {
        super(props);
        // console.log(JSON.stringify(this.props) + "Props in KycData");
        this.state = {
            isLoading: false,
            isLoggedIn: true,
            details: this.props.navigation.state.params.details,
        }
        // console.log("Props", this.props.navigation.state.params);
    }
    componentWillUnmount() {
        this.backButton.remove();
    }
    componentDidMount() {
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('consultationreport')
            return true;
        });
    }

    render() {
        return (
            <ApplicationProvider
                mapping={mapping}
                theme={lightTheme}>
                <Layout style={{ backgroundColor: '#f2f2f2', flex: 1 }}>

                    <View style={styles.navigator_custom_menu}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                            // onPress={() => { Actions.drawerOpen({ data: this.state.data }); }}
                            style={styles.navigator_custom_menu_content}>
                            <Feather name='menu' size={30} color={_blue} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}>Consultation Details</Text></View>
                        <TouchableOpacity style={styles.navigator_custom_menu_content}
                            onPress={() => { alert("Logged out"); api.logoutCall(); }}>
                            <Feather name='log-out' size={30} color={_blue} />
                        </TouchableOpacity>
                    </View>
                    <StatusBar transluent={true} />
                    <ScrollView>
                        <View style={{ flex: 1, backgroundColor: '#f2f2f2', margin: 20 }}>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ width: responsiveWidth(35) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>Customer Name</Text>
                                </View>
                                <View style={{ width: responsiveWidth(5) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>:</Text>
                                </View>
                                <View>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontFamily: 'Montserrat-Bold' }}>{this.state.details.CUSTOMER_NAME}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ width: responsiveWidth(35) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>Architect Name</Text>
                                </View>
                                <View style={{ width: responsiveWidth(5) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>:</Text>
                                </View>
                                <View>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontFamily: 'Montserrat-Bold' }}>{this.state.details.ARCHITECH_NAME}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ width: responsiveWidth(35) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>Contractor Name</Text>
                                </View>
                                <View style={{ width: responsiveWidth(5) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>:</Text>
                                </View>
                                <View>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontFamily: 'Montserrat-Bold' }}>{this.state.details.CONTRACTOR_NAME}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ width: responsiveWidth(35) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>Kyc Date</Text>
                                </View>
                                <View style={{ width: responsiveWidth(5) }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>:</Text>
                                </View>
                                <View>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontFamily: 'Montserrat-Bold' }}>{this.state.details.KYC_DATE}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 30,
                             borderBottomWidth: 2, borderColor: 'grey', width: responsiveWidth(50) }}>
                                <Text style={{ fontSize: responsiveFontSize(2.5) }}>Consultation Details</Text>
                            </View>
                            <ScrollView horizontal={true} style={{ marginHorizontal: "2.4%" }}>
                                <DataTable style={{ marginTop: 20, borderWidth: 2, borderColor: 'black' }}>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ padding: 5, width: 75 }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Type</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 100 }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>SubType</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 150 }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Category</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 300 }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Item Name</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 200 }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Item Desc</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 150 }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Narration</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 40 }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Qty</Text></DataTable.Title>
                                    </DataTable.Header>
                                    {this.state.details.DETAILS.Consultation.map(function (consultation) {
                                        // console.log(consultation,"text")
                                        return (
                                            <DataTable.Row>
                                                <DataTable.Cell style={{ padding: 5, width: 75 }}>{consultation.type_name}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 100 }}>{consultation.subtype_name}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 150 }}>{consultation.CATEGORYNAME}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 300 }}>{consultation.ITEMNAME}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 200 }}>{consultation.ITEMDESC}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 150 }}>{consultation.NARRATION}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 30 }}>{consultation.QTY}</DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    })}


                                </DataTable>
                            </ScrollView>

                            <View style={{ flexDirection: 'row', display: "none", marginTop: 30, 
                            borderBottomWidth: 2, borderColor: 'grey', width: responsiveWidth(50) }}>
                                <Text style={{ fontSize: responsiveFontSize(2.5) }}>Transaction Details</Text>
                            </View>
                            <ScrollView horizontal={true} style={{ width: responsiveWidth(90), display: "none" }}>
                                <DataTable style={{ marginTop: 20, borderWidth: 2, borderColor: 'black' }}>
                                    <DataTable.Header style={{}}>
                                        <DataTable.Title style={{ padding: 5, width: 120, borderColor: 'black' }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Date</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 180, borderColor: 'black' }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Narration/Particular</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 100, borderColor: 'black' }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Voucher ID</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 130, borderColor: 'black' }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Voucher Type</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 150, borderColor: 'black' }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Voucher Number</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 50, borderColor: 'black' }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Debit</Text></DataTable.Title>
                                        <DataTable.Title style={{ padding: 5, width: 50, borderColor: 'black' }}><Text style={{ fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>Credit</Text></DataTable.Title>

                                    </DataTable.Header>
                                    {this.state.details.DETAILS.Transaction.map(function (transaction) {
                                        // console.log(consultation,"text")
                                        return (
                                            <DataTable.Row style={{ borderWidth: 2, borderColor: 'black' }}>
                                                <DataTable.Cell style={{ padding: 5, width: 120, borderColor: 'black' }}>{transaction.DATE}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 180, borderColor: 'black' }}>{transaction.NARRATION}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 100, borderColor: 'black' }}>{transaction.VOUCHERID}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 130, borderColor: 'black' }}>{transaction.VOUCHERTYPE}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 150, borderColor: 'black' }}>{transaction.VOUCHERNUMBER}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 50, borderColor: 'black' }}>{transaction.DEBIT}</DataTable.Cell>
                                                <DataTable.Cell style={{ padding: 5, width: 50, borderColor: 'black' }}>{transaction.CREDIT}</DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    })
                                    }
                                </DataTable>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </Layout>
            </ApplicationProvider>
        );
    }

}