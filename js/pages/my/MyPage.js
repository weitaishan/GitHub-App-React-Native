import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
} from 'react-native';

import NavigationBar from '../../common/NavigationBar'


export default class MyPage extends Component {


    constructor(props) {

        super(props);

    }

    render() {

        const {navigate} = this.props.navigation;

        return (

            <View style={styles.container}>

                <NavigationBar

                    title={'我的'}
                />
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        navigate('CustomKeyPage', {

                            isRemoveKey:false
                        })

                    }}
                >自定义标签</Text>
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        navigate('SortKeyPage')

                    }}
                >标签排序</Text>
                <Text
                    style={styles.tips}
                    onPress={()=>{
                        navigate('CustomKeyPage', {

                            isRemoveKey:true
                        })

                    }}
                >标签移除</Text>
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
        textAlign:'center',
        justifyContent:'center'

    },
    text: {
        fontSize: 22
    }
})