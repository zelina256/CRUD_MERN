import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";
const DetailPlanet = () => {
  // Per te marre elementin me id perkatese
  const { id } = useParams();
  // metode navigimi (nga njeri komponent tek tjetri)
  const navigate = useNavigate();
  //  Ruajte e info ne objekt
  const [planet, setPlanet] = useState({});
  // Do te perdoret per te shfaqur imazhin
  const PathFile = "http://localhost:3001/images/";
  // Do te perdoren infot per te shfaqur butonat update ose delete, nese user-i eshte i loguar
  const { userInfo, setUserInfo } = useContext(UserContext);
  // Merren info per elementin e cila ka id e kerkuar
  // Per cdo ndryshim te id-se therritet useEffect
  // Ndryshohen infot ne baze te id-se
  useEffect(() => {
    // Marrja e infomacionit per elementin
    const fetchData = async () => {
      // Therritja e app => leximi i infove te nje elementi
      /* Sintaksa:
            await axios.method('path backend', variable).
            then(()=>{}.catch(err=>{}))
            */
      await axios
        .get(`http://localhost:3001/getPlanet/${id}`)
        .then((res) => {
          // shfaqja e informacionit -test
          console.log(res.data);
          // Ruhen tek state objekt
          setPlanet(res.data);
        })
        .catch((err) => {
          // Nese nuk ndodh shfaqen te dhenat
          console.log("Data not showing " + err);
        });
    };
    fetchData();
  }, [id]);

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
        })
        // Nese nuk merren te dhenat e userit
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [userInfo, setUserInfo]);
  // Funksioni i fshirjes se nje elementi
  const handleDelete = async (id) => {
    // Therritja e app => Fshirje
    /* Sintaksa:
        await axios.method('path backend', variable).
        then(()=>{}.catch(err=>{}))
        */
    await axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Pas fshirjes kalohet te  faqja kryesore
        navigate("/");
      })
      .catch((err) => {
        // Nese nuk fshihet elementi
        console.log("Data not deleted " + err);
      });
  };
  let test = planet;
  console.log(test);
  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={6}>
          {/* imazhi */}
          {planet.image && planet.image !== "" && (
            <>
              <img
                src={PathFile + planet.image}
                alt={planet.name}
                className="img-fluid"
              />
            </>
          )}
        </Col>
        <Col xs={12} md={6}>
          {/* Infot */}
          <h1>{planet.title}</h1>
          <p>{planet.description}</p>
          <div class="d-grid gap-2 d-md-block">
            {/* Nje menyre tjeter per shfaqen e elementeve nese user-i eshte i loguar */}
            {userInfo.email &&
              (planet.owner === userInfo.id ? (
                <>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(planet._id)}
                  >
                    Delete
                  </Button>
                  <Button variant="warning" href={`/update/${planet._id}`}>
                    Update
                  </Button>
                </>
              ) : (
                <p></p>
              ))}
            {/* Nje menyre tjeter per te mos shfaqur elementen nese user-i nuk eshte i loguar*/}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailPlanet;
