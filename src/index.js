import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import axios from 'axios'


const root = document.getElementById('app')


const RenderingAllUsers = function (props) {
    const newUsers = props.users;
    const onlyUsersWithThings = props.onlyUsers;
    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={()=>onlyUsersWithThings()}>Show Me Only Users with Things</button>
            {newUsers.map((user) =>
            <div>
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
        return this.setState({users: usersWithThings})
        // if (Object.is(this.state.users, usersWithThings)){
        //     return this.state({users: newUsers})  
        // } else {
        //     this.setState({ users: usersWithThings })  
        // }
    }

    render() {
        return (
            <RenderingAllUsers users = {this.state.users} onlyUsers = {this.onlyUsersWithThings} />
        )
    }
}


render(<App />, root)

