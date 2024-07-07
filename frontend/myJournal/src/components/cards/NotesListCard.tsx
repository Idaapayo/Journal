import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import { format } from "date-fns";

interface NotesListCardProps extends TouchableOpacityProps {
  // children?: React.ReactNode;
  title: string;
  updatedAt: Date;
  text: string;
}

export default function NotesListCard({
  title,
  updatedAt,
  text,
}: NotesListCardProps) {
  return (
    <TouchableOpacity>
      <View className="flex-1 justify-center items-center">
        <View className=" w-full justify-center items-center">
          <View className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg  ">
            <Text>{title}</Text>
            <Text>{format(updatedAt, "yyyy-MM-dd")}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
