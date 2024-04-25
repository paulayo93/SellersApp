import {Black, Green600, Red600, White} from '../common';
import Snackbar from 'react-native-snackbar';

export const toast = (message, type = null) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    textColor:
      type === 'error' ? Red600 : type === 'success' ? Green600 : White,
    backgroundColor: Black,
    fontFamily: 'Inter-Medium',
  });
};
