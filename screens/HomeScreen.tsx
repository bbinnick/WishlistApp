import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, SectionList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useWishlist, WishlistItem } from '../components/WishlistContext';
import { Swipeable } from 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
  Details: { item: WishlistItem };
  AddItem: undefined;
};

const categories = [
  { label: 'Electronics', value: 'electronics', image: require('@/assets/images/electronics.jpg') },
  { label: 'Crafts', value: 'crafts', image: require('@/assets/images/crafts.jpg') },
  { label: 'Gifts', value: 'gifts', image: require('@/assets/images/gifts.jpg') },
  { label: 'Books', value: 'books', image: require('@/assets/images/books.jpg') },
  { label: 'Clothing', value: 'clothing', image: require('@/assets/images/clothing.jpg') },
  { label: 'Custom', value: 'custom', image: '' },
];

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { wishlist, deleteItem } = useWishlist();
  const [sortedWishlist, setSortedWishlist] = useState<{ title: string; data: WishlistItem[] }[]>([]);
  const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null);
  const [itemToDelete, setItemToDelete] = useState<WishlistItem | null>(null);
  const swipeableRefs = useRef<Map<number, Swipeable>>(new Map());

  const groupByCategory = (items: WishlistItem[]) => {
    const grouped = categories.map(category => ({
      title: category.label,
      data: items.filter(item => item.category === category.value),
    }));

    const customCategories = Array.from(new Set(items.map(item => item.category).filter(category => !categories.some(cat => cat.value === category))));
    customCategories.forEach(customCategory => {
      const customItems = items.filter(item => item.category === customCategory);
      if (customItems.length > 0) {
        grouped.push({ title: customCategory, data: customItems });
      }
    });

    return grouped.filter(group => group.data.length > 0);
  };

  useEffect(() => {
    const sorted = groupByCategory(wishlist);
    setSortedWishlist(sorted);
  }, [wishlist]);


  const handleDelete = (item: WishlistItem) => {
    setItemToDelete(item);
    const timeout = setTimeout(() => {
      deleteItem(item.id);
      setItemToDelete(null);
    }, 4000);
    setUndoTimeout(timeout);
  };

  const handleUndo = () => {
    if (undoTimeout) {
      clearTimeout(undoTimeout);
      setUndoTimeout(null);
      setItemToDelete(null);
      const swipeable = swipeableRefs.current.get(itemToDelete?.id || 0);
      if (swipeable) {
        swipeable.close();
      }
    }
  };

  const renderLeftActions = () => (
    <View style={styles.deleteBackground}>
      <Text style={styles.deleteText}>Deleting...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sortedWishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable
            ref={(ref) => {
              if (ref && item.id) {
                swipeableRefs.current.set(item.id, ref);
              }
            }}
            renderLeftActions={renderLeftActions}
            onSwipeableOpen={() => handleDelete(item)}
            onSwipeableClose={() => {
              if (itemToDelete && itemToDelete.id === item.id) {
                setItemToDelete(null);
              }
            }}
          >
            <TouchableOpacity onPress={() => { navigation.navigate('Details', { item }); }}>
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  {item.price ? <Text style={styles.price}>${item.price}</Text> : null}
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
      {itemToDelete && (
        <View style={styles.undoContainer}>
          <Text>Item will be deleted. </Text>
          <Button title="Undo" onPress={handleUndo} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  deleteBackground: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  undoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default HomeScreen;