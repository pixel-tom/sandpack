import React from 'react';
import { ScrollArea, Text } from "@mantine/core";

const CourseContent: React.FC = () => {
  return (
    <ScrollArea className="h-full">
      <Text>Course Content</Text>
      <Text>
        This is where the course content will be displayed. Add your course
        sections, lessons, or any other relevant information here.
      </Text>
      <ul>
        <li>Introduction</li>
        <li>Lesson 1: Getting Started</li>
        <li>Lesson 2: Setting Up</li>
        <li>Lesson 3: First Steps</li>
        <li>Conclusion</li>
      </ul>
    </ScrollArea>
  );
};

export default CourseContent;
