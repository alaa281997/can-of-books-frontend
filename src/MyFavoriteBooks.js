import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './myFavoriteBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks';

class MyFavoriteBooks extends React.Component {
  render() {
    return (
      <BestBooks/>
    )
  }
}
export default withAuth0(MyFavoriteBooks);