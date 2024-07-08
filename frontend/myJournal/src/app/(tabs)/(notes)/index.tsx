import { useContext, useEffect, useState } from "react";
import { localServer } from "@/src/config/config";
import { UserContext } from "@/src/contexts/contexts";
import { FlatList, SafeAreaView, Text } from "react-native";
import NotesListCard from "@/src/components/cards/NotesListCard";
import { Note } from "@/src/types/note";
import MainLayout from "@/src/components/layouts/MainLayout";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useContext(UserContext) || {};

  // Fetch notes
  useEffect(() => {
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
    fetchNotes();
  }, []);

  return (
    <SafeAreaView>
      <MainLayout>
        <Text className="font-bold text-xl">Your Journals:</Text>
        <FlatList
          data={notes}
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
      </MainLayout>
    </SafeAreaView>
  );
}
