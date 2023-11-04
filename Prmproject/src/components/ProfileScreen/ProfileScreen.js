import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeEntryForm from '../RecipeEntryForm/RecipeEntryForm';
import { useAuth } from '../AuthContext/AuthContext';


const ProfileScreen = ({ navigation }) => {
 
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [recipeToDelete, setRecipeToDelete] = useState(null); 

  const { logout } = useAuth();

  useEffect(() => {
    
    const loadData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('userProfile');
        const userRecipes = await AsyncStorage.getItem('userRecipes');

        if (profileData) {
          const parsedProfile = JSON.parse(profileData);
          setName(parsedProfile.name || '');
          setEmail(parsedProfile.email || '');
        }

        if (userRecipes) {
          const parsedRecipes = JSON.parse(userRecipes);
          setRecipeList(parsedRecipes);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);
 

  const handleLogOut = () => {
    logout()
    navigation.navigate('Login');
   
  };
  const handleFavorites=()=>{
    navigation.navigate('Favorites')
  }

  const saveProfile = async () => {
    try {
      const profileData = { name, email };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      setEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleRecipeCreate = (newRecipe) => {
   
    setRecipeList([...recipeList, newRecipe]);
   
    AsyncStorage.setItem('userRecipes', JSON.stringify([...recipeList, newRecipe]));
  
    navigation.navigate('Home', { userRecipes: recipeList });
};
  

  const handleRecipeDelete = (recipeId) => {
  
    setRecipeToDelete(recipeId);
  };

  const confirmDelete = () => {
    if (recipeToDelete) {
     
      const updatedRecipes = recipeList.filter((recipe) => recipe.id !== recipeToDelete);
      setRecipeList(updatedRecipes);
     
      AsyncStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
      
      setRecipeToDelete(null);
    }
  };

  return (
    <View style={styles.container}>
    <Text>User Profile</Text>
    {editing ? (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Button title="Save Profile" onPress={saveProfile} />
      </View>
    ) : (
      <View>
        <Text>Name: {name}</Text>
        <Text>Email: {email}</Text>
        <Button title="Edit Profile" onPress={() => setEditing(true)} />
      </View>
    )}
    <Button title="Log Out" onPress={handleLogOut} />
    <Button title="Favorites" onPress={handleFavorites} />

    <Text style={styles.heading}>User-Created Recipes:</Text>
    <RecipeEntryForm onRecipeCreate={handleRecipeCreate} />
      <FlatList
  data={recipeList}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.recipeItem}>
      <Text>{item.name}</Text>
      <Text>{item.ingredients}</Text>
      {item.id >= 0 && ( 
        <Button
          title={(recipeToDelete === item.id) ? 'Confirm Delete' : 'Delete Recipe'}
          onPress={() =>
            (recipeToDelete === item.id)
              ? confirmDelete()
              : handleRecipeDelete(item.id)
          }
        />
      )}
      {recipeToDelete === item.id && (
        <Button title="Cancel" onPress={() => setRecipeToDelete(null)} />
      )}
    </View>
  )}
/>





    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;
