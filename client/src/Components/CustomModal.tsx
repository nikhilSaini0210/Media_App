import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../costants/color';
import {fonts} from '../costants/fonts';
import IconComponent from './IconComponent';
import LinearGradient from 'react-native-linear-gradient';

type CustomModalProps = {
  visible: boolean;
  title?: string | undefined;
  icon?: string | undefined;
  size?: number | undefined;
  color?: string | undefined;
  message?: string | null
  buttonTitle?: string | undefined;
  onClick: () => void;
};

const CustomModal = (props: CustomModalProps) => {
  return (
    <Modal visible={props.visible} transparent>
      <View style={styles.modal}>
        <View style={styles.conatiner}>
          <View style={styles.iconContainer}>
            {props.title && <Text style={styles.error}>{props.title}</Text>}
          </View>
          {props.icon && props.size && props.color && (
            <View style={styles.bigIcon}>
              <IconComponent
                icon={props.icon}
                size={props.size}
                color={props.color}
              />
            </View>
          )}
          {props.message && <Text style={styles.message}>{props.message}</Text>}
          {props.buttonTitle && (
            <TouchableOpacity onPress={props.onClick} activeOpacity={0.7}>
              <LinearGradient
                colors={[colors.lightPurple, colors.darkPurple]}
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 0.1}}
                style={styles.button}>
                <Text style={styles.btnTitle}>{props.buttonTitle}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackOpacity,
  },
  conatiner: {
    width: '80%',
    backgroundColor: colors.lightPurple,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
    elevation: 20,
  },
  error: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    color: colors.white,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    marginTop: 20,
    borderRadius: 30,
  },
  iconContainer: {},
  icon: {
    left: 90,
  },
  btnTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  bigIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});