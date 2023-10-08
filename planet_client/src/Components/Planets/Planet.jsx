import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Emertimet e props duhet tejene te njejta me ato te databazes
const Planet = ({ _id, title, description, image }) => {
    // Do te perdoret per lexim e imazheve
    const PathFile = "http://localhost:3001/images/";
    return (
        <Card className='h-100'>
            <Card.Img variant="top" src={PathFile + image} className='h-100' />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                {/* Linku per kalim tek detajet e elementit */}
                <Button variant="primary"><Link to={`/planet/${_id}`} className='text-light text-decoration-none'>Find more</Link></Button>
            </Card.Body>
        </Card>
    )
}

export default Planet
