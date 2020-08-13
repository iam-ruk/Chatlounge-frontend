import React,{useState} from 'react';
import './App.css';
import {NavLink,Link} from 'react-router-dom';
function Form() {
    const [user,setUser]=useState('');
    const [room,setRoom]=useState('');
    return (
        <div className="Form">
            <div className="button-container">
                    <div className="button-item-1">
                    <NavLink to="/">
                        <button type="button" className="btn btn-default">Create</button>
                    </NavLink>
                    </div>
                    <div className="button-item-2">
                    <NavLink to="/join">
                        <button type="button" className="btn btn-default">Join</button>
                    </NavLink>
                    </div>
                </div>
            <div className="input-container">
                <form>
                <div className="form-group">
                    <label for="user">Name:</label>
                    <input type="text" className="form-control" placeholder="Enter username" id="user"
                    onChange={e=>setUser(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="room">Room name:</label>
                    <input type="text" className="form-control" placeholder="Enter room name" id="room"
                        onChange={e=>setRoom(e.target.value)}/>
                </div>
                <Link to={`/chat?user=${user}&room=${room}`}>
                <button type="submit" className="btn btn-primary">Submit</button>
                </Link>
                </form>
            </div>
        </div>
    )
}
export default Form;