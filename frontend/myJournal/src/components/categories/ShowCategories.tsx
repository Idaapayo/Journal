import { ScrollView, TouchableOpacity, View, Text } from "react-native";

interface ShowCategoriesProps {
  categories: string[];
  setActiveCategory: (category: string) => void;
}

export default function ShowCategories({
  categories,
  setActiveCategory,
}: ShowCategoriesProps) {
  categories = [...categories, "All"].sort();
  return (
    <View>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="bg-blue-500 rounded-full py-2 px-4 m-1"
            onPress={() => setActiveCategory(category)}
          >
            <Text className="text-white">{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
