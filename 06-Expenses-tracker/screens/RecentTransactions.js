import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { TRANSACTIONS } from '../data/dummy-data'
import TransactionOutput from '../components/TransactionOutput/TransactionOutput'


export default function RecentTransactions() {
  return (
    <ScrollView>
      <View>
        <TransactionOutput />
      </View>
    </ScrollView>
  )
}