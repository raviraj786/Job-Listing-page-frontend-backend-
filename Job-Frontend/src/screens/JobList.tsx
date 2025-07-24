import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { joblist, JobType } from "../apis/apis";
import JobCard from "../compnonts/JobCrad";

const JobList = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await joblist();
      setJobs(data.slice(0, 5)); // Show only 5
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#3498db" />;
  }

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={jobs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <JobCard job={item} />}
    />
  );
};

export default JobList;
