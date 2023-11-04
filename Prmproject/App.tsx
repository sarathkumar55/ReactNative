
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/components/HomeScreen/HomeScreen';
import LoginForm from './src/components/LoginForm/LoginForm';
import RecipeDetailScreen from './src/components/RecipeDetailScreen/RecipeDetailScreen';
import Favorites from './src/components/Favorites/Favorites';
import { FavoritesProvider } from './src/components/FavoritesContex/FavoritesContex';
import ProfileScreen from './src/components/ProfileScreen/ProfileScreen';
import ProfileIcon from './src/components/ProfileScreen/ProfileIcon';
import { AuthProvider } from './src/components/AuthContext/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
    <FavoritesProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => <ProfileIcon />,
            headerBackVisible: false, 
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{
            headerRight: () => <ProfileIcon />,
          }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{
            headerRight: () => <ProfileIcon />,
          }} />
        <Stack.Screen name="Profilescreen" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
