import { View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { TRANSACTIONS } from '../data/dummy-data'
import { TransationContext } from '../store/transaction-context';
import { useFocusEffect } from '@react-navigation/native';
import TransactionSummary from '../components/TransactionOutput/TransactionSummary';
import TransactionList from '../components/TransactionOutput/TransactionList';


export default function RecentTransactions() {
    const transactionCtx = useContext(TransationContext);
    const [summary, setSummary] = useState(transactionCtx?.transactions?.April.SUMMARY)
    const [list, setList] = useState(transactionCtx?.transactions?.April.TRANSACTIONS)


    useFocusEffect(
      React.useCallback(() => {
        setSummary(transactionCtx?.transactions?.April.SUMMARY);
        setList(transactionCtx?.transactions?.April.TRANSACTIONS);
      }, [transactionCtx])
    );

  return (
    <TransactionList
      data={list}
      ListHeaderComponent={<TransactionSummary summary={summary} />}
    />
  )
}