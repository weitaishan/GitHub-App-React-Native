import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    RefreshControl
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/data/DataRepository';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import RepositoryCell from '../common/RepositoryCell';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component {


    constructor(props) {

        super(props);
        this.dataRepository = new DataRepository();
        this.state = {

            result: '',
            isLoading: false
        }
    }


    onLoad() {

        let url = this.getUrl(this.text);
        this.dataRepository.fetchNetRepository(url)
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

    getUrl(key) {

        return URL + key + QUERY_STR;
    }

    render() {


        return (

            <View style={styles.container}>

                <NavigationBar

                    title={'最热'}
                    statusBar={{

                        backgroundColor:'#2196E3'
                    }}
                />
                <ScrollableTabView
                    tabBarBackgroundColor='#2196F3'
                    tabBarInactiveTextColor='mintcream'
                    tabBarActiveTextColor='while'
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <PopularTab tabLabel="Java">Java</PopularTab>
                    <PopularTab tabLabel="iOS">iOS</PopularTab>
                    <PopularTab tabLabel="Android">Android</PopularTab>
                    <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>

                </ScrollableTabView>
            </View>
        )
    }
}

class PopularTab extends Component {

    constructor(props) {

        super(props);
        this.dataRepository = new DataRepository();
        this.state = {

            result: ''
        }
    }

    componentDidMount() {

        this.onLoad();
    }

    onLoad() {

        this.setState({
            isLoading:true
        })
        let url = URL + this.props.tabLabel + QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result => {

                this.setState({
                    result: result.items,
                    isLoading:false
                })
            })
            .catch(error => {

                this.setState({
                    result: JSON.stringify(error)
                })
            })


    }

    renderRow(data) {

        return <RepositoryCell data={data}/>
    }

    render() {

        return (

            <View style={{flex:1}}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={this.state.result}
                    renderItem={({item}) => this.renderRow(item)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.onLoad()}
                            colors={['#2196E3']}
                            tintColor={'#2196E3'}
                            title={'Loading...'}
                            titleColor={'#2196E3'}
                        />}
                />
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