import { View, Text, FlatList } from 'react-native'
import React from 'react'


function renderExpensesItem(itemData) {
  return <Text>{itemData?.item?.amount}</Text>
}

export default function TransactionList({data}) {

  return (
    <View>
        <FlatList data={data}
        renderItem={renderExpensesItem}
        keyExtractor={(item) => item.id}
        />
    </View>
  )
}