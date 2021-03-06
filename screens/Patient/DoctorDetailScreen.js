import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Animated, TimePickerAndroid } from 'react-native';
import { Container, Content, Text, Input, Button, Toast, Item, Icon, Textarea, DatePicker, CheckBox } from 'native-base';
import shortid from 'shortid';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import config from '../../config';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import ProfilePicAnimHeader from '../../components/Patient/ProfilePicAnimHeader';
import Axios from 'axios';

const PROFILEPIC_WIDTH = 200;
const MIN_PROFILE_WIDTH = 40;
const PROFILEPIC_MARGIN = 20;

class DoctorDetailScreen extends Component {

    doctor = this.props.navigation.getParam('doctor', {});
    // doctor = this.props.navigation.getParam('doctor', {});
    state = {
        scrollY: new Animated.Value(0),
        selectedTime: false,
        selectedDate: null,
        problemName: '',
        problemDesc: '',
        shareBio: true,
    }
    getAge = () => {
        const currentYear = new Date().getFullYear();
        const doctorYear = new Date(this.doctor.basic.dob).getFullYear();
        return currentYear - doctorYear;
    }

    getQualifications = () => (
        this.doctor.qualifications.map(elem => (
            <Button style={styles.qTag} key={shortid.generate()}>
                <Text uppercase={false} style={{
                    color: 'white',
                    fontWeight: 'bold',
                }} >{elem}</Text>
            </Button>
        ))
    )
    setDate = (newDate) => {
        const date = this.state.selectedDate ? this.state.selectedDate : new Date();
        date.setFullYear(newDate.getFullYear());
        date.setMonth(newDate.getMonth());
        date.setDate(newDate.getDate());
        this.setState({
            selectedDate: date,
            error: this.state.error ? this.state.error.replace('date', '') : null
        });
    }
    openTimePicker = async () => {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: false,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const date = this.state.selectedDate ? this.state.selectedDate : new Date();
                date.setHours(hour);
                date.setMinutes(minute)
                this.setState({
                    selectedDate: date,
                    selectedTime: 'selected',
                    error: this.state.error ? this.state.error.replace('time', '') : null
                });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    getTimeString = () => {
        const hour = this.state.selectedDate.getHours();
        const minute = this.state.selectedDate.getMinutes();
        if (hour > 12) {
            return `${hour - 12}:${minute < 10 ? `0${minute}` : minute} PM`;
        } else {
            return `${hour}:${minute < 10 ? `0${minute}` : minute} AM`;
        }
    }

    onSubmit = () => {

        if (this.validateFormatForm()) {
            const body = {
                date: this.state.selectedDate,
                name: this.state.problemName,
                description: this.state.problemDesc,
                shareBio: this.state.shareBio,
                status: 'Request Pending',
                patientID: this.props.userID,
                doctorID: this.doctor._id
            }
            Axios.post(`${config.backend}/patient/requestAppointment`, body).then(({ data }) => {
                console.log(data);
                if (data.success) {
                    showMessage({
                        message: "Success",
                        description: data.message,
                        type: "success",
                        duration: 2500
                    });
                } else {
                    showMessage({
                        message: "Error",
                        description: data.message,
                        type: "danger",
                        duration: 2500
                    });
                }
            });
        } else {
            Toast.show({
                text: "Fill all the fields",
                type: 'danger',
                duration: 3000,
            })
        }
    }

    validateFormatForm = () => {
        let errorString = '';
        if (!this.state.selectedDate) {
            errorString = errorString + 'date';
        }
        if (!this.state.selectedTime) {
            errorString = errorString + 'time';
        }
        if (!this.state.problemName) {
            errorString = errorString + 'name';
        }
        if (!this.state.problemDesc) {
            errorString = errorString + 'desc';
        }
        this.setState({
            error: errorString.length ? errorString : null,
        });
        return errorString.length === 0

    }
    isError = type => {
        if (this.state.error && this.state.error.includes(type)) {
            return true;
        }
        return false;
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
                <ProfilePicAnimHeader ppMargin={PROFILEPIC_MARGIN} scrollY={this.state.scrollY} ppMaxWidth={PROFILEPIC_WIDTH} ppImageUri={this.doctor.appSpec.profilePicture.local} ppWidth={MIN_PROFILE_WIDTH} navigation={this.props.navigation} title={this.doctor.basic.name} />
                <Content style={{
                    overflow: 'hidden',
                }}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                >
                    <Animated.Image style={[styles.profilePicture, ImageAnimatedStyle]} source={{ uri: this.doctor.appSpec.profilePicture.local }} />
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
                                    <Text style={styles.infoText}>{this.doctor.basic.name}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoKey}>Age</Text>
                                    <Text style={styles.infoText}>{this.getAge()}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoKey}>Marital Status</Text>
                                    <Text style={styles.infoText}>{this.doctor.basic.maritalStatus || '-'}</Text>
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
                                <Text style={styles.clinicName}>{this.doctor.clinic.name}</Text>
                                <View pointerEvents='none'>
                                    <MapView
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: this.doctor.clinic.location[1],
                                            longitude: this.doctor.clinic.location[0],
                                            longitudeDelta: 0.04,
                                            latitudeDelta: 0.04,
                                        }}
                                    >
                                        <MapView.Marker
                                            title={this.doctor.clinic.name}
                                            coordinate={{ longitude: this.doctor.clinic.location[0], latitude: this.doctor.clinic.location[1] }}
                                        />
                                    </MapView>
                                </View>
                            </View>
                            <View style={styles.clinic}>
                                <Text style={styles.clinicText}>Hospital</Text>
                                <Text style={styles.clinicName}>{this.doctor.hospital.name}</Text>

                                <View pointerEvents='none'>
                                    <MapView
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: this.doctor.hospital.location[1],
                                            longitude: this.doctor.hospital.location[0],
                                            longitudeDelta: 0.04,
                                            latitudeDelta: 0.04,
                                        }}
                                    >
                                        <MapView.Marker
                                            title={this.doctor.hospital.name}
                                            coordinate={{ longitude: this.doctor.hospital.location[0], latitude: this.doctor.hospital.location[1] }}
                                        />
                                    </MapView>
                                </View>
                            </View>
                            <View style={[styles.basicInfo, styles.form]}>
                                <Text style={styles.clinicText}>Form</Text>
                                <Text style={styles.clinicName}>Fill in the following form</Text>
                                <Item error={this.isError('name')} style={{ marginTop: 20 }} rounded>
                                    <Icon name="heart" style={{ color: Colors.primary }} />
                                    <Input
                                        placeholderTextColor="#bbb"
                                        placeholder="Problem Name"
                                        value={this.state.problemName}
                                        onChangeText={t => this.setState({ problemName: t, error: this.state.error ? this.state.error.replace('name', '') : null })} />
                                    {this.isError('name') ? <Icon name="close-circle" /> : null}
                                </Item>
                                <View style={[styles.textArea, {
                                    borderColor: this.isError('desc') ? 'red' : '#ccc',
                                }]}>
                                    <Icon name="list" style={{ color: Colors.primary }} />
                                    <Textarea
                                        placeholderTextColor="#bbb"
                                        style={styles.textAreaText}
                                        rowSpan={5}
                                        placeholder="Short Problem Description"
                                        onChangeText={t => this.setState({ problemDesc: t, error: this.state.error ? this.state.error.replace('desc', '') : null })}
                                        value={this.state.problemDesc}
                                    />

                                    {this.isError('desc') ? <Icon style={{ color: 'red' }} name="close-circle" /> : null}
                                </View>
                                <TouchableOpacity style={[styles.timeField, {
                                    borderColor: this.isError('date') ? 'red' : '#ccc',
                                }]}>
                                    <Icon name="calendar" style={{ color: Colors.primary, marginRight: 10 }} />
                                    <View style={{ flexGrow: 1 }}>
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
                                    </View>
                                    {this.isError('date') ? <Icon style={{ color: 'red' }} name="close-circle" /> : null}
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.timeField, {
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    paddingLeft: 0,
                                    borderColor: this.isError('time') ? 'red' : '#ccc',
                                }]}
                                    onPress={() => this.openTimePicker()}>
                                    <Icon name="watch" style={{ color: Colors.primary, marginRight: 23 }} />
                                    {this.state.selectedTime ?
                                        <Text style={styles.timeValue}>{this.getTimeString()}</Text>
                                        :
                                        <Text style={{
                                            color: '#bbb',
                                            flexGrow: 1
                                        }}>Appointment Time</Text>
                                    }
                                    {this.isError('time') ? <Icon style={{ color: 'red' }} name="close-circle" /> : null}

                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                                    <CheckBox onPress={() => this.setState({ shareBio: !this.state.shareBio })} checked={this.state.shareBio} />
                                    <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>Share Bio</Text>
                                </View>
                            </View>
                            <View>
                                <Button onPress={() => this.onSubmit()} style={styles.requestButton}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }} uppercase={false}>Request Appointment</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </Content>
                <FlashMessage position="top" />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
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

const mapStateToProps = state => ({
    userID: state.UserInfo.user._id,
})

export default connect(mapStateToProps)(DoctorDetailScreen);