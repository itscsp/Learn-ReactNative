import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreTab from '../(tabs)/explore';
import NewsDetail from '../(tabs)/NewsDetail';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExploreTab" component={ExploreTab} options={{ title: 'Explore' }} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ title: 'News Detail' }} />
    </Stack.Navigator>
  );
}
