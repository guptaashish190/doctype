import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import { Constants } from 'expo';

class BasicHeader extends Component {

    onMenuPress = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <Header style={{
                backgroundColor: Colors.primary,
                paddingTop: Constants.statusBarHeight + 30,
                paddingBottom: 30
            }}>
                <Left>
                    <Button onPress={() => this.onMenuPress()} style={styles.menuButton} >
                        <Icon name='menu' style={{ color: 'white' }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: 'white', fontWeight: 'bold' }}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header >
        );
    }
}

// PropTypes
BasicHeader.propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: 'transparent',
        elevation: 0,
    }
});

export default BasicHeader