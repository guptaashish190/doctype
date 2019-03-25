import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';
import { Text, Card, CardItem } from 'native-base';

import Colors from '../../constants/Colors';
import { MapView, Marker } from 'expo';

class MapCard extends Component {

    render() {
        return (
            <Card style={styles.container}>
                <CardItem header style={styles.header}>
                    <Text style={{ color: 'black' }}>{this.props.title}</Text>
                </CardItem>
                <CardItem style={styles.locName}>
                    <Text style={styles.locNameText}>{this.props.name}</Text>
                </CardItem>
                <CardItem >
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.props.latitude,
                            longitude: this.props.longitude,
                            longitudeDelta: this.props.longitudeDelta || 0.04,
                            latitudeDelta: this.props.latitudeDelta || 0.04,
                        }}
                    >
                        <MapView.Marker
                            title={this.props.title}
                            description=""
                            coordinate={{ longitude: this.props.longitude, latitude: this.props.latitude }}
                        />
                    </MapView>
                </CardItem>

            </Card>
        );
    }
}

// PropTypes
MapCard.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        borderTopLeftRadius: 20,
        marginTop: 30,
        marginBottom: 10,
        zIndex: 0,
    },
    map: {
        width: '100%',
        height: 200
    },
    locName: {
        paddingBottom: 0,
        width: '100%',
        alignItems: 'flex-start',
    },
    locNameText: {
        color: '#888',
        fontSize: 13,
        fontStyle: 'italic'
    },
    header: {
        backgroundColor: Colors.doctorColors.lightPrimary,
        borderTopLeftRadius: 20,
        width: '100%',
        height: 40,
        justifyContent: 'center',
    },
    content: {
        padding: 10
    },
    cardElement: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'rgba(22, 54, 96, 0.2)'
    },
    elementKey: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.doctorColors.primary
    },
    elementValue: {
    }
});

export default MapCard