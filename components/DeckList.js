import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { pink } from '../utils/colors'

class DeckList extends Component {
  state = {
    ready: false,
    bounceValue: new Animated.Value(1),
  }

  componentDidMount = () => {
  const { dispatch } = this.props

    getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      }).then(() => this.setState(() => ({
        ready: true,
      })))
  }

  select = (deck) => {
    let { bounceValue } = this.state

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.4}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4}),
    ]).start()
    
    this.props.navigation.navigate(
      'Deck',
      { deckId: deck }
    )
  }

  render() {
    const { decks } = this.props
    let { bounceValue } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>TaliCards</Text>
        {Object.keys(decks).map(deck => (
          <Animated.View key={deck} style={{transform: [{scale: bounceValue}]}}>
            <TouchableOpacity style={styles.deckPreview} onPress={() => this.select(deck)}>
              <Text>{deck}</Text>
              <Text>{this.props.decks[deck].questions.length} cards</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 5,
  },
  deckPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    margin: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: pink,
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)