import { Text, Button, Container } from '@mantine/core';
import { useRouter } from 'next/router';

export function HeroText() {

  const router = useRouter();
  const handleCoursesClick = () => {
    router.push(`/courses`);
  };

  return (
    <Container>
      <div>
        <h1 className="text-6xl text-center font-extrabold tracking-tight text-black dark:text-white mb-3">
          Learn{' '}
          <p className="bg-gradient-to-r from-[#9945FF] to-[#14F195] inline-block text-transparent bg-clip-text">
            Solana
          </p>{' '}
          the fun way.
        </h1>
        <Container size={550}>
          <Text size="lg" c="dimmed" className="text-center">
            Learn how to develop on Solana by building interactive games to kickstart your Blockchain Development Journey.
          </Text>
        </Container>
        <div className="mt-4 flex gap-4 justify-center">
          <Button size="md" variant="default" color="orange">
            Learn More
          </Button>
          <Button onClick={handleCoursesClick} size="md" variant='filled' color='indigo'>
            View Courses
          </Button>
        </div>
      </div>
    </Container>
  );
}
