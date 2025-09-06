import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";

// Constantes de configuração
const API_URL = "http://10.110.12.40:3000/users";
const COLORS = {
  primary: "#4CAF50", // Cor principal
  background: "#121212", // Fundo escuro
  text: "#FFFFFF", // Texto branco
  inputBackground: "#333333", // Fundo do input
  border: "#555555", // Cor da borda
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Carregar os usuários da API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error.message);
        Alert.alert("Erro", "Não foi possível carregar os usuários.");
      }
    };
    fetchUsers();
  }, []);

  // Função para adicionar um novo usuário
  const addUser = async () => {
    if (!newName || !newEmail) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(API_URL, { name: newName, email: newEmail });
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error.message);
      Alert.alert("Erro", "Não foi possível adicionar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={newName}
        onChangeText={setNewName}
        placeholderTextColor={COLORS.border}
      />
      <TextInput
        style={styles.input}
        placeholder="email@dominio.com"
        value={newEmail}
        onChangeText={setNewEmail}
        placeholderTextColor={COLORS.border}
      />

      <Button title="Adicionar Usuário" onPress={addUser} color={COLORS.primary} />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.name}</Text>
            <Text style={styles.userText}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: COLORS.inputBackground,
    color: COLORS.text,
  },
  userItem: {
    backgroundColor: COLORS.inputBackground,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  userText: {
    color: COLORS.text,
    fontSize: 16,
  },
});
