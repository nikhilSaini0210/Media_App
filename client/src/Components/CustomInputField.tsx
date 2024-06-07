import {
    Animated,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle,
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import {colors} from '../costants/color';
  import {fonts} from '../costants/fonts';
  import {icon} from '../costants/iconName';
  import IconComponent from './IconComponent';
  
  type CustomInputFieldProps = {
    containerStyle?: ViewStyle;
    placeholder: string;
    onChangeText: (value: string) => void;
    error: string | undefined;
    secureTextEntry?: boolean;
    prefixIcon: string;
    type: string;
    suffixIcon: string;
    prefixIconColor: string;
    prefixIconSize: number;
    suffixIconColor: string;
    suffixIconSize: number;
    editable?: boolean;
    keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    inputWidth?: number;
    disableSuffix?: boolean;
    value: string;
    onBlured: () => void;
    touched: boolean | undefined;
  };
  
  const CustomInputField = (props: CustomInputFieldProps) => {
    const {onChangeText, containerStyle, placeholder, error, prefixIcon, type} =
      props;
    const [text, setText] = useState('');
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(props.secureTextEntry);
    const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;
    const [width, setWidth] = useState(311);
  
    const labelStyle = {
      left: prefixIcon.length !== 0 ? 3.5 : 10,
      top: labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 3],
      }),
      fontSize: labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 14],
      }),
      color: labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.placeholderColor, colors.darkPurple],
      }),
    };
  
    const handleFocus = () => {
      setFocused(true);
      animationLabel(1);
    };
  
    const animationLabel = (toValue: number) => {
      Animated.timing(labelPosition, {
        toValue: toValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };
  
    const handleBlur = () => {
      setFocused(false);
      if (props.onBlured) {
        props.onBlured();
      }
      if (!text) {
        animationLabel(0);
      }
    };
  
    const handleTextChange = (text: any) => {
      setText(text);
      if (onChangeText) {
        onChangeText(text);
      }
      if (text) {
        animationLabel(1);
      } else {
        animationLabel(focused ? 1 : 0);
      }
    };
  
    useEffect(() => {
      const w = props.inputWidth ? props.inputWidth : 311;
      setWidth(w);
    }, [props.inputWidth]);
  
    return (
      <View style={[containerStyle, styles.container]}>
        <View
          style={[
            styles.innerecontainer,
            {
              borderColor:
                props.touched && error
                  ? colors.red
                  : focused
                  ? colors.black
                  : colors.lightPurple,
            },
            prefixIcon.length !== 0 && styles.innerContainerIcon,
          ]}>
          {prefixIcon.length !== 0 && (
            <View style={styles.prefixIcon}>
              <IconComponent
                icon={prefixIcon}
                size={props.prefixIconSize}
                color={props.prefixIconColor}
              />
            </View>
          )}
          <View>
            {focused && (
              <Animated.Text style={[styles.label, labelStyle]}>
                {placeholder}
              </Animated.Text>
            )}
            {type === 'password' ? (
              <View
                style={[
                  styles.inputContainer,
                  prefixIcon.length !== 0 && {width: 273},
                ]}>
                <TextInput
                  style={[
                    styles.inputField,
                    {height: focused ? 38 : 55},
                    prefixIcon.length === 0 && {paddingLeft: 10},
                  ]}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChangeText={onChangeText}
                  value={props.value}
                  placeholder={focused ? '' : placeholder}
                  placeholderTextColor={colors.lightPurple}
                  autoCapitalize="none"
                  textAlignVertical="center"
                  textContentType={
                    props.secureTextEntry ? 'newPassword' : props.secureTextEntry
                  }
                  secureTextEntry={showPassword}
                  cursorColor={colors.darkPurple}
                  keyboardType={props.keyboardType}
                />
              </View>
            ) : (
              <View
                style={[
                  styles.inputContainer,
                  {
                    width:
                      props.suffixIcon.length !== 0
                        ? 273
                        : prefixIcon.length !== 0
                        ? width
                        : 345,
                  },
                ]}>
                <TextInput
                  style={[
                    styles.inputField,
                    {height: focused ? 38 : 55},
                    prefixIcon.length === 0 && {paddingLeft: 10},
                  ]}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChangeText={handleTextChange}
                  value={props.value}
                  placeholder={focused ? '' : placeholder}
                  placeholderTextColor={colors.lightPurple}
                  textAlignVertical="center"
                  autoCapitalize="none"
                  cursorColor={colors.darkPurple}
                  editable={props.editable}
                  keyboardType={props.keyboardType}
                />
              </View>
            )}
          </View>
          {type === 'password'
            ? props.secureTextEntry && (
                <View>
                  <TouchableOpacity
                    style={styles.suffixIcon}
                    onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <IconComponent
                        icon={props.suffixIcon}
                        size={props.suffixIconSize}
                        color={props.suffixIconColor}
                      />
                    ) : (
                      <IconComponent
                        icon={icon.EYE}
                        size={props.suffixIconSize}
                        color={props.suffixIconColor}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )
            : props.suffixIcon.length !== 0 && (
                <TouchableOpacity
                  disabled={props.disableSuffix}
                  style={styles.suffixIcon}>
                  <IconComponent
                    icon={props.suffixIcon}
                    size={props.suffixIconSize}
                    color={props.suffixIconColor}
                  />
                </TouchableOpacity>
              )}
        </View>
        {props.touched && error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  };
  
  export default CustomInputField;
  
  const styles = StyleSheet.create({
    container: {},
    innerecontainer: {
      borderWidth: 1,
      borderRadius: 14,
      height: 60,
      backgroundColor: colors.inputColor,
    },
    innerContainerIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    label: {
      color: colors.placeholderColor,
      fontFamily: fonts.Regular,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputField: {
      flex: 1,
      fontSize: 16,
      fontFamily: fonts.Regular,
      backgroundColor: colors.inputColor,
      borderRadius: 14,
      color: colors.darkPurple,
    },
    error: {
      marginTop: 5,
      fontSize: 14,
      fontFamily: fonts.Regular,
      color: colors.red,
      left: 10,
    },
    prefixIcon: {
      width: 24,
      marginLeft: 10,
      marginRight: 5,
    },
    suffixIcon: {
      width: 24,
      marginHorizontal: 5,
    },
  });