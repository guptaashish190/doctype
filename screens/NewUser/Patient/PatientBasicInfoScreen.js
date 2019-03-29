import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import { Container, Content, Text, Item, Input, DatePicker, ActionSheet, Root, Icon } from 'native-base';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { StatusBarHeight } from '../../../constants/Layout';

var BUTTONS = ["Married", 'Unmarried'];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class PatientBasicInfoScreen extends Component {

    state = {
        name: '',
        phone: '',
        email: '',
        dob: new Date(),
        mStatus: 'Unmarried',
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

    onMStatus = () => {
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Marital Status"
            },
            buttonIndex => {
                if (buttonIndex !== 4) {
                    this.setState({ mStatus: BUTTONS[buttonIndex] });
                }
            }
        )
    }

    setDate = (date) => {
        this.setState({
            dob: date
        });
    }
    onNextPress = () => {
        const userInfo = this.props.navigation.getParam("userInfo", {});
        this.props.navigation.navigate('PatientBody', {
            userInfo: {
                ...userInfo,
                basic: {
                    name: this.state.name,
                    dob: this.state.dob,
                    maritalStatus: this.state.mStatus
                },
                contact: {
                    phone: this.state.phone,
                    email: this.state.email,
                    address: null
                }
            }
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
                            {`Fill out\nyour basic info`}
                        </Animated.Text>
                        <Animated.View style={[styles.mainContainer, MainAnimatedStyle]}>
                            <View style={styles.inputContainer}>
                                <Item style={[styles.input, styles.item]} rounded>
                                    <Icon name="person" style={styles.icon} />
                                    <Input
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChangeText={text => this.setState({ name: text })}
                                    />
                                </Item>
                                <Item rounded style={[styles.datePicker, styles.item]}>
                                    <Icon name="calendar" style={styles.icon} />
                                    <DatePicker
                                        defaultDate={new Date(2018, 4, 4)}
                                        minimumDate={new Date(2018, 1, 1)}
                                        maximumDate={new Date(2018, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Date of birth"
                                        textStyle={{ color: "#444" }}
                                        placeHolderTextStyle={{ color: "#666" }}
                                        onDateChange={(date) => this.setDate(date)}
                                        disabled={false}
                                    />
                                </Item>
                                <Item style={[styles.datePicker, styles.item]} rounded>
                                    <Icon name="people" style={styles.icon} />
                                    <TouchableOpacity onPress={() => this.onMStatus()}>
                                        <Text style={{ padding: 8, color: '#666' }}>
                                            {this.state.mStatus}
                                        </Text>
                                    </TouchableOpacity>
                                </Item>
                                <Item style={[styles.input, styles.item]} rounded>
                                    <Icon name="call" style={styles.icon} />
                                    <Input
                                        value={this.state.phone}
                                        onChangeText={text => this.setState({ phone: text })}
                                        keyboardType="numeric"
                                        placeholder="Phone Number" />
                                </Item>

                                <Item style={[styles.input, styles.item]} rounded>
                                    <Icon name="mail" style={styles.icon} />
                                    <Input
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ email: text })}
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
    datePicker: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        padding: 8,
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

export default PatientBasicInfoScreen;