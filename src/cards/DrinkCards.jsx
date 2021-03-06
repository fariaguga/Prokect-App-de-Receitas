import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import { MAX_OBJECT_KEYS } from '../global/constants';
import '../index.css';

function DrinkCards({ data }) {
  const { drinks } = useContext(MyContext);
  const history = useHistory();
  const { isRecommendation, size } = data;
  console.log(isRecommendation);

  function showCards() {
    const cards = drinks.filter((card, index) => index <= size);
    return (
      cards.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <Link to={ `/bebidas/${idDrink}` } key={ idDrink }>
          { isRecommendation
            ? (
              <div
                data-testid={ `${index}-recomendation-card` }
                className="item top"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  style={ { height: '5em' } }
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
                <p
                  data-testid={ `${index}-recomendation-title` }
                  className="centering"
                >
                  { strDrink }
                </p>
              </div>
            )
            : (
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  style={ { height: '5em' } }
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
                <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
              </div>
            )}
        </Link>
      ))
    );
  }

  function goToDrink() {
    if (drinks === null) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }

    if (drinks.length === 1 && Object.keys(drinks[0]).length !== MAX_OBJECT_KEYS) {
      const { idDrink: id } = drinks[0];
      return history.push(`/bebidas/${id}`);
    }
    return showCards();
  }

  return (
    goToDrink()
  );
}

DrinkCards.propTypes = ({
  size: PropTypes.number,
}).isRequired;

export default DrinkCards;
