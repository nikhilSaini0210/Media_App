import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../costants/\/color';
import PngIcon from '../Components/PngIcon';
import { fonts } from '../costants/fonts';
import CustomButton from '../Components/CustomButton';
import { Route } from '../Navigation/Routes';
import { WelcomeScreenProps } from '../Navigation/MainNavigator';
import auth from '@react-native-firebase/auth';

export type WelcomeScreenParams = {};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
    const handleGotoHome = () => {
        navigation.navigate(Route.HOME_SCREEN, {});
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {/* <PngIcon icon={welcome} height={328} width={300} /> */}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Welcome,{' '}{auth().currentUser?.displayName}</Text>
                <Text style={styles.title}>
                    You are all set now, let's reach your goals together with us
                </Text>
            </View>
            <CustomButton
                title={'Go To Home'}
                containerStyle={{ marginHorizontal: 20, marginTop: 190 }}
                isDisabled={false}
                onPressed={handleGotoHome}
                type="default"
            />
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 50,
        marginTop: 40
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.Regular,
        color: colors.black,
        textAlign: 'center',
        lineHeight: 24,
        marginHorizontal: 65,
    },
    heading: {
        fontSize: 20,
        fontFamily: fonts.Bold,
        color: colors.black,
        textAlign: 'center',
        lineHeight: 30,
        marginVertical: 5,
    },
});