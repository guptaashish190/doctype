import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import { Container, Content, Text, Item, Input, DatePicker, ActionSheet, Root, Icon } from 'native-base';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { StatusBarHeight } from '../../constants/Layout';

class UsernamePasswordScreen extends Component {

    state = {
        userName: '',
        pass: '',
        rePass: '',
        titleOpacity: new Animated.Value(0),
        mainOpacity: new Animated.Value(0),
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

    onNextPress = () => {
        const userInfo = this.props.navigation.getParam("userInfo", {});
        this.props.navigation.navigate('BasicInfo', {
            userInfo: {
                ...userInfo,
                auth: {
                    username: this.state.userName,
                    password: this.state.pass
                }
            },
        });
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
            <Root>
                <Container style={styles.container}>
                    <Content style={{ width: '100%' }} contentContainerStyle={styles.content}>
                        <Animated.Text style={[styles.title, TitleAnimatedStyle]}>
                            {`Type in your\nCredentials`}
                        </Animated.Text>
                        <Animated.View style={[styles.mainContainer, MainAnimatedStyle]}>
                            <View style={styles.inputContainer}>
                                <Item style={[styles.input, styles.item]} rounded>
                                    <Icon name="person" style={styles.icon} />
                                    <Input
                                        placeholder="Username"
                                        value={this.state.userName}
                                        onChangeText={text => this.setState({ userName: text })}
                                    />
                                </Item>
                                <Item style={[styles.input, styles.item]} rounded>
                                    <Icon name="lock" style={styles.icon} />
                                    <Input
                                        secureTextEntry
                                        placeholder="Password"
                                        value={this.state.pass}
                                        onChangeText={text => this.setState({ pass: text })}
                                    />
                                </Item>
                                <Item style={[styles.input, styles.item]} rounded>
                                    <Icon name="lock" style={styles.icon} />
                                    <Input
                                        secureTextEntry
                                        placeholder="Retype Password"
                                        value={this.state.rePass}
                                        onChangeText={text => this.setState({ rePass: text })}
                                    />
                                </Item>
                            </View>
                            <TouchableOpacity onPress={() => this.onNextPress()} style={styles.nextButtonContainer} activeOpacity={0.8}>
                                <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                            </TouchableOpacity>
                        </Animated.View>
                    </Content>
                </Container >
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        marginTop: StatusBarHeight
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