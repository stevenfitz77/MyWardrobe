import { Box, Button, Container, Heading, VStack, Image, Text, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OutfitsPage = () => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/outfits');
        setOutfits(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the outfits", error);
      }
    };
    fetchOutfits();
  }, []);

  const handleDeleteOutfit = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/outfits/${id}`);
      setOutfits(outfits.filter(outfit => outfit._id !== id));
    } catch (error) {
      console.error("There was an error deleting the outfit", error);
    }
  }

  return (
    <Container maxW={"container.md"}>
      <VStack spacing={8}>

        <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
            Saved Outfits
        </Heading>

        {outfits.map((outfit, index) => (
          <Box key={index} p={4} shadow="md" borderWidth="1px" w="full">
            <Flex direction="row" align="center" justify="space-between">
              <Flex direction="column" align="center">
                <Image src={`http://localhost:4000/uploads/${outfit.top.image}`} alt="Top" maxH="200px" objectFit="contain" />
                <Text mt={2}>{outfit.top.brand} - {outfit.top.color} - {outfit.top.size}</Text>
              </Flex>
              <Flex direction="column" align="center">
                <Image src={`http://localhost:4000/uploads/${outfit.bottom.image}`} alt="Bottom" maxH="200px" objectFit="contain" />
                <Text mt={2}>{outfit.bottom.brand} - {outfit.bottom.color} - {outfit.bottom.size}</Text>
              </Flex>
              <Button colorScheme='red' onClick={() => handleDeleteOutfit(outfit._id)}>Delete</Button>
            </Flex>
          </Box>
        ))}

      </VStack>
    </Container>
  );
};

export default OutfitsPage;