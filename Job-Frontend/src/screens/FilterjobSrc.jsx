import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TAB_ICONS } from "../utils/icons";

const jobTypes = [
  { label: "On site", value: "on-site" },
  { label: "Remote Job", value: "remote" },
];

const experiences = [
  "No Experience",
  "Upto 1 Year",
  "2 - 3 Years",
  "3 - 5 Years",
  "7+ Years",
];

const categories = [
  "Accounting & Finance",
  "Architecture",
  "Agriculture",
  "Arts & Crafts",
  "Content Writing",
  "Construction",
  "Designing",
  "Data Analyst",
  "Data Scientist",
  "Healthcare",
  "Hardware",
  "Media Reporting",
  "Sales & Marketing",
  "Information & Technology",
  "Social Media Marketing",
];

const locations = [
  "United States",
  "United Arab Emirates",
  "United Kingdom",
  "India",
  "China",
  "Japan",
];

const salary = ["0 - 10K", "10K - 25K", "25K - 50K", "50K - 1L", "1L+"];
const jobLevels = [
  "Internship",
  "Fresher",
  "Junior",
  "Mid Level",
  "Senior",
  "Lead",
];

const FilterScreen = () => {
  const [selectedJobType, setSelectedJobType] = useState("on-site");
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedjobLevels, setSelectedjobLevels] = useState([]);
  const [selectedsalary, setSelectedsalary] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [dropdowns, setDropdowns] = useState({
    jobType: true,
    experience: false,
    location: false,
    category: false,
    salary: false,
    jobLevels: false,
  });


  const navigation = useNavigation();
  const Cross = TAB_ICONS.cross.lib;

  const toggleDropdown = (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  const toggleCheckbox = (item, list, setter) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };



  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );



const jobHandlerfilter = async () => {
  try {
    const queryParams = new URLSearchParams();

    if (selectedLocation) queryParams.append("location", selectedLocation);

    if (selectedJobType) {
      const jobTypesArray = Array.isArray(selectedJobType)
        ? selectedJobType
        : [selectedJobType];
      jobTypesArray.forEach((type) => queryParams.append("jobType", type));
    }

    if (selectedCategories?.length)
      queryParams.append("category", selectedCategories.join(","));

    if (selectedjobLevels?.length)
      queryParams.append("jobLevel", selectedjobLevels.join(","));

    if (selectedsalary.length) {
      const salaryMin = selectedsalary[0]
        ?.split("-")[0]
        .replace("K", "000")
        .trim();
      if (salaryMin) queryParams.append("salary", salaryMin);
    }
    queryParams.append("page", "1");
    queryParams.append("limit", "10");
    console.log("Query Params:", queryParams.toString());
    const response = await fetch(
      `http://10.60.15.87:8080/api/jobs/filter?${queryParams.toString()}`
    );
    const data = await response.json();
    if (data) {
      console.log("Filtered Jobs:", data.jobs);
      navigation.navigate('Filterjoblist' ,{data : data.jobs} )
      // setFilteredJobs(data.jobs);
    } else {
      setFilteredJobs([]);
      console.warn("No jobs found for filters.");
    }
  } catch (error) {
    console.error("Filter API call failed:", error.message);
  }
};



  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 50, gap: 20 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Cross color="#000" size={34} name={TAB_ICONS.cross.name} />
        </Pressable>
        <Text style={styles.title}>Filter</Text>
      </View>

      
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleDropdown("jobType")}>
          <View style={styles.toggleCheckbox}>
            <Text style={styles.cardTitle}>Job Type</Text>
            <Image
              source={require("../../assets/images/Chevron_Down Ic.png")}
              style={styles.downimg}
            />
          </View>
        </TouchableOpacity>
        {dropdowns.jobType &&
          jobTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={styles.row}
              onPress={() => setSelectedJobType(type.value)}
            >
              <MaterialIcons
                name={
                  selectedJobType === type.value
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={22}
                color="#007bff"
              />
              <Text style={styles.text}>{type.label}</Text>
            </TouchableOpacity>
          ))}
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleDropdown("experience")}>
          <View style={styles.toggleCheckbox}>
            <Text style={styles.cardTitle}>Experience</Text>
            <Image
              source={require("../../assets/images/Chevron_Down Ic.png")}
              style={styles.downimg}
            />
          </View>
        </TouchableOpacity>
        {dropdowns.experience &&
          experiences.map((exp) => (
            <TouchableOpacity
              key={exp}
              style={styles.row}
              onPress={() =>
                toggleCheckbox(exp, selectedExperiences, setSelectedExperiences)
              }
            >
              <MaterialIcons
                name={
                  selectedExperiences.includes(exp)
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={22}
                color="#007bff"
              />
              <Text style={styles.text}>{exp}</Text>
            </TouchableOpacity>
          ))}
      </View>

     
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleDropdown("location")}>
          <View style={styles.toggleCheckbox}>
            <Text style={styles.cardTitle}>Location</Text>
            <Image
              source={require("../../assets/images/Chevron_Down Ic.png")}
              style={styles.downimg}
            />
          </View>
        </TouchableOpacity>
        {dropdowns.location && (
          <>
            <View style={styles.searchContainer}>
              <FontAwesome name="search" size={20} color="#0a77ff" />
              <TextInput
                placeholder="Search location..."
                value={locationSearch}
                onChangeText={setLocationSearch}
                style={styles.input}
              />
            </View>
            {filteredLocations.map((loc) => (
              <TouchableOpacity
                key={loc}
                style={styles.row}
                onPress={() => setSelectedLocation(loc)}
              >
                <Entypo
                  name="location-pin"
                  size={22}
                  color={
                    selectedLocation === loc ? "#0a77ff" : "#8DBAEF"
                  }
                />
                <Text style={styles.text}>{loc}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>

     
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleDropdown("salary")}>
          <View style={styles.toggleCheckbox}>
            <Text style={styles.cardTitle}>Salary</Text>
            <Image
              source={require("../../assets/images/Chevron_Down Ic.png")}
              style={styles.downimg}
            />
          </View>
        </TouchableOpacity>
        {dropdowns.salary &&
          salary.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.row}
              onPress={() =>
                toggleCheckbox(cat, selectedsalary, setSelectedsalary)
              }
            >
              <MaterialIcons
                name={
                  selectedsalary.includes(cat)
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={22}
                color="#007bff"
              />
              <Text style={styles.text}>{cat}</Text>
            </TouchableOpacity>
          ))}
      </View>

     
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleDropdown("category")}>
          <View style={styles.toggleCheckbox}>
            <Text style={styles.cardTitle}>Job Category</Text>
            <Image
              source={require("../../assets/images/Chevron_Down Ic.png")}
              style={styles.downimg}
            />
          </View>
        </TouchableOpacity>
        {dropdowns.category &&
          categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.row}
              onPress={() =>
                toggleCheckbox(cat, selectedCategories, setSelectedCategories)
              }
            >
              <MaterialIcons
                name={
                  selectedCategories.includes(cat)
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={22}
                color="#007bff"
              />
              <Text style={styles.text}>{cat}</Text>
            </TouchableOpacity>
          ))}
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleDropdown("jobLevels")}>
          <View style={styles.toggleCheckbox}>
            <Text style={styles.cardTitle}>Job Level</Text>
            <Image
              source={require("../../assets/images/Chevron_Down Ic.png")}
              style={styles.downimg}
            />
          </View>
        </TouchableOpacity>
        {dropdowns.jobLevels &&
          jobLevels.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.row}
              onPress={() =>
                toggleCheckbox(cat, selectedjobLevels, setSelectedjobLevels)
              }
            >
              <MaterialIcons
                name={
                  selectedjobLevels.includes(cat)
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={22}
                color="#007bff"
              />
              <Text style={styles.text}>{cat}</Text>
            </TouchableOpacity>
          ))}
      </View>

    
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            setSelectedJobType("on-site");
            setSelectedExperiences([]);
            setSelectedCategories([]);
            setSelectedLocation("");
            setLocationSearch("");
            setSelectedjobLevels([]);
            setSelectedsalary([]);
            setFilteredJobs([]);
          }}
        >
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={jobHandlerfilter}
        >
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>

{/*      
      {filteredJobs.length > 0 && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Filtered Jobs
          </Text>
          {filteredJobs.map((job) => (
            <View
              key={job.id}
              style={{
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {job.jobtitle}
              </Text>
              <Text>{job.company}</Text>
              <Text>{job.location}</Text>
            </View>
          ))}
        </View>
      )} */}
    </ScrollView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16  ,fontFamily: 'JosefinSans-Regular',},
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 20,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6 , fontFamily: 'JosefinSans-Regular',},
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    gap: 15,
    paddingLeft: 20,
  },
  text: { fontSize: 14  ,fontFamily: 'JosefinSans-Regular',},
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    borderColor: "#ccc",
  },
  input: { flex: 1, paddingVertical: 4 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    
  },
  resetButton: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#0a77ff",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  downimg: { width: 32, height: 32 },
  resetText: { color: "#007bff", fontWeight: "600", fontFamily: 'JosefinSans-Regular', },
             
  applyText: { color: "#fff", fontWeight: "600" ,fontFamily: 'JosefinSans-Regular',  },
  toggleCheckbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
});
