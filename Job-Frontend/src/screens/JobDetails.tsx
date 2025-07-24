import { TAB_ICONS } from "@/src/utils/icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  findNodeHandle,
} from "react-native";

const { width } = Dimensions.get("window");

const TABS = ["Job Profile", "Qualification", "Skills"];

const skills = [
  "Graphic Designing",
  "Adobe XD",
  "Web-design",
  "Adobe Photoshop",
  "Figma",
  "Illustrator",
];

const JobDetails = ({ route }) => {
  const { data } = route.params;

  const BackArrow = TAB_ICONS.backarrow.lib;
  const Location = TAB_ICONS.location.lib;
  const Time = TAB_ICONS.clock.lib;

  const [activeTab, setActiveTab] = useState("Job Profile");
  const navigation = useNavigation();

  const scrollRef = useRef(null);
  const jobProfileRef = useRef(null);
  const qualificationRef = useRef(null);
  const skillsRef = useRef(null);

  const handleTabPress = (tab) => {
    setActiveTab(tab);

    let targetRef;

    if (tab === "Job Profile") targetRef = jobProfileRef;
    else if (tab === "Qualification") targetRef = qualificationRef;
    else if (tab === "Skills") targetRef = skillsRef;

    const scrollNode = findNodeHandle(scrollRef.current);
    const viewNode = findNodeHandle(targetRef.current);

    if (viewNode && scrollNode) {
      targetRef.current?.measureLayout(
        scrollNode,
        (x, y) => {
          scrollRef.current.scrollTo({ y: y - 10, animated: true });
        },
        (err) => console.error("measureLayout error:", err)
      );
    }
  };

  return (
    <ScrollView ref={scrollRef} style={styles.container}>

      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <BackArrow name={TAB_ICONS.backarrow.name} size={36} color="#000" />
        </View>
      </TouchableOpacity>

    
      <View style={styles.cardContainer}>
        <View style={styles.cardInner}>
          <Image
            source={require("../../assets/images/imgjobd.png")}
            style={styles.jobImage}
          />
          <Text style={styles.jobTitle}>{data?.jobtitle}</Text>
          <Text style={styles.company}>{data.company}</Text>
          <Text style={{ color: "#596574" }}>
            --------------------------------------------------------------------
          </Text>
          <View style={styles.infoRow}>
            <Location
              name={TAB_ICONS.location.name}
              size={29}
              color="#8dbaef"
            />
            <Text style={styles.infoText}>{data.location}</Text>
          </View>
          <Text style={styles.salary}>{data.salary}</Text>
          <View style={styles.infoRow}>
            <Time name={TAB_ICONS.clock.name} size={17} color="#9a9a9a" />
            <Text style={styles.dateText}>
              {new Date(data.datePost).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => handleTabPress(tab)}>
            <Text
              style={[styles.tabItem, activeTab === tab && styles.activeTab]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sections */}
      <View ref={jobProfileRef}>
        <Text style={styles.sectionTitle}>Job Profile</Text>
        {dummyContent.map((text, i) => (
          <Text key={i} style={styles.bulletPoint}>
            • {text}
          </Text>
        ))}
      </View>

      <View ref={qualificationRef}>
        <Text style={styles.sectionTitle}>Job Qualification</Text>
        {dummyContent.map((text, i) => (
          <Text key={i} style={styles.bulletPoint}>
            • {text}
          </Text>
        ))}
      </View>

      <View ref={skillsRef}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <TouchableOpacity key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => navigation.navigate("Subscrib", { data: data.id })}
      >
        <Text style={styles.applyBtnText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const dummyContent = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
  "When an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  "It has survived not only five centuries, but also the leap into electronic typesetting.",
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom:50
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#596574",
    height: 265,
    width: "100%",
    borderRadius: 20,
  },
  cardInner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
  },
  jobImage: {
    width: 56,
    height: 56,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#c1c3c7",

  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 25,
    textTransform: "capitalize",
    fontFamily: "JosefinSans-bold",
  },
  company: {
    fontSize: 16,
    fontWeight: "400",
    color: "#4c5560",
    lineHeight: 26,
    letterSpacing: -1,
    fontFamily: "JosefinSans-bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -1,
    fontWeight: "600",
    fontFamily: "JosefinSans-bold",
  },
  salary: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -1,
    lineHeight: 24,
    color: "#736cfb",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: -1,
    fontFamily: "JosefinSans-bold",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginTop: 16,
  },
  tabItem: {
    fontSize: 16,
    color: "#999",
    paddingBottom: 8,
    fontWeight: "600",
    fontFamily: "JosefinSans-Regular",
  },
  activeTab: {
    color: "#3B82F6",
    borderBottomWidth: 2,
    borderColor: "#3B82F6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    lineHeight: 25,
    marginTop: 24,
    fontFamily: "JosefinSans-bold",

  },
  bulletPoint: {
    fontSize: 14,
    color: "#596574",
    marginVertical: 4,
    lineHeight: 24,
    fontWeight: "400",
    letterSpacing: -1,
    fontFamily: "JosefinSans-Regular",
    width:'90%',
    marginLeft:20
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillTag: {
    backgroundColor: "#E6F0FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    color: "#3B82F6",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.1,
    fontFamily: "JosefinSans-Regular",
  },
  applyBtn: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: "#0a77ff",
    paddingVertical: 14,
    borderRadius: 42,
    alignItems: "center",
  
  },
  applyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "JosefinSans-Regular",
    
  },
});

export default JobDetails;
