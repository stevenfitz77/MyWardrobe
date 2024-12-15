import { Flex, Box, Button, Container, Heading, HStack, Input, useColorModeValue, VStack, Text, Image } from '@chakra-ui/react';
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
        const response = await axios.get('http://localhost:4000/api/clothingItems');
        const clothingItems = response.data.data;
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

  const handleSaveOutfit = async () => {
    const outfit = {
      top: tops[currentTopIndex]._id,
      bottom: bottoms[currentBottomIndex]._id,
    };
    try {
      await axios.post("http://localhost:4000/api/outfits", outfit);
      alert("Outfit saved successfully");
    } catch (error) {
      console.error("There was an error saving the outfit", error);
    }
  };

  return (
    <Container maxW={"container.md"}>
      <VStack spacing={8}>

        <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
            MyWardrobe
        </Heading>

        <Flex direction={"column"} align={"center"} w="full">
          <HStack>
            <Button
              colorScheme='gray'
              onClick={handlePrevTop}
              disabled={tops.length === 0}
            >
              {"<"}
            </Button>

            {tops.length > 0 && (
              <Flex direction={"column"} align={"center"}>
                <Image src={`http://localhost:4000/uploads/${tops[currentTopIndex].image}`} alt="Current Top" maxH="400px" objectFit="contain" />
                <Text>{tops[currentTopIndex].brand} - {tops[currentTopIndex].color} - {tops[currentTopIndex].size}</Text>
              </Flex>
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
              <Flex direction={"column"} align={"center"}>
                <Image src={`http://localhost:4000/uploads/${bottoms[currentBottomIndex].image}`} alt="Current Bottom" maxH="400px" objectFit="contain" />
                <Text>{bottoms[currentBottomIndex].brand} - {bottoms[currentBottomIndex].color} - {bottoms[currentBottomIndex].size}</Text>
              </Flex>
            )}

            <Button
              colorScheme='gray'
              onClick={handleNextBottom}
              disabled={bottoms.length === 0}
            >
              {">"}
            </Button>
          </HStack>
        </Flex>

        <Button
          colorScheme='blue'
          onClick={handleSaveOutfit}
        >
            Save Outfit
        </Button>

      </VStack>
    </Container>
  );
};

export default HomePage;
