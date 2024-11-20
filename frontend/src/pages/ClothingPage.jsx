import { Box, Button, Container, Heading, HStack, Input, useColorModeValue, VStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

const ClothingPage = () => {

    const [itemType, setItemType] = useState("Top"); // Top or bottom

    const [newClothingItem, setNewClothingItem] = useState({
        brand: "",
        color: "",
        size: "",
    });

    const [tops, setTops] = useState([]);
    const [bottoms, setBottoms] = useState([]);

    const handleAddClothingItem = () => {
        console.log(newClothingItem);
        if (itemType === "Top") {
            setTops([...tops, newClothingItem]);
        } else {
            setBottoms([...bottoms, newClothingItem]);
        }
        setNewClothingItem({ brand: "", color: "", size: "", image: "" }); //clear input
    };

    const renderClothingItems = () => {
        const items = itemType === "Top" ? tops : bottoms;
        return items.map((item, index) => (
            <Box key={index} p={4} shadow="md" borderWidth="1px" w="full">
                <Text>Brand: {item.brand}</Text>
                <Text>Color: {item.color}</Text>
                <Text>Size: {item.size}</Text>
                {/* display image */}
            </Box>
        ));
    };

  return (
    <Container maxW={"container.md"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
                Add new {itemType.toLowerCase()}
            </Heading>

            <HStack>
                <Button
                  colorScheme={itemType === "Top" ? "blue" : "gray"}
                  onClick={() => setItemType("Top")}
                >
                    Tops
                </Button>

                <Button
                  colorScheme={itemType === "Bottom" ? "blue" : "gray"}
                  onClick={() => setItemType("Bottom")}
                >
                    Bottoms
                </Button>
            </HStack>

            <Box
              w={"full"} bg={useColorModeValue("white", "gray.800")}
              p={6} rounded={"lg"} shadow={"md"}
            >
                <VStack spacing={4}>
                    <Input
                      placeholder="Brand"
                      name="brand"
                      value={newClothingItem.brand}
                      onChange={(e) => setNewClothingItem({ ...newClothingItem, brand: e.target.value})}
                    />

                    <Input
                      placeholder="Size"
                      name="size"
                      value={newClothingItem.size}
                      onChange={(e) => setNewClothingItem({ ...newClothingItem, size: e.target.value})}
                    />

                    <Input
                      placeholder="Color"
                      name="color"
                      value={newClothingItem.color}
                      onChange={(e) => setNewClothingItem({ ...newClothingItem, color: e.target.value})}
                    />

                    <Input
                      placeholder="Image"
                      name="image"
                      value={newClothingItem.image}
                      onChange={(e) => setNewClothingItem({ ...newClothingItem, image: e.target.value})}
                    />

                    <Button colorScheme='blue' onClick={handleAddClothingItem} w='full'>
                        Add {itemType.toLowerCase()}
                    </Button>

                    <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                        <Heading as={"h2"} size={"lg"} textAlign={"center"} mb={4}>
                            {itemType}s
                        </Heading>
                        <VStack spacing={4}>
                            {renderClothingItems()}
                        </VStack>
                    </Box>

                </VStack>
            </Box>
        </VStack>
    </Container>
  )
};

export default ClothingPage
