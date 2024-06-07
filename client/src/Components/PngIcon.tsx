import React from 'react';
import FastImage from 'react-native-fast-image';

type PngIconProps = {
    width: number;
    height: number;
    icon: any;
}

const PngIcon = (props: PngIconProps) => {

    const {width, height, icon} = props;

  return (
    <FastImage
      source={icon}
      style={{width: width, height: height}}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};

export default PngIcon;