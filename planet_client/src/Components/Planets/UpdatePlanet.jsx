import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const UpdatePlanet = () => {
    // Per te marre elementin me id perkatese
    const { id } = useParams()
    // metode navigimi (nga njeri komponent tek tjetri)
    const navigate = useNavigate()
    // Do te ruaje infot per nje element te caktuar
    const [planet, setPlanet] = useState({})
    // Kalimi tek forma e update
    // Statet per inputet
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null);
    // Do te perdoret per te shfaqur imazhin pas upload
    const [imagePreview, setImagePreview] = useState('');
    // Do te perdoret per leximin e imazhit
    const PathFile = "http://localhost:3001/images/";

    // Do te marre info per elementin qe ka id e therritur
    // Sa here ndryshon vlera e id-se therritet useEffect
    useEffect(() => {
        const fetchData = async () => {
            // Therritja e app => Leximi i te dhenave te elementit
            /* Sintaksa:
            await axios.method('path backend', variable).
            then(()=>{}.catch(err=>{}))
            */
            await axios.get(`http://localhost:3001/getPlanet/${id}`)
                .then((res) => {
                    // shfaqja e informacionit -test
                    console.log(res.data)
                    // Ruhen tek state objekt
                    setPlanet(res.data)
                    // Perdoren per te shfaqur vlerat tek inputet ne momentin e update
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                    setFile(res.data.image)

                }).catch((err) => {
                    // Nese nuk lexohet informacionet e elementit
                    console.log('Data not showing ' + err)
                })
        };
        // Therritja e funksionit
        fetchData()
    }, [id])

    // Funksioni i update
    const handleUpdate = async (e) => {
        e.preventDefault()
        // Krijimi i nje kopje te informacioneve te pa ndryshuara
        const planetUpdate = { ...planet };

        // Update-im i informacioneve me te rejat
        planetUpdate.title = title;
        planetUpdate.description = description;
        // Konfikurimet per imazhin
        if (file) {
            const data = new FormData();
            const filename = file.name;
            data.append("name", filename);
            data.append("file", file);
            planetUpdate.image = filename;
            try {
                await axios.post("http://localhost:3001/upload", data);
            } catch (err) { }
        }
        else {
            // No new image selected, keep the previous image URL
            planetUpdate.image = planet.image;
            console.log(planet.image)
        }
        // Therritja e apit - update
        /* Sintaksa:

        await axios.method('path backend', variable).
        then(()=>{}.catch(err=>{}))
        */
        await axios.patch(`http://localhost:3001/updatePlanet/${id}`, planetUpdate)
            .then((res) => {
                // Test
                console.log(res)
                // Kalimi tek home pas update
                navigate('/');
            }).catch((err) => {
                // Nese nuk ndodh update
                console.log("Data not updated " + err)
            })
    }
    return (
        <Container className="my-5">
            <Row>
                <Col>
                    {/* Therritja e funksionit */}
                    <Form className="w-70" onSubmit={handleUpdate}>
                        <Form.Group className="mb-3" controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" accept=".jpeg, .png, .jpg" onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                // Shfaqja e imazhit te selektuar
                                setFile(selectedFile);
                                if (selectedFile) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        setImagePreview(reader.result);
                                    };
                                    reader.readAsDataURL(selectedFile);
                                }
                            }} />
                        </Form.Group>
                        <Button variant="warning" type="submit" >
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {/* Shfaqja e imazhit  */}
                    {file && (
                        <div className="w-100">
                            <img
                                className="img-fluid"
                                src={PathFile + file}
                                alt=""
                            />
                        </div>
                    )}
                    {imagePreview && (
                        <div className="w-100">
                            <img
                                className="img-fluid"
                                src={imagePreview}
                                alt=""
                            />
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default UpdatePlanet
