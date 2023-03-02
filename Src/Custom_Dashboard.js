import React from 'react';
import {
    ActivityIndicator,
    BackHandler,
    StatusBar,
    Image,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    ScrollView, Button
} from 'react-native'
import { styles } from './styles';
import { _blue } from './Utils/Colors'
import { Card } from 'react-native-elements';

export default class Dashboard extends React.Component {
    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flexDirection: "column",
                    marginRight: '3%'
                }}>
                <View style={{ flexDirection: "row" }}>
                    <Card
                        title='👨‍💼  Customers'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            titleStyle={{ fontFamily: '' }}
                            title='2014' />
                    </Card>
                    <Card
                        title='📝  Contractors'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='54' />
                    </Card>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Card
                        title='🛠️	  Architects'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='45' />
                    </Card>
                    <Card
                        title='🎨  CC'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='614' />
                    </Card>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Card
                        //🏡
                        title='👨‍🎨  CCA'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='101' />
                    </Card>
                    <Card
                        title='🤝  Consultation'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='20' />
                    </Card>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Card
                        title="📚  KYC's"
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='747' />
                    </Card>
                    <Card
                        title="📔  CC KYC's"
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='687' />
                    </Card>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Card
                        title="📕  CCA KYC's"
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='414' />
                    </Card>
                    <Card
                        title='	🖌️  Sites'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='388' />
                    </Card>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Card
                        title='⏳  WIP Sites'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='988' />
                    </Card>
                    <Card
                        title='☑️  Completed'
                        containerStyle={styles.home_card}
                    >
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='967' />
                    </Card>
                </View>
            </ScrollView>
        );
    }
}
