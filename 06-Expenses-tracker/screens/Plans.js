import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import PlansList from '../components/PlansOutput/PlansList'
import PlansSummary from '../components/PlansOutput/PlansSummary'

export default function Plans() {
  let plans = [
    { "id":1, "title": 'testing', "amount" : `1000`, 'status':'PAID' },
    { "id":2, "title": 'testing', "amount" : `1000`, 'status':'PAID' },
    { "id":3, "title": 'testing', "amount" : `1000`, 'status':'PAID' },
    { "id":4, "title": 'testing', "amount" : `1000`, 'status':'PAID' }

  ]
  return (
    <ScrollView>
      <View style={styles.wrapper}>
  <PlansList 
          plans={plans} 
          onDelete={(id)=>{}}
          onAddPlan={()=>{}}
          onReport={()=>{}}
          onPlan={()=>{}}
        />
  <PlansSummary plans={plans} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
  }
})