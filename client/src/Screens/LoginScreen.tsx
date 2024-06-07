import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../costants/color';
import CustomInputField from '../Components/CustomInputField';
import { icon } from '../costants/iconName';
import PngIcon from '../Components/PngIcon';
import { facebook, google } from '../costants/images';
import CustomButton from '../Components/CustomButton';
import { fonts } from '../costants/fonts';
import { Route } from '../Navigation/Routes';
import DismissKeyboard from '../Components/DismissKeyboard';
import { Formik } from 'formik';
import { LoginSchema, loginInitialValues } from '../Yup/yup';
import { loginType } from '../costants/dataTypes';
import { LoginScreenProps } from '../Navigation/AuthNavigator';
import CustomModal from '../Components/CustomModal';
import Loading from '../Components/Loading';
import { loginRequest, useAppDispatch, useAppSelector } from '../services';
import { RootState } from '../services/store';

const { height } = Dimensions.get('screen');

export type LoginScreenParams = {};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();

    const { loading, error, uid } = useAppSelector(
        (state: RootState) => state.auth,
    );

    const handleRegister = async () => {
        navigation.navigate(Route.REGISTER_SCREEN, {});
    };

    const onPressContinue = () => {
        setVisible(false);
        navigation.navigate(Route.MAIN_NAVIGATOR, {});
    };

    const onPressClose = () => {
        setVisible(false);
    };

    const handleLogin = async (values: loginType) => {
        dispatch(loginRequest(values.email, values.password));
    };

    const handleFogetPassword = () => {
        navigation.navigate(Route.FORGET_PASSWORD_SCREEN, {});
    };

    useEffect(() => {
        if (loading === false && (error || uid)) {
            setVisible(true);
        }
    }, [loading, uid, error]);

    return (
        <Formik
            initialValues={loginInitialValues}
            validationSchema={LoginSchema}
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
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Hey there,</Text>
                            <Text style={styles.heading}>Welcome Back</Text>
                        </View>
                        <View style={styles.inputContainer}>
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
                            <CustomInputField
                                onChangeText={handleChange('password')}
                                placeholder="Password"
                                onBlured={() => setFieldTouched('password')}
                                value={values.password}
                                error={errors.password}
                                containerStyle={{ marginHorizontal: 20, marginBottom: 15 }}
                                secureTextEntry={true}
                                prefixIcon={icon.LOCK}
                                type="password"
                                suffixIcon={icon.EYE_OFF}
                                prefixIconColor={colors.darkPurple}
                                prefixIconSize={24}
                                suffixIconColor={colors.darkPurple}
                                suffixIconSize={24}
                                editable
                                keyboardType="default"
                                touched={touched.password}
                            />
                            <TouchableOpacity
                                style={styles.forgetBtn}
                                onPress={handleFogetPassword}
                                activeOpacity={0.5}>
                                <Text style={styles.forget}>Forgot your password?</Text>
                            </TouchableOpacity>
                        </View>
                        <CustomButton
                            title={'Login'}
                            containerStyle={{ marginHorizontal: 20, top: 40, marginTop: 150 }}
                            isDisabled={!isValid}
                            onPressed={handleSubmit}
                            prefixIcon={icon.LOGIN}
                            prefixIconColor={colors.white}
                            prefixIconSize={30}
                            type="prefix"
                        />
                        <View style={styles.lineContainer}>
                            <View style={styles.horizontalLine} />
                            <Text style={styles.OrText}>Or</Text>
                            <View style={styles.horizontalLine} />
                        </View>
                        <View style={styles.socialContainer}>
                            <TouchableOpacity activeOpacity={0.5}>
                                <View style={styles.block}>
                                    <PngIcon icon={google} width={25} height={25} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5}>
                                <View style={styles.block}>
                                    <PngIcon icon={facebook} width={25} height={25} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.loginContainer}>
                            <Text style={styles.account}>
                                Don't have an account yet?{' '}
                                <Text onPress={handleRegister} style={styles.login}>
                                    Register
                                </Text>
                            </Text>
                        </View>
                        <CustomModal
                            visible={visible}
                            title={!error ? 'Success' : 'Login Failed'}
                            icon={!error ? icon.CIRCLECHECKMARK : icon.CLOSECIRCLE}
                            size={130}
                            color={!error ? colors.green : colors.red}
                            message={!error ? 'Logged In SuccessFully' : error}
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

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    textContainer: {
        marginVertical: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.Regular,
        color: colors.black,
        textAlign: 'center',
        lineHeight: 24,
        marginVertical: 5,
    },
    heading: {
        fontSize: 20,
        fontFamily: fonts.Bold,
        color: colors.black,
        textAlign: 'center',
        lineHeight: 30,
    },
    inputContainer: {
        marginTop: 10,
        height: height * 0.26,
    },
    forgetBtn: {
        marginHorizontal: 118,
    },
    forget: {
        fontFamily: fonts.Medium,
        fontSize: 16,
        color: colors.lightPurple,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    buttonConatiner: {},
    lineContainer: {
        flexDirection: 'row',
        marginVertical: 25,
        justifyContent: 'center',
        alignItems: 'center',
        top: 40,
    },
    horizontalLine: {
        width: 150,
        height: 2,
        backgroundColor: colors.lightPurple,
        borderRadius: 5,
    },
    OrText: {
        color: colors.black,
        fontSize: 20,
        fontFamily: fonts.Regular,
        marginHorizontal: 10,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    block: {
        width: 60,
        height: 60,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: 40,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 40,
        top: 40,
    },
    account: {
        fontSize: 22,
        fontFamily: fonts.Regular,
        color: colors.black,
    },
    login: {
        color: colors.lightPurple,
    },
});