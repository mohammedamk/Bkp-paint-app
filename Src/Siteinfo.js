import React, { Component } from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    Image,
    View,
    ScrollView,
    AsyncStorage,
    StatusBar,
    Dimensions,
    FlatList, BackHandler
} from 'react-native';
// import { styles } from '../Screens/styles'
import {
    ApplicationProvider,
    Layout,
    TabView,
    Tab,
    BottomNavigation,
    BottomNavigationTab
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { styles } from './styles';
import { _blue, _red } from './Utils/Colors'
import * as Progress from 'react-native-progress';
import { PostUrl } from './Utils/config';
import Loader from './loader';
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { api } from './apiController';


/**
 *   
 * var date = new Date().getDate();
    this.setState({ date: date });
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp()
      return true;
    });
  }
  componentWillUnmount() {
    this.backButton.remove();
  }
 * 
 */

const CompletedIcon = (style) => (
    <Image
        style={style}
        source={require('./Images/completed.png')}
    />
);
const RunningIcon = (style) => (
    <Image
        style={style}
        source={require('./Images/running.png')}
    />
);

export default class Siteinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            selectedIndex: 0,
            Running: [],
            Completed: [],
            isRefreshing: false,
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

        this.getsiteinfo();
    }

    async getsiteinfo() {
        this.popupDialog.show();
        var url = PostUrl.url + '/getSitesInfo';
        const mobile_number = await AsyncStorage.getItem('mo_num');
        const userType = await AsyncStorage.getItem('usr_type');
        var data = this.state;
        try {
            const retrieved = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "userid": mobile_number,
                        "usertype": userType,

                    })
            }).then(function (response) {
                return response.json();
            }).then(function (result_data) {
                // console.log(result_data.message);
                if (result_data != null) {
                    console.log(result_data.SitesInfo);
                    return result_data;
                }
            })
            this.popupDialog.dismiss();
            this.setState({ Running: retrieved.SitesInfo.Running, Completed: retrieved.SitesInfo.Completed });
        } catch (err) {
            console.log('Error fetching data-----------', err);
        }
    }

    onRefresh() {
        this.setState({ isRefreshing: true }, async () => {
            this.getsiteinfo()
            this.setState({ isRefreshing: false })
        })
    }

    renderSiteinfo(item) {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('sitedetails', { item: item })}>
                <Card containerStyle={{
                    borderRadius: responsiveHeight(2), elevation: 5,
                    flex:3
                    , marginBottom: '3.5%'
                }} >
                    <View style={styles.cardHolder}>
                        <View style={styles.cardTop}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.topcard}>
                                    KYC ID: </Text>
                                <Text style={styles.textdata1}>{item.KYC_ID}</Text>
                            </View>
                        </View>
                        <View style={styles.separator2}></View>
                        {item.CustomerData && <View style={{ flexDirection: 'row', paddingVertical: '3%' }}>
                            <View style={{ flexDirection: 'column', marginRight: '4%' }}>
                                <Text style={styles.textheading1}>Customer ID: </Text>
                                <Text style={styles.textheading1}>Customer Name: </Text>
                                <Text style={styles.textheading1}>Customer Mobile: </Text>
                                <Text style={styles.textheading1}>Customer Email: </Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.textdata1}>{item.CustomerData.USER_ID}</Text>
                                <Text style={styles.textdata1}>{item.CustomerData.USER_NAME}</Text>
                                <Text style={styles.textdata1}>{item.CustomerData.CONTACT_NO}</Text>
                                <Text style={styles.textdata1}>{item.CustomerData.EMAIL_ID}</Text>
                            </View>
                        </View>}
                        {item.CustomerData && <View style={styles.separator2}></View>}
                        {item.ContactorDataData && <View style={{ flexDirection: 'row', paddingVertical: '3%' }}>
                            <View style={{ flexDirection: 'column', marginRight: '4%' }}>
                                <Text style={styles.textheading1}>Contactor ID: </Text>
                                <Text style={styles.textheading1}>Contactor Name: </Text>
                                <Text style={styles.textheading1}>Contactor Mobile: </Text>
                                <Text style={styles.textheading1}>Contactor Email: </Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.textdata1}>{item.ContactorDataData.USER_ID}</Text>
                                <Text style={styles.textdata1}>{item.ContactorDataData.USER_NAME}</Text>
                                <Text style={styles.textdata1}>{item.ContactorDataData.CONTACT_NO}</Text>
                                <Text style={styles.textdata1}>{item.ContactorDataData.EMAIL_ID}</Text>
                            </View>
                        </View>}
                        {item.ContactorDataData && <View style={styles.separator2}></View>}
                        {item.ArchiTechData && <View style={{ flexDirection: 'row', paddingVertical: '3%' }}>
                            <View style={{ flexDirection: 'column', marginRight: '4%' }}>
                                <Text style={styles.textheading1}>Architect ID: </Text>
                                <Text style={styles.textheading1}>Architect Name: </Text>
                                <Text style={styles.textheading1}>Architect Mobile: </Text>
                                <Text style={styles.textheading1}>Architect Email: </Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.textdata1}>{item.ArchiTechData.USER_ID}</Text>
                                <Text style={styles.textdata1}>{item.ArchiTechData.USER_NAME}</Text>
                                <Text style={styles.textdata1}>{item.ArchiTechData.CONTACT_NO}</Text>
                                <Text style={styles.textdata1}>{item.ArchiTechData.EMAIL_ID}</Text>
                            </View>
                        </View>}
                        {item.ArchiTechData && <View style={styles.separator2}></View>}
                        <View style={styles.cardBottom}>
                            <View style={{ flexDirection: 'row', paddingVertical: '0.5%' }}>
                                <Text style={styles.bottomcard}>Adjustment Amount: </Text>
                                <Text style={styles.textdata1}>{item.ADJUSTMENT_AMOUNT}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }

    separator = () => {
        return (
            <View style={{ marginBottom: '3%' }}>
            </View>
        )
    }

    _keyExtractor(item, index) {
        return item.id
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
         <View style={{flex:1,alignItems:'center',marginTop:'50%'}}>
             <Text style={{}}>No Running Site Found</Text>
         </View>
         )
     }

    render() {
        return (
            <ApplicationProvider
                mapping={mapping}
                theme={lightTheme}>
                <Layout style={{ backgroundColor: '#fff', flex: 1 }}>
                    <Loader component={this} />
                    <View style={styles.navigator_custom_menu}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                            // onPress={() => { Actions.drawerOpen({ data: this.state.data }); }}
                            style={styles.navigator_custom_menu_content}>
                            <Feather name='menu' size={30} color={_blue} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center' }}>
                            {
                                this.state.selectedIndex ?
                                    <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}>
                                        Completed Sites
                                    </Text>:
                                    <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2) }}>
                                        Running Sites
                                    </Text>
                                    
                            }
                        </View>
                        <TouchableOpacity style={styles.navigator_custom_menu_content}
                            onPress={() => { alert("Logged out"); api.logoutCall(); this.props.navigation.navigate('login'); }}>
                            <Feather name='log-out' size={30} color={_blue} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <StatusBar />
                        {this.state.selectedIndex ?

                            <View style={{ flex: 1, backgroundColor: '#ebfaff', marginBottom: responsiveHeight(8.5) }}>
                                <FlatList
                                    data={this.state.Completed}
                                    shouldItemUpdate={(props, nextProps) => { return props.item !== nextProps.item }}
                                    extraData={this.props}
                                    // contentContainerStyle={{paddingBottom:'10%'}}
                                    ItemSeparatorComponent={() => this.separator()}
                                    renderItem={({ item }) => (this.renderSiteinfo(item))}
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isRefreshing}
                                    keyExtractor={item => item.KYC_ID}
                                    ListEmptyComponent={this.renderEmptyContainer(this)}
                                />

                            </View>:

                            <View style={{ flex: 1, backgroundColor: '#ebfaff', marginBottom: responsiveHeight(8.5) }}>
                                <FlatList
                                    data={this.state.Running}
                                    shouldItemUpdate={(props, nextProps) => { return props.item !== nextProps.item }}
                                    extraData={this.props}
                                    ItemSeparatorComponent={() => this.separator()}
                                    renderItem={({ item }) => (this.renderSiteinfo(item))}
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isRefreshing}
                                    keyExtractor={item => item.KYC_ID}
                                    ListEmptyComponent={this.renderEmptyContainer1(this)}
                                />


                            </View> 
                            
                        }
                        <BottomNavigation
                            style={styles.bottomNavigation}
                            indicatorStyle={styles.indicator}
                            selectedIndex={this.state.selectedIndex}
                            onSelect={this.onTabSelect}>
                            <BottomNavigationTab title='Running' icon={RunningIcon} />
                            <BottomNavigationTab title='Completed' icon={CompletedIcon} />
                        </BottomNavigation>
                    </View>
                </Layout>
            </ApplicationProvider>
        );
    }

    onTabSelect = (selectedIndex) => {
        this.setState({ selectedIndex });
        console.log(selectedIndex);
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



/**
 *
  state = {
  };

  onTabSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <BottomNavigation
        style={styles.bottomNavigation}
        indicatorStyle={styles.indicator}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}>
        <BottomNavigationTab title='DASHBOARD'/>
        <BottomNavigationTab title='SETTINGS'/>
      </BottomNavigation>
    );
  }
}

const styles = StyleSheet.create({
  bottomNavigation: { backgroundColor: 'white' },
  indicator: { backgroundColor: 'black' },
});
 */