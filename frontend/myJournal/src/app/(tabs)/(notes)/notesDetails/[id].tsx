import { useEffect, useState } from "react";
import { Note } from "@/src/types/note";
import MainLayout from "@/src/components/layouts/MainLayout";
import { router, useLocalSearchParams } from "expo-router";
import { localServer } from "@/src/config/config";
import CreateNote, {
  createNoteInitialValues,
} from "@/src/components/forms/CreateNote";
import { SafeAreaView, ScrollView } from "react-native";

export default function NotesDetails() {
  const [note, setNote] = useState<Note | undefined>(undefined);
  const [fetchNoteError, setFetchNoteError] = useState<string | undefined>(
    undefined,
  );
  const { id } = useLocalSearchParams();

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (typeof id === "string") {
          const response = await fetch(
            `${localServer}/notes/getNote/${parseInt(id)}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            },
          );
          const data = (await response.json()) as Note;
          setNote(data);
        }
      } catch (e) {
        // @ts-ignore
        setFetchNoteError(e.message);
      }
    };
    fetchNote();
  }, []);

  // Edit note
  async function handlesubmit(values: createNoteInitialValues) {
    try {
      const response = await fetch(`${localServer}/notes/update/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        router.back();
        console.log("note updated");
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  return (
    <SafeAreaView>
      <MainLayout>
        <ScrollView>
          {note && (
            <CreateNote initialValues={note} handleSubmit={handlesubmit} />
          )}
        </ScrollView>
      </MainLayout>
    </SafeAreaView>
  );
}
