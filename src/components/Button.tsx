import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from '../core/theme';
import conn from '../helpers/const';

export default function CustomButton({mode, style, labelStyle, ...props}: any) {
  return (
    <PaperButton
      style={[styles.button, mode === 'outlined', style]}
      labelStyle={labelStyle}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: conn.COLOR_VIOLET,
  },
});
