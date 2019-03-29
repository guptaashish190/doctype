import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Slider, Picker, TouchableOpacity, Animated, Easing } from 'react-native';
import { Container, Content, Text, Item, Input, DatePicker, ActionSheet, Icon } from 'native-base';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { StatusBarHeight } from '../../../constants/Layout';

class PatientBodyScreen extends Component {

    state = {
        height: 170,
        weight: 70,
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
        const userInfo = this.props.navigation.getParam("userInfo", {});
        this.props.navigation.navigate('PatientSelectProfilePric', {
            userInfo: {
                ...userInfo,
                basic: {
                    ...userInfo.basic,
                    height: this.state.height,
                    weight: this.state.weight,
                }
            }
        });
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
            <Container style={styles.container}>
                <Content style={{ width: '100%' }} contentContainerStyle={styles.content}>
                    <Animated.Text style={[styles.title, TitleAnimatedStyle]}>
                        {`Some more!`}
                    </Animated.Text>
                    <Animated.View style={[styles.mainContainer, MainAnimatedStyle]}>
                        <View style={styles.inputContainer}>
                            <View style={styles.item}>
                                <View style={styles.titleSection}>
                                    <Text style={styles.itemTitle}>Height</Text>
                                    <Text style={styles.itemValue}>{this.state.height} cm</Text>
                                </View>
                                <Slider
                                    maximumValue={200}
                                    anima
                                    minimumValue={10}
                                    thumbTintColor={Colors.purple}
                                    step={1}
                                    style={{ marginTop: 10 }}
                                    value={this.state.height}
                                    onValueChange={height => this.setState({ height })}
                                    minimumTrackTintColor={Colors.purple}
                                />
                            </View>
                            <View style={styles.item}>
                                <View style={styles.titleSection}>
                                    <Text style={styles.itemTitle}>Weight</Text>
                                    <Text style={styles.itemValue}>{this.state.weight} Kg</Text>
                                </View>
                                <Slider
                                    maximumValue={200}
                                    anima
                                    minimumValue={10}
                                    thumbTintColor={Colors.purple}
                                    step={1}
                                    style={{ marginTop: 10 }}
                                    value={this.state.weight}
                                    onValueChange={weight => this.setState({ weight })}
                                    minimumTrackTintColor={Colors.purple}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.onNextPress()} style={styles.nextButtonContainer} activeOpacity={0.8}>
                            <Icon name="md-arrow-round-forward" style={styles.nextButton} />
                        </TouchableOpacity>
                    </Animated.View>
                </Content>
            </Container >
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
        alignSelf: 'flex-start',
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        padding: 50,
    },
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
    },
    inputContainer: {
        marginTop: 50,
        width: '100%',
    },
    item: {
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 7,
        padding: 10,
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTitle: {
        color: Colors.primary,
        marginLeft: 20,
        fontSize: 25,
        fontWeight: 'bold'
    },
    itemValue: {
        fontWeight: 'bold',
        marginRight: 20,
        fontSize: 22,
        color: Colors.purple
    },
    nextButton: {
        color: 'white',
        fontSize: 34,
    },
    nextButtonContainer: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 100,
        height: 100,
    }

});

export default PatientBodyScreen;