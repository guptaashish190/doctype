import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Item, Label, Input, Icon, Button } from 'native-base';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import config from '../../config';
import Axios from 'axios';

class Login extends Component {

  state = {
    usernameText: '',
    passwordText: '',
    type: 'P',
    error: false,
  }

  onLoginClick = () => {
    // if (this.state.type === 'P') {
    //   this.props.navigation.navigate('Patient');
    // } else {
    //   this.props.navigation.navigate('Doctor');
    // }

    if (this.state.usernameText && this.state.passwordText) {

      if (this.state.type === 'P') {
        const data = {
          params: {
            username: this.state.usernameText,
            password: this.state.passwordText
          }
        }
        Axios.get(`${config.backend}/patient/verify`, data).then(({ data }) => {
          if (data.valid) {
          } else {
            this.setState({
              error: 'invalid user'
            });
          }
        });
      }
    } else {
      this.setState({
        error: true
      });
    }

  }

  onNewUserClick = () => {
    this.props.navigation.navigate('NewUser');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            DOCTYPE
          </Text>
          <View style={styles.box}>
            <Item floatingLabel style={this.state.error ? [styles.textBox, { borderColor: 'red' }] : styles.textBox} >
              <Icon name="person" style={{ color: Colors.primary }} />
              <Label style={{ padding: 10 }} >Username</Label>
              <Input
                style={{ padding: 10 }}
                onChangeText={text => this.setState({ usernameText: text, error: false })}
                value={this.state.usernameText} />
              {this.state.error ? <Icon name="close-circle" style={{ color: 'red' }} /> : <Text></Text>}
            </Item>
            <Item style={[styles.textBox, this.state.error ? { borderColor: 'red' } : null]} floatingLabel>
              <Icon name="lock" style={{ color: Colors.primary }} />
              <Label style={{ padding: 10 }}>Password</Label>
              <Input
                style={{ padding: 10 }}
                secureTextEntry
                onChangeText={text => this.setState({ passwordText: text, error: false })}
                value={this.state.passwordText}
              />
              {this.state.error ? <Icon name="close-circle" style={{ color: 'red' }} /> : <Text></Text>}
            </Item>
            <View style={styles.typeOptions}>
              <TouchableOpacity onPress={() => this.setState({ type: 'P' })} style={[styles.typeTextContainer, this.state.type === 'P' ? { borderBottomColor: Colors.secondary } : { borderBottomColor: Colors.lightBlue }]} >
                <Text style={[styles.typeText, this.state.type === 'P' ? { color: Colors.secondary } : { color: Colors.lightBlue }]}>Patient</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ type: 'D' })} style={[styles.typeTextContainer, this.state.type === 'D' ? { borderBottomColor: Colors.secondary } : { borderBottomColor: Colors.lightBlue }]} >
                <Text style={[styles.typeText, this.state.type === 'D' ? { color: Colors.secondary } : { color: Colors.lightBlue }]}>Doctor</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Button onPress={() => this.onLoginClick()} style={styles.loginButton}><Text style={styles.loginText}>Login</Text></Button>
            </View>
          </View>
          <Button style={styles.newButton} onPress={() => this.onNewUserClick()}><Text style={styles.newText}>New User</Text></Button>
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
  },
  title: {
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 100,
    fontSize: 50,
    color: Colors.dark,
    fontFamily: Fonts.Montserrat.regular
  },
  box: {
    padding: 20,
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  textBox: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButton: {
    marginTop: 70,
    padding: 20,
    height: 80,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  loginText: {
    textAlign: 'center',
    fontFamily: Fonts.Montserrat.black,
    fontSize: 30,
    width: '90%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  typeOptions: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  typeTextContainer: {
    borderBottomWidth: 6,
    padding: 15
  },
  typeText: {
    fontSize: 25,

  },
  newButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  newText: {
    color: '#777',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});

export default Login;