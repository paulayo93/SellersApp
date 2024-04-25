import React from 'react';

import {View} from 'react-native';

import BottomTab from './BottomTab';

const AppNavigator = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <BottomTab />
    </View>
  );
};

export default AppNavigator;
