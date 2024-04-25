import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {Black} from './Colors';
import {ms} from './utils';

interface TextProps extends TextStyle {
  text: string;
  size?: number;
  style?: object;
  color?: string;
}

export const HeaderText = ({text, size, color, style}: TextProps) => (
  <Text
    style={
      [
        styles.headerText,
        size && {fontSize: size},
        color && {color: color},
        style,
      ] as TextStyle
    }>
    {text}
  </Text>
);

export const RegularText = ({text, size, color, style}: TextProps) => (
  <Text
    style={
      [
        styles.regularText,
        size && {fontSize: size},
        color && {color: color},
        style,
      ] as TextStyle
    }>
    {text}
  </Text>
);

export const SmallText = ({text, size, color, style}: TextProps) => (
  <Text
    style={
      [
        styles.smallText,
        color && {color: color},
        size && {fontSize: size},
        style,
      ] as TextStyle
    }>
    {text}
  </Text>
);

export const SemiBoldText = ({text, style}: TextProps) => (
  <Text style={[styles.semiboldText, style]}>{text}</Text>
);

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: ms(30),
    lineHeight: ms(38),
    color: Black,
  },
  regularText: {
    fontFamily: 'Inter-Regular',
    fontSize: ms(16),
    lineHeight: ms(22),
    color: Black,
  },
  smallText: {
    fontFamily: 'Inter-Regular',
    fontSize: ms(14),
    lineHeight: ms(20),
    color: Black,
  },
  semiboldText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: ms(14),
    color: Black,
  },
});
