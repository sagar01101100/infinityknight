'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserDashboard({ params }: { params: { username: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session.user?.name !== params.username) {
      router.push('/'); // Redirect if the user is not authorized
    }
  }, [status, session, params.username, router]);

  if (status === 'loading') {
    return <Text>Loading...</Text>; // Show loading state
  }

  if (!session) {
    router.push('/'); // Redirect to login if not authenticated
    return null; // Prevent rendering
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Heading fontSize={'4xl'}>Welcome to Your Dashboard</Heading>
          <Text fontSize={'lg'} mt={4}>
            Hello, {session.user?.name || 'User'}!
          </Text>
          <Text mt={4}>
            You are logged in as: {session.user?.email}
          </Text>
          <Stack spacing={4} mt={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}
              onClick={() => {/* Add functionality for other actions */}}
            >
              View Profile
            </Button>
            <Button
              bg={'red.400'}
              color={'white'}
              _hover={{ bg: 'red.500' }}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
