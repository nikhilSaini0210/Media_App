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
import DismissKeyboard from '../Components/DismissKeyboard';
import { fonts } from '../costants/fonts';
import IconComponent from '../Components/IconComponent';
import CustomButton from '../Components/CustomButton';
import PngIcon from '../Components/PngIcon';
import { facebook, google } from '../costants/images';
import { Route } from '../Navigation/Routes';
import { Formik } from 'formik';
import { RegisterSchema, registerInitialValues } from '../Yup/yup';
import { registerType } from '../costants/dataTypes';
import { RegisterScreenProps } from '../Navigation/AuthNavigator';
import CustomModal from '../Components/CustomModal';
import Loading from '../Components/Loading';
import {
    registerRequest,
    useAppDispatch,
    useAppSelector,
} from '../services';
import { RootState } from '../services/store';
import { icon } from '../costants/iconName';

const { height } = Dimensions.get('screen');

export type RegisterScreenParams = {};

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
    const [name, setName] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(false);
    // const [userInfo, setUserInfo] = useState({});
    const dispatch = useAppDispatch();

    const { loading, error, uid } = useAppSelector(
        (state: RootState) => state.auth,
    );

    // const { loading, error, userInfo} = useAppSelector((state: RootState) => state.signIn);

    // console.log(error);
    // console.log(userInfo?.email);

    const signIn = async () => {
        //   dispatch(signInRequest());
    };

    const handleLogin = () => {
        navigation.navigate(Route.LOGIN_SCREEN, {});
    };

    const handlePrivacy = () => {
        console.log('Privacy use');
    };

    const onClickCheckBox = () => {
        setIsCheck(!isCheck);
        if (isCheck) {
            setErrorMessage('This checkbox must be checked.');
        } else {
            setErrorMessage('');
        }
    };

    const onPressContinue = () => {
        navigation.navigate(Route.MAIN_NAVIGATOR, {});
        setVisible(false);
    };

    const onPressClose = () => {
        setVisible(false);
    };

    const handleRegister = async (values: registerType) => {
        if (!isCheck) {
            setErrorMessage('This checkbox must be checked.');
            return;
        }
        dispatch(
            registerRequest(
                values.firstName,
                values.lastName,
                values.email,
                values.password,
            ),
        );
    };

    useEffect(() => {
        if (loading === false && (error || uid)) {
            setVisible(true);
        }
    }, [loading, uid, error]);

    return (
        <Formik
            initialValues={registerInitialValues}
            validationSchema={RegisterSchema}
            onSubmit={values => handleRegister(values)}>
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
                            <Text style={styles.heading}>Create an Account</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <CustomInputField
                                onChangeText={handleChange('firstName')}
                                placeholder="First Name"
                                onBlured={() => setFieldTouched('firstName')}
                                error={errors.firstName}
                                value={values.firstName}
                                containerStyle={{ marginHorizontal: 20, marginBottom: 15 }}
                                type="default"
                                prefixIcon={icon.USER}
                                prefixIconColor={colors.darkPurple}
                                prefixIconSize={24}
                                suffixIcon={''}
                                suffixIconColor={''}
                                suffixIconSize={0}
                                keyboardType="default"
                                touched={touched.firstName}
                            />
                            <CustomInputField
                                onChangeText={handleChange('lastName')}
                                placeholder="Last Name"
                                onBlured={() => setFieldTouched('lastName')}
                                error={errors.lastName}
                                value={values.lastName}
                                containerStyle={{ marginHorizontal: 20, marginBottom: 15 }}
                                type="default"
                                prefixIcon={icon.USER}
                                prefixIconColor={colors.darkPurple}
                                prefixIconSize={24}
                                suffixIcon={''}
                                suffixIconColor={''}
                                suffixIconSize={0}
                                keyboardType="default"
                                touched={touched.lastName}
                            />
                            <CustomInputField
                                onChangeText={handleChange('email')}
                                placeholder="Email"
                                onBlured={() => setFieldTouched('email')}
                                error={errors.email}
                                value={values.email}
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
                                error={errors.password}
                                value={values.password}
                                containerStyle={{ marginHorizontal: 20, marginBottom: 10 }}
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
                            <View style={styles.subTextContainer}>
                                <TouchableOpacity activeOpacity={1} onPress={onClickCheckBox}>
                                    <View style={styles.square}>
                                        {isCheck && (
                                            <IconComponent
                                                size={18}
                                                icon={icon.CHECK_MARK}
                                                color={colors.darkPurple}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.subText}>
                                    By continuing you accept our{' '}
                                    <Text onPress={handlePrivacy} style={styles.privacyText}>
                                        Privacy Policy
                                    </Text>{' '}
                                    and{' '}
                                    <Text onPress={handlePrivacy} style={styles.privacyText}>
                                        Term of Use
                                    </Text>
                                    .
                                </Text>
                            </View>
                            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                        </View>
                        <CustomButton
                            title={'Register'}
                            containerStyle={{ marginHorizontal: 20}}
                            isDisabled={!isValid}
                            onPressed={handleSubmit}
                            type="default"
                        />
                        <View style={styles.lineContainer}>
                            <View style={styles.horizontalLine} />
                            <Text style={styles.OrText}>Or</Text>
                            <View style={styles.horizontalLine} />
                        </View>
                        <View style={styles.socialContainer}>
                            <TouchableOpacity activeOpacity={0.5} onPress={signIn}>
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
                                Already have an account?{' '}
                                <Text onPress={handleLogin} style={styles.login}>
                                    Login
                                </Text>
                            </Text>
                        </View>
                        <CustomModal
                            visible={visible}
                            title={!error ? 'Success' : 'Register Failed'}
                            icon={!error ? icon.CIRCLECHECKMARK : icon.CLOSECIRCLE}
                            size={130}
                            color={!error ? colors.green : colors.red}
                            message={!error ? 'Registered SuccessFully' : error}
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

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    textContainer: {
        marginVertical: 25,
        justifyContent: 'center',
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
        height: height * 0.53,
    },
    subTextContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 45,
    },
    square: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        marginRight: 8,
        borderRadius: 5,
    },
    subText: {
        fontSize: 15,
        fontFamily: fonts.Regular,
        color: colors.placeholderColor,
    },
    privacyText: {
        color: colors.darkPurple,
        textDecorationLine: 'underline',
    },
    lineContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    account: {
        fontSize: 18,
        fontFamily: fonts.Regular,
        color: colors.black,
    },
    login: {
        color: colors.lightPurple,
    },
    error: {
        fontSize: 12,
        fontFamily: fonts.Regular,
        color: colors.red,
        textAlign: 'left',
        lineHeight: 24,
        marginHorizontal: 20,
    },
});