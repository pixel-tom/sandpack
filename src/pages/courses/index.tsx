import { FC } from "react";
import { courses } from "@/data/courses";
import FeaturedCourseCard from "@/components/FeaturedCourseCard/FeaturedCourseCard";
import { Search } from "@/components/Search/Search";
import { HeaderMegaMenu } from "@/components/Header/Header";

const bannerStyle = {
  backgroundSize: "cover",
  backgroundPosition: "top",
  paddingTop: "1px",
  paddingBottom: "30px",
  backgroundImage:
    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(21, 22, 30)), url("/alchemy-banner.png")',
};

const Courses: FC = () => {
  return (
    <div className="">
      <div style={bannerStyle} className="lg:px-20">
        <HeaderMegaMenu />
        <div className="h-16" />
        <div className="mb-10">
          <p className="text-center font-extrabold text-[2.75rem]">Explore Courses.</p>
        </div>
        <Search />
      </div>

      <div className="p-6 mx-auto max-w-6xl overflow-y-auto">
        <h2 className="text-lg pl-5 font-semibold text-gray-500 text-left">
          Featured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
          {courses.map((course) => (
            <div key={course.id}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
