import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Container, Content, Text } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout';
import BasicHeader from '../../components/Doctor/BasicHeader';
import MapCard from '../../components/Doctor/MapCard';
import Colors from '../../constants/Colors';
import BasicCard from '../../components/Doctor/BasicCard';

class DoctorScreen extends Component {
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
          <MapCard
            title="Clinic"
            name={this.props.clinic.name}
            longitude={this.props.clinic.location[0]}
            latitude={this.props.clinic.location[1]}
          />
          <MapCard
            title="Hospital"
            name={this.props.hospital.name}
            longitude={this.props.hospital.location[0]}
            latitude={this.props.hospital.location[1]}
          />
          {/* {this.props.current.map((elem) => <BasicCard key={shortid.generate()} cardInfo={elem} title="Current" />)} */}
          <BasicCard key={shortid.generate()} cardInfo={this.props.contact} title="Contact" />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBarHeight,
    paddingBottom: 20
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
    basic: state.TestDoctor.basic,
    qualifications: state.TestDoctor.qualifications,
    currentPatients: state.TestDoctor.currentPatients,
    allPatients: state.TestDoctor.allPatients,
    clinic: state.TestDoctor.clinic,
    hospital: state.TestDoctor.hospital,
    contact: state.TestDoctor.contact,
    appSpec: state.TestDoctor.appSpec
  })
}

export default connect(mapStateToProps)(DoctorScreen)