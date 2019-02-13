import React, { Component } from 'react'
import { StyleSheet, Dimensions, TextInput } from 'react-native'

let screenWidth = Dimensions.get('screen').width / 1.2

export default class BaseInput extends Component {
  render(){
    const { value, updateValue } = this.props

    return (
      <TextInput style={styles.input} value={value} onChangeText={updateValue} />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 35,
    width: screenWidth,
    margin: 5,
    marginBottom: 10,
    padding: 5,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    color: 'rgba(0,0,0,.5)',
  },
})