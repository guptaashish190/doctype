import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Item, Label, Input, Icon, Button, Toast } from 'native-base';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import config from '../../config';
import Axios from 'axios';
import { connect } from 'react-redux';
import NewUserActions from '../../Actions/NewUserActions';

class Login extends Component {

  state = {
    username: '',
    password: '',
    type: 'P',
    error: false,
  }

  onLoginClick = () => {
    // if (this.state.type === 'P') {
    //   this.props.navigation.navigate('Patient');
    // } else {
    //   this.props.navigation.navigate('Doctor');
    // }

    const data = {
      params: {
        username: this.state.username,
        password: this.state.password
      }
    }
    if (!this.state.username.length || !this.state.password.length) {
      this.setState({
        error: 'Fill all the fields'
      }, () => {
        Toast.show({
          text: "Fill all the fields",
          type: 'danger',
          duration: 3000,
        });
      });
    } else {
      if (this.state.type === 'P') {
        Axios.get(`${config.backend}/patient/verify`, data).then(({ data }) => {
          if (data.valid) {
            const doctor = {
              user: data.data,
              type: 'Patient'
            }
            this.props.setUser(doctor);
            this.props.navigation.navigate('Patient');
          } else {
            this.setState({
              error: 'username,password'
            }, () => {
              Toast.show({
                text: "No user found",
                type: 'danger',
                duration: 3000,
              });
            });
          }
        });
      } else {
        Axios.get(`${config.backend}/doctor/verify`, data).then(({ data }) => {
          if (data.valid) {
            console.log(data);
            const doctor = {
              user: data.data,
              type: 'Doctor'
            }
            this.props.setUser(doctor);
            this.props.navigation.navigate('Doctor');
          } else {
            this.setState({
              error: 'username,password'
            }, () => {
              Toast.show({
                text: "No user found",
                type: 'danger',
                duration: 3000,
              });
            });
          }
        });
      }

    }
  }

  isError = type => {
    if (this.state.error && this.state.error.includes(type)) {
      return true;
    }
    if (this.state.error && !this.state[type].length) {
      return true;
    }
    return false;
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
            <Item style={styles.textBox} error={this.isError('username')} rounded>
              <Icon name="person" style={{ color: Colors.primary }} />
              <Input
                style={{ padding: 10 }}
                placeholder="Username"
                onChangeText={text => this.setState({ username: text, error: false })}
                value={this.state.username} />
              {this.isError('username') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
            </Item>
            <Item style={styles.textBox} error={this.isError('password')} rounded>
              <Icon name="lock" style={{ color: Colors.primary }} />
              <Input
                style={{ padding: 10 }}
                secureTextEntry
                placeholder="Password"
                onChangeText={text => this.setState({ password: text, error: false })}
                value={this.state.password}
              />
              {this.isError('password') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
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
    padding: 5,
    margin: 10
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

const mapDispatchToProps = (dispatch) => {
  return ({
    setUser: user => dispatch(NewUserActions.setUser(user)),
  })
}

export default connect(null, mapDispatchToProps)(Login);