import { FC } from "react";
import { courses } from "@/data/courses";
import { Grid, Text } from "@mantine/core";

import FeaturedCourseCard from "@/components/FeaturedCourseCard/FeaturedCourseCard";

const Home: FC = () => {
  return (
    <div className="p-6 mx-auto max-w-6xl mt-4">
      <Text size={"xl"} pl={20} fw={600} className="text-left mb-4">
        Featured Courses
      </Text>

      <Grid gutter="lg" py={20}>
        {courses.map((course) => (
          <Grid.Col key={course.id} span={6}>
            <FeaturedCourseCard
              course={{
                id: course.id,
                title: course.title,
                description: course.description,
                icons: course.icons,
                bgColor: course.bgColor,
                bgImage: course.bgImage
              }}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
