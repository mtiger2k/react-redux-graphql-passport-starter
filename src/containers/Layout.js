import React from 'react';
import { Link } from 'react-router';

import NavbarLink from '../components/NavbarLink';

const Layout = ({ children, params, location }) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">SharedApp</Link>
        </div>

        <ul className="nav navbar-nav">
          <NavbarLink
            title="Counter"
            href="/counter"
            active={location.pathname.indexOf('counter') !== -1}
          />
        </ul>

        <ul className="nav navbar-nav">
          <NavbarLink
            title="About"
            href="/about"
            active={location.pathname.indexOf('about') !== -1}
          />
        </ul>

      </div>
    </nav>
    <div className="container">
      {children}
    </div>
  </div>
);

export default Layout;
