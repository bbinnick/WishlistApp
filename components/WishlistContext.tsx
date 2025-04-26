import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export interface WishlistItem {
    id: number;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string;
    url: string;
}

interface WishlistContextProps {
    wishlist: WishlistItem[];
    loadWishlist: () => void;
    addItem: (item: WishlistItem) => void;
    updateItem: (item: WishlistItem) => void;
    deleteItem: (id: number) => void;
}

const defaultItem: WishlistItem = {
    id: 1,
    title: 'Laptop',
    description: 'ASUS VivoBook 16" Laptop',
    price: '599.99',
    category: 'electronics',
    image: require('@/assets/images/electronics.jpg'),
    url: 'https://www.bestbuy.com/site/asus-vivobook-16-16-laptop-amd-ryzen-7-with-16gb-memory-1tb-ssd-indie-black/6542092.p?skuId=6542092',
};

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

interface WishlistProviderProps {
    children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const db = useSQLiteContext();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    useEffect(() => {
        createTable();
        loadWishlist();
    }, []);

    const createTable = async () => {
        try {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS wishlist (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    price TEXT,
                    category TEXT,
                    image TEXT,
                    url TEXT
                );
            `);

        } catch (error) {
            console.error('Error creating table:', error);
        }
    };

    const loadWishlist = async () => {
        try {
            const results = await db.getAllAsync<WishlistItem>('SELECT * FROM wishlist ORDER BY id DESC;');
            if (results.length === 0 && wishlist.length === 0) {
                await addItem(defaultItem);
            } else {
                setWishlist(results);
            }
        } catch (error) {
            console.error('Error loading wishlist:', error);
        }
    };

    const addItem = async (item: WishlistItem) => {
        try {
            await db.runAsync(
                'INSERT INTO wishlist (id, title, description, price, category, image, url) VALUES (?, ?, ?, ?, ?, ?, ?);',
                [item.id, item.title, item.description, item.price, item.category, item.image, item.url]
            );
            loadWishlist();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const updateItem = async (item: WishlistItem) => {
        try {
            await db.runAsync(
                'UPDATE wishlist SET title = ?, description = ?, price = ?, category = ?, image = ?, url = ? WHERE id = ?;',
                [item.title, item.description, item.price, item.category, item.image, item.url, item.id]
            );
            loadWishlist();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            await db.runAsync('DELETE FROM wishlist WHERE id = ?;', [id]);
            loadWishlist();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, loadWishlist, addItem, updateItem, deleteItem }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};