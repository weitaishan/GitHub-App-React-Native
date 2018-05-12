import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
} from 'react-native';

import Girl from './Girl';
import NavigationBar from './js/common/NavigationBar'

export default class Boy extends Component {

    constructor(props) {

        super(props);
        this.state = {

            word: '',
        }
    }

    static navigationOptions = {
        headerTitle: 'Boy',
        header:null,
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Boy'}
                    style={{
                        backgroundColor: 'red'
                    }}
                    statusBar={{
                        backgroundColor:'red',
                        barStyle:'light-content'

                    }}
                />
                <Text style={styles.text}>I am boy</Text>
                <Text style={styles.text}

                      onPress={() =>
                          navigate('Girl', {
                              word: '一支玫瑰',
                              onCallBack: (word) => {

                                  this.setState({
                                      word: word
                                  })
                              }

                          })}
                >送女孩一支玫瑰</Text>
                <Text style={styles.text}>{this.state.word}</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: 'gray',
    },
    text: {

        fontSize: 20,
    }
})