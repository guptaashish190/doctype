import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Axios from 'axios';
import { Container, Content, Text, Card, View } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout';
import config from '../../config';
import Colors from '../../constants/Colors';
import BasicHeader from '../../components/Patient/BasicHeader';


const TestApp = [
    {
        name: "Joint Pain",
        description: "Severe Joint pain in the left leg.",
        doctorID: 'Some ID',
        patientID: 'paindn',
        time: {
            hour: '17',
            minute: '46'
        },
        date: new Date(2019, 0, 23),
        shareBio: true,
        status: 'Requested',
        doctorname: 'Dr. Manisha Gupta'
    },
    {
        name: "Joint Pain",
        description: "Severe Joint pain in the left leg.",
        doctorID: 'Some ID',
        patientID: 'paindn',
        time: {
            hour: '17',
            minute: '46'
        },
        date: new Date(),
        shareBio: true,
        status: 'Rejected',
        doctorname: 'Dr. Manisha Gupta'
    },
    {
        name: "Joint Pain",
        description: "Severe Joint pain in the left leg.",
        doctorID: 'Some ID',
        patientID: 'paindn',
        time: {
            hour: '17',
            minute: '46'
        },
        date: new Date(2019, 0, 23),
        shareBio: true,
        status: 'Accepted',
        doctorname: 'Dr. Manisha Gupta'
    }
]

class MyAppointmentsScreen extends Component {

    state = {
        appointments: []
    }

    componentWillMount() {
        // Axios.get(`${config.backend}/patient/getAppointments`, { params: { patientID: this.props.userID } }).then(({ data }) => {
        //     console.log(data);
        // });
    }

    timeToString = ({ hour, minute }) => {
        if (hour > 12) {
            return `${hour - 12}:${minute < 10 ? `0${minute}` : minute} PM`;
        } else {
            return `${hour - 12}:${minute < 10 ? `0${minute}` : minute} AM`;
        }
    }

    getTimeLeft = date => {
        var date2 = new Date();
        var diffDays = parseInt((date2 - date) / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    getCardColor = status => {
        switch (status) {
            case 'Requested':
                return '#ffc107';
            case 'Rejected':
                return '#dc3545';
            case 'Accepted':
                return '#28a745';
            default:
                return Colors.primary
        }
    }

    getAppointments = () => {
        return TestApp.map(appointment => (
            <View style={[styles.appointmentCard, { borderColor: this.getCardColor(appointment.status) }]} key={shortid.generate()}>
                <View style={[styles.item, styles.name]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{appointment.doctorname}</Text>
                    <Text style={{ fontWeight: 'bold', color: '#aaa' }}>{this.getTimeLeft(appointment.date)} Days Left</Text>
                </View>
                <View style={[styles.item]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{appointment.name}</Text>
                </View>
                <View style={[styles.item]}>
                    <Text style={{ fontSize: 15, color: '#aaa', fontStyle: 'italic' }}>{appointment.description}</Text>
                </View>
                <View style={[styles.item, { flexDirection: 'row' }]}>
                    <Text style={{ paddingRight: 10, borderRightWidth: 1, borderRightColor: '#ccc' }}>{appointment.date.toLocaleDateString()}</Text>
                    <Text style={{ paddingLeft: 10 }}>{this.timeToString(appointment.time)}</Text>
                </View>
                <View style={[styles.item]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Status:</Text>
                        <Text style={{ color: this.getCardColor(appointment.status), fontWeight: 'bold' }}> {appointment.status}</Text>
                    </View>
                </View>
            </View>
        ));
    }

    render() {
        return (
            <Container style={styles.container}>
                <BasicHeader title="My Appointments" navigation={this.props.navigation} />
                <Content style={{ width: '100%', marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
                    {this.getAppointments()}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        paddingTop: StatusBarHeight,
    },
    appointmentCard: {
        backgroundColor: 'white',
        marginTop: 20,
        width: '90%',
        borderRadius: 20,
        overflow: 'hidden',
        borderTopWidth: 1,
        borderRightWidth: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'red',
        elevation: 4,
        padding: 7,
    },
    name: {
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    item: {
        padding: 5
    },
});

const mapStateToProps = state => ({
    userID: state.UserInfo.user._id,
})

export default connect(mapStateToProps)(MyAppointmentsScreen)