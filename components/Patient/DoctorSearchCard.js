
import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Text, Thumbnail } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout';
import Colors from '../../constants/Colors';
class DoctorSearchCard extends Component {

    state = {
        contOpacity: new Animated.Value(0)
    }
    componentDidMount() {
        Animated.timing(this.state.contOpacity, {
            toValue: 1,
            useNativeDriver: true,
            duration: 600,
            easing: Easing.bezier(.16, .83, .23, 1.03)
        }).start();
        console.log(this.props.doctor.qualifications);
    }

    onPress = () => {
        this.props.navigation.navigate('DoctorDetail', {
            doctor: this.props.doctor
        });
    }

    render() {

        const animatedContStyle = {
            opacity: this.state.contOpacity,
            width: '100%',
            alignItems: 'center'
        }
        return (
            <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.8} onPress={() => this.onPress()}>
                <Animated.View style={animatedContStyle}>
                    <Card listItemPadding style={styles.container}>
                        <CardItem style={[styles.head, styles.item]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                                <Thumbnail small source={{ uri: this.props.doctor.appSpec ? this.props.doctor.appSpec.profilePicture.local : 'https://i.stack.imgur.com/l60Hf.png' }} />
                                <Text style={styles.headText}>
                                    {this.props.doctor.basic.name}
                                </Text>

                            </View>
                            <Text style={[styles.infoText, styles.right]}>
                                {this.props.doctor.qualifications ? this.props.doctor.qualifications[0] : '-'}
                            </Text>
                        </CardItem>


                        <CardItem style={[styles.item]}>
                            <Text style={styles.infoKey}>Phone </Text>
                            <Text>
                                {this.props.doctor.contact.phone[0]}
                            </Text>
                        </CardItem>

                        <CardItem style={[styles.item]}>
                            <Text style={styles.infoKey}>Email</Text>
                            <Text>
                                {this.props.doctor.contact.email[0]}
                            </Text>
                        </CardItem>

                        <CardItem style={[styles.item, styles.bottom]}>
                            <Text style={styles.infoKey}>Address</Text>
                            <Text>
                                {this.props.doctor.contact.address ? this.props.doctor.contact.address[0] : '-'}
                            </Text>
                        </CardItem>
                    </Card>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginBottom: 10,
        width: '90%',
        backgroundColor: Colors.backgroundColor,
        elevation: 4,
        borderRadius: 10,
    },
    headText: {
        padding: 10,
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 19
    },
    infoText: {
        fontSize: 13,
    },
    infoKey: {
        marginRight: 7,
        color: '#afafaf',
        fontStyle: 'italic'
    },
    item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
    head: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        justifyContent: 'space-between'
    },
    right: {
        color: '#4c9fff',
        fontWeight: 'bold',
        fontSize: 12,
        padding: 10,
        width: '50%',
        textAlign: 'right'
    },
    bottom: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingBottom: 10
    },

});

export default DoctorSearchCard