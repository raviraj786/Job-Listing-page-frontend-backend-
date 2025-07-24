import { TAB_ICONS } from "@/src/utils/icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = "http://10.60.15.87:8080/api";

const SubscribeSrc = ({ route }) => {
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<any>(null);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const navigation = useNavigation();
  const jobid = route.params?.data;

  const BackArrow = TAB_ICONS.backarrow.lib;

  const handleSubscribe = async () => {
    if (!email) {
      Alert.alert("Validation", "Please enter your email");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/subscribe`, {
        email,
        jobId: jobid,
      });
      setSubscriptionId(res.data.data.id);
      Alert.alert("Success", "Email subscribed successfully");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to subscribe email";
      Alert.alert("Error", msg);
    }
  };

  const pickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      if (result.assets && result.assets.length > 0) {
        setResume(result.assets[0]);
      }
    } catch (error) {
      console.error("Resume picking failed", error);
    }
  };

  const uploadResume = async () => {
    if (!resume || !subscriptionId) {
      Alert.alert("Error", "Please subscribe and select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", {
      uri: resume.uri,
      name: resume.name,
      type: "application/pdf",
    } as any);

    try {
      await axios.post(
        `${API_BASE}/upload-resume/${subscriptionId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Alert.alert("Success", "Resume uploaded successfully");
      setIsResumeUploaded(true);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", "Resume upload failed");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ marginBottom: 60 }}>
          <BackArrow
            name={TAB_ICONS.backarrow.name}
            size={36}
            color="#000"
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Subscribe and Upload Resume</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        editable={!subscriptionId}
      />

      <TouchableOpacity
        style={[
          styles.button,
          (!email || subscriptionId) && styles.disabledButton,
        ]}
        onPress={handleSubscribe}
        disabled={!email || subscriptionId !== null}
      >
        <Text style={styles.buttonText}>
          {subscriptionId ? "Subscribed ✅" : "Subscribe"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          (isResumeUploaded || !subscriptionId) && styles.disabledButton,
        ]}
        onPress={pickResume}
        disabled={isResumeUploaded || !subscriptionId}
      >
        <Text style={styles.buttonText}>
          {resume
            ? isResumeUploaded
              ? "Resume Locked ✅"
              : `Selected: ${resume.name}`
            : "Pick Resume (PDF)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          (!resume || isResumeUploaded) && styles.disabledButton,
        ]}
        onPress={uploadResume}
        disabled={!resume || isResumeUploaded}
      >
        <Text style={styles.buttonText}>
          {isResumeUploaded ? "Uploaded ✅" : "Upload Resume"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#888", marginTop: 50 }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscribeSrc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "JosefinSans-Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 30,
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontFamily: "JosefinSans-Regular",
  },
});
