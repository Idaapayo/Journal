import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function CustomButton({
  onPress,
  title,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={"bg-blue-500 py-2 px-4 rounded-md"}
      {...rest}
    >
      <Text className="text-white text-center text-base font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
