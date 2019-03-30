import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

class BasicHeader extends Component {

    onMenuPress = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <Header style={{ backgroundColor: Colors.headerBackground }}>
                <Left>
                    <Button onPress={() => this.onMenuPress()} style={styles.menuButton} >
                        <Icon name='menu' style={{ color: Colors.primary }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: 'black' }}>{this.props.title}</Title>
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