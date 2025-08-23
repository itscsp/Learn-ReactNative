import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { AuthContext } from "../store/auth-context";
import { getProfile } from "../util/auth";

function ProfileScreen() {
  const { token, profile, setProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        const response = await getProfile(token);
        setProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token, setProfile]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  if (error) {
    return <View style={styles.center}><Text>{error}</Text></View>;
  }
  if (!profile) {
    return <View style={styles.center}><Text>No profile data.</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoRow}><Text style={styles.label}>User ID:</Text><Text style={styles.value}>{profile.user_id}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>Username:</Text><Text style={styles.value}>{profile.username}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{profile.email}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>First Name:</Text><Text style={styles.value}>{profile.first_name}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>Last Name:</Text><Text style={styles.value}>{profile.last_name}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>Display Name:</Text><Text style={styles.value}>{profile.display_name}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>Description:</Text><Text style={styles.value}>{profile.description}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>Registered:</Text><Text style={styles.value}>{profile.registered}</Text></View>
      <View style={styles.infoRow}><Text style={styles.label}>Roles:</Text><Text style={styles.value}>{profile.roles?.join(", ")}</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 6,
  },
  label: {
    fontWeight: "600",
    color: "#555",
    flex: 1,
  },
  value: {
    flex: 2,
    color: "#222",
    textAlign: "right",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
