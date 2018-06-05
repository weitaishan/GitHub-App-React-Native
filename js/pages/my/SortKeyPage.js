import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import NavigationBar from '../../common/NavigationBar';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/data/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView from 'react-native-sortable-listview';
import ViewUtils from '../../util/ViewUtils';

export default class SortKeyPage extends Component {


    constructor(props) {


        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {

            checkedArray: []
        }
    }

    componentDidMount() {

        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }

    loadData() {

        this.languageDao.fetch()
            .then(result => {

                this.getCheckedItems(result);

            })
            .catch(error => {


            })

    }

    getCheckedItems(result) {

        this.dataArray = result;
        let checkedArray = [];
        for (let i = 0, len = result.length; i < len; i++) {

            let data = result[i];
            if (data.checked) checkedArray.push(data);
        }

        this.setState({

            checkedArray: checkedArray,
        })

        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }

    onBack() {

        if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {

            this.props.navigation.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {text: '不保存', onPress: () => this.props.navigation.pop(), style: 'cancel'},
                {text: 'OK', onPress: () => {this.onSave(true)}},
            ],
            { cancelable: false }
        )

    }

    onSave(isChecked) {
        if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {

            this.props.navigation.pop();
            return;
        }

        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigation.pop();

    }

    getSortResult() {

        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0; i < this.originalCheckedArray.length; i ++){

            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index,1,this.state.checkedArray);


        }

    }

    render() {

        const {navigate} = this.props.navigation;

        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}
        >
            <View style={{margin: 10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>

        return (

            <View style={styles.container}>

                <NavigationBar

                    title={'我的'}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    rightButton={rightButton}
                />

                <SortableListView
                    style={{flex: 1}}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row}/>}
                />

            </View>


        )
    }
}

class SortCell extends Component {

    render() {

        return (


            <TouchableHighlight
                underlayColor={'#eee'}
                delayLongPress={500}
                style={styles.item}
                {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image
                        style={styles.image}
                        source={require('./img/ic_sort.png')}
                    />
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
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
    },
    item: {

        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',

    },
    row: {

        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        tintColor: '#2196F3',
        height: 16,
        width: 16,
        marginRight: 10
    },
    title: {
        fontSize: 16,
        color: '#FFF'
    }
})