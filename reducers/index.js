import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions'

function taliCards (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: [],
        }
      }
    case REMOVE_DECK :
      delete state[action.deck]
      return {
        ...state,
      }
    case ADD_CARD :
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: [...state[action.deck].questions, card]
        }
      }
    default :
      return state
  }
}

export default taliCards