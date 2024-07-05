import { TextInput, TextInputProps, View, Text } from "react-native";

export interface CustomTextInputProps extends TextInputProps {
  className?: string;
  title: string;
  error?: string;
}

export function CustomTextInput(props: CustomTextInputProps) {
  return (
    <View className="flex flex-col">
      <View className="space-y-2">
        <Text>{props.title}</Text>
        <TextInput
          {...props}
          className="px-3 py-2 mb-3 bg-gray-100 border border-gray-300 rounded-lg"
        />
      </View>
      {props.error && <Text style={{ color: "red" }}>{props.error}</Text>}
    </View>
  );
}
