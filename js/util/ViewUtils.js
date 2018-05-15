import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

export default class ViewUtils{

    static getLeftButton(callBack){

        return <TouchableOpacity
            onPress={callBack}
        >
            <Image
                style={{width: 22, height: 22, margin: 5}}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')}></Image>
        </TouchableOpacity>
    }
}