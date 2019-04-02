import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import { Container, Content, Text, Item, Input, DatePicker, ActionSheet, Icon, Toast } from 'native-base';
import Colors from '../../constants/Colors';
import config from '../../config';
import Fonts from '../../constants/Fonts';
import { StatusBarHeight } from '../../constants/Layout';
import Axios from 'axios';

class UsernamePasswordScreen extends Component {

    state = {
        username: '',
        pass: '',
        rePass: '',
        titleOpacity: new Animated.Value(0),
        mainOpacity: new Animated.Value(0),
        error: false
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.titleOpacity, {
                delay: 400,
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            }),
            Animated.timing(this.state.mainOpacity, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            })

        ]).start();
    }

    sendRequestAndPush = (userInfo, query) => {
        Axios.get(`${config.backend}/validate/username`, query).then(({ data }) => {
            console.log(data.status);
            if (data.status === 'Username taken') {
                this.setState({
                    error: 'username'
                }, () => {
                    Toast.show({
                        text: "Username is already taken",
                        type: 'danger',
                        duration: 3000,
                    })
                });

            } else {
                if (userInfo.type === 'Doctor') {
                    this.props.navigation.navigate('BasicInfo', {
                        userInfo: {
                            ...userInfo,
                            auth: {
                                username: this.state.username,
                                password: this.state.pass
                            }
                        },
                    });
                } else {
                    this.props.navigation.navigate('PatientBasicInfo', {
                        userInfo: {
                            ...userInfo,
                            auth: {
                                username: this.state.username,
                                password: this.state.pass
                            }
                        },
                    });
                }
            }
        });
    }

    onNextPress = () => {
        const userInfo = this.props.navigation.getParam("userInfo", {});
        const query = {
            params: {
                username: this.state.username,
                type: userInfo.type
            }
        }
        if (this.state.username.length && this.state.pass.length && this.state.rePass.length) {
            if (this.state.pass !== this.state.rePass) {
                this.setState({
                    error: 'pass,rePass'
                }, () => {
                    Toast.show({
                        text: "Passwords do not match",
                        type: 'danger',
                        duration: 3000,
                    })
                });
            } else {
                // Send the request after full validation ---------------
                this.sendRequestAndPush(userInfo, query);
            }
        } else {
            this.setState({
                error: 'Fill all the fields'
            }, () => {
                Toast.show({
                    text: "Fill all the fields",
                    type: 'danger',
                    duration: 3000,
                })
            });
        }
    }
    isError = type => {
        if (this.state.error && this.state.error.includes(type)) {
            return true;
        }
        if (this.state.error && !this.state[type].length) {
            return true;
        }
        return false;
    }

    render() {
        const TitleAnimatedStyle = {
            opacity: this.state.titleOpacity,
            transform: [{
                translateX: this.state.titleOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                })
            }]
        }
        const MainAnimatedStyle = {
            opacity: this.state.mainOpacity,
        }

        return (

            <Container style={styles.container}>
                <Content style={{ width: '100%' }} contentContainerStyle={styles.content}>
                    <Animated.Text style={[styles.title, TitleAnimatedStyle]}>
                        {`Type in your\nCredentials`}
                    </Animated.Text>
                    <Animated.View style={[styles.mainContainer, MainAnimatedStyle]}>
                        <View style={styles.inputContainer}>
                            <Item style={[styles.input, styles.item]} error={this.isError('username')} rounded>
                                <Icon name="person" style={styles.icon} />
                                <Input
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChangeText={text => this.setState({ username: text, error: this.state.error ? this.state.error.replace('username', '') : false })}
                                />
                                {this.isError('username') ? <Icon name="close-circle" /> : null}
                            </Item>
                            <Item style={[styles.input, styles.item]} error={this.isError('pass')} rounded>
                                <Icon name="lock" style={styles.icon} />
                                <Input
                                    secureTextEntry
                                    placeholder="Password"
                                    value={this.state.pass}
                                    onChangeText={text => this.setState({ pass: text, error: this.state.error ? this.state.error.replace('pass', '') : false })}
                                />
                                {this.isError('pass') ? <Icon name="close-circle" /> : null}

                            </Item>
                            <Item style={[styles.input, styles.item]} error={this.isError('rePass')} rounded>
                                <Icon name="lock" style={styles.icon} />
                                <Input
                                    secureTextEntry
                                    placeholder="Retype Password"
                                    value={this.state.rePass}
                                    onChangeText={text => this.setState({ rePass: text, error: this.state.error ? this.state.error.replace('rePass', '') : false })}
                                />
                                {this.isError('rePass') ? <Icon name="close-circle" /> : null}

                            </Item>
                        </View>
                        <TouchableOpacity onPress={() => this.onNextPress()} style={styles.nextButtonContainer} activeOpacity={0.8}>
                            <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                        </TouchableOpacity>
                    </Animated.View>
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
    title: {
        alignSelf: 'flex-start',
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        padding: 50,
    },
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
    },
    inputContainer: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center'
    },
    icon: {
        color: '#605eff'
    },
    input: {
        width: '100%',
        padding: 5,
    },
    item: {
        margin: 10,
    },
    nextButton: {
        color: 'white',
        fontSize: 34,
    },
    nextButtonContainer: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 100,
        height: 100,

    }

});

export default UsernamePasswordScreen;