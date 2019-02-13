import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import Button from './Btn'

class AddDeck extends Component {
  state = {
    deckTitle: '',
  }

  addDeck = () => {
    const { dispatch } = this.props
    const { deckTitle } = this.state

    saveDeckTitle(deckTitle)
      .then(() => {
        dispatch(addDeck(deckTitle))
        this.props.navigation.navigate(
          'Deck',
          { deckId: deckTitle }
        )
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your deck?</Text>
        <TextInput onChangeText={(deckTitle => this.setState({deckTitle}))} style={styles.input} value={this.state.deckTitle} />
        <Button onPress={this.addDeck} btnText={'Create Deck'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 5,
  },
  input: {
    alignSelf: 'stretch',
    height: 35,
    margin: 20,
    marginBottom: 10,
    padding: 5,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    color: 'rgba(0,0,0,.5)',
  },
})

export default connect()(AddDeck)