import { FC } from "react";
import { useRouter } from "next/router";
import { courses } from "@/data/courses";
import { Card, Title, Text, Button, Container, Grid } from "@mantine/core";

const Home: FC = () => {
  const router = useRouter();

  const handleCourseClick = (id: string) => {
    router.push(`/courses/${id}`);
  };

  return (
    <Container>
      <Title order={1} style={{ margin: "20px 0" }}>
        Solana Development Courses
      </Title>
      <Grid>
        {courses.map((course) => (
          <Grid.Col key={course.id} span={4}>
            <Card shadow="sm" padding="lg">
              <Title order={3}>{course.title}</Title>
              <Text>{course.description}</Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
                onClick={() => handleCourseClick(course.id)}
              >
                Start Course
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
