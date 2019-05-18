import React from 'react';
import { IndexLink } from 'react-router';

const Header = () => (
  <div>
    <nav>
      <IndexLink to="/" >Home</IndexLink>
    </nav>
  </div>
);

export default Header;