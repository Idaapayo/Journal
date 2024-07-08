import { Text, View } from "react-native";
import { CustomTextInput } from "@/src/components/inputs/CustomTextInput";
import CustomButton from "@/src/components/buttons/CustomButton";
import { Formik, FormikValues } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import CustomTextArea from "@/src/components/inputs/CustomTextArea";

interface createNoteProps {
  initialValues: createNoteInitialValues;
  handleSubmit: (values: createNoteInitialValues) => void;
}

export interface createNoteInitialValues extends FormikValues {
  title: string;
  text: string;
  category: string;
  userId?: number;
}

const notesValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  text: Yup.string().required("Text is required"),
});

export default function CreateNote({
  initialValues,
  handleSubmit,
}: createNoteProps) {
  const [notesError, setNotesError] = useState<string | undefined>(undefined);
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={notesValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <CustomTextInput
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              title="Enter the title of your note"
              error={touched.title && errors.title ? errors.title : undefined}
            />
            <CustomTextInput
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values.category}
              title="Enter your the category of the note"
              error={
                touched.category && errors.category
                  ? errors.category
                  : undefined
              }
            />
            <CustomTextArea
              title="Enter your note"
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              value={values.text}
              error={touched.text && errors.text ? errors.text : undefined}
            />
            {notesError && <Text className="text-rose-700">{notesError}</Text>}
            <View className="pt-5">
              <CustomButton onPress={() => handleSubmit()} title="Save" />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
