import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import AccordionItem from '../Accordion/AccordionItem'
import { getMonthByDate } from '../../constants/functions'


function renderExpensesItem(itemData) {
  const month = getMonthByDate(itemData?.item.date)
  return <AccordionItem data={itemData?.item} month={month} />
}

export default function TransactionList({data}) {

  let content = <Text style={styles.NotFound} >No transaction found</Text>

  if(!data.length){
    return content;
  }

  return (
    <View style={styles.listContainer}>
        <FlatList data={data}
        renderItem={renderExpensesItem}
        keyExtractor={(item) => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({

  NotFound: {
    textAlign: "center"
  }

})