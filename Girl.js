import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import NavigationBar from './js/common/NavigationBar'

export default class Girl extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        headerTitle: 'Girl',
        header: null,
    };

    renderButton(image) {

        return <TouchableOpacity
            onPress={() => {

                this.props.navigation.pop();
            }}
        >
            <Image
                style={{width: 22, height: 22, margin: 5}}
                source={image}></Image>
        </TouchableOpacity>
    }

    render() {

        const {word, onCallBack} = this.props.navigation.state.params;
        return (


            <View style={styles.container}>

                <NavigationBar
                    title={'Girl'}
                    style={{
                        backgroundColor: '#EE6363'
                    }}
                    leftButton={

                        this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))

                    }
                    rightButton={

                        this.renderButton(require('./res/images/ic_star.png'))

                    }
                />
                <Text style={styles.text}>I am Girl</Text>
                <Text style={styles.text}>我收到了男孩送的:{word}</Text>
                <Text style={styles.text}
                      onPress={() => {
                          onCallBack('一盒巧克力');
                          this.props.navigation.goBack();
                      }
                      }
                >回赠巧克力</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'white'
    },
    text: {
        fontSize: 22
    }
})