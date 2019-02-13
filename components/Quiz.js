import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification } from '../utils/helpers'
import { green, red } from '../utils/colors'
import Button from './Btn'

let screenWidth = Dimensions.get('screen').width / 1.4

class Quiz extends Component {
  state = {
    cardNum: '',
    curScore: '',
    curCard: '',
    cardsRemaining: '',
    curView: '',
    question: '',
    answer: '',
  }

  componentDidMount = () => {
    const { questions, cardNum } = this.props

    if(cardNum === 0){
      this.setState(() => ({
        cardNum: 0,
      }))
    } else {
      this.setState(() => ({
        cardNum: cardNum,
        curScore: 0,
        curCard: 0,
        cardsRemaining: cardNum,
        curView: 'question',
        question: questions[0].question,
        answer: questions[0].answer,
      }))
    }

    clearLocalNotification()
  }

  addCard = () => {
    this.props.navigation.navigate(
      'AddCard',
      { deckId: this.props.navigation.state.params.deckId }
    )
  }

  flipCard = () => {
    const { curView } = this.state
    if(curView === 'question'){
      this.setState(() => ({
        curView: 'answer'
      }))
    } else {
      this.setState(() => ({
        curView: 'question'
      }))
    }
  }

  correct = () => {
    const { questions } = this.props

    this.setState((prevState) => ({
      curScore: prevState.curScore + 1,
      curCard: prevState.curCard + 1,
      cardsRemaining: prevState.cardsRemaining - 1,
      curView: 'question',
      question: prevState.curCard + 1 < questions.length ? questions[prevState.curCard + 1].question : 'score',
      answer: prevState.curCard + 1 < questions.length ? questions[prevState.curCard + 1].answer : 'score',
    }))
  }

  incorrect = () => {
    const { questions } = this.props

    this.setState((prevState) => ({
      curCard: prevState.curCard + 1,
      cardsRemaining: prevState.cardsRemaining - 1,
      curView: 'question',
      question: prevState.curCard + 1 < questions.length ? questions[prevState.curCard + 1].question : 'score',
      answer: prevState.curCard + 1 < questions.length ? questions[prevState.curCard + 1].answer : 'score',
    }))
  }

  startQuiz = () => {
    const { questions, cardNum } = this.props

    this.setState(() => ({
      cardNum: cardNum,
      curScore: 0,
      curCard: 0,
      cardsRemaining: cardNum,
      curView: 'question',
      question: questions[0].question,
      answer: questions[0].answer,
    }))
  }

  back = () => {
    this.props.navigation.navigate(
      'Deck',
      { deckId: this.props.deckId }
    )
  }

  render() {
    const { cardNum, curScore, curCard, cardsRemaining, curView, question, answer } = this.state

    return (
      <Fragment>
        {cardNum === 0
        ? <View style={styles.quizContainer}>
            <Text style={styles.noContent}>This deck does not have any cards yet! Add a card to this deck below</Text>
            <View style={styles.btns}>
              <Button onPress={this.addCard} btnText={'Add Card'} />
            </View>
          </View>
        : <Fragment>
            {question === 'score' && answer === 'score'
            ? <View style={styles.quizContainer}>
                <View style={styles.topBar}>
                  <Text>QUIZ COMPLETE</Text>
                  <Text>{cardsRemaining} cards remaining</Text>
                </View>
                <Text style={styles.content}>Score: {curScore} / {curCard}</Text>
                <View style={styles.btns}>
                  <Button onPress={this.back} btnText={'Back to Deck'} style={{marginBottom: 40}} />
                  <Button onPress={this.startQuiz} btnText={'Start Quiz'} style={{backgroundColor: green}} />
                </View>
              </View>
            : <View style={styles.quizContainer}>
                <View style={styles.topBar}>
                  <Text>Score: {curScore} / {curCard}</Text>
                  <Text>{cardsRemaining} cards remaining</Text>
                </View>
                <Text style={styles.content}>{curView === 'question' ? question : answer}</Text>
                <View style={styles.btns}>
                  <Button onPress={this.flipCard} btnText={curView === 'question' ? 'Answer' : 'Question'} style={{marginBottom: 40}} />
                  <Button onPress={this.correct} btnText={'Correct'} style={{backgroundColor: green}} />
                  <Button onPress={this.incorrect} btnText={'Incorrect'} style={{backgroundColor: red}} />
                </View>
              </View>
            }
          </Fragment>          
        }
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
  },
  noContent: {
    flex: 2,
    alignSelf: 'center',
    width: screenWidth,
    marginTop: 100,
  },
  btns: {
    flex: 2,
  }
})

function mapStateToProps(decks, ownProps) {
  const deck = decks[ownProps.navigation.state.params.deckId]
  const title = deck.title
  const questions = deck.questions

  return {
    title,
    questions,
    cardNum: questions.length,
  }
}

export default connect(mapStateToProps)(Quiz)