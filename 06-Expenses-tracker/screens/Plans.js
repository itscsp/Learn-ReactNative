import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import PlansList from '../components/PlansOutput/PlansList'
import PlansSummary from '../components/PlansOutput/PlansSummary'

export default function Plans() {
  let plans = [
    { "id":1, "title": 'testing', "amount" : `1000`, 'status':'PAID' },
    { "id":1, "title": 'testing', "amount" : `1000`, 'status':'PAID' },
    { "id":1, "title": 'testing', "amount" : `1000`, 'status':'PAID' },
    { "id":1, "title": 'testing', "amount" : `1000`, 'status':'PAID' }

  ]
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <PlansList plans={plans} />
        <PlansSummary />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    rmarginHorizontal: 16,
  }
})