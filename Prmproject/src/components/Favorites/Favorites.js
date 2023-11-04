import React from 'react';
import { View, Text, FlatList,StyleSheet,Button } from 'react-native';
import { useFavorites, useFavoritesActions } from '../FavoritesContex/FavoritesContex';

const Favorites = () => {
  const { favorites } = useFavorites();
  const { removeFromFavorites } = useFavoritesActions();

  return (
    <View>
      <Text style={styles.heading}>Saved Recipes:</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text>{item.name}</Text>
            <Text>{item.ingredients}</Text>
            <Button
              title="Remove from Favorites"
              onPress={() => removeFromFavorites(item)}
            />
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

export default Favorites;
