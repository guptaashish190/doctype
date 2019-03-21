import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Colors from '../../constants/Colors';
import { ActionButton } from 'react-native-material-ui';

// Get statusbar height
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class Login extends Component {

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>
            DOCTYPE
          </Text>
          <ActionButton />
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
  title: {
    marginTop: 100,
    marginBottom: 100,
    fontSize: 50,
    color: Colors.dark,
    fontFamily: "Montserrat-Regular"
  }
});

export default Login;