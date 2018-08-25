import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import Movies from './Movies';
import Paging from '../paging/Paging';
import { search as searchMovies } from '../../services/omdbApi';

class Results extends Component {

  state = {
    movies: null,
    totalResults: 0,
    perPage: 10,
    loading: false,
    error: null
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.searchMovies();
  }

  componentDidUpdate({ location }) {
    const { page: oldPage } = qs.parse(location.search);
    const { search: oldSearch } = qs.parse(location.search);
    if(oldSearch !== this.searchTerm || oldPage !== this.searchPage) this.searchMovies();
  }

  handlePage = paging => {
    this.setState(paging, () => {
      const { perPage } = this.state;
      const { search } = this.searchTerm;
      const { page } = paging;
      history.pushState({
        search: qs.stringify({ search, page, perPage })
      });
    });
  };

  get searchPage() {
    const { location } = this.props;
    const { page } = qs.parse(location.search);
    return page;
  }

  get searchTerm() {
    const { location } = this.props;
    const { search } = qs.parse(location.search);
    return search;
  }
<<<<<<< HEAD
  
  searchAlbums() {
    const search = this.searchTerm;
    
    // console.log('*** search', search);
=======

  searchMovies() {
    const { perPage } = this.state;
    const page = parseInt(this.searchPage);
    const search = this.searchTerm;
    if(!search) return;

>>>>>>> lab2-3
    if(!search) return;
    
    this.setState({
      loading: true,
      error: null
    });
<<<<<<< HEAD
    
    // console.log('*** error.msg');
    getAlbums(search)
=======

    searchMovies({ search }, { page, perPage })
>>>>>>> lab2-3
      .then(
        ({ Search, totalResults }) => {
          this.setState({ movies: Search, totalResults, page });
        },
        err => {
          this.setState({ error: err.message });
        }
      )
      .then(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { movies, loading, error } = this.state;
    const { perPage, totalResults } = this.state;
    const { searchTerm } = this;

    return (
      <section>
        {(loading || error) &&
          <section className="notifications">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </section>
        }

        {searchTerm &&
          <Fragment>
            <p>Searching for &quot;{searchTerm}&quot;</p>
            <Paging
              page={+this.searchPage}
              perPage={perPage}
              totalResults={parseInt(totalResults)}
              onPage={this.handlePage}
            />
          </Fragment>
        }
        <div>
          {movies
            ? <Movies movies={movies}/>
            : <p>Please enter a search to get started</p>
          }
        </div>
      </section>   
    );
  }
}

export default Results;