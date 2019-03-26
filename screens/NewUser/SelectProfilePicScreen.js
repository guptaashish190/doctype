import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, TouchableNativeFeedback, Animated, Easing } from 'react-native';
import { Container, Content, Text, Icon, ActionSheet, Root } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';


const DEFAULT_IMAGE_URI = 'https://i.stack.imgur.com/l60Hf.png';

class SelectProfilePicScreen extends Component {

    state = {
        selectedImage: null,
        titleOpacity: new Animated.Value(0),
        mainOpacity: new Animated.Value(0),
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

    onNextPress = () => {
        const userInfo = this.props.navigation.getParam('userInfo', {});

        this.props.navigation.navigate('AddQualificationsSpec', {
            userInfo: {
                ...userInfo,
                profilePicture: {
                    url: '',
                    local: this.state.selectedImage
                }

            }
        });
    }

    onChooseImage = async () => {
        const BUTTONS = [
            { text: "Open Camera", icon: "camera", iconColor: "#2c8ef4" },
            { text: "Choose from photos", icon: "images", iconColor: "#f42ced" },
        ];
        var DESTRUCTIVE_INDEX = 3;
        var CANCEL_INDEX = 4;

        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Choose Source"
            },
            async buttonIndex => {

                if (buttonIndex !== CANCEL_INDEX) {
                    // Gallery
                    if (buttonIndex === 1) {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            allowsEditing: true,
                            aspect: [1, 1],
                            mediaTypes: 'Images'
                        });

                        if (!result.cancelled) {
                            this.setState({ selectedImage: result.uri });
                        }
                    } else {
                        // Camera
                        const { status } = await Permissions.askAsync(Permissions.CAMERA);
                        if (status === 'granted') {
                            let result = await ImagePicker.launchCameraAsync({
                                allowsEditing: true,
                                aspect: [1, 1],
                            });
                            if (!result.cancelled) {
                                this.setState({ selectedImage: result.uri });
                            }
                        }

                    }
                }
            }
        )
    }

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
            <Root>
                <Container style={styles.container}>
                    <Content contentContainerStyle={styles.content}>
                        <Animated.Text style={[styles.title, TitleAnimatedStyle]}>
                            {`Choose a\nProfile Picture`}
                        </Animated.Text>
                        <Animated.View style={[styles.mainContainer, MainAnimatedStyle]}>
                            <TouchableNativeFeedback onPress={() => this.onChooseImage()}>
                                <Image style={styles.mainImage} source={{ uri: this.state.selectedImage || DEFAULT_IMAGE_URI }} />
                            </TouchableNativeFeedback>
                            <TouchableOpacity onPress={() => this.onNextPress()} style={styles.nextButtonContainer} activeOpacity={0.8}>
                                <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.skipContainer}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </Content>
                </Container>
            </Root>
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
        alignSelf: 'flex-start'
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