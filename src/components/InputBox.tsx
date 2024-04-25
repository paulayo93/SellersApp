import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from 'react-native';

import {
  ms,
  isAndroid,
  Black,
  RitualCyan400,
  RoyalBlue600,
  iOS,
  RitualCyan100,
} from '../common';
import CurrencyInput from 'react-native-currency-input';
import {NairaIcon} from '../../assets/icons/icons';

interface InputProps {
  placeholder?: string;
  keyboardType?: 'phone-pad' | 'default' | 'email-address' | 'numeric';
  capitalize?: 'sentences' | 'none' | 'words' | 'characters' | undefined;
  style?: {};
  inputStyle?: {};
  onChangeText: Dispatch<SetStateAction<string>>;
  onBlur?: () => void;
  singular?: boolean;
  canSearch?: boolean;
  returnKeyType?: 'done' | 'next';
  handleBlur: () => void;
  value: string;
  handleTextChange: (value: any) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

const InputBox = ({
  placeholder,
  onChangeText,
  style,
  inputStyle,
  onSubmitEditing,
  handleBlur,
  keyboardType,
  handleTextChange,
  value,
  onChange,
}: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        onChange={onChange}
        placeholder={placeholder}
        placeholderTextColor={RitualCyan400}
        value={value}
        autoCapitalize="none"
        autoComplete="off"
        onChangeText={onChangeText}
        onBlur={() => {
          handleBlur();
        }}
        style={[styles.inputBox, inputStyle]}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={false}
        cursorColor={Black}
        keyboardType={keyboardType}
        returnKeyType="done"
      />
    </View>
  );
};

const CurrencyTextInput = ({placeholder, handleBlur, onChangeValue, value}) => {
  return (
    <View style={[styles.container]}>
      <View>
        <NairaIcon />
      </View>
      <CurrencyInput
        value={value}
        style={[styles.inputBox]}
        placeholder={placeholder}
        onChangeValue={onChangeValue}
        minValue={0}
        handleBlur={handleBlur}
        delimiter=","
        separator="."
        precision={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: isAndroid ? ms(40) : ms(40),
    color: RoyalBlue600,
    flex: 1,
    backgroundColor: RitualCyan100,
  },
  container: {
    paddingLeft: ms(8),
    paddingRight: ms(8),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: RitualCyan100,
  },
});

export {InputBox, CurrencyTextInput};
