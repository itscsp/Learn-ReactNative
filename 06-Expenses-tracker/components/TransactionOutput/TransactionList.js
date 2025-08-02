import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AccordionItem from '../Accordion/AccordionItem'


function renderExpensesItem(itemData) {
  return <AccordionItem data={itemData?.item} />
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