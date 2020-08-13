import React from 'react'
import {Row,Col,Card} from 'react-bootstrap';
import  { useEffect, useRef } from 'react'

export default function List({messages}) {
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    const toHHMMSS = (date) => {
        return new Date(date).toISOString().substr(11, 8);
    }
    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    useEffect(scrollToBottom, [messages]);
    const messageArray=messages.map((message)=>{
        return(
            <Card key={message._id} bg={'info'} className='my-2 p-1' >
                <Card.Body>
                    <Card.Subtitle>
                        {message.sender}
                       <span style={{float:'right'}} >{toHHMMSS(message.createdAt)}</span> 
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
