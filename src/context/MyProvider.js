import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import foodApiToSelect from '../services/searchMeals';
import drinkApiToSelect from '../services/searchDrinks';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [result, setResult] = useState([]);

  const [categories, setCategories] = useState({
    meals: [],
    drinks: [],
  });

  const data = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    categories,
    setCategories,
    result,
    setResult,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await foodApiToSelect('ALL');
      setMeals(response.meals);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await drinkApiToSelect('ALL');
      setDrinks(response.drinks);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const mealsCategories = await foodApiToSelect('GET_CATEGORIES');
      const drinksCategories = await drinkApiToSelect('GET_CATEGORIES');
      setCategories({
        meals: mealsCategories.meals,
        drinks: drinksCategories.drinks,
      });
    };
    fetchApi();
  }, []);

  return (
    <MyContext.Provider value={ data }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
