import { Note } from "@/src/types/note";
import CreateNote, {
  createNoteInitialValues,
} from "@/src/components/forms/CreateNote";
import { localServer } from "@/src/config/config";
import { router } from "expo-router";
import MainLayout from "@/src/components/layouts/MainLayout";
import { ScrollView, Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "@/src/contexts/contexts";
export default function CreateNewNote() {
  const { user } = useContext(UserContext) || {};

  const initialValues: createNoteInitialValues = {
    text: "",
    category: "",
    title: "",
    userId: user?.id,
  };
  async function handleSubmit(values: createNoteInitialValues) {
    try {
      const response = await fetch(`${localServer}/notes/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        router.back();
        console.log("note created");
      }
    } catch (e) {
      console.log("error", e);
    }
  }
  return (
    <MainLayout>
      <Text className="py-2 font-bold text-xl">Create your note</Text>
      <ScrollView>
        <CreateNote initialValues={initialValues} handleSubmit={handleSubmit} />
      </ScrollView>
    </MainLayout>
  );
}
