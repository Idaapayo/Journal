import { Text, View } from "react-native";
import { Formik, FormikValues } from "formik";
import { CustomTextInput } from "@/src/components/inputs/CustomTextInput";
import CustomButton from "@/src/components/buttons/CustomButton";
import * as Yup from "yup";
import React, { useState } from "react";
import { localServer } from "@/src/config/config";
import { Link } from "expo-router";

interface loginInitialValues extends FormikValues {
  username: string;
  password: string;
}

export default function Login() {
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  // Define validation schema
  const loginSchema = Yup.object().shape({
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
      console.log(values);
      const response = await fetch(`${localServer}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setLoginError(undefined);
        const data = await response.json();

        console.log("Login successful!", data);
      }
      // Handle successful login, navigation, etc.
    } catch (error) {
      // @ts-ignore
      setLoginError(error.message);
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className=" w-full justify-center items-center">
        <View className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg  ">
          <View className="py-5">
            <Text className="text-xl">Login to your Journal</Text>
          </View>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
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
                {loginError && (
                  <Text className="text-rose-700">{loginError}</Text>
                )}
                <View className="pt-5">
                  <CustomButton onPress={() => handleSubmit()} title="Submit" />
                </View>
              </View>
            )}
          </Formik>
          <View className="pt-5 flex-row gap-1">
            <Text>Do not have an account?</Text>
            <Link className="text-blue-500 underline" href="/signUp">
              Sign up
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
