import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
} from 'react-native';

import {StackNavigator} from "react-navigation";
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import CustomKeyPage from './my/CustomKeyPage';
import SortKeyPage from  './my/SortKeyPage';
const RootStack = StackNavigator(
    {
        Home: WelcomePage,
        HomePage: HomePage,
        CustomKeyPage: CustomKeyPage,
        SortKeyPage : SortKeyPage
    },
    {
        initialRouteName: 'Home',

        navigationOptions: {
            header: null,
        }
    });


export default class setup extends Component {
    render() {
        return <RootStack />;
    }
}
