import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Platform, TouchableNativeFeedback, Image } from 'react-native';
import { Container, Content, Text, Item, Label, Input, Icon, Button } from 'native-base';
import Colors from '../../constants/Colors';

class StartScreen extends Component {

    onPress = (type) => {
        if (type === 'D') {
            this.props.navigation.navigate('BasicInfo', {
                userInfo: {
                    type: 'Doctor'
                }
            });
        } else {
            this.props.navigation.navigate('BasicInfo', {
                userInfo: {
                    type: 'Patient'
                }
            });
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={{ width: '100%' }} contentContainerStyle={styles.content}>
                    <TouchableNativeFeedback onPress={() => this.onPress('D')} background={TouchableNativeFeedback.Ripple('#ddd')}>
                        <View style={[styles.typeContainer, { backgroundColor: Colors.primary }]}>
                            <Image style={styles.typeImage} source={require('../../assets/images/doctor.png')} />
                            <Text style={styles.typeText}>Doctor</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.onPress('P')} activeOpacity={0.8}>
                        <View style={styles.typeContainer}>
                            <Image style={styles.typeImage} source={require('../../assets/images/patient.png')} />
                            <Text style={styles.typeText}>Patient</Text>
                        </View>
                    </TouchableNativeFeedback>
                </Content>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    content: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    typeImage: {
        width: 200,
        height: 200
    },
    typeContainer: {
        width: '70%',
        backgroundColor: Colors.doctorColors.primary,
        borderRadius: 10,
        padding: 30,
        elevation: 7,
        flexDirection: 'column',
        alignItems: 'center'
    },
    typeText: {
        color: 'white',
        margin: 10,
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default StartScreen;