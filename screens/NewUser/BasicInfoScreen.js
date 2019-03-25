import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Item, Input, DatePicker, ActionSheet, Root, Icon } from 'native-base';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { StatusBarHeight } from '../../constants/Layout';

var BUTTONS = ["Married", 'Unmarried'];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class BasicInfoScreen extends Component {

    state = {
        name: '',
        phone: '',
        email: '',
        dob: '',
        mStatus: 'Unmarried'
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

    render() {
        return (
            <Root>
                <Container style={styles.container}>
                    <Content style={{ width: '100%' }} contentContainerStyle={styles.content}>
                        <Text style={styles.title}>
                            Fill out your basic info
                    </Text>
                        <View style={styles.inputContainer}>
                            <Item style={[styles.input, styles.item]} rounded>
                                <Input
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChangeText={text => this.setState({ name: text })}
                                />
                            </Item>
                            <View style={[styles.datePicker, styles.item]}>
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
                            </View>
                            <TouchableOpacity style={[styles.datePicker, styles.item]} onPress={() => this.onMStatus()}>

                                <Text style={{ padding: 8, color: '#666' }}>
                                    {this.state.mStatus}
                                </Text>
                            </TouchableOpacity>
                            <Item style={[styles.input, styles.item]} rounded>
                                <Input
                                    value={this.state.phone}
                                    onChangeText={text => this.setState({ phone: text })}
                                    keyboardType="numeric"
                                    placeholder="Phone Number" />
                            </Item>

                            <Item style={[styles.input, styles.item]} rounded>
                                <Input
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChangeText={text => this.setState({ email: text })}
                                />
                            </Item>
                        </View>
                        <TouchableOpacity style={styles.nextButtonContainer} activeOpacity={0.8}>
                            <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                        </TouchableOpacity>
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
    inputContainer: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center'
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

export default BasicInfoScreen;