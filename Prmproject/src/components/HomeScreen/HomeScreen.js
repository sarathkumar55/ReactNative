import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recipes = [
  {
    id: 1,
    name: 'Recipe 1',
    ingredients: 'Ingredient 1, Ingredient 2',
    image: 'https://i.postimg.cc/yxpPXHc4/chicken.jpg',
    content: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  },
  {
    id: 2,
    name: 'Recipe 2',
    ingredients: 'Ingredient 3, Ingredient 4',
    image: 'https://i.postimg.cc/MGrVFDXV/salad.jpg',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
    id: 3,
    name: 'Recipe 3',
    ingredients: 'Ingredient 3, Ingredient 4',
    image: 'https://i.postimg.cc/yN53P8rT/mixer.jpg',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
  },
  {
    id: 4,
    name: 'Recipe 4',
    ingredients: 'Ingredient 4, Ingredient 4',
    image: 'https://i.postimg.cc/YSJjFyhn/Piz.jpg',
    content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
  },
  {
    id: 5,
    name: 'Recipe 5',
    ingredients: 'Ingredient 4, Ingredient 4',
    image: 'https://i.postimg.cc/h40P4Gb3/samb.jpg',
    content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.',
  },
 
];



const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Recipes</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes"
        onChangeText={text => setSearchText(text)}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('RecipeDetail', { recipe: item });
            }}
          >
            <View style={styles.recipeItem}>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{item.name}</Text>
              <Text style={styles.recipeContent}>{item.content}</Text>
            </View>
          </TouchableWithoutFeedback>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  recipeItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  recipeImage: {
    width: 350,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeContent: {
    fontSize: 16,
  },
});

export default HomeScreen;
