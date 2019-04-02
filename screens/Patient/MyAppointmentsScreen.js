import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Axios from 'axios';
import { Container, Content, Text, Card, View, Spinner, Toast, SwipeRow, Button, Icon } from 'native-base';
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
        this.setState({
            loading: true
        });
        Axios.get(`${config.backend}/patient/getAppointments`, { params: { patientID: this.props.userID } }).then(({ data }) => {
            console.log(data);
            let a = data.appointments;
            a = a.map(e => ({ ...e, key: shortid.generate() }));
            this.setState({
                appointments: a,
                loading: false
            });
        }).catch(err => {
            this.setState({
                loading: false,
            });
            Toast.show({
                text: "Error Occured",
                type: 'danger',
                duration: 3000,
            })
        });
    }

    timeToString = (date) => {
        const d = new Date(date);
        const hour = d.getHours();
        const minute = d.getMinutes();
        if (hour > 12) {
            return `${hour - 12}:${minute < 10 ? `0${minute}` : minute} PM`;
        } else {
            return `${hour}:${minute < 10 ? `0${minute}` : minute} AM`;
        }
    }

    getTimeLeftString = date => {
        const date1 = new Date();
        const date2 = new Date(date);
        const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
        if (!diffDays) {
            const diffHours = parseInt((date2 - date1) / (1000 * 60 * 60));
            return diffHours > 0 ? `${diffHours} Hours Left` : null;
        }
        return diffDays >= 0 ? `${diffDays} Days Left` : null;
    }

    getCardColor = status => {
        switch (status) {
            case 'Request Pending':
                return '#ffc107';
            case 'Rejected':
                return '#dc3545';
            case 'Accepted':
                return '#28a745';
            case 'Finished':
                return '#68a2ff'
            default:
                return Colors.primary
        }
    }


    renderAppointment = appointment => (
        <View style={{ width: '100%' }}>
            <View style={[styles.item, styles.name]}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{appointment.doctorName}</Text>
                <Text style={{ fontWeight: 'bold', color: '#aaa', fontStyle: 'italic' }}>{this.getTimeLeftString(appointment.date)}</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{appointment.name}</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={{ fontSize: 15, color: '#aaa', fontStyle: 'italic' }}>{appointment.description}</Text>
            </View>
            <View style={[styles.item, { flexDirection: 'row' }]}>
                <Text style={{ paddingRight: 10, borderRightWidth: 1, borderRightColor: '#ccc' }}>{new Date(appointment.date).toLocaleDateString()}</Text>
                <Text style={{ paddingLeft: 10 }}>{this.timeToString(appointment.date)}</Text>
            </View>
            <View style={[styles.item]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>Status:</Text>
                    <Text style={{ color: this.getCardColor(appointment.status), fontWeight: 'bold' }}> {appointment.status}</Text>
                </View>
            </View>
        </View>
    )

    // Returns Appointment Card
    // getAppointments = () => {
    //     return this.state.appointments.map(appointment => (
    //         <SwipeRow
    //             leftOpenValue={75}
    //             rightOpenValue={-75}
    //             left={
    //                 <Button success onPress={() => alert(item.value)} >
    //                     <Icon active name="add" />
    //                 </Button>
    //             }
    //             body={() => this.renderAppointment(appointment)}
    //             right={
    //                 <Button danger onPress={() => this.removeItem(item.key)}>
    //                     <Icon active name="trash" />
    //                 </Button>
    //             }
    //             style={styles.appointmentCard}
    //         />
    //     ));
    // }

    renderSwipeableRow = appointment => (
        <View style={[styles.swipeCont, { borderRightColor: this.getCardColor(appointment.status), }]}>
            <SwipeRow
                rightOpenValue={-75}
                leftOpenValue={0}
                body={this.renderAppointment(appointment)}
                right={
                    <Button style={{ backgroundColor: this.getCardColor(appointment.status) }} onPress={() => this.removeItem(item.key)}>
                        <Icon active name="trash" />
                    </Button>
                }
                style={{ width: '100%', backgroundColor: 'white', paddingRight: 0 }}
            />
        </View>
    )


    render() {
        return (
            <Container style={styles.container}>
                <BasicHeader title="My Appointments" navigation={this.props.navigation} />
                <Content style={{ width: '100%', marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
                    {this.state.loading ? <Spinner color={Colors.primary} /> : null}
                    <FlatList
                        style={{ width: '100%' }}
                        contentContainerStyle={{ alignItems: 'center', flex: 1 }}
                        data={this.state.appointments}
                        renderItem={({ item }) => this.renderSwipeableRow(item)}
                    />
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
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 4,
    },
    name: {
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    item: {
        padding: 5,
        marginLeft: 10,
        marginRight: 10
    },
    swipeCont: {
        elevation: 4,
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
        width: '90%',
        borderRightWidth: 10
    }
});

const mapStateToProps = state => ({
    userID: state.UserInfo.user._id,
})

export default connect(mapStateToProps)(MyAppointmentsScreen)