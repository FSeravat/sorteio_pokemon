import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { Text, TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  rawText?: string;
}

interface InputValueReference {
  value: string;
}

export default function Input({
  name,
  label,
  onChangeText,
  ...rest
}: InputProps) {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value: any) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Text style={styles.text}>{label}</Text>}

      <TextInput
        style={styles.input}
        ref={inputElementRef}
        keyboardAppearance="light"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </>
  );
}
