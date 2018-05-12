import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
export default class WelcomePage extends Component {


    constructor(props) {

        super(props);

    }

    componentDidMount(){

        const { navigate } = this.props.navigation;


        this.timer=setTimeout(()=>{

            this.props.navigation.replace('HomePage', {


            })

        }, 2000)
    }

    componentWillUnmount(){

        this.timer && clearTimeout(this.timer);
    }

    static navigationOptions = {
        headerTitle: '',
        header:null,
        animationEnabled:false
    };


    render() {



        return (

            <View style={styles.container}>

                <NavigationBar

                    title={'欢迎'}
                />
                <Text
                    style={styles.tips}
                >欢迎</Text>
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