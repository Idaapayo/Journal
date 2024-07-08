import { useCallback, useContext, useEffect, useState } from "react";
import { localServer } from "@/src/config/config";
import { UserContext } from "@/src/contexts/contexts";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import NotesListCard from "@/src/components/cards/NotesListCard";
import { Note } from "@/src/types/note";
import MainLayout from "@/src/components/layouts/MainLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { getTime } from "date-fns";
import ShowCategories from "@/src/components/categories/ShowCategories";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const { user } = useContext(UserContext) || {};

  // Sort notes by the latest updated date
  const sortedNotes = [...notes].sort(
    (a, b) => getTime(b.updatedAt) - getTime(a.updatedAt),
  );

  const getUniqueCategories = (notes: Note[]) => {
    const categories = notes.map((note) => note.category);
    return [...new Set(categories)];
  };

  const categories = getUniqueCategories(notes);
  const notesFiltered = sortedNotes.filter(
    (note) => note.category === activeCategory,
  );

  // Fetch notes
  const fetchNotes = async () => {
    try {
      if (user) {
        const response = await fetch(
          `${localServer}/notes/getNotes/${user.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );
        if (response.ok) {
          const data = (await response.json()) as Note[];
          setNotes(data);
        }
      }
    } catch (e) {
      console.log("the error", e);
    }
  };

  // Re-render the page when the screen is in focus
  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [user]),
  );

  return (
    <SafeAreaView>
      <MainLayout>
        <ShowCategories
          categories={categories}
          setActiveCategory={setActiveCategory}
        />
        <Text className="font-bold text-xl my-2">Your Journals:</Text>
        <FlatList
          data={activeCategory == "All" ? sortedNotes : notesFiltered}
          renderItem={({ item }) => (
            <NotesListCard
              title={item.title}
              text={item.text}
              updatedAt={item.updatedAt}
              id={item.id.toString()}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity
          onPress={() => {
            router.push(`(tabs)/(notes)/createNewNote`);
          }}
          className="absolute bottom-5 right-5 w-20 h-20 bg-blue-500 rounded-full justify-center items-center shadow-lg"
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </MainLayout>
    </SafeAreaView>
  );
}
