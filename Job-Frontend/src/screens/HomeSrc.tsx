import { TAB_ICONS } from "@/src/utils/icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RecentPost from "../compnonts/RecentPost";
import JobList from "./JobList";

const HomeSrc = () => {
  const navigation = useNavigation();
  const NotificationIcon = TAB_ICONS.notification.lib;
  const SearchIcon = TAB_ICONS.search.lib;
  const [activeBox, setActiveBox] = useState<string>("All");
  const categories = ["All", "Development", "Designing", "More"];
  const [searchText, setSearchText] = useState<string>("");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!searchText.trim()) return;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      navigation.navigate("search", { query: searchText.trim() });
    }, 1000);

    return () => clearTimeout(debounceTimeoutRef.current);
  }, [searchText]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerbox}>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.name}>John Aiseel</Text>
            </View>
            <View>
              <NotificationIcon
                name={TAB_ICONS.notification.name}
                size={22}
                color="#000"
                style={styles.hedericons}
              />
            </View>
          </View>

          <View style={styles.searchContainer}>
            <SearchIcon
              name={TAB_ICONS.search.name}
              size={20}
              color="gray"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search companies, jobs, profile..."
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />

            <Pressable onPress={() => navigation.navigate("filter")}>
              <Image
                source={require("../../assets/images/Vector.png")}
                style={{ width: 15, height: 15, marginRight: 10 }}
              />
            </Pressable>
          </View>

          <View style={styles.categories}>
            {categories.map((item) => {
              const isActive = activeBox === item;
              return (
                <TouchableOpacity key={item} onPress={() => setActiveBox(item)}>
                  <Text
                    style={[
                      styles.box,
                      {
                        backgroundColor: isActive ? "#0a77ff" : "#ecf4fc",
                        color: isActive ? "#fff" : "#0a77ff",
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ marginBlock: 22 }}>
            <View style={styles.header}>
              <Text style={styles.name}>Top Companies Hiring</Text>
              <TouchableOpacity onPress={() => navigation.navigate("alljobs")}>
                <Text style={{ fontFamily: 'JosefinSans-Regular',}}>View all</Text>
              </TouchableOpacity>
            </View>

            <JobList />
          </View>

          <RecentPost />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default HomeSrc;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  headerbox: {
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: 'JosefinSans-Bold',
    color: "#000",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
     fontFamily: 'JosefinSans-Bold',
    color: "#000",
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    fontFamily: "JosefinSans-Regular",
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: "JosefinSans-Regular",
  },

  categories: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hedericons: {
    backgroundColor: "#e9f6ff",
    padding: 7,
    borderRadius: 20,
    marginTop: 40,
  },
  box: {
    borderWidth: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontWeight: "600",
    fontFamily: "JosefinSans-Regular",
  },
});
