import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    // metode navigimi (nga njeri komponent tek tjetri)
    const navigate = useNavigate()
    // Cdo input ka nje state
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // Funksioni qe do te perdoret per te kaluar te dhenat ne DB
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Te dhenat nga input-et ruhen ne nje variabel qe do te dergohen me pas ane te axios
        const newUser = {
            username: username,
            email: email,
            password: password
        }
        // Therritja e apit
        /* Sintaksa:

        await axios.method('path backend', variable).
        then(()=>{}.catch(err=>{}))
        */
        await axios.post('http://localhost:3001/register/', newUser)
            .then((res) => {
                // Shfaq te dhenat- testim
                console.log(res.data)
                // Kalon tek komponenti login, nese regjistrimi ndodh me suksese
                navigate('/login')
            })
            // Nese nuk ndodh regjistrimi
            .catch(err => { console.log("User not added " + err) })
    }

    return (
        <Container className="my-5 w-75 mx-auto">
            <Form className="mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        value={username}
                        placeholder="Enter last username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        value={email}
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter password"
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <p>
                    Have an account ? <a href="/login/">Login</a>
                </p>
            </Form>
        </Container>
    )
}

export default Register
