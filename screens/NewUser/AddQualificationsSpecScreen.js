import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { Container, Content, Text, Input, Item, Card, CardItem, Icon, List, ListItem, Title } from 'native-base';
import shortid from 'shortid';
import { StatusBarHeight } from '../../constants/Layout'
import Colors from '../../constants/Colors';
import suggestions from './QualificationsList';


class AddQualificationsSpecScreen extends Component {

    state = {
        currentValue: '',
        added: [],
        showSuggestions: false,
        titleOpacity: new Animated.Value(0),
        mainOpacity: new Animated.Value(0),
    }

    componentDidMount() {

        Animated.sequence([
            Animated.timing(this.state.titleOpacity, {
                delay: 400,
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            }),
            Animated.timing(this.state.mainOpacity, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.bezier(.16, .83, .23, 1.03)
            })

        ]).start();

    }

    getListItems = () => this.state.added.map((elem) =>
        <View key={shortid.generate()} style={styles.listItem}>
            <FormattedQualification text={elem.value} />
            <TouchableOpacity style={{ padding: 6 }} onPress={() => this.removeItem(elem.key)}>
                <Icon name="remove" />
            </TouchableOpacity>
        </View>
    )

    addItem = () => {
        const item = {
            key: this.state.added.length,
            value: this.state.currentValue
        }
        if (this.state.added.map(e => e.value).indexOf(this.state.currentValue) < 0) {
            this.setState({
                added: [...this.state.added, item]
            });
        }
    }

    removeItem = (key) => {
        this.setState({
            added: this.state.added.filter(i => i.key !== key),
        });
    }
    onSuggestionClick = (value) => {
        this.setState({
            showSuggestions: false,
            currentValue: value
        });
    }

    getListSuggestions = () => {
        const s = suggestions.filter(s => s.toLowerCase().includes(this.state.currentValue.toLowerCase())).slice(0, 5);
        if (s.length) {
            return s.map(elem => (
                <ListItem onPress={() => this.onSuggestionClick(elem)} tyle={styles.suggestion} key={shortid.generate()}>
                    <Text style={{ color: '#aaa', fontStyle: 'italic' }}>{elem}</Text>
                </ListItem>
            ));
        }
        return null;

    }

    render() {

        const TitleAnimatedStyle = {
            opacity: this.state.titleOpacity,
            transform: [{
                translateX: this.state.titleOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                })
            }]
        }
        const MainAnimatedStyle = {
            opacity: this.state.mainOpacity,
        }

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.content}>
                    <Animated.Text style={[styles.title, TitleAnimatedStyle]}>
                        Add your Qualifications and Specializations
                    </Animated.Text>

                    <Animated.View style={[styles.mainContainer, MainAnimatedStyle]}>
                        <View>
                            <Item style={styles.input} rounded>

                                <Input
                                    placeholder="Type Here"
                                    value={this.state.currentValue}
                                    onChangeText={text => this.setState({ currentValue: text, showSuggestions: true })}
                                    onFocus={() => this.setState({ showSuggestions: true })}
                                    onBlur={() => this.setState({ showSuggestions: false })}
                                />

                                <TouchableOpacity onPress={() => this.addItem()} style={{ padding: 6 }}>
                                    <Icon name="add" />
                                </TouchableOpacity>

                            </Item>
                            {this.state.currentValue.length > 1 && this.state.showSuggestions ?

                                <List style={styles.suggestionList}>
                                    {this.getListSuggestions()}
                                </List>
                                :
                                null
                            }
                        </View>
                        <View style={styles.listContainer}>
                            <ScrollView>
                                {this.getListItems()}
                            </ScrollView>
                        </View>
                    </Animated.View>

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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    content: {
        alignItems: 'center',
        flex: 1,
        padding: 50,
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        marginTop: 30,
        position: 'relative'
    },
    input: {
        width: '100%',
        padding: 5,
    },
    listContainer: {
        marginTop: 20,
        height: 400,
        overflow: 'scroll'
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#bad4ff',
        borderColor: '#2a65c9',
        borderWidth: 1,
        margin: 5,
        padding: 10,
        borderRadius: 50,
    },
    suggestionList: {
        width: '100%',
        borderRadius: 20,
        zIndex: 10,
        backgroundColor: Colors.backgroundColor,
        position: 'absolute',
        top: 67,
        borderWidth: 1,
        borderColor: '#ccc',
        left: 0,
    },
    suggestion: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 8,
    }
});

export default AddQualificationsSpecScreen

class FormattedQualification extends Component {

    getMainText = () => this.props.text.split('-')[0].trim().substring(0, 20).trim();
    getDescriptiveText = () => this.props.text.split('-')[1] ? this.props.text.split('-')[1].substring(0, 20).trim() : '';

    isMainLong = () => this.props.text.split('-')[0].length > 20;

    isDesclong = () => this.props.text.split('-')[1] ? this.props.text.split('-')[1].length > 20 : false;

    render() {
        return (
            <View style={FQStyles.container}>
                <Text style={FQStyles.mainText}>{this.getMainText()}{this.isMainLong() ? '...' : ''}</Text>
                <Text style={FQStyles.descText} >{this.getDescriptiveText()}{this.isDesclong() ? '...' : ''}</Text>
            </View>
        )
    }
}

const FQStyles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    mainText: {
        color: 'black',
        fontWeight: 'bold',
    },
    descText: {
        marginLeft: 10,
        color: 'black',
        opacity: 0.7,
        fontStyle: 'italic'
    }
});