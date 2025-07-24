import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import JobCard from "../compnonts/JobCrad";

const Filterjoblist = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const pageSize = 5;

  useFocusEffect(
    useCallback(() => {
      loadMoreJobs();
    }, [])
  );

  const loadMoreJobs = () => {
    if (loading || endReached) return;

    setLoading(true);

    // Simulate pagination
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const newJobs = data.slice(start, end);

    if (newJobs.length === 0) {
      setEndReached(true);
    } else {
      setDisplayData((prev) => [...prev, ...newJobs]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  const renderItem = ({ item }) => <JobCard job={item} />;

  return (
    <View style={styles.container}>
      <ScrollView style={{ alignSelf: "center", marginTop: 50 }}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

        
          {displayData.length === 0 && !loading ? (
            <Text style={styles.noData}>No jobs found</Text>
          ) : (
            <FlatList
              data={displayData}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={renderItem}
              onEndReached={loadMoreJobs}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading ? <ActivityIndicator size="small" color="#000" /> : null
              }
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Filterjoblist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: 'JosefinSans-Regular',
  },
  noData: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
