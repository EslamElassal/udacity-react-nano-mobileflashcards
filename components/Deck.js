import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { red } from '../utils/colors';
import { getDeck, deleteDeck } from '../utils/api';
import { removeDeck } from '../actions'
import Button from './Btn'

class Deck extends Component {
  state = {
    deckId: '',
    cardNum: '',
  }

  componentDidMount = () => {
    const { deck } = this.props

    // I DO NOT NEED THIS API FUNCTION
    // getDeck(deckId)
    //   .then((deck) => this.setState(() => ({
    //     deckId: deck.title,
    //     cardNum: deck.questions.length,
    //   })))

    this.setState(() => ({
      deckId: deck.title,
      cardNum: deck.questions.length,
    }))
  }

  componentWillReceiveProps = (nextProps) => {
    const { deckId } = this.state
    
    if(nextProps.deck !== undefined){
      this.setState(() => ({
        cardNum: nextProps.deck.questions.length,
      }))
    }
  }

  addCard = () => {
    this.props.navigation.navigate(
      'AddCard',
      { deckId: this.state.deckId }
    )
  }

  startQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.state.deckId,
        cardNum: this.state.cardNum }
    )
  }

  deleteDeck = () => {
    const { dispatch } = this.props
    const { deckId } = this.state

    deleteDeck(deckId)
      .then(() => {
        dispatch(removeDeck(deckId))
      })
      .then(() => {
        this.props.navigation.navigate(
          'Home',
        )
      })
  }

  render() {
    const { deckId, cardNum } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deckId}</Text>
        <Text style={styles.cards}>{cardNum} cards</Text>
        <View style={styles.buttons}>
          <Button onPress={this.addCard} btnText={'Add Card'} />
          <Button onPress={this.startQuiz} btnText={'Start Quiz'} />
          <TouchableOpacity onPress={this.deleteDeck}>
            <Text style={styles.deleteDeck}>
              Delete Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 100,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 5,
  },
  cards: {

  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  addCard: {

  },
  startQuiz: {

  },
  deleteDeck: {
    marginTop: 50,
    color: red,
  },
})

function mapStateToProps(decks, ownProps) {
  const deckId = ownProps.navigation.state.params.deckId
  
  return {
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(Deck)