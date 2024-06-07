import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import { colors } from '../costants/color';

type LoadingProps = {
   visible: boolean;
}

const Loading = (props: LoadingProps) => {
  return (
    <Modal visible={props.visible} transparent>
      <View style={styles.modal}>
        <View style={styles.conatiner}>
       <ActivityIndicator size={60} color={colors.darkPurple} />
    </View>
    </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackOpacity,
  },
  conatiner: {
    width: '40%',
    backgroundColor: colors.lightPurple,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 30,
    elevation: 20,
  },
});