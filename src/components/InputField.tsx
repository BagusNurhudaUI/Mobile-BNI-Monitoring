import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
}: any) {
  const [eyeIsOpen, setEyeIsOpen] = useState(true);
  const ChangeEyePasswords = () => {
    console.log('changeEyePasswords');
    setEyeIsOpen(!eyeIsOpen);
    if (eyeIsOpen) {
      console.log(eyeIsOpen, 'true');
    } else {
      console.log(eyeIsOpen, 'false');
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={eyeIsOpen}
          blurOnSubmit={false}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          value={value}
          onChangeText={onChangeText}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          fieldButtonFunction();
          ChangeEyePasswords();
        }}>
        {fieldButtonLabel && (
          <View>
            {eyeIsOpen && fieldButtonLabel ? (
              <Entypo
                name="eye"
                size={20}
                color="#666"
                style={{marginRight: 20}}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={20}
                color="#666"
                style={{marginRight: 20}}
              />
            )}
          </View>
        )}

        {/* <Entypo name="eye" size={20} color="#666" style={{marginRight: 20}} /> */}
        {/* <Text style={{color: '#AD40AF', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text> */}
      </TouchableOpacity>
    </View>
  );
}
