import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform, View, TouchableOpacity } from 'react-native';
import { MapView } from 'expo';
import { Container, Content, Text, Input, Item, Icon } from 'native-base';
import shortid from 'shortid';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';
import MapThemes from '../../constants/MapThemes';
import { FlatList } from 'react-native-gesture-handler';
import config from '../../config';
import Axios from 'axios';

class SelectHospitalScreen extends Component {

    state = {
        searchValue: '',
        suggestions: [],
        userLatitude: null,
        userLongitude: null,
        selectedPlaceTitle: '',
        selectedPlaceDesc: '',
    }

    componentWillMount() {
        this.getUserLocation();
    }

    getSuggestions = text => {
        const query = {
            params: {
                key: config.google.placesAPIKey,
                input: text
            }
        }
        Axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', query).then(res => {
            console.log(res.data);
            const predictions = res.data.predictions.map(p => ({
                key: shortid.generate(),
                title: p.structured_formatting.main_text,
                desc: p.structured_formatting.secondary_text,
            }));
            console.log(predictions);
            this.setState({
                suggestions: predictions
            });
        });
    }

    onSearchChange = text => {
        this.setState({
            searchValue: text
        }, () => {
            this.getSuggestions();
        });
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            console.log(lat, long);
            this.setState({
                userLatitude: lat,
                userLongitude: long
            });

        }, err => {
            Alert.alert(err.message);
        },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    onMapTap = (e) => {
        this.setState({
            userLatitude: e.nativeEvent.coordinate.latitude,
            userLongitude: e.nativeEvent.coordinate.longitude,
        });
    }

    onNextPress = () => {
        this.props.navigation.navigate('SelectHospital');
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={{ width: '100%' }} contentContainerStyle={styles.content}>
                    <Text style={styles.title}>
                        Locate the hospital you work in
                    </Text>
                    {/* Use Places Api */}
                    {/* <View style={styles.searchContainer}>
                        <Item rounded>
                            <Input value={this.state.searchValue} onChangeText={(text) => this.onSearchChange(text)} placeholder="Search" />
                        </Item>
                        <View style={styles.listContainer}>
                            <FlatList
                                data={this.state.suggestions}
                                renderItem={({ item }) => (
                                    <View key={shortid.generate()} style={styles.listItem}>
                                        <Text style={styles.listTitle}>{item.title}</Text>
                                        <Text style={styles.listDesc}>{item.desc}</Text>
                                    </View>
                                )} />
                        </View>
                    </View> */}
                    {this.state.userLatitude ?
                        (
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: this.state.userLatitude,
                                    longitude: this.state.userLongitude,
                                    longitudeDelta: 0.04,
                                    latitudeDelta: 0.04,
                                }}
                                customMapStyle={MapThemes.dark}
                                onPress={e => this.onMapTap(e)}
                            >
                                <MapView.Marker
                                    title={this.state.selectedPlaceTitle}
                                    description={this.state.selectedPlaceDesc}
                                    coordinate={{ longitude: this.state.userLongitude, latitude: this.state.userLatitude }}
                                />
                            </MapView>
                        )
                        :
                        <View style={styles.map} />
                    }
                    {this.state.userLatitude ?


                        <View style={styles.status}>
                            <Text style={styles.statusText}>Lat: {this.state.userLatitude}</Text>
                            <Text style={styles.statusText}>Long: {this.state.userLongitude}</Text>
                        </View> :
                        null
                    }
                    <TouchableOpacity onPress={() => this.onNextPress()} style={styles.nextButtonContainer} activeOpacity={0.8}>
                        <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.skipContainer}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        padding: 50,
    },
    searchContainer: {
        width: '100%',
    },
    listContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        width: '100%'
    },
    status: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statusText: {
        fontSize: 10,
        color: '#aaa',
    },
    listTitle: {
        fontSize: 15,
        color: 'black'
    },
    listDesc: {
        paddingLeft: 10,
        fontSize: 13,
        color: '#aaa',
    },
    map: {
        borderColor: Colors.lightBlue,
        borderWidth: 1,
        borderColor: 5,
        marginTop: 40,
        width: '100%',
        height: '60%'
    },
    nextButton: {
        color: 'white',
        fontSize: 34,
    },
    nextButtonContainer: {
        marginTop: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    skipContainer: {
        width: '100%',
    },
    skipText: {
        alignSelf: 'flex-end',
        fontSize: 15,
        color: '#aaa',
        fontWeight: 'bold',
        borderColor: '#aaa',
        borderBottomWidth: 1,
    }
});

export default SelectHospitalScreen