import { Box, Button, Container, Heading, HStack, Input, useColorModeValue, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const HomePage = () => {
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [currentTopIndex, setCurrentTopIndex] = useState(0);
  const [currentBottomIndex, setCurrentBottomIndex] = useState(0);

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/clothing");
        const clothingItems = response.data;
        setTops(clothingItems.filter(item => item.type === 'Top'));
        setBottoms(clothingItems.filter(item => item.type === 'Bottom'));
      } catch (error) {
        console.error("There was an error fetching the clothing items", error);
      }
    };
    fetchClothingItems();
  }, []);

  const handleNextTop = () => {
    setCurrentTopIndex((prevIndex) => (prevIndex + 1) % tops.length);
  };

  const handlePrevTop = () => {
    setCurrentTopIndex((prevIndex) => (prevIndex - 1 + tops.length) % tops.length);
  };

  const handleNextBottom = () => {
    setCurrentBottomIndex((prevIndex) => (prevIndex + 1) % bottoms.length);
  };

  const handlePrevBottom = () => {
    setCurrentBottomIndex((prevIndex) => (prevIndex - 1 + bottoms.length) % bottoms.length);
  };

  return (
    <Container maxW={"container.md"}>
      <VStack spacing={8}>

        <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
            MyWardrobe
        </Heading>

        <HStack>
          <Button
            colorScheme='gray'
            onClick={handleNextTop}
            disabled={tops.length === 0}
          >
            {"<"}
          </Button>

          {tops.length > 0 && (
            <>
              <Image src={tops[currentTopIndex].image} alt="Current Top" boxSize="100px" />
              <Text>{tops[currentTopIndex].brand} - {tops[currentTopIndex].color} - {tops[currentTopIndex].size}</Text>
            </>
          )}

          <Button
            colorScheme='gray'
            onClick={handleNextTop}
            disabled={tops.length === 0}
          >
            {">"}
          </Button>
        </HStack>

        <HStack>
          <Button
            colorScheme='gray'
            onClick={handlePrevBottom}
            disabled={bottoms.length === 0}
          >
            {"<"}
          </Button>

          {bottoms.length > 0 && (
            <>
              <Image src={tops[currentBottomIndex].image} alt="Current Bottom" boxSize="100px" />
              <Text>{bottoms[currentBottomIndex].brand} - {bottoms[currentBottomIndex].color} - {bottoms[currentBottomIndex].size}</Text>
            </>
          )}

          <Button
            colorScheme='gray'
            onClick={handleNextBottom}
            disabled={bottoms.length === 0}
          >
            {">"}
          </Button>
        </HStack>

        <Button
          colorScheme='blue'

        >
            {/* onClick= [TODO: save outfit]  */}
            Save Outfit
        </Button>

      </VStack>
    </Container>
  );
};

export default HomePage;
