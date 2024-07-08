import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import { format } from "date-fns";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";

interface NotesListCardProps extends TouchableOpacityProps {
  title: string;
  updatedAt: Date;
  text: string;
  id: string;
}

export default function NotesListCard({
  title,
  updatedAt,
  text,
  id,
}: NotesListCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`(tabs)/(notes)/notesDetails/${id}`);
      }}
    >
      <View className="flex-1 justify-center items-center my-2">
        <View className=" w-full justify-center items-center">
          <View className="w-full block max-w-sm p-6 bg-blue-50 border border-gray-200 rounded-lg  ">
            <Text className="font-bold">{title}</Text>
            <Text>{format(updatedAt, "yyyy-MM-dd")}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
