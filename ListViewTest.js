import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Platform,
    RefreshControl
} from 'react-native';

import NavigationBar from './NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast';

var data = {
    "result": [
        {
            "email": "f.lee@taylor.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "g.jackson@hall.net",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "l.hall@rodriguez.com",
            "fullName": "张三张三张三"
        },
        {
            "email": "q.lopez@davis.io",
            "fullName": "张三张三张三张三张三张三张三"
        },
        {
            "email": "c.gonzalez@perez.net",
            "fullName": "张三张三"
        },
        {
            "email": "a.johnson@williams.net",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "i.anderson@lopez.edu",
            "fullName": "张三张三"
        },
        {
            "email": "r.lee@davis.org",
            "fullName": "寮犱笁寮犱笁"
        },
        {
            "email": "o.young@lee.edu",
            "fullName": "张三张三张三张三张三张三"
        },
        {
            "email": "j.wilson@williams.org",
            "fullName": "张三张三张三"
        },
        {
            "email": "z.walker@jackson.io",
            "fullName": "张三张三张三"
        },
        {
            "email": "j.martinez@brown.gov",
            "fullName": "张三张三张三"
        },
        {
            "email": "y.martin@lewis.io",
            "fullName": "张三张三张三"
        },
        {
            "email": "w.taylor@gonzalez.org",
            "fullName": "张三张三张三"
        },
        {
            "email": "j.thomas@garcia.org",
            "fullName": "张三张三张三张三张三"
        }
    ],
    "statusCode": 0
};
export default class ListViewTest extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isLoading: true,
        };

        this.onLoad();
    }


    renderRow(item) {

        return <View style={styles.row}>
            <TouchableOpacity
                onPress={() => {

                    this.toast.show('你单击了:' + item.fullName, DURATION.LENGTH_SHORT);
                }}
            >
                <Text>{item.email}</Text>
                <Text>{item.fullName}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator() {

        return <View style={styles.separator}></View>
    }

    renderFooter() {


        return <Image

            style={{width: 300, height: 100}}
            // source={{uri:'http://ww4.sinaimg.cn/bmiddle/6aaeb4b8gw1e83edtobazg20c8068as4.gif'}}

            source={require('./res/images/小黄人.gif')}
        />
    }

    onLoad() {

        setTimeout(() => {

            this.setState({

                isLoading:false
            })
        },2000);
    }
    render() {

        return (

            <View style={styles.container}>
                <NavigationBar
                    title={'ListViewTest'}
                />
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={item => item.email}
                    data={data.result}
                    renderItem={({item}) => this.renderRow(item)}
                    ListFooterComponent={this.renderFooter}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onLoad()}
                    />}

                />
                <Toast ref={toast => {
                    this.toast = toast
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 22
    },
    row: {

        height: 50
    },
    separator: {
        height: 1,
        backgroundColor: 'skyblue'
    }

})
