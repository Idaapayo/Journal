import { Text, TextInput, TextInputProps, View } from "react-native";

export interface CustomTextAreaProps extends TextInputProps {
  className?: string;
  title: string;
  error?: string;
}

export default function CustomTextArea(props: CustomTextAreaProps) {
  return (
    <View className="flex flex-col">
      <View className="space-y-2">
        <Text>{props.title}</Text>
        <TextInput
          {...props}
          className="px-3 py-2 mb-3 bg-gray-100 border border-gray-300 rounded-lg"
          numberOfLines={4}
          editable
          multiline
        />
      </View>
      {props.error && <Text style={{ color: "red" }}>{props.error}</Text>}
    </View>
  );
}
