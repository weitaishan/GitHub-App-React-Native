import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput
} from 'react-native';

import Girl from './Girl';
import NavigationBar from './js/common/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast';

const KEY = 'text';
export default class AsyncStorageTest extends Component {

    constructor(props) {

        super(props);

    }

    static navigationOptions = {
        headerTitle: 'Boy',
        header: null,
    };

    onSave() {

        AsyncStorage.setItem(KEY, this.text, (error) => {

            if (!error) {
                this.toast.show('保存成功', DURATION.LENGTH_SHORT);


            } else {

                this.toast.show('保存失败', DURATION.LENGTH_SHORT);

            }

        })
    }


    onFetch() {

        AsyncStorage.getItem(KEY, (error, result) => {

            if (!error) {

                if (result !== '' && result !== null) {
                    this.toast.show('取出的内容为：' + result,DURATION.LENGTH_SHORT);
                } else {

                    this.toast.show('取出的内容不存在',DURATION.LENGTH_SHORT);

                }
            } else {

                this.toast.show('取出失败',DURATION.LENGTH_SHORT);

            }
        })
    }

    onRemove() {

        AsyncStorage.removeItem(KEY,(error)=>{

            if (!error) {
                this.toast.show('移除成功', DURATION.LENGTH_SHORT);


            } else {

                this.toast.show('移除失败', DURATION.LENGTH_SHORT);

            }
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'AsyncStorageTest的基本使用'}
                    statusBar={{
                        barStyle: 'light-content'

                    }}
                />

                <TextInput
                    style={{borderWidth: 1, height: 40, margin: 6}}
                    onChangeText={text => this.text = text}
                />
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={styles.text}
                        onPress={() => this.onSave()}
                    >保存</Text>

                    <Text
                        style={styles.text}
                        onPress={() => this.onRemove()}
                    >移除</Text>

                    <Text
                        style={styles.text}
                        onPress={() => this.onFetch()}
                    >取出</Text>
                </View>
                <Toast ref={toast => this.toast = toast}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: 'white',
    },
    text: {

        fontSize: 20,
        margin: 5
    }
})