import React, { useState, useContext } from 'react'
import { UserContext } from "../../UserContext";
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LogIn = () => {
    // Therritja e UserContext i cili do te bej update te dhenave te userit
    const { setUserInfo } = useContext(UserContext);
    // Navigimi
    const navigate = useNavigate()
    // Cdo input ka nje state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // Funksioni i log in, i cili do te kaloje info ne backend per verifikim
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Te dhenat ruhen ne nje variabel
        const User = {
            email: email,
            password: password
        };
        // Therritja e apit
        /* Sintaksa:

        await axios.method('path backend', variable).
        then(()=>{}.catch(err=>{}))
        */
        await axios.post('http://localhost:3001/login/', User, {
            withCredentials: true // kalon cookies me ane te kerkese (perdoret per token qe eshte marre nga jwt)
        })
            .then((res) => {
                // Nese user logohen te dhenat ruhen ne nje cookie/session 
                const userInfo = res.data;
                // Testim
                console.log(userInfo);
                // Behet update tek UserContext
                setUserInfo(userInfo);
                // Pasi eshte loguar dergohet tek faqja kryesore
                navigate('/')
            })
            // Nese nuk ndodh loin
            .catch(err => {
                console.log("User not login", err);
            });
    };

    return (
        <Container className="my-5">
            <Form className="mt-5 w-75 mx-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
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
                <Button onClick={handleSubmit}>Login</Button>
                <p>
                    Dont have an account ? <a href="/register">Register</a>
                </p>
            </Form>
        </Container>
    )
}

export default LogIn
