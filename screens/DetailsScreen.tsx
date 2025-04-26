import React from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useWishlist } from '../components/WishlistContext';

interface WishlistItem {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  url: string;
}

type RootStackParamList = {
  Home: undefined;
  Details: { item: WishlistItem };
  AddItem: { item?: WishlistItem } | undefined;
  WebViewScreen: { url: string };
};

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Details'>>();
  const { item } = route.params;
  const { deleteItem } = useWishlist();

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteItem(item.id);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleOpenURL = () => {
    navigation.navigate('WebViewScreen', { url: item.url });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.label}>Description:</Text>
      {item.description ? <Text>{item.description}</Text> : <Text style={styles.placeholder}>Description not available</Text>}
      <Text style={styles.label}>Price:</Text>
      {item.price ? <Text>${item.price}</Text> : <Text style={styles.placeholder}>Price not available</Text>}
      <Text style={styles.label}>Category:</Text>
      <Text>{item.category}</Text>
      {item.url && (
        <View style={styles.buttonContainer}>
          <Button title="Open Website" onPress={handleOpenURL} color="#0000EE" />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => navigation.navigate('AddItem', { item })} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  placeholder: {
    fontStyle: 'italic',
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default DetailsScreen;