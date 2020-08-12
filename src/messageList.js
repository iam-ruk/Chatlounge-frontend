import React from 'react'
import {Row,Col,Card} from 'react-bootstrap';
import  { useEffect, useRef } from 'react'

export default function List({messages}) {
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    
    useEffect(scrollToBottom, [messages]);
    const messageArray=messages.map((message)=>{
        return(
            <Card key={message._id} bg={'info'} className='my-2 p-1' >
                <Card.Body>
                    <Card.Subtitle>
                        {message.sender}
                    </Card.Subtitle>
                    <Card.Text>
                        {message.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
        });
    return (
        <div>
                {messageArray}
                <div ref={messagesEndRef}/>
        </div>
    )
}
