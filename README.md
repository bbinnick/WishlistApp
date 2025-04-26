# WishlistApp 📋

WishlistApp is a mobile application built with [Expo](https://expo.dev) and React Native. It allows users to create, manage, and organize their wishlist items into categories. The app supports features like adding, editing, deleting items, and viewing item details. It also includes SQLite integration for persistent data storage.

---

## Features ✨

- **Add Items**: Add wishlist items with details like title, description, price, category, image, and URL.
- **Edit Items**: Modify existing wishlist items.
- **Delete Items**: Swipe to delete items with an undo option.
- **Categories**: Organize items into predefined or custom categories.
- **Details View**: View detailed information about an item, including an option to open its URL in a web view.
- **Persistent Storage**: Uses SQLite for storing wishlist data.
- **Light/Dark Mode**: Supports light and dark themes.
- **Cross-Platform**: Works on Android, iOS, and Web.

---

## Getting Started 🚀

Follow these steps to set up and run the app locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile device or emulator (Android/iOS)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/WishlistApp.git
   cd WishlistApp

2. Install dependencies:
   ```bash
   npm install
   
3. Start the development server:
   ```bash
   npx expo start
4. Open the app:

- Scan the QR code in the terminal using the Expo Go app (available on Android/iOS).
- Alternatively, use an emulator or simulator.

---

### Project Structure 📂
The project follows a modular structure for better organization:

- app/: Contains the main screens and routing logic.
   - index.tsx: Home screen.
   - explore.tsx: Explore screen with app features.
   - _layout.tsx: Tab navigation layout.
- components/: Reusable components like WishlistContext, ThemedText, Collapsible, etc.
- screens/: Screens for specific app functionalities (e.g., HomeScreen, AddItemScreen, DetailsScreen).
- hooks/: Custom hooks like useColorScheme and useThemeColor.
- constants/: App-wide constants like colors.
- scripts/: Utility scripts (e.g., reset-project.js for resetting the app).

---

### Key Files 📄
- components/WishlistContext.tsx: Manages the wishlist state and SQLite integration.
- screens/AddItemScreen.tsx: Screen for adding or editing wishlist items.
- screens/HomeScreen.tsx: Displays the wishlist organized by categories.
- screens/DetailsScreen.tsx: Shows detailed information about a wishlist item.
- scripts/reset-project.js: Resets the app to a blank state for fresh development.

---

### How It Works ⚙️
1. **Wishlist Management**:
   - Items are stored in an SQLite database.
   - The WishlistContext provides methods to add, update, delete, and load items.

2. **Navigation**:
   - Uses React Navigation for stack and tab-based navigation.
   - File-based routing is implemented with Expo Router.

3. **Theming**:
   - Light and dark themes are supported using useColorScheme and useThemeColor.

4. **Web View**:
   - Opens item URLs in a web view using react-native-webview.

---

### Resetting the Project 🔄
To reset the app to a blank state:

1. Run the following command:
   ```bash
   npm run reset-project

2. This will:
   - Move the current app/ directory to app-example/.
   - Create a new blank app/ directory with starter files.

---

### Development Tips 🛠️
- **Debugging**:
   - Use the Expo Developer Tools by pressing d in the terminal.
   - Open developer tools:
      - iOS: Cmd + D
      - Android: Cmd + M
      - Web: F12
- **Testing**:
   - Run unit tests with Jest:
   ```bash
   npm test

- **Linting**:
   - Check for code quality issues:
   ```bash
   npm run lint

---

### Dependencies 📦
Key dependencies used in the project:

- **React Native**: Core framework for building the app.
- **Expo**: Simplifies React Native development.
- **SQLite**: Persistent storage for wishlist items.
- **React Navigation**: Navigation library for stack and tab navigation.
- **React Native WebView**: For opening URLs in a web view.
- **React Native Reanimated**: For animations.

---

### Project Description
WishlistApp is a modern wishlist management solution, empowering users to organize their desires and plans efficiently. It caters to a wide range of use cases, from personal wishlists to group gifting. Built with TypeScript, it emphasizes performance and maintainability, ensuring a seamless experience for all users.

---

### Acknowledgments 🙌
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [SQLite Integration with Expo](https://docs.expo.dev/versions/latest/sdk/sqlite/)
