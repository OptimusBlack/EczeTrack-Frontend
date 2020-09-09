import React, { memo, useState, useEffect } from "react";
import { AsyncStorage, Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-community/picker";

import { useTranslation } from "react-i18next";
import { changeLanguage } from "../translation";

const LanguagePicker = ({ navigation, blackText }) => {
  const { t, i18n } = useTranslation();

  const [showPicker, setShowPicker] = useState(false);
  const [currentLang, setCurrentLang] = useState({ label: "English", value: "en" });

  const _onLanguageChange = async (itemValue) => {
    let newLang = {
      label: itemValue === "en" ? "English" : "中文（繁體）",
      value: itemValue
    };
    console.log("Item Value: ", itemValue);

    setCurrentLang(newLang);

    if(Platform.OS === "ios") {
      setShowPicker(false);
    }
    AsyncStorage.setItem("lang", itemValue);
    changeLanguage(itemValue);
  };

  useEffect(() => {
    if (i18n.language == "en") {
      setCurrentLang({ label: "English", value: "en" });
    } else {
      setCurrentLang({ label: "中文（繁體）", value: "zh" });
    }
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" &&
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Text style={[styles.textLabel, { textAlign: "right", color: blackText ? "black" : "white" }]}>{currentLang.label}</Text>
      </TouchableOpacity>}
      {(showPicker || Platform.OS !== "ios") && <Picker
        selectedValue={currentLang.value}
        onValueChange={_onLanguageChange}
        returnKeyType={"done"}
        style={{ color: blackText ? "black" : "white" }}
      >
        <Picker.Item label="English" value={"en"} />
        <Picker.Item label="中文（繁體）" value={"zh"} />
      </Picker>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20
  },
  container: {
    width: "50%"
  },
  textLabel: {
    fontSize: 16,
    color: "white"
  }
});

export default memo(LanguagePicker);
