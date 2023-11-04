
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  favorites: [],
};

const FavoritesContext = createContext(initialState);

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (recipe) => recipe.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addToFavorites = (recipe) => {
    dispatch({ type: ADD_FAVORITE, payload: recipe });
  };

  const removeFromFavorites = (recipe) => {
    dispatch({ type: REMOVE_FAVORITE, payload: recipe });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
const useFavoritesActions = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
      throw new Error('useFavoritesActions must be used within a FavoritesProvider');
    }
    return context;
  };

export {useFavoritesActions, FavoritesProvider, useFavorites };
