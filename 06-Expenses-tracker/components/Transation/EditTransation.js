import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles';
import Card from '../UI/Card';
import TextButton from '../UI/TextButton';
import { useNavigation } from '@react-navigation/native';

export default function EditTransation() {
    const navigation = useNavigation();
  return (
       <View style={styles.container}>
         <Card>
           <View style={styles.cardHeader}>
             <Text style={styles.cardTitle}>Edit</Text>
           </View>
           <View style={styles.cardBody}>
             <Text style={styles.cardMessage}>
               This action will permanently delete the transaction. Do you want to
               continue?
             </Text>
             <View style={styles.buttonGroup}>
               <TextButton
                 bgColor={GlobalStyles.colors.gray500}
                 onPress={() => {
                   navigation.navigate("RecentTransactions");
                 }}
               >
                 Cancel
               </TextButton>
               <TextButton
                 bgColor={GlobalStyles.colors.delete}
                 onPress={() => {
                   console.log('Delte this.')
                 }}
               >
                 Delete
               </TextButton>
             </View>
           </View>
         </Card>
       </View>
  )
}

const styles = StyleSheet.create({

  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    color: GlobalStyles.colors.delete,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardBody: {
    marginTop: 12,
  },
  cardMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: 'white',
  },
    buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
