// pages/course/[courseId].tsx

import { useRouter } from "next/router";
import { useState, useRef, MouseEvent } from "react";
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import {
  ScrollArea,
  Title,
  ThemeIcon,
  List,
  Divider,
  Button,
  Center,
} from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
import { courses } from "@/data/courses";
import { courseContent } from "@/lessons/intro-to-transactions/courseContent"; // Adjust the import path as needed
import { file } from "@/lessons/intro-to-transactions/files";

const CoursePage: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState<number>(500);
  const [previewHeight, setPreviewHeight] = useState<number>(80);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVerticalDragging, setIsVerticalDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [highestStepVisited, setHighestStepVisited] = useState<number>(activeStep);
  const router = useRouter();
  const { courseId } = router.query;
  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > courseContent.length - 1 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActiveStep(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, type: string) => {
    if (type === "horizontal") {
      setIsDragging(true);
    } else if (type === "vertical") {
      setIsVerticalDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      if (newWidth > 200 && newWidth < containerRect.width - 200) {
        setLeftWidth(newWidth);
      }
    } else if (isVerticalDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newHeight = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      if (newHeight > 20 && newHeight < 80) {
        setPreviewHeight(newHeight);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsVerticalDragging(false);
  };

  return (
    <main
      ref={containerRef}
      className="flex min-w-screen max-w-screen w-full flex-row"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          width: leftWidth,
          minWidth: "20vw",
          backgroundColor: "#151515",
        }}
      >
        <ScrollArea
          py="lg"
          px="xl"
          style={{ height: "calc(100vh - 60px)" }}
          className="bg-[#151515]"
        >
          <Title
            className="text-orange-50"
            order={2}
            style={{ marginBottom: "20px" }}
          >
            {course.title}
          </Title>
          <div
            dangerouslySetInnerHTML={{
              __html: courseContent[activeStep].content,
            }}
          />
          <Divider style={{ marginBottom: "20px" }} />
          <List
            spacing="md"
            size="sm"
            icon={
              <ThemeIcon color="orange" size={24} radius="xl">
                <IconBook size={16} />
              </ThemeIcon>
            }
            style={{ color: "#ffffff" }}
          >
            {courseContent.map((lesson, index) => (
              <List.Item
                key={index}
                onClick={() => setActiveStep(index)}
                style={{
                  cursor: "pointer",
                  color: activeStep === index ? "#f5a623" : "#ffffff",
                }}
              >
                {lesson.title}
              </List.Item>
            ))}
          </List>
          <Center mt="md" className="flex gap-5">
            <Button
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={() => handleStepChange(activeStep + 1)}
              disabled={activeStep === courseContent.length - 1}
            >
              Next step
            </Button>
          </Center>
        </ScrollArea>
      </div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "horizontal")}
        className="w-2 bg-[#222222] cursor-col-resize"
        style={{
          width: "10px",
          cursor: "col-resize",
          height: "calc(100vh - 60px)",
        }}
      />
      <div
        className="flex-1 h-full"
        style={{ maxWidth: "80vw", minWidth: "50vw" }}
      >
        <SandpackProvider
          autoSave="false"
          autoCorrect="true"
          files={{ "pages/index.js": file }}
          customSetup={{
            dependencies: {
              "@metaplex-foundation/js": "^0.17.12",
              "@project-serum/anchor": "^0.26.0",
              "@solana/web3.js": "^1.73.0",
              axios: "^1.2.2",
            },
          }}
          theme={{
            colors: {
              surface1: "#151515",
              surface2: "#252525",
              surface3: "#2F2F2F",
              clickable: "#999999",
              base: "#808080",
              disabled: "#4D4D4D",
              hover: "#C5C5C5",
              accent: "#f5a623",
              error: "#ff453a",
              errorSurface: "#ffeceb",
            },
            syntax: {
              plain: "#FFFFFF",
              comment: {
                color: "#757575",
                fontStyle: "italic",
              },
              keyword: "#f5a623",
              tag: "#80b1eb",
              punctuation: "#ffffff",
              definition: "#fbdba7",
              property: "#f5a623",
              static: "#FF453A",
              string: "#4a90e2",
            },
            font: {
              body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
              size: "13px",
              lineHeight: "20px",
            },
          }}
          template="nextjs"
        >
          <SandpackLayout>
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              showInlineErrors
              showRunButton
              style={{ height: "calc(100vh - 60px)" }}
            />
            <div style={{ height: "calc(100vh - 60px)", width: "400px" }}>
              <SandpackPreview
                showNavigator
                showRefreshButton
                style={{ height: "70%", width: "100%" }}
              />
              <SandpackConsole style={{ height: "30%", width: "100%" }} />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </main>
  );
};

export default CoursePage;
