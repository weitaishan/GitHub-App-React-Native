import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import NavigationBar from './js/common/NavigationBar'
import HttpUtils from './HttpUtils';

const api = 'https://api.douban.com/v2/movie/in_theaters';


export default class FetchTest extends Component {

    constructor(props) {
        super(props);
        this.state = {

            result: '',
        }
    }


    onLoad(url) {
        // fetch(url)
        //     .then(response => response.json())
        //     .then(result => {
        //
        //         this.setState({
        //
        //             result:JSON.stringify(result)
        //         })
        //     })
        //     .catch(error=>{
        //
        //         this.setState({
        //
        //             result:JSON.stringify(error)
        //         })
        //     })

        HttpUtils.get(url)
            .then(result => {


                this.setState({

                    result: JSON.stringify(result)
                })
            })
            .catch(error => {

                this.setState({

                    result: JSON.stringify(error)
                })
            })
    }

    onSubmit(url, data) {

        // fetch(url, {
        //
        //     method: 'Post',
        //     header: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => response.json())
        //     .then(result => {
        //
        //         this.setState({
        //
        //             result: JSON.stringify(result)
        //         })
        //     })
        //     .catch(error => {
        //
        //         this.setState({
        //
        //             result: JSON.stringify(error)
        //         })
        //     })

        HttpUtils.post(url, data)
            .then(result => {

                this.setState({

                    result: JSON.stringify(result)
                })
            })
            .catch(error => {

                this.setState({

                    result: JSON.stringify(error)
                })
            })
    }

    render() {

        return (


            <View style={styles.container}>
                <NavigationBar
                    title={'Fetch的使用'}
                />
                <Text
                    style={styles.tips}
                    onPress={() => this.onLoad(api, {userName: '小明', password: '123456'})}
                >获取数据</Text>
                <Text
                    style={styles.tips}
                    onPress={() => this.onSubmit(api)}
                >提交数据</Text>
                <Text>返回结果:{this.state.result}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    tips: {

        fontSize: 18
    },
    text: {
        fontSize: 22
    }
})