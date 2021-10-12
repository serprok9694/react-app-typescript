import React, { useEffect, useState } from 'react';
import { getRequest, openErrorNotification } from '../../../utils';
import { PageWrapper } from '../../wrappers/PageWrapper';
import { Card, Spin, Space, Pagination, Input } from 'antd';
import './styles.scss';
import { PRODUCTS_ENDPOINT } from '../../../constants/endpoints';
import { useHistory } from 'react-router-dom';
const { Meta } = Card;

export interface IProduct {
  id: number;
  image: string;
  name: string;
  price: number;
};

export const ProductsPage = () => {
  const history = useHistory();
  const [searchNameValue, setSearchNameValue] = useState<string>("");
  const [searchPriceValue, setSearchPriceValue] = useState<string>("");
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | null>(null);
  const items = filteredProducts !== null ? filteredProducts : products;
  const onChangePagination = (pageIndex: number, pageSize?: number) => {
    setProducts(null);
    getProducts({ pageIndex, pageSize });
  };
  const getProducts = (pageInfo?: { pageIndex: number; pageSize?: number }) => {
    const query = pageInfo ? `?page=${pageInfo?.pageIndex}&limit=${pageInfo?.pageSize}` : '';
    getRequest(`${PRODUCTS_ENDPOINT}${query}`)
      .then(res => setProducts(res.data))
      .catch(err => openErrorNotification(err.response.data.error, err.response.data.message));
  };
  useEffect(() => {
    getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const filteredProducts = products?.filter(product => product.name.includes(searchNameValue) && String(product.price).includes(searchPriceValue));
    filteredProducts && setFilteredProducts(filteredProducts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchNameValue, searchPriceValue]);
  
  return (
    <PageWrapper>
      <div className="products-page">
        <h1>Products</h1>
        <div className="products-page__total">
          <div>Total: {products?.length}</div>
          <Pagination onChange={onChangePagination} total={300} />
        </div>
        <div>
          <Input value={searchNameValue} onChange={e => setSearchNameValue(e.target.value)} placeholder="Name" />
          <Input value={searchPriceValue} onChange={e => setSearchPriceValue(e.target.value)} placeholder="Price" />
        </div>
        <div className="products-page__list">
          {items === null ? <Space size="middle"><Spin size="large" /></Space> : (
            items.length ? items.map((product: IProduct) => (
              <Card
                key={product.id}
                hoverable
                cover={<img alt="example" src={product.image} />}
                onClick={() => history.push(`${window.location.pathname}/${product.id}`)}
              >
                <Meta title={product.name} description={`Price: $${product.price}`} />
              </Card>
            )) : <div>Нет данных</div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
