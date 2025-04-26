import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    WebViewScreen: { url: string };
};

const WebViewScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'WebViewScreen'>>();
    const { url } = route.params;

    return (
        <View style={styles.container}>
            <WebView source={{ uri: url }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default WebViewScreen;