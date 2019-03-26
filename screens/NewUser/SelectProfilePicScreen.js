import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Button, Icon } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';

class SelectProfilePicScreen extends Component {

    state = {
        selectedImage: '',
    }


    render() {
        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.content}>
                    <Text style={styles.title}>
                        Choose a Profile Picture
                    </Text>
                    <View style={styles.mainContainer}>
                        <Image style={styles.mainImage} source={{ uri: 'https://i.stack.imgur.com/l60Hf.png' }} />

                        <TouchableOpacity onPress={() => this.onNextPress()} style={styles.nextButtonContainer} activeOpacity={0.8}>
                            <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.skipContainer}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: 'center',
        flex: 1,
        padding: 50,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mainImage: {
        marginTop: 20,
        width: 300,
        borderRadius: 150,
        height: 300,
        borderWidth: 3,
        borderColor: '#ccc',
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

export default SelectProfilePicScreen