import React from 'react';
import type { SvgProps } from 'react-native-svg';
import type { StyleProp, ViewStyle } from 'react-native';

type SvgIconSource = React.FC<SvgProps>;

export type AppSvgIconProps = {
  icon: SvgIconSource;
  size?: number;
  color?: string;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const AppSvgIcon: React.FC<AppSvgIconProps> = ({
  icon: Icon,
  size = 24,
  color,
  width,
  height,
  style,
  ...rest
}) => {
  const iconWidth = width ?? size;
  const iconHeight = height ?? size;

  return (
    <Icon
      width={iconWidth}
      height={iconHeight}
      color={color || 'black'}
      style={style}
      {...rest}
    />
  );
};

export default AppSvgIcon;
