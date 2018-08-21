import React, { Component } from 'react';
import Search from './search/Search';
import { Link, Route } from 'react-router-dom';
import logo from '../assets/logo.png';
import styles from './Header.css';

class Header extends Component {

  render() {

    return (
      <div className={styles.header}>  
        <section className="header-container">
          <div className="logo"><img src={logo}/>
            <h1>Awesome Album Searcher!</h1>
          </div> 
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/albums">Search Albums</Link>
              </li>
            </ul>
          </nav>
        </section> 
        <section className="search-container">
          <Route component={Search}/>
        </section>
      </div>
    );
  }
}
export default Header;