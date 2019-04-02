import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Container, Content, Text } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout';
import BasicHeader from '../../components/Patient/BasicHeader';
import Colors from '../../constants/Colors';
import BasicCard from '../../components/InfoCards/BasicCard';


const DEFAULT_IMAGE_URI = 'https://i.stack.imgur.com/l60Hf.png';

class PatientProfile extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <Container style={styles.container}>
        <BasicHeader navigation={this.props.navigation} title="Profile" />
        <Content contentContainerStyle={styles.content}>

          {/* Profile Picture */}
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={{ uri: this.props.appSpec.profilePicture.local || DEFAULT_IMAGE_URI }} />
          </View>

          {/* Basic Info */}
          <BasicCard cardInfo={this.props.basic} title="Basic" />
          {this.props.current.map((elem) => <BasicCard key={shortid.generate()} cardInfo={elem} title="Current" />)}
          {this.props.history.map((elem) => <BasicCard key={shortid.generate()} cardInfo={elem} title="History" />)}
          <BasicCard key={shortid.generate()} cardInfo={this.props.contact} title="Contact" />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: '#ccc'
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
    basic: state.UserInfo.user.basic,
    current: state.UserInfo.user.current,
    history: state.UserInfo.user.history,
    contact: state.UserInfo.user.contact,
    appSpec: state.UserInfo.user.appSpec
  })
}

export default connect(mapStateToProps)(PatientProfile)