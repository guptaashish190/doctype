import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Colors from '../../constants/Colors';

// Get statusbar height
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class SettingsScreen extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Text>
                        Settings
          </Text>
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
        marginTop: STATUSBAR_HEIGHT
    },
});

export default SettingsScreen