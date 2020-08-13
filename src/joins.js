import React,{useState} from 'react';
import './App.css';
import {NavLink,Link} from 'react-router-dom';
function Join() {
    const [link,setLink]=useState('');
    const [user,setUser]=useState('');
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
                    <label for="link">name:</label>
                    <input type="text" className="form-control" placeholder="Enter your name" id="link"
                    onChange={e=>setUser(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="link">room id:</label>
                    <input type="text" className="form-control" placeholder="Enter the room id" id="link"
                    onChange={e=>setLink(e.target.value)}/>
                </div>
                <Link to={`/enter?user=${user}&room_id=${link}`}>
                <button type="submit" className="btn btn-primary">Submit</button>
                </Link>
                </form>
            </div>
        </div>
    );
}
export default Join;
