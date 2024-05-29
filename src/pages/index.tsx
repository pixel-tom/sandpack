import { FC } from "react";
import { courses } from "@/data/courses";
import { Grid, Text } from "@mantine/core";

import FeaturedCourseCard from "@/components/FeaturedCourseCard/FeaturedCourseCard";
import { Search } from "@/components/Search/Search";
import { HeaderMegaMenu } from "@/components/Header/Header";
import Link from "next/link";

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
      <Link href="/courses">
        Courses
      </Link>
    </div>
  );
};

export default Home;
