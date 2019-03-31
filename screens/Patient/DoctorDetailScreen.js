import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Animated, TimePickerAndroid, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Text, Input, Button, Item, Icon, Textarea, DatePicker, CheckBox, ListItem, Body } from 'native-base';
import shortid from 'shortid';
import { MapView } from 'expo';
import MapThemes from '../../constants/MapThemes';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import ProfilePicAnimHeader from '../../components/Patient/ProfilePicAnimHeader';
import { hidden } from 'ansi-colors';

const TestDoctor = {
    basic: {
        name: "Manisha Gupta",
        dob: "1998-02-05T18:30:00.000Z",
        maritalStatus: "Unmarried"
    },
    appSpec: {
        profilePicture: {
            url: 'http://wwsthemes.com/themes/medwise/v1.4/images/doctor-single.jpg',
            local: 'http://wwsthemes.com/themes/medwise/v1.4/images/doctor-single.jpg'
        }
    },
    currentPatients: [],
    allPatients: [],
    contact: {
        phone: [
            9858985785,
            986584582
        ],
        address: [
            "Powai, Mumbai",
            "st5 vaishalehktu skns2"
        ],
        email: [
            "guptaashsish190@gmail.com",
            "ashishgipta201@gmail.com"
        ]
    },
    qualifications: [
        "MD Gynaecology",
        "MBBS",
    ],
    clinic: {
        name: 'Some Healthcare Camily Clinic',
        location: [
            80.20186,
            13.07209
        ]
    },
    hospital: {
        name: 'GSVM Hospital',
        location: [
            80.20186,
            13.07209
        ]
    }
}

const PROFILEPIC_WIDTH = 200;
const MIN_PROFILE_WIDTH = 40;
const PROFILEPIC_MARGIN = 20;

class DoctorDetailScreen extends Component {
    // doctor = this.props.navigation.getParam('doctor', {});
    state = {
        scrollY: new Animated.Value(0),
        selectedTime: {
            hour: null,
            minute: null
        },
        selectedDate: null,
    }
    getAge = () => {
        const currentYear = new Date().getFullYear();
        const doctorYear = new Date(TestDoctor.basic.dob).getFullYear();
        return currentYear - doctorYear;
    }

    getQualifications = () => (
        TestDoctor.qualifications.map(elem => (
            <Button style={styles.qTag} key={shortid.generate()}>
                <Text uppercase={false} style={{
                    color: 'white',
                    fontWeight: 'bold',
                }} >{elem}</Text>
            </Button>
        ))
    )
    setDate = (newDate) => {
        this.setState({ selectedDate: newDate });
    }
    openTimePicker = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: false,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                this.setState({
                    selectedTime: {
                        hour,
                        minute
                    }
                });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    render() {

        const ImageAnimatedStyle = {
            width: this.state.scrollY.interpolate({
                inputRange: [0, PROFILEPIC_WIDTH],
                outputRange: [PROFILEPIC_WIDTH, 50],
                extrapolate: 'clamp'
            }),
            height: this.state.scrollY.interpolate({
                inputRange: [0, PROFILEPIC_WIDTH],
                outputRange: [PROFILEPIC_WIDTH, 50],
                extrapolate: 'clamp'
            }),
            right: this.state.scrollY.interpolate({
                inputRange: [0, PROFILEPIC_WIDTH],
                outputRange: [Layout.window.width / 2 - this.state.scrollY / 2 - 20, 0],
                extrapolate: 'clamp'
            }),
            transform: [{
                translateY: this.state.scrollY.interpolate({
                    inputRange: [0, PROFILEPIC_WIDTH, PROFILEPIC_WIDTH + MIN_PROFILE_WIDTH],
                    outputRange: [0, 0, -50]
                })
            }]

        }
        return (
            <Container style={styles.container}>
                <ProfilePicAnimHeader ppMargin={PROFILEPIC_MARGIN} scrollY={this.state.scrollY} ppMaxWidth={PROFILEPIC_WIDTH} ppImageUri={TestDoctor.appSpec.profilePicture.local} ppWidth={MIN_PROFILE_WIDTH} navigation={this.props.navigation} title={TestDoctor.basic.name} />
                <Content style={{
                    overflow: 'hidden',
                }}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                >
                    <Animated.Image style={[styles.profilePicture, ImageAnimatedStyle]} source={{ uri: TestDoctor.appSpec.profilePicture.local }} />
                    <ScrollView
                        onScroll={Animated.event([{
                            nativeEvent: { contentOffset: { y: this.state.scrollY } }
                        }])}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ alignItems: 'center' }}
                    >
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            <View style={{ height: PROFILEPIC_WIDTH + 80 }} />
                            <View style={styles.basicInfo}>
                                <View style={styles.info}>
                                    <Text style={styles.infoKey}>Name</Text>
                                    <Text style={styles.infoText}>{TestDoctor.basic.name}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoKey}>Age</Text>
                                    <Text style={styles.infoText}>{this.getAge()}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoKey}>Marital Status</Text>
                                    <Text style={styles.infoText}>{TestDoctor.basic.maritalStatus || '-'}</Text>
                                </View>
                                <View style={[styles.info, { flexDirection: 'column' }]}>
                                    <Text style={styles.infoKey}>Qualifications</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10, width: '90%', flexWrap: 'wrap' }}>
                                        {this.getQualifications()}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.clinic}>
                                <Text style={styles.clinicText}>Clinic</Text>
                                <Text style={styles.clinicName}>{TestDoctor.clinic.name}</Text>
                                <View pointerEvents='none'>
                                    <MapView
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: TestDoctor.clinic.location[1],
                                            longitude: TestDoctor.clinic.location[0],
                                            longitudeDelta: 0.04,
                                            latitudeDelta: 0.04,
                                        }}
                                    >
                                        <MapView.Marker
                                            title={TestDoctor.clinic.name}
                                            coordinate={{ longitude: TestDoctor.clinic.location[0], latitude: TestDoctor.clinic.location[1] }}
                                        />
                                    </MapView>
                                </View>
                            </View>
                            <View style={styles.clinic}>
                                <Text style={styles.clinicText}>Hospital</Text>
                                <Text style={styles.clinicName}>{TestDoctor.hospital.name}</Text>

                                <View pointerEvents='none'>
                                    <MapView
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: TestDoctor.hospital.location[1],
                                            longitude: TestDoctor.hospital.location[0],
                                            longitudeDelta: 0.04,
                                            latitudeDelta: 0.04,
                                        }}
                                    >
                                        <MapView.Marker
                                            title={TestDoctor.hospital.name}
                                            coordinate={{ longitude: TestDoctor.hospital.location[0], latitude: TestDoctor.hospital.location[1] }}
                                        />
                                    </MapView>
                                </View>
                            </View>
                            <View style={[styles.basicInfo, styles.form]}>
                                <Text style={styles.clinicText}>Form</Text>
                                <Text style={styles.clinicName}>Fill in the following form</Text>
                                <Item style={{ marginTop: 20 }} rounded>
                                    <Icon name="heart" style={{ color: Colors.primary }} />
                                    <Input
                                        placeholderTextColor="#bbb"
                                        placeholder="Problem Name"
                                        value={this.state.problemName}
                                        onChangeText={t => this.setState({ problemName: t })} />
                                </Item>
                                <View style={styles.textArea}>
                                    <Icon name="list" style={{ color: Colors.primary }} />
                                    <Textarea placeholderTextColor="#bbb" style={styles.textAreaText} rowSpan={5} placeholder="Short Problem Description" />
                                </View>
                                <TouchableOpacity style={styles.timeField}>
                                    <Icon name="calendar" style={{ color: Colors.primary, marginRight: 10 }} />
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date()}
                                        locale={"en"}
                                        modalTransparent={false}
                                        animationType="fade"
                                        androidMode="default"
                                        placeHolderText="Select Appointment Date"
                                        textStyle={{ color: "black" }}
                                        placeHolderTextStyle={{ color: "#bbb" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.timeField, { paddingTop: 20, paddingBottom: 20, paddingLeft: 0 }]} onPress={() => this.openTimePicker()}>
                                    <Icon name="watch" style={{ color: Colors.primary, marginRight: 23 }} />
                                    {this.state.selectedTime.hour ?

                                        <View style={{
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={[styles.timeValue, { borderRightWidth: 1, borderColor: '#ddd' }]}>{this.state.selectedTime.hour} Hrs</Text>
                                            <Text style={styles.timeValue}>{this.state.selectedTime.minute} Mins</Text>
                                        </View>
                                        :
                                        <Text style={{ color: '#bbb' }}>Appointment Time</Text>
                                    }
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                                    <CheckBox checked />
                                    <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>Share Bio</Text>
                                </View>
                            </View>
                            <View>
                                <Button style={styles.requestButton}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }} uppercase={false}>Request Appointment</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </Content>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBarHeight,
    },
    basicInfo: {
        width: '90%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 4
    },
    clinic: {
        marginTop: 20,
        borderRadius: 10,
        width: '90%',
        backgroundColor: 'white',
        paddingTop: 10,
        elevation: 4
    },
    form: {
        marginTop: 20,
    },
    requestButton: {
        height: 70,
        margin: 40,
        borderRadius: 20,
        padding: 20,
        marginBottom: 40,
        backgroundColor: Colors.primary

    },
    clinicName: {
        textAlign: 'center',
        fontSize: 15,
        fontStyle: 'italic',
        color: '#ccc',
        fontWeight: 'bold'
    },
    clinicText: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        color: Colors.primary
    },
    info: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.lightBackground
    },
    infoKey: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    infoText: {
        marginLeft: 10,
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: 200
    },
    qTag: {
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: Colors.primary,
    },
    profilePicture: {
        position: 'absolute',
        top: 0,
        margin: PROFILEPIC_MARGIN,
        borderColor: '#ddd',
        borderRadius: 200,
        borderWidth: 1,
        width: PROFILEPIC_WIDTH,
        height: PROFILEPIC_WIDTH
    },
    textArea: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textAreaText: {
        borderLeftWidth: 1,
        borderColor: '#ddd',
        flexGrow: 1,
        fontSize: 17,
        borderWidth: 0,
        marginLeft: 5,
    },
    timeField: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        borderRadius: 25,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    timeValue: {
        paddingLeft: 10,
        paddingRight: 10
    },
    shareBio: {
        flexDirection: 'row',
    }
});

export default DoctorDetailScreen