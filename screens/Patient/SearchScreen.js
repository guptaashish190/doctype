import React, { Component } from 'react';
import { StyleSheet, Alert, Keyboard, ScrollView } from 'react-native';
import Axios from 'axios';
import { Container, Content } from 'native-base';
import shortid from 'shortid';

import { StatusBarHeight } from '../../constants/Layout';
import Colors from '../../constants/Colors';
import SearchHeader from '../../components/Headers/SearchHeader';
import config from '../../config';
import DoctorSearchCard from '../../components/DoctorSearchCard';

class SearchScreen extends Component {
    state = {
        doctors: [],
    }
    onSearch = () => {
        Keyboard.dismiss();
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const data = {
                params: {
                    lat, long
                }
            }
            Axios.get(`${config.backend}/search/getDoctors`, data).then((res) => {
                this.setState({
                    doctors: res.data
                });
            });
        }, err => {
            Alert.alert(err.message);
        },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    mapDoctors = () => this.state.doctors.map(doctor => (
        <DoctorSearchCard key={shortid.generate()} doctor={doctor} />
    ))

    render() {

        return (
            <Container style={styles.container}>
                <SearchHeader onSearch={this.onSearch} title="Search" navigation={this.props.navigation} />
                <Content contentContainerStyle={styles.content}>
                    <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollViewStyle}>
                        {this.mapDoctors()}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
        marginTop: StatusBarHeight,
    },
    content: {
        paddingTop: 20,
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    scrollViewStyle: {
        alignItems: 'center',
        flex: 1,
    }
});

export default SearchScreen