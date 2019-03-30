import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableNativeFeedback, ScrollView } from 'react-native';
import { Container, Content, Text, Input, Button } from 'native-base';
import shortid from 'shortid';
import { MapView } from 'expo';
import MapThemes from '../../constants/MapThemes';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';
import BasicHeader from '../../components/Patient/BasicHeader';

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

class DoctorDetailScreen extends Component {
    // doctor = this.props.navigation.getParam('doctor', {});

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

    render() {
        return (
            <Container style={styles.container}>
                <BasicHeader navigation={this.props.navigation} title={TestDoctor.basic.name} />
                <Content contentContainerStyle={styles.content} >
                    <Image style={styles.profilePicture} source={{ uri: TestDoctor.appSpec.profilePicture.local }} />
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
                    <View style={styles.clinic}>
                        <Text style={styles.clinicText}>Hospital</Text>
                        <Text style={styles.clinicName}>{TestDoctor.hospital.name}</Text>
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
                                title={TestDoctor.clinic.name}
                                coordinate={{ longitude: TestDoctor.hospital.location[0], latitude: TestDoctor.hospital.location[1] }}
                            />
                        </MapView>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBarHeight,
        paddingBottom: 20
    },
    basicInfo: {
        width: '90%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 4
    },
    content: {
        alignItems: 'center'
    },
    clinic: {
        marginTop: 20,
        borderRadius: 10,
        width: '90%',
        backgroundColor: 'white',
        paddingTop: 10,
        elevation: 4
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
        margin: 20,
        borderColor: '#ddd',
        borderRadius: 200,
        borderWidth: 1,
        width: 200,
        height: 200
    }
});

export default DoctorDetailScreen