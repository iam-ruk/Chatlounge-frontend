import React,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import queryString from 'query-string';
import List from './messageList';
import { Container, Badge, Row, Col, ListGroup, InputGroup, FormControl, Card, Button } from 'react-bootstrap'

let socket=io('https://chatlite-backend.herokuapp.com/');
function Chat({location}) {
    const [user,setUser]=useState('');
    const [room,setRoom]=useState('');
    const [welcome,setWelcome]=useState({});
    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState('');

    
    useEffect(()=>{
        const {user,room}=queryString.parse(location.search)
        setUser(user);
        setRoom(room);
        socket.emit('join',{user:user,room:room});
        socket.on('ack',({id1})=>{
            setWelcome({message:`HI ${user}`,id1,room});
        })
        socket.on('message',(message_inc)=>{
            setMessages(messages => [ ...messages, message_inc]  )

        })
    },[]);
    return (
        <Container fluid>
            <Card
            style={{ height: '95vh'}}
            bg={'secondary'}
            text={'light'}
            className="mb-2">
            
    <Card.Header>
        <div>{`welcome to room ${room}`}</div>
        {`join the room using id: ${welcome.id1}`}
    </Card.Header>
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
                                  if(message!='')
                                    socket.emit('message',message);

                              }}  > send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Footer>
  </Card>
  </Container>
    )
}
export default Chat;