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
import LanguageDao,{FLAG_LANGUAGE} from '../expand/data/LanguageDao';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component {


    constructor(props) {

        super(props);
        this.dataRepository = new DataRepository();
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {

            result: '',
            isLoading: false,
            languages:[]
        }
    }

    componentDidMount(){

        this.loadData();
    }
    loadData() {

        this.languageDao.fetch()
            .then(result => {

                this.setState({

                    languages: result
                })
            })
            .catch(error => {

                console.log(error);
            })
    }


    render() {

        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor='#2196F3'
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='while'
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                renderTabBar={() => <ScrollableTabBar/>}
            >
                {this.state.languages.map((result,i,arr)=>{

                    let lan = arr[i];
                    return lan.checked ? <PopularTab  key={i} tabLabel={lan.name}>{lan.name}</PopularTab> : null
                })}

            </ScrollableTabView> : null
        return (

            <View style={styles.container}>

                <NavigationBar

                    title={'最热'}
                    statusBar={{

                        backgroundColor:'#2196E3'
                    }}
                />
                {content}
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