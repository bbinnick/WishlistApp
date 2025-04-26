import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
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
  AddItem: { item?: WishlistItem } | undefined;
};

type AddItemScreenRouteProp = RouteProp<RootStackParamList, 'AddItem'>;

const categories = [
  { label: 'Electronics', value: 'electronics', image: require('@/assets/images/electronics.jpg') },
  { label: 'Crafts', value: 'crafts', image: require('@/assets/images/crafts.jpg') },
  { label: 'Gifts', value: 'gifts', image: require('@/assets/images/gifts.jpg') },
  { label: 'Books', value: 'books', image: require('@/assets/images/books.jpg') },
  { label: 'Clothing', value: 'clothing', image: require('@/assets/images/clothing.jpg') },
  { label: 'Custom', value: 'custom', image: '' },
];

const AddItemScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'AddItem'>>();
  const route = useRoute<AddItemScreenRouteProp>();
  const { addItem, updateItem } = useWishlist();
  const [title, setTitle] = useState(route.params?.item?.title || '');
  const [description, setDescription] = useState(route.params?.item?.description || '');
  const [price, setPrice] = useState(route.params?.item?.price || '');
  const [category, setCategory] = useState(route.params?.item?.category || 'electronics');
  const [customCategory, setCustomCategory] = useState(route.params?.item?.category === 'custom' ? route.params?.item?.category : '');
  const [customImage, setCustomImage] = useState(route.params?.item?.image || '');
  const [url, setUrl] = useState(route.params?.item?.url || '');

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.item ? 'Edit Item' : 'Add Item',
    });
  }, [navigation, route.params?.item]);

  const handleSave = () => {
    if (!title) {
      Alert.alert('Please enter a title');
      return;
    }

    // Validate and format price if entered
    let formattedPrice = '';
    if (price) {
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(price)) {
        Alert.alert('Please enter a valid price in USD format (e.g., 10.00)');
        return;
      }
      formattedPrice = parseFloat(price).toFixed(2);
    }

    const selectedCategory = categories.find(cat => cat.value === category);
    let image = '';

    if (category === 'custom') {
      if (!customImage || !customCategory) {
        Alert.alert('Please enter a custom category name and image URL');
        return;
      }
      image = customImage;
    } else if (selectedCategory) {
      image = Image.resolveAssetSource(selectedCategory.image).uri;
    } else {
      image = '';
    }

    const newItem: WishlistItem = {
      id: route.params?.item?.id || Date.now(),
      title,
      description,
      price: formattedPrice,
      category: category === 'custom' ? customCategory : category,
      image,
      url,
    };

    if (route.params?.item) {
      updateItem(newItem);
    } else {
      addItem(newItem);
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  const handleCategoryChange = (itemValue: string) => {
    setCategory(itemValue);
    if (itemValue === 'custom' && !route.params?.item) {
      setCustomImage('');
      setCustomCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
        returnKeyType='done'
      />
      <TextInput placeholder="URL" value={url} onChangeText={setUrl} style={styles.input} />
      <Picker selectedValue={category} onValueChange={handleCategoryChange} style={styles.picker}>
        {categories.map(cat => (
          <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Picker>
      {category === 'custom' && (
        <>
          <TextInput placeholder="Custom Category Name" value={customCategory} onChangeText={setCustomCategory} style={styles.input} />
          <TextInput placeholder="Custom Image URL" value={customImage} onChangeText={setCustomImage} style={styles.input} />
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" color="grey" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  picker: {
    height: 'auto',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default AddItemScreen;