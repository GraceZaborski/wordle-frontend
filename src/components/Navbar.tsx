import { Container, Flex, Box, Heading, Spacer, HStack, Button, Stack, Select } from "@chakra-ui/react";
import { render } from "react-dom";
import { Link, useLocation } from "react-router-dom";

const dummyUsers = [
    { id: 1, username: "Harry" },
    { id: 2, username: "Kate" },
    { id: 3, username: "Meghan" },
]



function Navbar() {
    const location = useLocation();

    const handleUserClick = (username: string) => {
        console.log(username)
    }

    return (
        <Box p={5} border='1px' borderColor='gray.200'>
            <Flex>
                <HStack spacing='24px' justify={{ md: 'flex-end' }}>
                    <Heading size='4xl'>Wordle</Heading>
                    <Spacer />
                    <Box>
                        <Link
                            to="/"
                        //   className={
                        //     "link nav-link " +
                        //     `${location.pathname === "/" ? "active" : ""}`
                        //   }
                        //   data-cy="home-page-click"
                        >
                            Daily Puzzle
                        </Link>
                    </Box>

                    <Box>
                        <Link
                            to="scoreboard"
                        //   className={
                        //     "link nav-link " +
                        //     `${location.pathname === "/study-list" ? "active" : ""}`
                        //   }
                        //   data-cy="study-list-page-click"
                        >
                            Scoreboard
                        </Link>
                    </Box>
                </HStack>
                <Spacer />
                <HStack
                    // flex={{ base: 1, md: 0 }}
                    jutsify={{ md: 'flex-end' }}
                    direction={'row'}
                    spacing={6}>
                    {/* <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'#'}>
                        Sign In
                    </Button> */}
                    <Select placeholder='Sign in'
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'md'}
                        fontWeight={600}
                        color={'white'}
                        bg={'pink.400'}
                        href={'#'}
                        _hover={{
                            bg: 'pink.300',
                        }}
                        onChange={(e) => handleUserClick(e.target.value)}
                    >
                        {dummyUsers.map(dummyUser => (
                            <option
                                key={dummyUser.id}
                                value={dummyUser.username}
                            >{dummyUser.username}</option>
                        ))}
                    </Select>
                </HStack>
            </Flex>
        </Box >
    )
};

export default Navbar

