import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AddItemScreen from '../screens/AddItemScreen';
import WebViewScreen from '../screens/WebViewScreen';
import { SQLiteProvider } from 'expo-sqlite';
import { WishlistProvider } from './WishlistContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SQLiteProvider databaseName="wishlistDB.db">
      <WishlistProvider>
        <Main />
      </WishlistProvider>
    </SQLiteProvider>
  );
};

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Wishlist',
          headerTitleAlign: 'center',
          headerLeft: undefined,
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen}
        options={{ title: 'Add Item' }} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen}
        options={{ title: 'Web View' }} />
    </Stack.Navigator>
  );
};

export default App;