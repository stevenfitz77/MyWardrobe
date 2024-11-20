import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { BsSun, BsMoonFill, BsPlusSquare, BsPlusSquareFill, BsUniversalAccess, BsHouse, BsHouseFill } from "react-icons/bs";
import React from 'react';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm: "row"
            }}
        >
            <Link to={"/"}>
                <Button>
                    <BsHouse fontSize={20} />
                </Button>
            </Link>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/clothing"}>
                    <Button>
                        <BsPlusSquare fontSize={20} />
                    </Button>
                </Link>
                <Link to={"/outfits"}>
                    <Button>
                        <BsUniversalAccess fontSize={20} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <BsMoonFill fontSize={20} /> : <BsSun fontSize={20} /> }
                </Button>
            </HStack>
        </Flex>
    </Container>
  );
};

export default Navbar;
