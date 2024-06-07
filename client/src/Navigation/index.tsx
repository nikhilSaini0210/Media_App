import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

import auth from '@react-native-firebase/auth';

const AppContainer = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChange(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const onSubscribe = () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }

  useEffect(() => {
      onSubscribe();
  }, []);

  // if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppContainer;