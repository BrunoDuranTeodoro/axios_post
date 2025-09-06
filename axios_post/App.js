import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const API = "http://10.110.12.40:3000/users";

  const addUser = async () => {
    try {
      const response = await axios.post(API, {
        name: newName,
        email: newEmail,
      });
      setUsers([...users, response.data]);
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.log("Error POST:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post - adicionar usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="email@dominio.com"
        value={newEmail}
        onChangeText={setNewEmail}
      />

      <Button title="Adicionar Usuário" onPress={addUser} />

      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.email}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"gray",
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    color:"white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: "center",
    color:"white",
  },
});