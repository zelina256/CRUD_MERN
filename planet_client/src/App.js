import { Routes, Route, } from 'react-router-dom'
import Navigate from './Components/Navigate/Navigate'
import Footer from './Components/Navigate/Footer';
import Planets from './Components/Planets/Planets'
import DetailPlanets from './Components/Planets/DetailPlanet'
import CreatePlanet from './Components/Planets/CreatePlanet';
import UpdatePlanet from './Components/Planets/UpdatePlanet';
import Page404 from './Components/Page404';
import Register from './Components/Auth/Register'
import LogIn from './Components/Auth/LogIn'
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <>
      {/* Therritja e funksionit te UserContext; cdo infomacion i ruajtur ne te mund te lexohet nga cdo komponent */}
      <UserContextProvider>
        <Navigate />
        <Routes>
          <Route path="/" element={<Planets />} />
          {/* Planet */}
          <Route path="/create_planet" element={<CreatePlanet />} />
          <Route path="/planet/:id" element={<DetailPlanets />} />
          <Route path="/update/:id" element={<UpdatePlanet />} />
          {/* Auth  */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
