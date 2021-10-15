import React, { useEffect, useState } from 'react';
import { PageWrapper } from '../../wrappers/PageWrapper';
import { Card, Spin, Space, Pagination, Input } from 'antd';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getProductsRequestAction } from '../../../actions/products';
const { Meta } = Card;

export interface IProduct {
  id: number;
  image: string;
  name: string;
  price: number;
};

const ProductsPage = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchNameValue, setSearchNameValue] = useState<string>("");
  const [searchPriceValue, setSearchPriceValue] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | null>(null);
  const items = filteredProducts !== null ? filteredProducts : props.products;
  const onChangePagination = (pageIndex: number, pageSize?: number) => {
    dispatch(getProductsRequestAction({ pageIndex, pageSize }));
  };
  useEffect(() => {
    dispatch(getProductsRequestAction());
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!searchNameValue.length && !searchPriceValue.length) {
      setFilteredProducts(null);
    } else {
      const filteredProducts = props.products?.filter((product: IProduct) => product.name.includes(searchNameValue) && String(product.price).includes(searchPriceValue));
      filteredProducts && setFilteredProducts(filteredProducts);
    };
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchNameValue, searchPriceValue]);
  
  return (
    <PageWrapper>
      <div className="products-page">
        <h1>Products</h1>
        <div className="products-page__total">
          <div>Total: {props.products?.length}</div>
          <Pagination onChange={onChangePagination} total={300} />
        </div>
        <div>
          <Input value={searchNameValue} onChange={e => setSearchNameValue(e.target.value)} placeholder="Name" />
          <Input value={searchPriceValue} onChange={e => setSearchPriceValue(e.target.value)} placeholder="Price" />
        </div>
        <div className="products-page__list">
          {props.isLoading ? <Space size="middle"><Spin size="large" /></Space> : (
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

const mapStateToProps = (state: any) => ({
  products: state.products.data,
  isLoading: state.products.request.status === 'pending' ? true : false,
});

export default connect(mapStateToProps, null)(ProductsPage);
