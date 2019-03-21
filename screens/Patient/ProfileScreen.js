import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout';
import BasicHeader from '../../components/BasicHeader';

class PatientProfile extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <BasicHeader navigation={this.props.navigation} title="Profile" />
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
    marginTop: StatusBarHeight
  },
  menuButton: {
    backgroundColor: 'transparent',
    elevation: 0,
  }
});

export default PatientProfile