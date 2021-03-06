import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from './Form';
import UpdateBookForm from './UpdateBookForm';
import Alert from 'react-bootstrap/Alert';
class BestBooks extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        books: [],
        showBooks: false,
        showUpdateStatus: false,
        show: false,
        index: 0,
        bookName: '',
        description: '',
        urlImg: '',
        server: process.env.REACT_APP_SERVER
      }
    }
    
    componentDidMount = async () => {
      const books = await axios.get(process.env.HEROKU_URL, { params: { email: this.props.auth0.user.email } })
      console.log('books', books.data)
      this.setState({
        books: books.data,
        showBooks: true
      });
    }
  
  
    updateBookName = (event) => {
      this.setState({
        bookName: event.target.value
      })
    }
  
  
    updateDescription = (event) => {
      this.setState({
        description: event.target.value
      })
    }
  
  
    updateUrlImg = (event) => {
      this.setState({
        urlImg: event.target.value
      })
    }
  
  
  
    showModel = () => {
      this.setState({
        show: true
      })
    }
  
    handleCloses = () => {
      this.setState({
        show: false
      })
    }
  
    handleClose = () => {
      this.setState({
        showUpdateStatus: false,
      })
    }
  
    addBook = async (event) => {
      event.preventDefault();
      const { user, isAuthenticated } = this.props.auth0;
      const bookFormData = {
        bookName: this.state.bookName,
        description: this.state.description,
        urlImg: this.state.urlImg,
        ownerEmail: user.email,
  
      }
      const newBooks = await axios.post(`${this.state.server}/addBook`, bookFormData)
  
      this.setState({
        books: newBooks.data
      })
  
    }
  
  
    deleteBook = async (index) => {
      const ownerEmail = {
        email: this.props.auth0.user.email
      }
      let newBooks = await axios.delete(`${this.state.server}/deleteBook/${index}`, { params: ownerEmail })
  
      this.setState({
        books: newBooks.data
      })
  
    }
  
    updateBook = async (e) => {
      e.preventDefault();
      const bookData = {
        bookName: this.state.bookName,
        description: this.state.description,
        urlImg: this.state.urlImg,
        ownerEmail: this.props.auth0.user.email,
      }
    
      let booksData = await axios.put(`${this.state.server}/updatebook/${this.state.index}`, bookData)
      this.setState({
        books: booksData.data
      })
    }
  
  
    showUpdateForm = (idx) => {
  
      const chosenBook = this.state.books.filter((val, index) => {
        return idx === index;
      })
  
      console.log('hi', chosenBook);
  
      this.setState({
        showUpdateStatus: true,
        index: idx,
        bookName: chosenBook[0].bookName,
        description: chosenBook[0].description,
        urlImg: chosenBook[0].urlImg,
      })
    }
  
  
    render() {
      return (
        <Jumbotron>
  
          <h1>My Favorite Books</h1>
          <Button onClick={this.showModel} block>Add book</Button>
          {this.state.show &&
            <Form
              updateBookNameProps={this.updateBookName}
              updateBookDescriptionProps={this.updateDescription}
              updateBookUrlImgProps={this.updateUrlImg}
              addBookProps={this.addBook}
              handleClose1={this.handleCloses}
              show={this.state.show}
            />
          }
  
          {this.state.showUpdateStatus &&
            <UpdateBookForm
              bookName={this.state.bookName}
              description={this.state.description}
              urlImg={this.state.urlImg}
              updateBookNameProps={this.updateBookName}
              updateBookDescriptionProps={this.updateDescription}
              updateBookUrlImgProps={this.updateUrlImg}
              updateBook={this.updateBook}
              showUpdateStatus={this.state.showUpdateStatus}
              handleClose={this.handleClose}
            />
          }
          <br/><br/>
          <Alert variant="dark">My Favorite Books</Alert><br/><br/>
          <div>
            {this.state.showBooks &&
              this.state.books.map((item, idx) => {
                return (
  
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.urlImg} alt={item.urlImg} />
                    <Card.Body>
                      <Card.Title>{item.bookName}</Card.Title>
                      <Card.Text> {item.description}</Card.Text>
                      <Button variant="outline-danger" onClick={() => this.deleteBook(idx)}>Delete</Button>
                      <Button variant="outline-success" onClick={() => this.showUpdateForm(idx)}>Update</Button>
                    </Card.Body>
                  </Card>
  
                )
              })}
  
          </div>
        </Jumbotron>
      )
    }
  }
  
  export default withAuth0(BestBooks);
  

