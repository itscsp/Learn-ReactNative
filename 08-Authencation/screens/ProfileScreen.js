import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, TouchableOpacity } from "react-native";
import { AuthContext } from "../store/auth-context";
import { getProfile } from "../util/auth";
import Button from "../components/ui/Button";

function ProfileScreen({ navigation }) {
  const { token, profile, setProfile, logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout failed:', error);
              Alert.alert("Error", "Logout failed. Please try again.");
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

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
      
      {/* Profile Information */}
      <View style={styles.profileSection}>
        <View style={styles.infoRow}><Text style={styles.label}>User ID:</Text><Text style={styles.value}>{profile.user_id}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Username:</Text><Text style={styles.value}>{profile.username}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{profile.email}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>First Name:</Text><Text style={styles.value}>{profile.first_name}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Last Name:</Text><Text style={styles.value}>{profile.last_name}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Display Name:</Text><Text style={styles.value}>{profile.display_name}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Description:</Text><Text style={styles.value}>{profile.description}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Registered:</Text><Text style={styles.value}>{profile.registered}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Roles:</Text><Text style={styles.value}>{profile.roles?.join(", ")}</Text></View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Text style={styles.sectionTitle}>Actions</Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
          <Text style={styles.actionButtonText}>✏️ Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleChangePassword}>
          <Text style={styles.actionButtonText}>🔒 Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.actionButtonText, styles.logoutButtonText]}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
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
  profileSection: {
    marginBottom: 32,
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
  actionSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  actionButton: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
  },
  logoutButtonText: {
    color: "#f44336",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
