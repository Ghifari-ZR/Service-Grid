import { WebView } from 'react-native-webview';
import {
  AppState,
  AppStateStatus,
  Alert,
  ScrollView,
  RefreshControl,
  View,
  BackHandler,
  Platform,
} from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function ExploreScreen() {
  const [hasError, setHasError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const url = 'http://192.168.150.109:8069/odoo/timesheets';
  const webViewRef = useRef<WebView>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const canGoBack = useRef(false); 

  //const fallbackUrl = 'http://192.168.150.109:8069/odoo/timesheets';

  const handleError = async (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    const description = nativeEvent?.description?.toLowerCase?.() || '';
    const isTimeout =
      description.includes('net::err_connection_timed_out') ||
      description.includes('timeout');

    if (!hasError) {
      setHasError(true);

      // Show specific alert based on error type
      if (isTimeout) {
        Alert.alert(
          'Connection Timeout',
          'Unable to access the Service Grid page. Please connect to the BFSI network.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Error',
          nativeEvent?.description +
            '. \nCheck your connection and try refreshing or reopening the application.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      hasError &&
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      webViewRef.current?.reload();
      setHasError(false);
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, [hasError]);

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    webViewRef.current?.reload();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleBackPress = useCallback(() => {
    if (canGoBack.current && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
      return () => backHandler.remove();
    }
  }, [handleBackPress]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          onError={handleError}
          onHttpError={handleError}
          onNavigationStateChange={(navState) => {
            canGoBack.current = navState.canGoBack;
          }}
          startInLoadingState={true}
          style={{ flex: 1 }}
        />
      </ScrollView>
    </View>
  );
}