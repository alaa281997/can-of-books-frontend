// import React from 'react';
// import axios from 'axios';
// import { withAuth0 } from "@auth0/auth0-react";
// import 'bootstrap/dist/css/bootstrap.min.css';


// class BestBooks extends React.Component {

//     state = {
//         books: []
//     }

//     componentDidMount = async () => {
      
       
//         const books = await axios.get('http://localhost:7500/books?',
//         { params: { email: this.props.auth0.user.email} })

//        this.setState({
//            books: books.data
//        })
        
    
//     }  

//     render() {
//         return (

            
//             this.state.books.map(book => {
//                <p>helloooo</p>
//                 return (
//                     <>
//                        <p>{book.bookName}</p>
//                        <p>{book.description}</p>   

//                     </>
//                 )
//             })


//         )
//     }
// }

// export default withAuth0(BestBooks);
