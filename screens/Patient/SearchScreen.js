import React, { Component } from 'react';
import { StyleSheet, NativeModules, Platform } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { StatusBarHeight } from '../../constants/Layout';
import Colors from '../../constants/Colors';

class SearchScreen extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Text>
                        Search
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

export default SearchScreen