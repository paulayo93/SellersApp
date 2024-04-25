import {Platform} from 'react-native';
import {ColorValue, StatusBar, StatusBarStyle, Dimensions} from 'react-native';
import {White} from '../common/Colors';

export const isAndroid = Platform.OS === 'android';

export const setStatusBar = (color: ColorValue, barStyle?: StatusBarStyle) => {
  if (isAndroid) {
    StatusBar.setBackgroundColor(color);
    StatusBar.setBarStyle(barStyle || 'light-content');
  }
};

export const unsetStatusBar = () => {
  if (isAndroid) {
    StatusBar.setBackgroundColor(White);
    StatusBar.setBarStyle('dark-content');
  }
};

export const {height, width} = Dimensions.get('window');
