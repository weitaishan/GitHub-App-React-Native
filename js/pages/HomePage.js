import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    Image,
    DeviceEventEmitter
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import MyPage from './my/MyPage';
import Toast,{DURATION} from 'react-native-easy-toast'
export default class HomePage extends Component {

    constructor(props) {

        super(props);
        this.state = {

            selectedTab: 'tb_popular',

        }
    }

    componentDidMount () {

        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {

            this.toast.show(text,DURATION.LENGTH_SHORT);
        })
    }

    componentWillUnmount(){

        this.listener && this.listener.remove();
    }
    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#2196E3'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor: '#2196E3'}]} source={require('../../res/images/ic_polular.png')}/>}
                        // badgeText="1"
                        onPress={() => this.setState({selectedTab: 'tb_popular'})}>
                        <PopularPage style={styles.page1}></PopularPage>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'yellow'}]} source={require('../../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                        <AsyncStorageTest style={styles.page2}></AsyncStorageTest>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'yellow'}]} source={require('../../res/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'yellow'}]} source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_my'})}>
                        <MyPage {...this.props}></MyPage>
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {

        flex: 1,
        backgroundColor: 'red',
    },

    page2: {

        flex: 1,
        backgroundColor: 'yellow',
    },

    image: {
        height: 22,
        width: 22
    }
});