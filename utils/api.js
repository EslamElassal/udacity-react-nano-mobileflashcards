import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'TaliCards:decks'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => JSON.parse(results))
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      'title': title,
      questions: [],
    }
  }))
}

export function getDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const decks = JSON.parse(results)
      const myDeckId = Object.keys(decks).filter(deck => deck === deckId)[0]
      const myDeck = decks[myDeckId]
      return myDeck
    })
}

export function deleteDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckId] = undefined
      delete data[deckId]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCardToDeck(title, card){  
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      oriQuestions = decks[title].questions
      
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
          questions: [...oriQuestions, card],
        }
      }))
    })
}