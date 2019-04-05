import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import Colors from '../../constants/Colors';

class ProfilePicAnimHeader extends Component {

    onMenuPress = () => {
        this.props.navigation.openDrawer();
    }

    render() {

        const ImageAnimatedStyle = {
            borderRadius: this.props.ppWidth / 2,
            width: this.props.ppWidth,
            height: this.props.ppWidth,
            transform: [{
                translateY: this.props.scrollY.interpolate({
                    inputRange: [0, this.props.ppMaxWidth + this.props.ppWidth, this.props.ppMaxWidth + 2 * this.props.ppWidth],
                    outputRange: [this.props.ppWidth + 10 + this.props.ppMargin, this.props.ppWidth + 10 + this.props.ppMargin, 0],
                    extrapolate: 'clamp',
                })
            }]
        }
        return (
            <Header style={{
                backgroundColor: Colors.primary,
                paddingTop: Constants.statusBarHeight + 30,
                paddingBottom: 30,
                overflow: 'hidden'
            }}>
                <Left>
                    <Button onPress={() => this.onMenuPress()} style={styles.menuButton} >
                        <Icon name='menu' style={{ color: 'white' }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: 'white', fontWeight: 'bold' }}>{this.props.title}</Title>
                </Body>
                <Right>
                    <Animated.Image source={{ uri: this.props.ppImageUri }} style={[ImageAnimatedStyle, {
                        borderColor: '#ddd',
                        borderRadius: 200,
                        borderWidth: 1,
                    }]} />
                </Right>
            </Header >
        );
    }
}

// PropTypes
ProfilePicAnimHeader.propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: 'transparent',
        elevation: 0,
    }
});

export default ProfilePicAnimHeader