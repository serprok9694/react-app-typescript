import React from 'react'
import { Layout, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './styles.scss';

const { Header } = Layout;

interface IProps {
  collapsed: boolean;
  toggle: () => void;
};

export const Navbar = (props: IProps) => {
  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <Header className="site-layout-background">
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: props.toggle,
      })}
      <Button onClick={signOut}>Sign out</Button>
    </Header>
  )
}