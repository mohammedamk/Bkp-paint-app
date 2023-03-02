import React from 'react';
import { View, BackHandler } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { _blue } from './Utils/Colors'
import {
    ApplicationProvider,
    Layout
  } from 'react-native-ui-kitten';
  import { mapping, light as lightTheme } from '@eva-design/eva';


export default class Registered extends React.Component {
    componentWillUnmount() {
        this.backButton.remove();
    }
    componentDidMount(){
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('home');
            return true;
        });
    }
    render() {
        return (
            <ApplicationProvider
                mapping={mapping}
                theme={lightTheme}>
                <Layout style={{ backgroundColor: '#fff', flex: 1 }}>
                    <View style={{ padding: '2%', left: 0, top: 0 }}>
                        <Feather
                        onPress={()=>this.props.navigation.navigate('home')}
                            size={30}
                            color={_blue}
                            name={'arrow-left'}
                        />
                    </View>
                </Layout>
            </ApplicationProvider>
        );
    }
}