import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const dish = () => {
const { dishType } = useLocalSearchParams();
  return (
    <View>
      <Text>{dishType}</Text>
    </View>
  )
}

export default dish

const styles = StyleSheet.create({})