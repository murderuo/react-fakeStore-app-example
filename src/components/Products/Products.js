import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import './index.css';
import withSearch from '../hoc/withSearch';
import ProductModal from '../ProductsModal';

function Products(props) {
  // const { baskets, setBaskets, searchValue, products, setProducts } = props;
  const { baskets, setBaskets, searchValue } = props;
  // console.log(props);
  const [data, setData] = useState([]);
  const [tempdata, setTempdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getData = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    // console.log(res.data);
    setData(res.data);
    // setProducts(res.data);
    setTempdata(res.data);
    setIsLoading(false);
  };

  // const settingTempData = () => {
  //   console.log('here-4');
  //   console.log(products);
  //   setData(products);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    // products.length === 0 ? getData() : settingTempData(); //when com. first time render we will check data length, if it is 0 then get data else setTempdata
    getData();
  }, []);

  //when search input changes this function will be called
  useEffect(() => {
    // console.log('here',searchValue);
    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setData(filteredData);
    if (searchValue === '') {
      setData(tempdata);
    }
  }, [searchValue]);

  return isLoading ? (
    <div className="container">
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
        <div id="details"></div>
      <div className="container">
        {/* //modal window open will be here */}
        {data.map(item => (
          <div key={item.id} className="card">
            <div className="image">
              <img
                src={item.image}
                alt=""
                onClick={() => setIsOpenModal(true)}
              />
            </div>
            <div className="title">{item.title}</div>
            <div className="price">
              {item.price}${' '}
              <button
                className="add"
                onClick={() => setBaskets([...baskets, item])}
                disabled={baskets.find(basket => basket.id === item.id)}
              >
                {baskets.find(basket => basket.id === item.id)
                  ? 'Added'
                  : 'Add Basket'}
              </button>
            </div>
          </div>
        ))}

        <ProductModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </div>
    </>
  );
}

export default withSearch(Products);
