import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
const CreatePlanet = () => {
  // metode navigimi (nga njeri komponent tek tjetri)
  const navigate = useNavigate();
  // Cdo input ka nje state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // State i imazheve eshte null ose string  bosh
  const [file, setFile] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext);
  // Informacione per user-in e loguar, percaktimi i shfaqjes se butonave update dhe delete
  // E njejta me ate tek komponenti navbar

  useEffect(() => {
    if (!userInfo.email) {
      // Therritja e app => leximi i user-it
      /* Sintaksa:
            await axios.method('path backend', variable).
            then(()=>{}.catch(err=>{}))
            */
      axios
        .get("http://localhost:3001/user/", {
          withCredentials: true,
        })
        .then((res) => {
          setUserInfo(res.data);
          console.log(res.data);
        })
        // Nese nuk merren te dhenat e userit
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [userInfo, setUserInfo]);
  //   const userId = userInfo.id;

  //   if (!userId) {
  //     console.error("User ID not available");
  //     return;
  //   }
  // Funksioni qe do te perdoret per te kaluar te dhenat ne DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Te dhenat nga input-et ruhen ne nje variabel qe do te dergohen me pas ane te axios, pa imazhin
    const newPlanet = {
      title: title,
      description: description,
      userId: userInfo.id,
    };
    // Konfigurimet per te kaluar imazhin ne backend dhe DB
    if (file) {
      // Krijohet nje variable i cili do te lejoje krijimin e nje key dhe nje value nga input
      const data = new FormData();
      // Behet unik emri i file-it te upload-uar; per te mos pasur konflikte
      const filename = Date.now() + file.name;
      // Percaktimi i property-ve te imazhit
      data.append("name", filename);
      data.append("file", file);
      // Kalimi i informacion
      newPlanet.image = filename;
      // Therritja e api qe to te beje ruajtjen e imazhit
      // Ne rastin e shpembullit, ruajtja behet te folderi images qe gjendet tek folderi i serverit
      try {
        /* Sintaksa:
                    await axios.method('path backend', variable)
                */
        await axios.post("http://localhost:3001/upload", data);
      } catch (err) {
        // Nese nuk ngarkohet imazhi
        console.log("Image not uploaded " + err);
      }
    }
    // Therritja e app => Create
    /* Sintaksa:
        await axios.method('path backend', variable).
        then(()=>{}.catch(err=>{}))
        */
    await axios
      .post("http://localhost:3001/add_planet", newPlanet)
      .then((res) => {
        // Testimi
        console.log(res.data);
        // Pas krijimit kallohet tek faqja kryesore
        navigate("/");
      })
      // Nese nuk krijohet elementi i ri
      .catch((err) => {
        console.log("Error server Planet not created" + err);
      });
  };
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                rows={3}
                placeholder="Enter Description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Image">
              <Form.Label>Image</Form.Label>
              {/* Update i state perdor files[0] nese input ka type file */}
              <Form.Control
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </Form>
        </Col>
        <Col>
          {/* Shfaqja e imazhit te upload-ur */}
          {file && (
            <div className="w-100">
              <img
                className="img-fluid"
                // Konfertimi ne url
                src={URL.createObjectURL(file)}
                alt=""
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePlanet;
