import { Box, Button, Container, Heading, HStack, Input, useColorModeValue, VStack, Text } from '@chakra-ui/react';
import React from 'react';

const OutfitsPage = () => {
  return (
    <Container maxW={"container.md"}>
      <VStack spacing={8}>

        <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
          Outfits
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>

        </Box>

      </VStack>
    </Container>
  )
}

export default OutfitsPage
