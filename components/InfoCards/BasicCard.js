import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, NativeModules, Platform } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';
import Fonts from '../../constants/Fonts';
import { Container, Content, Text, Header, Body, Col, Card, View, CardItem } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';
import { bold } from 'ansi-colors';

class BasicCard extends Component {


    convertToString = (val) => {
        if (val instanceof Date) {
            return val.toDateString();
        }
        return val;
    }

    getMappedDetails = () => {
        const listLength = Object.keys(this.props.cardInfo).length;
        return Object.keys(this.props.cardInfo).map((elem, index) => {
            return (
                <CardItem style={[styles.cardElement, index === listLength - 1 ? { borderBottomWidth: 0 } : {}]} key={shortid.generate()}>
                    <Text style={styles.elementKey}>{_.startCase(elem)}: </Text>
                    <Text style={styles.elementValue}>{this.convertToString(this.props.cardInfo[elem])}</Text>
                </CardItem>
            )
        });
    }

    render() {
        return (
            <Card style={styles.container}>
                <CardItem header style={styles.header}>
                    <Text style={{ color: 'white' }}>{this.props.title}</Text>
                </CardItem>
                {this.getMappedDetails()}
            </Card>
        );
    }
}


// PropTypes
BasicCard.propTypes = {
    title: PropTypes.string.isRequired,
    cardInfo: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        borderTopLeftRadius: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    header: {
        backgroundColor: Colors.dark,
        borderTopLeftRadius: 20,
        width: '100%',
        height: 40,
        justifyContent: 'center'
    },
    content: {
        padding: 10
    },
    cardElement: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'rgba(22, 54, 96, 0.2)'
    },
    elementKey: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.primary
    },
    elementValue: {
    }
});

export default BasicCard