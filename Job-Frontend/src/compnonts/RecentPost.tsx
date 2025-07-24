import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecentPostBox from "./RecentPostBox";

export default function RecentPost() {
  return (
    <View style={styles.recentbox}>
      <View style={styles.postbox}>
        <Text style={styles.text}>Recent Post</Text>
        <Text style={styles.sortbar}>Sort by</Text>
      </View>
      <RecentPostBox />
    </View>
  );
}

const styles = StyleSheet.create({
  recentbox: {
    marginTop: 20,
  },
  sortbar: {
    borderWidth: 0.3,
    borderColor: "#000",
    paddingBlock: 2,
    paddingInline: 10,
    borderRadius: 15,
    fontFamily: "JosefinSans-Bold",
  },
  text: {
    fontSize: 19,
    fontWeight: "700",
    fontFamily: "JosefinSans-Bold",
    color: "#000",
  },

  postbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
