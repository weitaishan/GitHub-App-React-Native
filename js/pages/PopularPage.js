import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/data/DataRepository';

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR='&sort=stars';
export default class PopularPage extends Component {


    constructor(props) {

        super(props);
        this.dataRepository = new DataRepository();
        this.state={

            result:''
        }
    }


    onLoad() {

        let url = this.getUrl(this.text);
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{

                this.setState({
                    result:JSON.stringify(result)
                })
            })
            .catch(error=>{

                this.setState({
                    result:JSON.stringify(error)
                })
            })


    }

    getUrl(key){

        return URL + key + QUERY_STR;
    }
    render() {


        return (

            <View style={styles.container}>

                <NavigationBar

                    title={'最热'}
                />
                <Text
                    style={styles.tips}
                    onPress={() => {

                        this.onLoad()
                    }}
                >获取数据</Text>
                <TextInput
                    style={{height: 40, borderWidth:1}}
                    onChangeText={text => this.text = text}
                />
                <Text style={{height:500}}>{this.state.result}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        // textAlign:'center',
    },
    tips: {

        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center'

    },
    text: {
        fontSize: 22
    }
})