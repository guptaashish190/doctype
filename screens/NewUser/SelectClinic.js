import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';

// Get statusbar height
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class App extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Text>
                        This is Content Section
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
        marginTop: StatusBarHeight
    },
});

export default App