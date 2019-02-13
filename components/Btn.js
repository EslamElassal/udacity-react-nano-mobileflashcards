import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { blue, white } from '../utils/colors'

let screenWidth = Dimensions.get('screen').width / 2

export default class Button extends Component {
  render(){
    return (
      <TouchableOpacity style={[styles.btn, this.props.style]} onPress={this.props.onPress}>
        <Text style={styles.btnText}>{this.props.btnText}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    width: screenWidth,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: blue,
  },
  btnText: {
    color: white,
    alignSelf: 'center',
  },
})