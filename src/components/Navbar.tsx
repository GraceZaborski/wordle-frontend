import { Container, Flex, Box, Heading, Spacer, HStack, Button, Stack, Select } from "@chakra-ui/react";
import { render } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { IUser } from ".././interfaces/IUser"

interface NavbarInterface {
    users: IUser[]
    setCurrentUser: (arg: number) => void
    setWordArray: (arg: string[]) => void
    currentUser: number
}

function Navbar({ users, setCurrentUser, setWordArray, currentUser }: NavbarInterface) {
    const location = useLocation();

    const handleUserClick = (user: string) => {
        setWordArray([])
        console.log('resetting word array')
        //rethink this
        for (let object of users) {
            if (object.username === user) {
                setCurrentUser(object.id)
            }
        }
        console.log("currentUser in Navbar" + currentUser)
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
                        >
                            Daily Puzzle
                        </Link>
                    </Box>

                    <Box>
                        <Link
                            to="scoreboard"
                        >
                            Scoreboard
                        </Link>
                    </Box>
                </HStack>
                <Spacer />
                <HStack
                    jutsify={{ md: 'flex-end' }}
                    direction={'row'}
                    spacing={6}>
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
                        {users.map(user => (
                            <option
                                key={user.id}
                                value={user.username}
                            >{user.username}</option>
                        ))}
                    </Select>
                </HStack>
            </Flex>
        </Box >
    )
};

export default Navbar

