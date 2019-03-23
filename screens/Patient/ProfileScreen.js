import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout';
import BasicHeader from '../../components/BasicHeader';
import Colors from '../../constants/Colors';
import BasicCard from '../../components/InfoCards/BasicCard';

class PatientProfile extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <BasicHeader navigation={this.props.navigation} title="Profile" />
        <Content contentContainerStyle={styles.content}>

          {/* Profile Picture */}
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={{ uri: this.props.appSpec.profilePicture.url }} />
          </View>

          {/* Basic Info */}
          <BasicCard cardInfo={this.props.basic} title="Basic" />

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
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: Colors.primary
  },
  profileImageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return ({
    basic: state.UserInfo.basic,
    appSpec: state.UserInfo.appSpec
  })
}

export default connect(mapStateToProps)(PatientProfile)