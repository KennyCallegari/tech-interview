import React, { useEffect, useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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

  const getItems = async () => {
    const res = await axios.get(`http://localhost:8080/items`);

    setItems(res.data.items)
  }

  useEffect(() => {
    getItems()
  }, [])

  const onChangeInput = (e) => { setNewItem(e.target.value) }

  const addItem = async () => {
    const res = await axios.post(`http://localhost:8080/items`, { name: newItem });

    setItems(res.data.items)
  }


  const changeQuantity = async (index: number, positive: boolean) => {
    const newQuantity = positive ? items[index].quantity + 1 : items[index].quantity - 1;

    const res = await axios.put(
      `http://localhost:8080/items/${items[index]._id}`,
      { quantity: newQuantity }
    );

    return setItems(res.data.items);
  }

  const changePrice = async (index: number, positive: boolean) => {
    const newPrice = positive ? items[index].price + 1 : items[index].price - 1;

    const res = await axios.put(
      `http://localhost:8080/items/${items[index]._id}`,
      { price: newPrice }
    );

    return setItems(res.data.items);
  }


  const renderItem = (item: any, index: number) => (
    <div className='item-container' key={index}>
      <div className='item-name'>
        <span>{item.itemName}</span>
      </div>
      <div className='quantity'>
        <button>
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => changeQuantity(index, false)} />
        </button>
        <span> {item.quantity} </span>
        <button>
          <FontAwesomeIcon icon={faChevronRight} onClick={() => changeQuantity(index, true)} />
        </button>
      </div>
      <div className='price'>
        <button>
          <FontAwesomeIcon icon={faChevronLeft}  onClick={() => changePrice(index, false)} />
        </button>
        <span> {item.price} </span>
        <button>
          <FontAwesomeIcon icon={faChevronRight}  onClick={() => changePrice(index, true)} />
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
					<FontAwesomeIcon icon={faPlus} onClick={addItem} />
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
