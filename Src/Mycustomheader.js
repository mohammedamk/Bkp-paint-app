import React from 'react';
import { View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { _blue } from './Utils/Colors'



export default class MyCustomeHeader extends React.Component {
    render() {
        return (
            <View style={{ padding: '2%', left: 0, top: 0 }}>
                <Feather
                    // onPress={() => this.props.navigation.navigate('home')}
                    size={30}
                    color={_blue}
                    name={'arrow-left'}
                />
            </View>
        );
    }
}