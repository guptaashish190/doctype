import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Easing, Keyboard, View } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Item, Input, Container, Text, Content } from 'native-base';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import Colors from '../../constants/Colors';

class SearchHeader extends Component {

    state = {
        searchEnable: false,
        searchValue: '',
        searchBarLeft: new Animated.Value(140),
        searchBarOpacity: new Animated.Value(0),
        backTranslateX: new Animated.Value(-30),
        backOpacity: new Animated.Value(0),
        searchTextTranslateX: new Animated.Value(0),
        searchTextOpacity: new Animated.Value(1),
    }

    onMenuPress = () => {
        Keyboard.dismiss();
        this.props.navigation.openDrawer();
    }

    onSearchEnable = () => {
        if (this.state.searchEnable) {
            this.props.onSearch();
            this.onDisableSearch();
        } else {
            this.setState({
                searchEnable: true,
                searchTextTranslateX: new Animated.Value(-30),
                searchTextOpacity: new Animated.Value(0),
            }, () => {
                Animated.parallel([
                    Animated.timing(this.state.backTranslateX, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.bezier(.16, .83, .23, 1.03)
                    }),
                    Animated.timing(this.state.backOpacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.bezier(.16, .83, .23, 1.03)
                    }),
                    Animated.timing(this.state.searchBarLeft, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.bezier(.16, .83, .23, 1.03)
                    }),
                    Animated.timing(this.state.searchBarOpacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.bezier(.16, .83, .23, 1.03)
                    }),

                ]).start();
            });
        }
    }

    onDisableSearch = () => {
        Keyboard.dismiss();
        Animated.parallel([
            Animated.timing(this.state.backTranslateX, {
                toValue: -30,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            }),
            Animated.timing(this.state.backOpacity, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            }),
            Animated.timing(this.state.searchBarLeft, {
                toValue: 140,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            }),
            Animated.timing(this.state.searchBarOpacity, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            }),

        ]).start(() => {
            this.setState({
                searchEnable: false,
            }, () => {
                Animated.parallel([
                    Animated.timing(this.state.searchTextTranslateX, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.bezier(.16, .83, .23, 1.03)
                    }),
                    Animated.timing(this.state.searchTextOpacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                        easing: Easing.bezier(.16, .83, .23, 1.03)
                    })
                ]).start();
            });
        });
    }

    render() {

        const searchBarAnimatedStyle = {
            transform: [{
                translateX: this.state.searchBarLeft,
            }],
            opacity: this.state.searchBarOpacity
        };
        const backAnimatedStyle = {
            transform: [{ translateX: this.state.backTranslateX }],
            opacity: this.state.backOpacity
        }
        const searchTextAnimatedStyle = {
            transform: [{ translateX: this.state.searchTextTranslateX }],
            opacity: this.state.searchTextOpacity
        }
        return (
            <Header style={styles.container}>
                {!this.state.searchEnable ?
                    (
                        <Animated.View style={searchTextAnimatedStyle}>
                            <Button onPress={() => this.onMenuPress()} style={[styles.menuButton]} >
                                <Icon name='menu' style={{ color: 'white' }} />
                            </Button>
                        </Animated.View>
                    )
                    : (
                        <Animated.View style={[backAnimatedStyle]} >
                            <Button onPress={() => this.onDisableSearch()} style={[styles.menuButton]} >
                                <Icon name='md-arrow-round-back' style={{ color: 'white' }} />
                            </Button>
                        </Animated.View>
                    )

                }
                <Body style={styles.content}>

                    {this.state.searchEnable ?
                        (<Animated.View style={[styles.animatedSearchContainer, searchBarAnimatedStyle]}>
                            <Input
                                value={this.state.searchValue}
                                onChangeText={text => this.setState({ searchValue: text })}
                                style={styles.searchInput}
                                placeholder="Search"
                                autoFocus
                            />
                        </Animated.View>
                        )
                        :
                        <Animated.View style={searchTextAnimatedStyle}>
                            <TouchableOpacity onPress={() => this.onSearchEnable()}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    }
                    <TouchableOpacity onPress={() => this.onSearchEnable()}>
                        <Icon style={{ marginLeft: 10, color: 'white' }} name="search" />
                    </TouchableOpacity>
                </Body>
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
        backgroundColor: Colors.primary,
        alignItems: 'center'
    },
    content:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '90%',
        alignItems: 'center',
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
    },
    animatedSearchContainer: {
        width: '90%',
    }
});

export default SearchHeader