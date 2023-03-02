import React from 'react';
import { Text, BackHandler, FlatList, View, StatusBar, AsyncStorage, ActivityIndicator, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { _blue } from './Utils/Colors'
import Feather from 'react-native-vector-icons/Feather';
import { PostUrl } from './Utils/config';
import { ApplicationProvider,Layout } from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import Loader from './loader';
import PopupDialog from 'react-native-popup-dialog'
import { Card } from 'react-native-elements';
import { api } from './apiController';
import { renderPaginationFooter } from './Utils/helper';



export default class EventList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            events: [],
            ColorCode: '#000',
            isLoading: true,
            isRefreshing: false,
            endOfResults: false,
            emptyList: false,
            startNum: 0
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
        this.getEventData()
    }

    async getEventData() {
        var url = PostUrl.url + '/getEventList';
        this.popupDialog.show()
        const mobile_number = await AsyncStorage.getItem('mo_num');
        const userType = await AsyncStorage.getItem('usr_type');
        try {
            const retrieved = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "usertype": userType,
                        "start": this.state.startNum,
                        "length": 10
                    })
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
                await this.setState({ events: [] })
            }
            let posts = this.state.events.concat(bu)
            if ((bu).length === 0) {
                this.setState({ endOfResults: true })
            }
            if(posts.length===0){
                this.setState({emptyList:true })
            }
            this.setState({ events: posts })
            // this.setState({ events: retrieved, isLoading: false });
            return retrieved;
        } catch (err) {
            console.log('Error fetching data-----------', err);
        }
    }

    onRefresh() {
        this.setState({ isRefreshing: true, endOfResults: false, startNum:0, events: []}, async () => {
              this.getEventData()
          this.setState({ isRefreshing: false })
        })
      }


     _keyExtractor(item, index) {
        return item.id
    }

     renderEmptyContainer(item){
       return(
        <View style={{flex:1,alignItems:'center',marginTop:'50%'}}>
            <Text style={{}}>No Events</Text>
        </View>
        )
    }

    renderevents(item) {

        return(
                 <TouchableOpacity>
                    <Card containerStyle={{borderRadius:responsiveHeight(2), elevation:5, height: responsiveHeight(26)}}>
                        <View style={styles.cardHolder}>
                            <View style={styles.cardTop}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.topcard}>Event Name: </Text>
                                    <Text style={styles.textdata}>{item.EVENT_NAME}</Text>
                                </View>
                                </View>
                                <View style={styles.separator2}></View>
                                <View style={{ flexDirection: 'row', paddingVertical: '3%' }}>
                                    <View style={{ flexDirection: 'column', marginRight: '4%' }}>
                                        <Text style={styles.textheading}>Event Date: </Text>
                                        <Text style={styles.textheading}>Details: </Text>
                                        <Text style={styles.textheading}>Venue: </Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: responsiveWidth(60) }}>
                                        <Text style={styles.textdata}>{item.EVENT_DATE}</Text>
                                        <Text numberOfLines={1} style={styles.textdata}>{item.EVENT_DETAILS}</Text>
                                        <Text numberOfLines={1} style={styles.textdata}>{item.EVENT_VENUE}</Text>
                                    </View>
                                </View>
                                <View style={styles.separator2}></View>
                                <View style={styles.cardBottom}>
                                    <View style={{ flexDirection: 'row', paddingVertical: '0.5%' }}>
                                    <Text style={styles.bottomcard}>Event by: </Text>
                                    <Text style={styles.textdata}>{item.EVENT_COMPANY}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            );

    }

    prepareForPagination() {
        this.setState({
          startNum: this.state.startNum + 10
        }, () => {
          if (this.state.endOfResults === false) {
            this.getEventData()
          }
        })
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
                            style={styles.navigator_custom_menu_content}>
                            <Feather name='menu' size={30} color={_blue} />
                        </TouchableOpacity>
                        <View style={{justifyContent:'center'}}><Text style={{textAlign:'center',fontSize:responsiveFontSize(2)}}>Event List</Text></View>
                        <TouchableOpacity style={styles.navigator_custom_menu_content}
                            onPress={() => { api.logoutCall(); }}>
                            <Feather name='log-out' size={30} color={_blue} />
                        </TouchableOpacity>
                    </View>
                    <StatusBar transluent={true} />
                    <View style={{ backgroundColor: '#f2f2f2' }}>
                        <FlatList
                            style={{  }}
                            data={this.state.events}
                            contentContainerStyle={{ paddingBottom: '10%' }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this.separator}
                            renderItem={({ item }) => (this.renderevents(item))}
                            onRefresh={() => this.onRefresh()}
				            refreshing={this.state.isRefreshing}
                            keyExtractor={item => item.ID}
                            onEndReachedThreshold={0.1}
                            ListEmptyComponent={this.renderEmptyContainer()}
                            ListFooterComponent={renderPaginationFooter(this)}
                            onEndReached={(info: {distanceFromEnd: number}) => this.prepareForPagination()}
                        />
                    </View>
                </Layout>
            </ApplicationProvider>
        )
    }
    separator = () => (
        <View
            style={{
                backgroundColor: '#000000',
            }}
        />
    );
}