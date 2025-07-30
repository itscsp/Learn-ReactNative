import { View, Text } from 'react-native'
import React from 'react'
import { TRANSACTIONS } from '../data/dummy-data'
import TransactionOutput from '../components/TransactionOutput/TransactionOutput'


export default function RecentTransactions() {
  
  return (
    <View>
      <TransactionOutput />
    </View>
  )
}