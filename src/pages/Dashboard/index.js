import React from 'react';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

// import { Container } from './styles';

export default function Dashboard() {
  return (
    <Background />
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  )
}
