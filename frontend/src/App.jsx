import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';

import ClothingPage from "./pages/ClothingPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import OutfitsPage from "./pages/OutfitsPage";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/clothing' element={<ClothingPage />} />
        <Route path='/outfits' element={<OutfitsPage />} />
      </Routes>
    </Box>
  );
}

export default App;