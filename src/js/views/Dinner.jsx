import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import Loading from '../component/Spinner.jsx';
import LoggedFood from '../component/LoggedFood.jsx';

const Dinner = () => {

  const [food, setFood] = useState({});
  const [amount, setAmount] = useState();
  const [loggedItems, setLoggedItems] = useState([]);
  const { store, actions } = useContext(Context);

  const macros = store.dinner;
  const loggedDinner = store.loggedDinner;

  function handleLog(e) {
    e.preventDefault();
    console.log(food);
    let newLog = { food: food, qty: amount };
    setLoggedItems(newLog);
    actions.fetchMacros(food, amount, newLog, 'dinner');
    document.getElementById('food').value = '';
    document.getElementById('quantity').value = '';
  }

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-8 col-md-10 col-sm-12 m-auto">
            <form onSubmit={handleLog}>
              <div className="form-group">
                <label htmlFor="food">Log Food</label>
                <input type="text" className="form-control" id="food" placeholder="Log food" onChange={(e) => { setFood(e.target.value) }} required />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" className="form-control" id="quantity" placeholder="Quantity" onChange={(e) => { setAmount(parseInt(e.target.value)) }} required min='0' />
              </div>
              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary">Log food</button>
              </div>
            </form>
            <div id='macroCount'>
              {macros.calories != 0 ?
                <ul>
                  <li>{macros.calories} kcal</li>
                  <li>{macros.carbs} g carbs</li>
                  <li>{macros.protein} g protein</li>
                  <li>{macros.fats} g fats</li>
                </ul>
                :
                <Loading />
              }
            </div>
            <div className='loggedFood'>
              <LoggedFood loggedFood={loggedDinner} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dinner