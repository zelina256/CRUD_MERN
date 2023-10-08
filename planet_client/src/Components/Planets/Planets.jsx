import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Planet from './Planet'
const Planets = () => {
    // Array bosh per te therritur te gjitha objektet
    const [planets, setPlanets] = useState([])
    // Marrja e te gjithe elementeve te ruajtur ne databaze
    useEffect(() => {
        const fetchData = async () => {
            // Therritja e app => Leximi i te dhenave
            /* Sintaksa:
            await axios.method('path backend', variable).
            then(()=>{}.catch(err=>{}))
            */
            await axios.get('http://localhost:3001/get_all')
                .then((res) => {
                    // Test
                    console.log(res.data)
                    // Vendosja e te dhenave tek array
                    setPlanets(res.data)
                }).catch((err) => {
                    // Nese nuk shfaqen te dhenat
                    console.log('Data not showing ' + err)
                })
        };
        // therritja e funksionit
        fetchData()
    }, [])
    return (
        <Container className="my-5">
            <h1>Planets page</h1>
            <Row>
                {/* Cikli per shfaqen e informacioneve */}
                {/* Kush krijohet i fundit shfaqet i pari  (reverse)*/}
                {[...planets].reverse().map((planet, index) => {
                    return (
                        <Col key={index} xs={12} md={6} lg={4} className="mt-5">
                            <Planet {...planet} />
                        </Col>
                    )
                })}

            </Row>

        </Container>
    )
}

export default Planets
