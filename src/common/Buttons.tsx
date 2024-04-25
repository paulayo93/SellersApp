import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import {RitualCyan100, RitualCyan600, White} from './Colors';
import {ms} from './utils';
// import filter from 'assets/images/filter.png';

interface ButtonProps {
  text: string;
  transparent?: boolean;
  disabled?: boolean;
  onPress: () => void;
  style?: object;
  isLoading?: boolean;
  textStyle?: object;
  bgColor?: string;
  icon?: string;
}

export const Button = ({
  text,
  transparent,
  onPress,
  style,
  textStyle,
  disabled,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      onPress={disabled ? null : onPress}
      style={[
        styles.button,
        transparent && styles.transparentBtn,
        disabled && styles.disabled,
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator size="small" color={White} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            transparent && styles.transparentBtnText,
            disabled && styles.disabled,
            textStyle,
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const TextButton = ({
  text,
  icon,
  onPress,
  style,
  textStyle,
}: ButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.textBtn, style]}>
    {/* <Image style={styles.textIcon} source={icon || filter} />  */}
    <Text style={[styles.textBtnText, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: ms(308),
    height: ms(46),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  transparentBtn: {
    backgroundColor: 'transparent',
    borderColor: White,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    lineHeight: 19,
    color: White,
  },
  transparentBtnText: {
    color: White,
  },
  textBtn: {
    paddingVertical: ms(7),
    paddingHorizontal: ms(35),
    borderRadius: ms(10),
    backgroundColor: RitualCyan100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'none',
  },
  textBtnText: {
    fontFamily: 'Inter-Regular',
    fontSize: ms(16),
    lineHeight: ms(22),
    color: RitualCyan600,
    textAlign: 'center',
  },
  textIcon: {
    width: ms(24),
    height: ms(24),
    marginRight: ms(7),
  },
  disabled: {},
});
