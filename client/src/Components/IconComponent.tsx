import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type IconComponentProps = {
  icon: string;
  size: number;
  color: string;
};

const IconComponent = (props: IconComponentProps) => {
  return <Icon name={props.icon} size={props.size} color={props.color} />;
};

export default IconComponent;