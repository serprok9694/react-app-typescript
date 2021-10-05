import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRequest } from '../../../utils';
import { PageWrapper } from '../../wrappers/PageWrapper';
import { Card, Spin, Space, Pagination } from 'antd';
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
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const onChangePagination = (pageIndex: number, pageSize?: number) => {
    setProducts(null);
    getProducts({ pageIndex, pageSize });
  };
  const getProducts = (pageInfo?: { pageIndex: number; pageSize?: number }) => {
    const query = pageInfo ? `?page=${pageInfo?.pageIndex}&limit=${pageInfo?.pageSize}` : '';
    getRequest(`${PRODUCTS_ENDPOINT}${query}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };
  useEffect(() => getProducts(), []);
  return (
    <PageWrapper>
      <div className="products-page">
        <h1>Products</h1>
        <div className="products-page__total">
          <div>Total: {products?.length}</div>
          <Pagination onChange={onChangePagination} total={300} />
        </div>
        <div className="products-page__list">
          {products === null ? <Space size="middle"><Spin size="large" /></Space> : (
            products.map((product: IProduct) => (
              <Card
                key={product.id}
                hoverable
                cover={<img alt="example" src={product.image} />}
                onClick={() => history.push(`${window.location.pathname}/${product.id}`)}
              >
                <Meta title={product.name} description={`Price: $${product.price}`} />
              </Card>
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
