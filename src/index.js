import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import axios from 'axios'


const root = document.getElementById('app')

const divStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };
  
const divStyle2 = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor:'black',
    borderRadius: '50px',
    padding: '20px',
    marginTop: '20px'
  };

const RenderingAllUsers = function (props) {
    const message = props.message;
    const newUsers = props.users;
    const onlyUsersWithThings = props.onlyUsers;
    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={()=>onlyUsersWithThings()}>{message}</button>
            <div style={divStyle}>
            {newUsers.map((user) =>
            <div style={divStyle2}>
            <h2 key={user.id}>{user.name}</h2>
            <h5>
            {user.userthings.map(thing => 
                <li key={thing.id}>
                {thing.thing.name}
                </li>
            )} 
            </h5>
            </div>
            )}
            </div>
        </div>
    )
}

// const RenderingOnlyUsers = function (props) {
//     return (
//         <h1>Create the view to show only users with things</h1>
//     )
// }



class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            usersWithThings: [],
            message: 'Show Me Only Users with Things'
        }
        this.onlyUsersWithThings = this.onlyUsersWithThings.bind(this)
    }
    async componentDidMount() {
        const response = await axios.get('/users')
        const allUsers = response.data;
        this.setState({ users: allUsers })
    }

    async onlyUsersWithThings(){
        const response = await axios.get('/users')
        const newUsers = response.data;
        const usersWithThings = newUsers.filter(user => user.userthings.length !== 0)
        if(this.state.users.length === newUsers.length){
            return this.setState({users: usersWithThings, message: 'Show All Users'})
        } else {
            this.setState({users: newUsers, message:'Show Me Only Users With Things'})  
        }
        // if (Object.is(this.state.users, usersWithThings)){
        //     return this.state({users: newUsers})  
        // } else {
        //     this.setState({ users: usersWithThings })  
        // }
    }

    render() {
        return (
            <RenderingAllUsers users = {this.state.users} onlyUsers = {this.onlyUsersWithThings} message={this.state.message} />
        )
    }
}


render(<App />, root)

