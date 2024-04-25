import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ProductTabIconActive,
  ProductTabIconInActive,
  InStoreTabIconActive,
  InStoreTabIconInActive,
  ProfileTabIconActive,
  ProfileTabIconInActive,
} from '../../assets/icons/icons';
import {White} from '../common/Colors';
import {MainStackList} from '../types/navigation.types';
import {iOS} from '../common/utils';
import ProductScreen from '../screens/Product';
import InStore from '../screens/InStore';

const Tab = createBottomTabNavigator<MainStackList>();

interface TabIcon {
  tabName: string;
  focused: boolean;
}

const TabIcon = ({tabName, focused}: TabIcon) => {
  if (tabName === 'product') {
    if (focused) {
      return <ProductTabIconActive />;
    } else {
      return <ProductTabIconInActive />;
    }
  }
  if (tabName === 'in-store') {
    if (focused) {
      return <InStoreTabIconActive />;
    } else {
      return <InStoreTabIconInActive />;
    }
  }
  if (tabName === 'profile') {
    if (focused) {
      return <ProfileTabIconActive />;
    } else {
      return <ProfileTabIconInActive />;
    }
  }
};

const BottomTab = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#5B4CCC',
      tabBarInactiveTintColor: '#A7A3B3',
      tabBarLabelStyle: {
        textTransform: 'capitalize',
        fontFamily: 'Inter-Medium',
        fontSize: 10,
        lineHeight: 18,
        marginTop: 7,
      },
      tabBarStyle: {
        paddingTop: 13,
        minHeight: 60,
        paddingBottom: iOS ? 20 : 10,
        backgroundColor: White,
      },
    }}>
    <Tab.Screen
      name="product"
      component={ProductScreen}
      options={{
        title: 'Product',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => (
          <TabIcon tabName={'product'} focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="store"
      component={InStore}
      options={{
        title: 'in-store',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => (
          <TabIcon tabName={'in-store'} focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="profile"
      component={ProductScreen}
      options={{
        title: 'Profile',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => (
          <TabIcon tabName={'profile'} focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default BottomTab;
