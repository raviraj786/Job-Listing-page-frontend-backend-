import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { JobType } from "../apis";

interface Props {
  job: JobType;
}

const JobCard: React.FC<Props> = ({ job }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("JobDetails", { data: job })}>
      <View style={styles.card}>
        <View style={styles.titlebox}>
          <AntDesign name="facebook-square" size={24} color="black" />

          <View>
            <Text style={styles.title}>{job?.jobtitle}</Text>
            <Text style={styles.subtitle}>{job?.company}</Text>
          </View>
          <MaterialCommunityIcons
            name="bookmark-plus-outline"
            size={24}
            color="#555"
          />
        </View>
        <Text>
          ....................................................................
        </Text>

        <View style={styles.location}>
          <Entypo name="location-pin" size={24} color="#8dbaef" />
          <Text style={styles.subtitle}>{job?.location}</Text>
        </View>

        <View>
          <Text style={styles.salary}>{job?.salary}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 15,
          }}
        >
          <Text style={styles.date}>{job?.experience}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 10,
              marginLeft: 50,
            }}
          >
            <Fontisto name="stopwatch" size={16} color="#999" />
            <Text style={styles.date}>
              {new Date(job?.datePost).toDateString()}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 1,
    borderRadius: 10,
    elevation: 3,
    marginRight: 20,
    width: 320,
    marginTop: 30,
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
    fontFamily: "JosefinSans-Bold",
  },
  subtitle: {
    color: "#596575",
    fontSize: 16,
    padding: 2,
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: -1,
    fontFamily: "JosefinSans-Regular",
  },

  salary: {
    color: "#736CFb",
    marginTop: 6,
    backgroundColor: "#f2f9ff",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "70%",
    padding: 2,
    fontSize: 13,
    fontFamily: "JosefinSans-Regular",
  },

  date: {
    color: "#999",
    marginTop: 4,
    fontSize: 12,
    fontFamily: "JosefinSans-Regular",
  },
  experience: {
    color: "#333",
    marginTop: 4,
    fontSize: 12,
    fontFamily: "JosefinSans-Regular",
  },

  titlebox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  location: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginTop: 12,
  },
});
