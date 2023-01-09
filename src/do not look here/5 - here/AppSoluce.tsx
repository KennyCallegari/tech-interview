import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface IItem {
  itemName: string,
  quantity: number,
  price: number,
}

const App = () => {
	const [items, setItems] = useState<IItem[]>([
		{ itemName: 'carottes', quantity: 4, price: 2 },
		{ itemName: 'sauce tomate', quantity: 1, price: 4 },
		{ itemName: 'ps5', quantity: 1, price: 500 },
	]);
  const [newItemName, setNewItemName] = useState<string>('')
  const [total, setTotal] = useState(0)
  const [usdTotal, setUsdTotal] = useState(0)

  useEffect(() => {
    const _total = items.reduce((acc, item) => acc + item.price*item.quantity, 0);
    setTotal(_total)
  }, [items])

  const converter = async () => {
    if (total === 0) return 0;

    // var myHeaders = new Headers();
    // myHeaders.append("apikey", "Yfg2yQodgBumwqnQjRHwblfLPR2zFJRQ");
    
    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders
    // };
    
    // fetch(`https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=${total}`, requestOptions)
    //   .then(response => response.text())
    //   .then(response => JSON.parse(response))
    //   .then(response => setUsdTotal(response.result.toFixed(2)))
    //   .catch(error => console.log('error', error));

    const _usdTotal = await axios.get(
      `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=${total}`,
      { headers: { apikey: "Yfg2yQodgBumwqnQjRHwblfLPR2zFJRQ" } }
    );
    
    setUsdTotal(_usdTotal.data.result.toFixed(2))
  }

  useEffect(() => {
    function update() {
      converter()
    }

    update()
  }, [total])

  const addItem = () => {
    const _newItem = {
      itemName: newItemName,
      quantity: 0,
      price: 0
    }

    setItems([...items, _newItem])
    setNewItemName('')
  }

  const changeQuantity = (index: number, positive: boolean) => {
    const updatedItem = [...items];
    positive ? updatedItem[index].quantity++ : updatedItem[index].quantity--;

    return setItems(updatedItem);
  }

  const changePrice = (index: number, positive: boolean) => {
    const updatedItem = [...items];
    positive ? updatedItem[index].price++ : updatedItem[index].price--;

    return setItems(updatedItem);
  }

  const renderItem = (item: IItem, index: number) => (
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
					<input className='add-item-input' value={newItemName} onChange={(event) => setNewItemName(event.target.value)}
            placeholder='Add an item...' />
					<FontAwesomeIcon icon={faPlus} onClick={addItem} />
				</div>
				<div className='item-list'>
          <div className='item-container'>
            <div className='item-name'>
              <span>NAME</span>
            </div>
            <div>
              <span>QUANTITY & PRICE</span>
            </div>
          </div>
					{items.map(renderItem)}
				</div>
				<div className='total'>Total: {total}€</div>
				<div className='total'>Total: {usdTotal}$</div>
			</div>
		</div>
	);
};

export default App;
