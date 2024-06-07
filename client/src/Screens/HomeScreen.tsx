import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../costants/color';
import { logoutRequest, useAppDispatch, useAppSelector } from '../services';
import Loading from '../Components/Loading';
import { RootState } from '../services/store';
import CustomModal from '../Components/CustomModal';
import { icon } from '../costants/iconName';
import { HomeScreenProps } from '../Navigation/MainNavigator';

export type HomeScreenParams = {};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [visible, setVisible] = useState(false);
  const distpatch = useAppDispatch();
  const { loading, error, uid } = useAppSelector(
    (state: RootState) => state.auth,
  );

  // const {}

  const logOut = () => {
    distpatch(logoutRequest());
  }

  const clearOnboarding = async () => {
    //
    // distpatch(signInRequest());
  };

  const onPressContinue = () => {
    setVisible(false);
  };

  const onPressClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (loading === false && (error || uid === null)) {
      setVisible(true);
    }
  }, [loading, uid, error]);

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.darkPurple }}>HomeScreen</Text>
      <TouchableOpacity
        onPress={logOut}
        style={{
          paddingHorizontal: 80,
          paddingVertical: 20,
          borderRadius: 25,
          backgroundColor: colors.darkPurple,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: colors.white }}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cot} onPress={clearOnboarding}>
        <Text style={styles.goSign}>Google Sign</Text>
      </TouchableOpacity>
      <Loading visible={loading} />
      <CustomModal
        visible={visible}
        title={!error ? 'Success' : 'Logout Failed'}
        icon={!error ? icon.CIRCLECHECKMARK : icon.CLOSECIRCLE}
        size={130}
        color={!error ? colors.green : colors.red}
        message={!error ? 'Logout SuccessFully' : error}
        buttonTitle={!error ? 'Continue' : 'Close'}
        onClick={!error ? onPressContinue : onPressClose}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goSign: {
    color: colors.black
  },
  cot: {
    width: 150,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 25,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
});