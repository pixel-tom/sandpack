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
  useMantineColorScheme,
} from "@mantine/core";
import { IconBook, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { courses } from "@/data/courses";
import { courseContent } from "@/lessons/intro-to-transactions/courseContent";
import { file } from "@/lessons/intro-to-transactions/files";

const CoursePage: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const sandpackTheme = colorScheme === 'dark' ? 'dark' : 'light';
  
  const [leftWidth, setLeftWidth] = useState<number>(500);
  const [previewHeight, setPreviewHeight] = useState<number>(80);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVerticalDragging, setIsVerticalDragging] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
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
      const newHeight =
        ((e.clientY - containerRect.top) / containerRect.height) * 100;
      if (newHeight > 20 && newHeight < 80) {
        setPreviewHeight(newHeight);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsVerticalDragging(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setLeftWidth(isCollapsed ? 500 : 90);
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div id="content" className="flex w-full">
        <div
          className={`relative bg-[#1b1b1b] transition-all duration-300 ${
            isCollapsed ? 'slide-out' : 'slide-in'
          }`}
          style={{
            width: leftWidth,
            minWidth: '90px',
          }}
        >
          <div className="flex justify-between">
            <Button
              onClick={toggleCollapse}
              style={{
                marginTop: 10,
                marginLeft: "auto",
                zIndex: 10,
                backgroundColor: "transparent",
                border: "none",
              }}
              className="ml-auto"
            >
              {isCollapsed ? (
                <IconChevronRight size={24} />
              ) : (
                <IconChevronLeft size={24} />
              )}
            </Button>
          </div>
          <ScrollArea px="xl" pb={20} className="scroll-area ">
            {!isCollapsed && (
              <>
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
              </>
            )}
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
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  {isCollapsed ? (
                    <span>{index + 1}</span>
                  ) : (
                    <span>{lesson.title}</span>
                  )}
                </List.Item>
              ))}
            </List>
            {!isCollapsed && (
              <div className="flex gap-5 mt-5">
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
              </div>
            )}
          </ScrollArea>
        </div>
        <div className="w-2 bg-[#222222]" style={{ width: "10px", height: "100%" }} />
        <div className="flex-1 h-full" style={{ maxWidth: "calc(100vw - 90px)", minWidth: "50vw" }}>
          <SandpackProvider
            
            files={{ "pages/index.js": file }}
            customSetup={{
              dependencies: {
                "@metaplex-foundation/js": "^0.17.12",
                "@project-serum/anchor": "^0.26.0",
                "@solana/web3.js": "^1.73.0",
                axios: "^1.2.2",
              },
            }}
            theme={sandpackTheme}
            template="nextjs"
            style={{ paddingRight: "10px" }}
          >
            <SandpackLayout>
              <SandpackCodeEditor
                showLineNumbers
                showTabs
                showInlineErrors
                showRunButton
                style={{ height: "calc(100vh - 60px)" }}
              />
              <div style={{ height: "calc(100vh - 60px)", width: "340px" }}>
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
      </div>
    </main>
  );
};

export default CoursePage;
