import { FC } from "react";
import { courses } from "@/data/courses";
import { Grid, Text } from "@mantine/core";

import FeaturedCourseCard from "@/components/FeaturedCourseCard/FeaturedCourseCard";
import { Search } from "@/components/Search/Search";
import { HeaderMegaMenu } from "@/components/Header/Header";

const bannerStyle = {
  backgroundSize: "cover",
  backgroundPosition: "top",
  paddingTop: "1px ",
  paddingBottom: "60px ",
  backgroundImage:
    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(26,27,37)), url("/alchemy-banner.png")',
};

const Home: FC = () => {
  return (
    <div>
      <div style={bannerStyle} className="lg:px-20">
        <HeaderMegaMenu />
      </div>

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
                  bgImage: course.bgImage,
                }}
              />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
