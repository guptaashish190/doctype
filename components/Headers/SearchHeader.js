import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Item, Input } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

class SearchHeader extends Component {

    state = {
        searchEnable: true,
        searchValue: '',
    }

    onMenuPress = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
            </Container>
        );
    }
}

// PropTypes
SearchHeader.propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
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