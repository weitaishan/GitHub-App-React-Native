import React, {Component} from 'react';
import {

    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class Girl extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        headerTitle: 'Girl',
    };
    render() {

        const { word,  onCallBack } = this.props.navigation.state.params;
        return (


            <View style={styles.container}>
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
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    text: {
        fontSize: 22
    }
})