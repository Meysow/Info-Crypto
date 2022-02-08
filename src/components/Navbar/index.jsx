import React, { useState, useEffect } from "react";
import { Button, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { ReactComponent as ReactLogo } from "../../images/result.svg";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 799) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const toggleMenu = () => screenSize < 799 && setActiveMenu(!activeMenu);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <ReactLogo width="60px" height="60px" />
        <Typography.Title level={2} className="logo">
          <Link to="/">InfoCrypto</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => toggleMenu()}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item
            icon={<HomeOutlined />}
            key="item1"
            onClick={() => toggleMenu()}
          >
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            icon={<FundOutlined />}
            key="item2"
            onClick={() => toggleMenu()}
          >
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item
            icon={<MoneyCollectOutlined />}
            key="item3"
            onClick={() => toggleMenu()}
          >
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item
            icon={<BulbOutlined />}
            key="item4"
            onClick={() => toggleMenu()}
          >
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
