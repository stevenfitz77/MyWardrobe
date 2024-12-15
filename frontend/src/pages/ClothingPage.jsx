import { Box, Button, Container, Heading, HStack, Input, useColorModeValue, VStack, Text, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ClothingPage = () => {

    const [itemType, setItemType] = useState("Top"); // Top or bottom

    const [newClothingItem, setNewClothingItem] = useState({
        brand: "",
        color: "",
        size: "",
        image: "",
        type: "Top"
    });

    const [tops, setTops] = useState([]);
    const [bottoms, setBottoms] = useState([]);


    useEffect(() => {
        const fetchClothingItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/clothingItems');
                const clothingItems = response.data.data;
                setTops(clothingItems.filter(item => item.type === "Top"));
                setBottoms(clothingItems.filter(item => item.type === "Bottom"));
            } catch (error) {
                console.error("There was an error fetching the clothing items: ", error);
            }
        };

        fetchClothingItems();
    }, []);


    const handleAddClothingItem = async () => {

        const formData = new FormData();
        formData.append("brand", newClothingItem.brand);
        formData.append("color", newClothingItem.color);
        formData.append("size", newClothingItem.size);
        formData.append("image", newClothingItem.image);
        formData.append("type", itemType);

        try {
            const response = await axios.post('http://localhost:4000/api/clothingItems', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const savedItem = response.data.data;
            if (itemType === "Top") {
                setTops([...tops, savedItem]);
            } else {
                setBottoms([...bottoms, savedItem]);
            }
            setNewClothingItem({ brand: "", color: "", size: "", image: "", type: itemType }); //clear
        } catch (error) {
            console.error("There was an error saving the clothing item: ", error);
        }
    };

    const handleImageChange = (e) => {
        setNewClothingItem({ ...newClothingItem, image: e.target.files[0] });
    };

    const handleDeleteClothingItem = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/clothingItems/${id}`);
            if (itemType === "Top") {
                setTops(tops.filter(item => item._id !== id));
            } else {
                setBottoms(bottoms.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error("There was an error deleting the clothing item: ", error);
        }
    };



    const renderClothingItems = () => {
        const items = itemType === "Top" ? tops : bottoms;
        return items.map((item, index) => (
            <Box key={index} p={4} shadow="md" borderWidth="1px" w="full">
                <Text>Brand: {item.brand}</Text>
                <Text>Color: {item.color}</Text>
                <Text>Size: {item.size}</Text>
                <Image src={`http://localhost:4000/uploads/${item.image}`} alt="Clothing Item" boxSize="100px" objectFit="contain" />
                <Button colorScheme='red' onClick={() => handleDeleteClothingItem(item._id)}>Delete</Button>
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
                        type="file"
                        name="image"
                        onChange={handleImageChange}
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
  );
};

export default ClothingPage
