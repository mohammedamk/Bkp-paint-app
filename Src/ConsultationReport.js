import React from 'react';
import { Text, BackHandler, FlatList, View, StatusBar, AsyncStorage, ActivityIndicator, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
// import { api } from '../../api/apiController';
import { styles } from './styles';
import CardView from 'react-native-cardview'
import * as Progress from 'react-native-progress';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { _blue } from './Utils/Colors'
import Feather from 'react-native-vector-icons/Feather';
import { PostUrl } from './Utils/config';
import {
    ApplicationProvider,
    Layout
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import MyCustomeHeader from './Mycustomheader';
import Loader from './loader';
import PopupDialog from 'react-native-popup-dialog'
import { Card } from 'react-native-elements';
import { api } from './apiController';
import { renderPaginationFooter } from './Utils/helper';



export default class ConsultationReport extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            ColorCode: '#000',
            isLoading: true,
            visible: false,
            itemppage: 6,
            isRefreshing: false,
            endOfResults: false,
            emptyList: false,
            startNum: 0,
        }
        // console.log(this.props.data)
    }

    componentWillUnmount() {
        this.backButton.remove();
    }

    async componentDidMount() {
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('home');
            return true;
        });
        this.getConsulationData()
    }

    async getConsulationData() {
        var url = PostUrl.url + '/getConsultationList';
        this.popupDialog.show()
        const mobile_number = await AsyncStorage.getItem('mo_num');
        const userType = await AsyncStorage.getItem('usr_type');
        var data = {
            "userid": mobile_number,
            "usertype": userType,
            "start": this.state.startNum,
            "length": 10
        }
        // console.log(data)
        try {
            const retrieved = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function (response) {
                // console.log(response + 'Response from fetched');
                return response.json();
            }).then(function (result_data) {
                // console.log(result_data);
                if (result_data != null) {
                    return bu = result_data.data;
                }
            })
            // console.log(bu);
            this.popupDialog.dismiss()
            if(this.state.isRefreshing){
                await this.setState({ users: [] })
            }
            let posts = this.state.users.concat(bu)
            if ((bu).length === 0) {
                this.setState({ endOfResults: true })
            }
            if(posts.length===0){
                this.setState({emptyList:true })
            }
            this.setState({ users: posts })
            // this.setState({ users: retrieved, isLoading: false });
            return retrieved;
        } catch (err) {
            console.log('Error fetching data-----------', err);
        }
    }

    onRefresh() {
        this.setState({ isRefreshing: true, endOfResults: false, startNum:0, users: []}, async () => {
              this.getConsulationData()
          this.setState({ isRefreshing: false })
        })
      }

      prepareForPagination() {
        this.setState({
          startNum: this.state.startNum + 10
        }, () => {
          if (this.state.endOfResults === false) {
            this.getConsulationData()
          }
        })
      }

    renderAll(item) {
        var ColorCode = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (0.2) + ')';
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('kycdata',{details: item})}
            >
            <Card
                containerStyle={{borderRadius:responsiveHeight(2), elevation:5, height: responsiveHeight(30)}}
            >
                <View style={styles.cardHolder}>
                    <View style={styles.cardTop}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.topcard}>
                                KYC ID: </Text>
                            <Text style={styles.textdata1}>{item.KYC_ID}</Text>
                        </View>
                    </View>
                    <View style={styles.separator2}></View>
                    <View style={{ flexDirection: 'row', paddingVertical: '3%' }}>
                        <View style={{ flexDirection: 'column', marginRight: '4%' }}>
                            <Text style={styles.textheading1}>KYC Date: </Text>
                            <Text style={styles.textheading1}>Narration: </Text>
                            <Text style={styles.textheading1}>Customer ID: </Text>
                            <Text style={styles.textheading1}>Entry Date: </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.textdata1}>{item.KYC_DATE}</Text>
                            <Text style={styles.textdata1}>{item.NARRATION}</Text>
                            <Text style={styles.textdata1}>{item.CUSTOMER_ID}</Text>
                            <Text style={styles.textdata1}>{item.ENTRY_DATE}</Text>
                        </View>
                    </View>
                    <View style={styles.separator2}></View>
                    <View style={styles.cardBottom}>
                        <View style={{ flexDirection: 'row', paddingVertical: '0.5%' }}>
                            <Text style={styles.bottomcard}>KYC Done by: </Text>
                            <Text style={styles.textdata1}>{item.ENTERED_BY}</Text>
                        </View>
                    </View>
                </View>
            </Card>
            </TouchableOpacity>
        );
    }

    renderEmptyContainer(item){
        return(
         <View style={{flex:1,alignItems:'center',marginTop:'50%', backgroundColor: '#ebfaff'}}>
             <Text style={{}}>No Events</Text>
         </View>
         )
     }

    render() {
        return (
            <ApplicationProvider
                mapping={mapping}
                theme={lightTheme}>
                <Layout style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
                    <Loader component={this} />
                    <View style={styles.navigator_custom_menu}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                            // onPress={() => { Actions.drawerOpen({ data: this.state.data }); }}
                            style={styles.navigator_custom_menu_content}>
                            <Feather name='menu' size={30} color={_blue} />
                        </TouchableOpacity>
                        <View style={{justifyContent:'center'}}><Text style={{textAlign:'center',fontSize:responsiveFontSize(2)}}>Consultation Report</Text></View>
                        <TouchableOpacity style={styles.navigator_custom_menu_content}
                            onPress={() => { alert("Logged out"); api.logoutCall(); this.props.navigation.navigate('login'); }}>
                            <Feather name='log-out' size={30} color={_blue} />
                        </TouchableOpacity>
                    </View>
                    <StatusBar transluent={true} />
                    <View style={{ backgroundColor: '#ebfaff', }}>
                        <FlatList
                            style={{  }}
                            data={this.state.users}
                            contentContainerStyle={{ paddingBottom: '10%' }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this.separator}
                            renderItem={({ item }) => (this.renderAll(item))}
                            onRefresh={() => this.onRefresh()}
				            refreshing={this.state.isRefreshing}
                            keyExtractor={item => item.KYC_ID}
                            onEndReachedThreshold={0.1}
                            ListEmptyComponent={this.renderEmptyContainer()}
                            ListFooterComponent={renderPaginationFooter(this)}
                            onEndReached={(info: {distanceFromEnd: number}) => this.prepareForPagination()}
                        >
                        </FlatList>


                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
    separator = () => (
        <View
            style={{
                backgroundColor: '#000000',
                // paddingBottom: '0.2%',
                // paddingTop: '0.2%'
                //margin: '0.1%',
            }}
        />
    );
}