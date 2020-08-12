import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import queryString from 'query-string';
import List from './messageList';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { Container, Badge, Row, Col, ListGroup, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

var socket=io('https://chatlite-backend.herokuapp.com/')
function Enter({location}) {
    const [room,setRoom]=useState('');
    const [welcome,setWelcome]=useState({});
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const [errors,setErrors]=useState('');
    let history=useHistory();

    useEffect(()=>{
        const {user,room_id}=queryString.parse(location.search)
        setRoom(room_id);
        console.log('sending request to get room details')

        console.log(room_id);
        console.log(user,'heyy there...');
        socket.emit('enter',{name:user,room_id});
        console.log('')
        axios.get(`https://chatlite-backend.herokuapp.com/${room_id}/`)
        .then(result=>{
            setMessages(messages=>[...messages,...result.data])
        })
        .catch(err=>console.log(err));
        socket.on('message',(message_inc)=>{
            setMessages(messages=>[...messages,message_inc]);
        })
        socket.on('error1',data=>{
            setErrors('Room not found');
        })
    },[]);
    console.log(errors,1);
    if(errors!==''){
        setTimeout(()=>{history.push('/join')},5000)
        return(<Alert variant='light'>
            <p>Room not found!</p>
            </Alert>
    )
    }
    return (
        <Container fluid>
            <Card
            style={{ height: '95vh'}}
            bg={'secondary'}
            text={'light'}
            className="mb-2">
            
    <Card.Header>{`welcome, use this id to join others to this room: ${room}`}</Card.Header>
    <Card.Body style={{ overflowY: 'auto' }}>
        <List messages={messages}/>
    </Card.Body>
    <Card.Footer  >
                    <InputGroup >
                        <FormControl  id="sendMessageInput" placeholder="Type message..." 
                            onChange={(e)=>{setMessage(e.target.value)}} />
                        <InputGroup.Append className=''>
                            <Button  variant='success' className='rounded text-light'
                              onClick={e=>{
                                  socket.emit('message',message);
                              }}  > send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Footer>
  </Card>
  </Container>
    )
}
export default Enter;