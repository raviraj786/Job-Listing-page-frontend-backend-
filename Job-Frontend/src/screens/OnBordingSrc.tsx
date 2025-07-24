import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../compnonts/Button";

export default function OnBordingSrc() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/img.png")}
          style={styles.onbordingimage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.heading}>Climb higher with</Text>
        <Text style={styles.heading}>JobSeek app</Text>
      </View>
      <View style={{ alignItems: "center", marginBottom: 90 ,  fontFamily: 'JosefinSans-Regular', }}>
        <Button texts={"Start Browsing"}  onPress={() => navigation.navigate("BotamTab")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C58F2",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  onbordingimage: {
    width: "70%",
    height: 400,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 180,
     fontFamily: 'JosefinSans-Regular',
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Poppins",
    lineHeight: 39,
    letterSpacing: 0.25,
    color: "#fff",
    textAlign: "center",
    
  },
});
