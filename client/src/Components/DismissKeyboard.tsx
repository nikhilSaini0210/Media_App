import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import React, {ReactNode} from 'react';

interface DismissKeyboardProps {
  children: ReactNode;
}

const DismissKeyboard: React.FC<DismissKeyboardProps> = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;