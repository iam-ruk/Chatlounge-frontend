import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import queryString from 'query-string';
import List from './messageList';
import axios from 'axios';
import { Container, Badge, Row, Col, ListGroup, InputGroup, FormControl, Card, Button } from 'react-bootstrap';

var socket=io('https://chatlite-backend.herokuapp.com/')

function Enter({location}) {
    const [room,setRoom]=useState('');
    const [welcome,setWelcome]=useState({});
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
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
        socket.on('message',(message_inc)=>{
            setMessages(messages=>[...messages,message_inc]);
        })
    },[]);
    
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