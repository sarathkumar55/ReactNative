import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useFavorites } from '../FavoritesContex/FavoritesContex';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(recipe);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{recipe.name}</Text>
      <Text style={styles.recipeContent}>{recipe.content}</Text>
      <Text style={styles.recipeIngredients}>Ingredients: {recipe.ingredients}</Text>
      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={toggleFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  recipeImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recipeContent: {
    fontSize: 18,
  },
  recipeIngredients: {
    fontSize: 16,
  fontStyle: 'italic',
    marginTop: 10,
  },
});

export default RecipeDetailScreen;
