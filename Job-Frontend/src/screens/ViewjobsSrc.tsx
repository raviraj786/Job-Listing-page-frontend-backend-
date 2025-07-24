import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { joblist, JobType } from "../apis/apis";
import JobCard from "../compnonts/JobCrad";

const ViewjobSrc = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [horizontal, setHorizontal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async (pageNum = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await joblist(pageNum);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prev) => (pageNum === 1 ? data : [...prev, ...data]));
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading && !refreshing) {
      loadJobs(page + 1);
    }
  };

  const handleRefresh = () => {
    setHasMore(true);
    loadJobs(1, true);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={33} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>All Jobs</Text>
      <TouchableOpacity onPress={() => setHorizontal(!horizontal)}>
        <Ionicons
          name={horizontal ? "reorder-four-outline" : "ellipsis-horizontal"}
          size={24}
          color="#000"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginLeft: 20 }}>
        {renderHeader()}
        <View style={{ flex: 1 }}>
          {loading && jobs.length === 0 ? (
            <ActivityIndicator
              size="large"
              color="#3498db"
              style={{ marginTop: 20 }}
            />
          ) : (
            <FlatList
              data={jobs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <JobCard job={item} />}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={!horizontal}
              showsHorizontalScrollIndicator={horizontal}
              horizontal={horizontal}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              ListFooterComponent={() =>
                hasMore && !refreshing ? (
                  <ActivityIndicator
                    size="small"
                    color="#666"
                    style={{ margin: 10 }}
                  />
                ) : null
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
    gap: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default ViewjobSrc;
