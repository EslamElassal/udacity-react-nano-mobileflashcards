# Mobile Flashcards Project

The Mobile Flashcards Project is my third and final Udacity React Developer Nanodegree project. The project features a native application which features 1) the ability to create your own flashcard decks, 2) add unlimited flashcards to your decks, 3) delete old decks, 4) and quiz yourself with any deck, which will return a knowledge score. The project contains views for: your deck list, an individual deck, add new deck, add new card, and the quiz. Once a quiz has been started, the user will be faced with an active quiz -if the deck contains at least one card- or a screen prompting the addition of a card to the deck -if no cards are currently in the deck. Once a quiz has been completed (all cards from the deck have been answered as either knowing 'correct' or 'incorrect'), a score will be displayed showing how many cards the tester answered 'correct' out of the total number of cards.

App Data is stored through React Native's AsyncStorage and managed with Redux

The [Create React Native App](https://github.com/react-community/create-react-native-app) is used to bootstrap the project.

## TL;DR

To get started building your flashcard decks right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # Npm package manager file. It's unlikely that you'll need to modify this.
├── app.json # 
├── App.js # 
├── actions
│   └── index.js # Redux actions index
├── reducers
│   └── index.js # Redux reducer index
├── utils
│   ├── api.js # API for accessing data in AsyncStorage
│   └── colors.js # Helper file with HEX codes for primary colors
└── components
    ├── AddCard.js # View for adding new flashcards to decks
    ├── AddDeck.js # View for adding a new deck
    ├── BaseInput.js # Pre-styled TextInput component
    ├── Btn.js # Pre-styles TouchOpacity component
    ├── Deck.js # View for an individual deck; add card, start quiz, delete deck
    ├── DeckList.js # View your list of decks
    └── Quiz.js # View for taking a deck quiz; flip card, view score, restart quiz
```

## Data

There is one type of object stored in our database:

* Decks

The Deck object contains title (string) and questions (array) properties. The questions (array) hold unkeyed objects with question (string) and answer (string) properties.

## Testing

This beta app is tested with Genymotion's Android emulator.