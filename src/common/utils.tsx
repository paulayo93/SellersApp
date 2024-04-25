import {moderateScale} from 'react-native-size-matters';
import {Platform} from 'react-native';
export const ms = (number: number) => moderateScale(number);

export const isAndroid = Platform.OS === 'android';
export const iOS = Platform.OS === 'ios';
export const capitalize = (str: string) => {
  const transformText =
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return transformText;
};
