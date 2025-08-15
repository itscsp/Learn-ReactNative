import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { formatINR, getCurrentMonthName } from '../../helper/helperFunctions'

export default function PlansSummary({ plans = [] }) {
  const total = plans.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  const paid = plans.filter(p => String(p.status).toUpperCase() === 'PAID')
  const pending = plans.filter(p => String(p.status).toUpperCase() !== 'PAID')
  const headerMonth = `${getCurrentMonthName(new Date())} ${new Date().getFullYear()}`

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Summary • {headerMonth}</Text>
      <View style={styles.row}> 
        <Text style={styles.label}>Planned</Text>
        <Text style={styles.value}>{formatINR(total)}</Text>
      </View>
      <View style={styles.row}> 
        <Text style={styles.label}>Paid</Text>
        <Text style={[styles.value, styles.paid]}>{paid.length}</Text>
      </View>
      <View style={styles.row}> 
        <Text style={styles.label}>Pending</Text>
        <Text style={[styles.value, styles.pending]}>{pending.length}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 24,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2986cc',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    color: '#d0d0d0',
    fontSize: 14,
  },
  value: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  paid: { color: 'green' },
  pending: { color: 'red' },
})