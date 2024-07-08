import { Text, View } from "react-native";
import { Formik, FormikValues } from "formik";
import { CustomTextInput } from "@/src/components/inputs/CustomTextInput";
import CustomButton from "@/src/components/buttons/CustomButton";
import * as Yup from "yup";
import React, { useState } from "react";
import { localServer } from "@/src/config/config";
import { router } from "expo-router";
import MainLayout from "@/src/components/layouts/MainLayout";

interface loginInitialValues extends FormikValues {
  username: string;
  password: string;
}

export default function SignUp() {
  const [signUpError, setSignUpError] = useState<string | undefined>(undefined);

  // Define validation schema
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Login user
  async function handleSubmit(values: loginInitialValues) {
    try {
      const response = await fetch(`${localServer}/auth/signUp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setSignUpError(undefined);
        const data = await response.json();
        console.log("Sign up successful!", data);
        // Navigate to login
        router.replace("/");
      }
    } catch (error) {
      // @ts-ignore
      setSignUpError(error.message);
    }
  }

  return (
    <MainLayout>
      <View className="flex-1 justify-center items-center">
        <View className=" w-full justify-center items-center">
          <View className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg  ">
            <View className="py-5">
              <Text className="text-xl">
                Create an account for your Journal
              </Text>
            </View>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={signUpSchema}
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
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    title="Enter your username"
                    error={
                      touched.username && errors.username
                        ? errors.username
                        : undefined
                    }
                  />
                  <CustomTextInput
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    title="Enter your password"
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />
                  {signUpError && (
                    <Text className="text-rose-700">{signUpError}</Text>
                  )}
                  <View className="pt-5">
                    <CustomButton
                      onPress={() => handleSubmit()}
                      title="Sign up"
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
