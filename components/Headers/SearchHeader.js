import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Item, Input, Container, Text, Content } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

class SearchHeader extends Component {

    state = {
        searchEnable: false,
        searchValue: '',
    }

    onMenuPress = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <Header style={styles.container}>
                <Button onPress={() => this.onMenuPress()} style={styles.menuButton} >
                    <Icon name='menu' style={{ color: Colors.primary }} />
                </Button>
                <Content contentContainerStyle={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                    {this.state.searchEnable ?
                        (
                            <Input
                                value={this.state.searchValue}
                                onChangeText={text => this.setState({ searchValue: text })}
                                style={styles.searchInput}
                                placeholder="Search"
                            />
                        )
                        :
                        <Text>Search</Text>
                    }
                </Content>
                <Right>
                    <TouchableOpacity onPress={() => this.setState({ searchEnable: true })}>
                        <Icon style={{ marginLeft: 10 }} name="search" />
                    </TouchableOpacity>
                </Right>

            </Header >
        );
    }
}

// PropTypes
SearchHeader.propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBlue,
        width: '100%',
        alignItems: 'center'
    },
    menuButton: {
        paddingLeft: 0,
        backgroundColor: 'transparent',
        elevation: 0,
    },
    searchInput: {
        borderRadius: 10,
        width: '100%',
        height: '80%',
        backgroundColor: 'rgb(237, 237, 237)',
        padding: 10
    }
});

export default SearchHeader