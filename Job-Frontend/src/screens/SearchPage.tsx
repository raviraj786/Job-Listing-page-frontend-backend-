import { TAB_ICONS } from "@/src/utils/icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import JobCard from "../compnonts/JobCrad";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation();

  const Backicon = TAB_ICONS.backarrow.lib;

  const fetchJobs = async (isNew = false) => {
    if (loading || (page > totalPages && !isNew)) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://10.60.15.87:8080/api/jobs/search`, {
        params: {
          title: search,
          location: location,
          page: isNew ? 1 : page,
          limit: 10,
        },
      });

      if (res.data.success) {
        setJobs((prev) =>
          isNew ? res.data.jobs : [...prev, ...res.data.jobs]
        );
        setTotalPages(res.data.totalpage);
        if (!isNew) setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Frontend fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(true);
  }, []);

  const handleSearchSubmit = () => {
    setPage(1);
    fetchJobs(true);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 60,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Backicon name={TAB_ICONS.backarrow.name} size={30} color="#000" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search job title..."
            onSubmitEditing={handleSearchSubmit}
            style={{
              borderWidth: 1,
              padding: 8,
              borderRadius: 5,
              marginBottom: 8,
            }}
          />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Search by location..."
            onSubmitEditing={handleSearchSubmit}
            style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
          />
        </View>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => fetchJobs(false)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="blue" /> : null
        }
        ListEmptyComponent={
          !loading ? (
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                fontSize: 16,
                fontFamily: "JosefinSans-Regular",
              }}
            >
              No jobs found. Try a different search.
            </Text>
          ) : null
        }
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 60,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginLeft: 25,
              marginRight: 6,
            }}
          >
            <JobCard job={item} />
          </View>
        )}
      />
    </View>
  );
};

export default SearchPage;
