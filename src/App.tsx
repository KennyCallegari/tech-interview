import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

// voici une liste de course
// dans cette liste on veut pouvoir :
// - ajouter un produit
// - augmenter / diminuer la quantité d'un produit
// - augmenter / diminuer le prix d'un produit
// - avoir le prix total qui évolue lorsqu'on effectue un changement dans la liste

// BONUS : convertir le total en euro vers un prix en usd
// Pour cela on utilisera l'api open exchange rates
// - méthode GET
// - https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=monTotal
// - header: { apikey: "Yfg2yQodgBumwqnQjRHwblfLPR2zFJRQ" }

// coucou
// bonjour Chloé

const App = () => {
	const [items, setItems] = useState([
		{ itemName: 'Carottes', quantity: 4, price: 2 },
		{ itemName: 'Sauce tomate', quantity: 1, price: 4 },
		{ itemName: 'PS5', quantity: 1, price: 500 },
	]);

  const renderItem = (item, index) => (
    <div className='item-container' key={index}>
      <div className='item-name'>
        <span>{item.itemName}</span>
      </div>
      <div className='quantity'>
        <button>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span> {item.quantity} </span>
        <button>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className='price'>
        <button>
          <FontAwesomeIcon icon={faChevronLeft}  />
        </button>
        <span> {item.price} </span>
        <button>
          <FontAwesomeIcon icon={faChevronRight}  />
        </button>
      </div>
    </div>
  )

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input className='add-item-input' value="" placeholder='Ajouter un produit...' />
					<FontAwesomeIcon icon={faPlus} />
				</div>
				<div className='item-list'>
          <div className='item-container'>
            <div className='item-name'>
              <span>PRODUIT</span>
            </div>
            <div>
              <span>QUANTITE & PRIX</span>
            </div>
          </div>
					{items.map(renderItem)}
				</div>
				<div className='total'>Total: €</div>
				<div className='total'>Total: $</div>
			</div>
		</div>
	);
};

export default App;
