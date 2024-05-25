import { Button, Card, Group, Title, Text, Pill } from "@mantine/core";
import { useRouter } from "next/router";
import Image from "next/image";

interface FeaturedCourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    icons: string[];
  };
}

export default function FeaturedCourseCard({
  course,
}: FeaturedCourseCardProps) {
  const router = useRouter();

  const handleCourseClick = (id: string) => {
    router.push(`/courses/${id}`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      h={300}
      bg="#6D30B7"
      withBorder
      className="flex flex-col justify-between rounded-lg shadow-md overflow-hidden"
    >
      <div className="flex justify-between w-full">
        <Pill>Rookie</Pill>
        <div className="flex space-x-2">
          {course.icons.map((icon, index) => (
            <Image key={index} src={icon} alt={`icon-${index}`} width={40} height={40} />
          ))}
        </div>
      </div>
      <div className=" mt-4">
        <div className="mb-4"><p className="text-2xl font-bold">
          {course.title}
        </p>
        <Text size="sm" color="dimmed" className="mb-4 text-gray-700">
          {course.description}
        </Text></div>
        
        <Button
          variant="filled"
          color="dark"
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
