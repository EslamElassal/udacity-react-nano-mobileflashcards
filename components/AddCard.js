import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import TextInput from './BaseInput'
import Button from './Btn'

let screenWidth = Dimensions.get('screen').width / 1.2

class AddCard extends Component {
  state = {
    cardQ: '',
    cardA: '',
  }

  updateCardQ = (newValue) => {
    this.setState(() => ({
      cardQ: newValue,
    }))
  }

  updateCardA = (newValue) => {
    this.setState(() => ({
      cardA: newValue,
    }))
  }

  submit = () => {
    const { dispatch } = this.props
    const { cardQ, cardA } = this.state
    const title = this.props.navigation.state.params.deckId

    card = {
      question: cardQ,
      answer: cardA,
    }

    addCardToDeck(title, card)
      .then(() => {
        dispatch(addCard(title, card))
      })
      .then(this.setState(() => ({
        cardQ: '',
        cardA: '',
      })))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Card Question</Text>
        <TextInput updateValue={this.updateCardQ} value={this.state.cardQ} />
        <Text style={styles.title}>Card Answer</Text>
        <TextInput updateValue={this.updateCardA} value={this.state.cardA} />
        <Button onPress={this.submit} btnText={'Submit'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    width: screenWidth,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    margin: 5,
    marginLeft: 0,
    marginBottom: 0,
  }
})

export default connect()(AddCard)