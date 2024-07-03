import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MoviesScreen from './src/screens/MovieScreen';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Movies">
          <Stack.Screen name="Movies" component={MoviesScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <MoviesScreen />
    </QueryClientProvider>
  );
};

export default App;
