import { Text, TouchableOpacity, View } from "react-native";
import { Formik, FormikValues } from "formik";
import { CustomTextInput } from "@/src/components/inputs/CustomTextInput";
import CustomButton from "@/src/components/buttons/CustomButton";
import MainLayout from "@/src/components/layouts/MainLayout";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { localServer } from "@/src/config/config";
import { router } from "expo-router";
import { UserContext } from "@/src/contexts/contexts";

interface profileInitialValues extends FormikValues {
  username: string;
  password: string;
  confirmNewPassword: string;
}

export default function Profile() {
  const { user } = useContext(UserContext) || {};
  const [profileError, setProfileError] = useState<string | undefined>(
    undefined,
  );
  const [hasCredentialChanged, setHasCredentialChanged] =
    useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const changeProfileSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmNewPassword: Yup.string()
      .required("Password is required.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  useEffect(() => {
    const logout = async () => {
      if (hasCredentialChanged || isLogout) {
        try {
          const response = await fetch(`${localServer}/auth/logout`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            router.navigate("/");
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    logout();
  }, [hasCredentialChanged, isLogout]);

  async function handleSubmit(values: profileInitialValues) {
    if (user) {
      try {
        const response = await fetch(
          `${localServer}/auth/updateCredentials/${user.id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          },
        );
        if (response.ok) {
          setHasCredentialChanged(true);
        }
      } catch (e) {
        console.log("error", e);
        // @ts-ignore
        setProfileError(e.message);
      }
    }
  }
  return (
    <MainLayout>
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          className="absolute top-4 right-4 bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => setIsLogout(true)}
        >
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
        <View className=" w-full justify-center items-center">
          <View className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg  ">
            <View className="py-5">
              <Text className="text-xl">Change your credentials</Text>
            </View>
            <Formik
              initialValues={{
                username: "",
                password: "",
                confirmNewPassword: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={changeProfileSchema}
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
                    title="Enter your new username"
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
                    textContentType="password"
                    secureTextEntry={true}
                    title="Enter your new password"
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />
                  <CustomTextInput
                    onChangeText={handleChange("confirmNewPassword")}
                    onBlur={handleBlur("confirmNewPassword")}
                    value={values.confirmNewPassword}
                    textContentType="password"
                    secureTextEntry={true}
                    title="Confirm New Password"
                    error={
                      touched.confirmNewPassword && errors.confirmNewPassword
                        ? errors.confirmNewPassword
                        : undefined
                    }
                  />
                  {profileError && (
                    <Text className="text-rose-700">{profileError}</Text>
                  )}
                  <View className="pt-5">
                    <CustomButton
                      onPress={() => handleSubmit()}
                      title="Update"
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
