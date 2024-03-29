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

const App = () => {
	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState('');

  const onChangeInput = (e) => { setNewItem(e.target.value) }

  const renderItem = (item: any, index: number) => (
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
					<input className='add-item-input' value={newItem} placeholder='Ajouter un produit...'
            onChange={onChangeInput} type="text" />
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
