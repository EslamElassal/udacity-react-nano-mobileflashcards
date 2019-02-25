# Mobile Flashcards
Mobile Flashcards is a native mobile application for creating and reviewing flashcards, originally developed as one of three project's required for Udacity's React Developer Nanodegree program.

The project features:
* Ability to create your own flashcard decks
* Unlimited flashcards (Q/A flip cards) for each deck
* Deck quizzes that present a knowledge score upon completion

The project contains views for:
* Deck list
* Individual deck
* Create new deck
* Add new card
* Deck Quiz

Once a quiz has been started, the user will be faced with an active quiz -if the deck contains at least one card- or a screen prompting the addition of a card to the deck -if no cards are currently in the deck. Once a quiz has been completed (all cards from the deck have been answered as either known 'correct' or 'incorrect'), a score will be displayed showing how many cards the quizzer answered 'correct' out of the total number of cards.

App data is stored through React Native's AsyncStorage and managed with Redux

The [Create React Native App](https://github.com/react-community/create-react-native-app) was used to bootstrap the project.

## Installation
To start building your flashcard decks, first install all project dependencies:

```
npm install
```
Then, run the development server with:
```
npm start
```
Navigate to:
```
localhost:19002
```
In the sidebar under 'Connection', select the 'Tunnel' tab.

Scan the QR code with the Expo app (Android) or the Camera app (iOS).

## File Breakdown
```bash
├── README.md - This file.
├── package.json # npm package manager file
├── app.json # native application config file for app stores
├── App.js # This is the root of your app
├── actions
│   └── index.js # File containing redux actions
├── reducers
│   └── index.js # File containing redux reducers
├── utils
│   ├── api.js # API created to access data in AsyncStorage
│   └── colors.js # Helper file with HEX codes for common colors
└── components
    ├── AddCard.js # View for adding new flashcards to decks
    ├── AddDeck.js # View for adding a new deck
    ├── BaseInput.js # Pre-styled TextInput component
    ├── Btn.js # Pre-styled TouchOpacity component
    ├── Deck.js # View for an individual deck; add card, start quiz, delete deck
    ├── DeckList.js # View your list of decks
    └── Quiz.js # View for taking a deck quiz; flip card, answer card, view score, restart quiz
```

## Data

There is one type of object stored in our database:

* Decks

The Deck object contains title (string) and questions (array) properties. The questions (array) hold unkeyed objects with question (string) and answer (string) properties.

## Testing

This beta app is tested with Genymotion's Android emulator.