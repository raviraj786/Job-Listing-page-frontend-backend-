import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const categories = [
  { label: "Web Development", value: "web" },
  { label: "Mobile App", value: "mobile" },
  { label: "UI/UX Design", value: "design" },
  { label: "Data Science", value: "data" },
  { label: "Marketing", value: "marketing" },
  { label: "DevOps", value: "devops" },
  { label: "AI/ML", value: "ai" },
];

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (items) => {
    setSelectedCategories(items);
  };

  const isSelected = (item) =>
    selectedCategories.some((i) => i.value === item.value);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Categories</Text>

      <Dropdown
        style={styles.dropdown}
        data={categories}
        labelField="label"
        valueField="value"
        placeholder="Choose categories"
        value={selectedCategories}
        onChange={handleChange}
        multiple={true}
        mode="DEFAULT"
        maxHeight={300}
        renderItem={(item) => {
          const checked = isSelected(item);
          return (
            <View style={styles.item}>
              <MaterialIcons
                name={checked ? "check-box" : "check-box-outline-blank"}
                size={22}
                color={checked ? "#007bff" : "#888"}
              />
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
          );
        }}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: 'JosefinSans-Regular',
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: 'JosefinSans-Regular',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#007bff",
    fontFamily: 'JosefinSans-Regular',
  },
  placeholderStyle: {
    color: "#999",
    fontSize: 14,
    fontFamily: 'JosefinSans-Regular',
  },
  selectedList: {
    marginTop: 20,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    fontFamily: 'JosefinSans-Regular',
  },
  selectedItem: {
    fontSize: 14,
    color: "#444",
    fontFamily: 'JosefinSans-Regular',
  },
});
