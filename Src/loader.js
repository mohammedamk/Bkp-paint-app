
import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    AsyncStorage,
    BackHandler,
} from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import PopupDialog from 'react-native-popup-dialog'
import * as Progress from 'react-native-progress'

export default class Loader extends React.Component {
    render() {
        return (
            <PopupDialog
                dismissOnTouchOutside={false}
                dismissOnHardwareBackPress={false}
                overlayOpacity={0.9}
                overlayBackgroundColor="#A9A9A9"
                width={responsiveWidth(75)}
                height={responsiveHeight(10)}
                ref={(popupDialog) => { this.props.component.popupDialog = popupDialog }}>
                <View
                    style={{
                        height: responsiveHeight(10),
                        width: responsiveWidth(75),
                        flexDirection: 'row'
                    }}>
                    <View
                        style={{
                            width: responsiveWidth(20),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Progress.CircleSnail
                            color={['#008744', '#0057e7', '#d62d20', '#ffa700', '#eee']}
                            duration={700}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{
                            fontFamily: 'Nunito-Regular',
                            fontSize: responsiveFontSize(2),
                            color: 'black'
                        }}>Loading...</Text>
                    </View>
                </View>
            </PopupDialog>


        )
    }
}