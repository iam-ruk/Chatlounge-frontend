import React from 'react'
import {Row,Col,Card} from 'react-bootstrap';
export default function List({messages}) {
    const messageArray=messages.map((message)=>{
        return(
            <Card bg={'info'} className='my-2 p-1' >
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
        </div>
    )
}
