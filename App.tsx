import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import TracksList from './src/screens/TracksList';
import styles from './styles';

const App: () => ReactNode = () => {
  const { appContainer, content, header, headerTitle } = styles;

  return (
    <SafeAreaView style={appContainer}>
      <StatusBar backgroundColor={'black'} />
      <View style={header}>
        <Text style={headerTitle}>Onizuka Player</Text>
      </View>
      <View style={content}>
        <TracksList />
      </View>
    </SafeAreaView>
  );
};

export default App;