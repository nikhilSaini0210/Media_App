import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ForgetPasswordScreenProps } from '../Navigation/AuthNavigator';
import DismissKeyboard from '../Components/DismissKeyboard';
import { colors } from '../costants/color';
import { fonts } from '../costants/fonts';
import CustomInputField from '../Components/CustomInputField';
import { icon } from '../costants/iconName';
import CustomButton from '../Components/CustomButton';
import { Formik } from 'formik';
import CustomModal from '../Components/CustomModal';
import Loading from '../Components/Loading';
import {
  forgetPasswordRequest,
  useAppDispatch,
  useAppSelector,
} from '../services';
import { RootState } from '../services/store';
import { ForgetPasswordSchema, forgetPasswordInitialValues } from '../Yup/yup';
import { forgetPassordType } from '../costants/dataTypes';
import { Route } from '../Navigation/Routes';

const { height } = Dimensions.get('screen');

export type ForgetPasswordScreenParams = {};

const ForgetPasswordScreen = ({ navigation }: ForgetPasswordScreenProps) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { loading, error, message } = useAppSelector(
    (state: RootState) => state.auth,
  );



  const onPressContinue = () => {
    setVisible(false);
    navigation.navigate(Route.LOGIN_SCREEN, {});
  };

  const onPressClose = () => {
    setVisible(false);
  };

  const handleLogin = async (values: forgetPassordType) => {
    dispatch(forgetPasswordRequest(values.email));
  };

  useEffect(() => {
    if (loading === false && (error || message)) {
      setVisible(true);
    }
  }, [loading, message, error]);

  return (
    <Formik
      initialValues={forgetPasswordInitialValues}
      validationSchema={ForgetPasswordSchema}
      onSubmit={values => handleLogin(values)}>
      {({
        values,
        errors,
        handleChange,
        isValid,
        handleSubmit,
        touched,
        setFieldTouched,
      }) => (
        <DismissKeyboard>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Forget Password ?</Text>
            </View>
            <View style={styles.inputConatiner}>
              <CustomInputField
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Email"
                onBlured={() => setFieldTouched('email')}
                error={errors.email}
                containerStyle={{ marginHorizontal: 20, marginBottom: 15 }}
                type="default"
                prefixIcon={icon.MAIL}
                prefixIconColor={colors.darkPurple}
                prefixIconSize={24}
                suffixIcon={''}
                suffixIconColor={''}
                suffixIconSize={0}
                keyboardType="email-address"
                touched={touched.email}
              />
            </View>
            <CustomButton
              title={'Send Email'}
              containerStyle={{ marginHorizontal: 20, top: 60 }}
              isDisabled={!isValid}
              onPressed={handleSubmit}
              type="default"
            />
            <CustomModal
              visible={visible}
              title={!error ? 'Success' : 'Forget Password Failed'}
              icon={!error ? icon.CIRCLECHECKMARK : icon.CLOSECIRCLE}
              size={130}
              color={!error ? colors.green : colors.red}
              message={
                !error ? 'Password reset email sent successfully' : error
              }
              buttonTitle={!error ? 'Continue' : 'Close'}
              onClick={!error ? onPressContinue : onPressClose}
            />
            <Loading visible={loading} />
          </View>
        </DismissKeyboard>
      )}
    </Formik>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleContainer: {
    marginVertical: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.Bold,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 30,
  },
  inputConatiner: {
    marginTop: 10,
    height: height * 0.7,
  },
});