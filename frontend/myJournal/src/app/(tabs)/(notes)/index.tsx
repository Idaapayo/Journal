import { useContext, useEffect, useState } from "react";
import { localServer } from "@/src/config/config";
import { UserContext } from "@/src/contexts/contexts";
import { FlatList, SafeAreaView, Text } from "react-native";
import NotesListCard from "@/src/components/cards/NotesListCard";
import { Note } from "@/src/types/note";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useContext(UserContext) || {};
  console.log("user", user?.id);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (user) {
          console.log("in here");
          const response = await fetch(
            `${localServer}/notes/getNotes/${user.id}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            },
          );
          console.log(response);
          if (response.ok) {
            const data = (await response.json()) as Note[];
            console.log("the notes", data);
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
      <Text>Hello</Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NotesListCard
            title={item.title}
            text={item.text}
            updatedAt={item.updatedAt}
          />
        )}
        keyExtractor={(item) => item.userId}
      />
    </SafeAreaView>
  );
}
