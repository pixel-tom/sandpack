import { Button, Card, Group, Title, Text, Pill } from "@mantine/core";
import { useRouter } from "next/router";
import Image from "next/image";

interface FeaturedCourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    icons: string[];
    bgColor: string;
    bgImage: string;
  };
}

export default function FeaturedCourseCard({
  course,
}: FeaturedCourseCardProps) {
  const router = useRouter();

  const handleCourseClick = (id: string) => {
    router.push(`/course/${id}`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      h={260}
      bg={course.bgColor}
      withBorder
      className="flex flex-col justify-between rounded-lg shadow-md overflow-hidden bg-no-repeat featured-course-card"
    >
      <div className="flex justify-between w-full">
        <Pill fw={600} size="md">Rookie</Pill>
        <div className="flex space-x-[-8px] ">
          {course.icons.map((icon, index) => (
            <Image key={index} src={icon} alt={`icon-${index}`} width={45} height={45} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-4">
          <p className="text-2xl font-bold mb-2 text-[#000]">
            {course.title}
          </p>
          <p  color="dimmed" className="mb-4 text-[#111]">
            {course.description}
          </p>
        </div>
        <Button
          variant="filled"
          color="dark"
          c={'lightGray'}
          w={200}
          className="text-white hover:bg-blue-600"
          onClick={() => handleCourseClick(course.id)}
        >
          Start Course
        </Button>
      </div>
    </Card>
  );
}
