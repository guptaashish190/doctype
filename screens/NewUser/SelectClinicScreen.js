import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { MapView } from 'expo';
import { Container, Content, Text, Input, Item, Icon, Toast } from 'native-base';
import shortid from 'shortid';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';
import MapThemes from '../../constants/MapThemes';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import config from '../../config';
import Axios from 'axios';

class SelectClinicScreen extends Component {

    state = {
        searchValue: '',
        suggestions: [],
        userLatitude: null,
        userLongitude: null,
        selectedPlaceTitle: '',
        selectedPlaceDesc: '',
        titleOpacity: new Animated.Value(0),
        mainOpacity: new Animated.Value(0),
    }

    componentWillMount() {
        this.getUserLocation();
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

    onNextPress = (next) => {
        const userInfo = this.props.navigation.getParam('userInfo', {});

        if (next) {
            if (this.validate()) {
                this.props.navigation.navigate('SelectHospital', {
                    userInfo: {
                        ...userInfo,
                        clinic: {
                            name: this.state.selectedPlaceTitle,
                            location: [this.state.userLongitude, this.state.userLatitude]
                        }
                    }
                });
            }
        } else {
            this.props.navigation.navigate('SelectHospital', {
                userInfo: {
                    ...userInfo,
                    clinic: null
                }
            });
        }


    }

    validate = () => {
        if (!this.state.searchValue.length) {
            this.setState({
                error: 'clinic'
            });
            Toast.show({
                text: "Give a name to the selected place",
                type: 'danger',
                duration: 3000,
            })
            return false;
        }
        return true;
    }

    isError = () => this.state.error && this.state.error.includes('clinic');

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
            <Container style={styles.container}>
                <Content style={{ width: '100%' }} contentContainerStyle={styles.content}>
                    <Animated.Text style={[styles.title, TitleAnimatedStyle]}>
                        Locate Your Clinic
                    </Animated.Text>
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
                    <Animated.View style={[styles.mainContainer, MainAnimatedStyle]}>

                        <Item rounded error={this.isError()}>
                            <Icon name="navigate" style={{ color: '#605eff' }} />
                            <Input
                                onChangeText={t => this.setState({ selectedPlaceTitle: t, error: false })}
                                placeholder="Place Name"
                                value={this.state.selectedPlaceTitle}
                            />
                            {this.isError() ? <Icon name="close-circle" /> : null}
                        </Item>
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
                        <TouchableOpacity onPress={() => this.onNextPress(true)} style={styles.nextButtonContainer} activeOpacity={0.8}>
                            <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onNextPress(false)} style={styles.skipContainer}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </Animated.View>
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
        alignSelf: 'flex-start',
    },
    content: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        padding: 50,
    },
    mainContainer: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
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

export default SelectClinicScreen