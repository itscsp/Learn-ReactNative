
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function PlansList({ plans }) {

  const renderPlanItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.amount}>₹{item.amount.toLocaleString('en-IN')}</Text>
      <View style={styles.row}>
        <Text style={[styles.status, item.status === 'PAID' ? styles.paid : styles.pending]}>
          {item.status}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Ionicons name="trash" size={28} color="#ff3333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>August 2025</Text>
     
      <Text style={styles.subtitle}>Plan Your Month</Text>
      <FlatList
        data={plans}
        renderItem={renderPlanItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 8,
    gap: 12,
  },
  button: {
    backgroundColor: '#2986cc',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2986cc',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amount: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  paid: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
});