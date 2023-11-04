import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RecipeEntryForm = ({ onRecipeCreate }) => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');

  const handleCreateRecipe = () => {
    const newRecipe = {
      id: new Date().getTime(), 
      name: recipeName,
      ingredients: recipeIngredients,
    };

    onRecipeCreate(newRecipe); 
    setRecipeName('');
    setRecipeIngredients('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Recipe</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={(text) => setRecipeName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={recipeIngredients}
        onChangeText={(text) => setRecipeIngredients(text)}
      />
      <Button title="Create Recipe" onPress={handleCreateRecipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default RecipeEntryForm;
