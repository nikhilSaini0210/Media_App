import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../costants/color';
import { fonts } from '../costants/fonts';
import IconComponent from './IconComponent';

type ButtonPrps = {
    containerStyle?: ViewStyle;
    isDisabled?: boolean;
    onPressed: () => void;
    title: string;
    suffixIcon?: string;
    suffixIconSize?: number;
    suffixIconColor?: string;
    prefixIcon?: string;
    prefixIconSize?: number;
    prefixIconColor?: string;
    type?: string;
};

const CustomButton = (props: ButtonPrps) => {
    const { isDisabled, onPressed } = props;

    return (
        <View style={[props.containerStyle]}>
            <TouchableOpacity
                activeOpacity={0.7}
                disabled={isDisabled}
                onPress={onPressed}>
                <LinearGradient
                    colors={[colors.lightPurple, colors.darkPurple]}
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.5, y: 0.1 }}
                    style={[
                        styles.container,
                        { paddingVertical: props.type === 'prefix' ? 10 : 15 },
                        { opacity: isDisabled ? 0.5 : 1 },
                    ]}>
                    {props.type === 'prefix' && (
                        <View style={[styles.iconContainer, { marginHorizontal: 5 }]}>
                            <IconComponent
                                icon={props.prefixIcon || ''}
                                size={props.prefixIconSize || 24}
                                color={props.prefixIconColor || colors.placeholderColor}
                            />
                        </View>
                    )}
                    <Text style={[styles.text, { color: colors.white }]}>
                        {props.title}
                    </Text>
                    {props.type === 'icon' && (
                        <View style={styles.iconContainer}>
                            <IconComponent
                                icon={props.suffixIcon || ''}
                                size={props.suffixIconSize || 24}
                                color={props.suffixIconColor || colors.placeholderColor}
                            />
                        </View>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.Bold,
        fontSize: 17,
        textAlign: 'center',
        color: colors.white,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
});