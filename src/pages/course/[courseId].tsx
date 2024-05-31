import { useRouter } from "next/router";
import { useState, useRef, MouseEvent } from "react";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import {
  ScrollArea,
  ThemeIcon,
  List,
  Divider,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBook,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { courses } from "@/data/courses";
import { courseContent } from "@/lessons/intro-to-transactions/courseContent";
import { file } from "@/lessons/intro-to-transactions/files";
import { amethyst, atomDark, gruvboxDark, levelUp, monokaiPro, sandpackDark } from "@codesandbox/sandpack-themes";
import { HeaderMegaMenu } from "@/components/Header/Header";

const CoursePage: React.FC = () => {

  const [leftWidth, setLeftWidth] = useState<number>(500);
  const [previewHeight, setPreviewHeight] = useState<number>(80);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVerticalDragging, setIsVerticalDragging] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [highestStepVisited, setHighestStepVisited] =
    useState<number>(activeStep);
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

  const bannerStyle = {
    backgroundSize: "cover",
    backgroundPosition: "top",
    
    backgroundImage:
      'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(21, 22, 30)), url("/alchemy-banner.png")',
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`pt-[1px] ${bannerStyle}`}
      style={bannerStyle}
    >
      <div>
        <HeaderMegaMenu />
      </div>

      <div id="content" className="flex w-full">
        <div
          className={`relative bg-[#111] rounded-r-[4px] transition-all duration-300 border-t border-r border-b border-[#3e3d3d] ${
            isCollapsed ? "slide-out" : "slide-in"
          }`}
          style={{
            width: leftWidth,
            minWidth: "90px",
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
          <ScrollArea px="xl" className="scroll-area ">
            {!isCollapsed && (
              <>
                <p
                  className="text-xl font-bold text-indigo-50 mb-1"
                  
                  
                >
                  {course.title}
                </p>
                <p
                  className=" text-indigo-100 text-sm"
                  
                  style={{ marginBottom: "20px" }}
                >
                  Author: {course.author}
                </p>
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
        <div className="w-2 " style={{ width: "10px", height: "100%" }} />
        <div
          className="flex-1 mr-2"
          style={{ maxWidth: "calc(100vw - 90px)", minWidth: "50vw" }}
        >
          <Sandpack
            files={{ "pages/index.js": file }}
            customSetup={{
              dependencies: {
                "@metaplex-foundation/js": "^0.17.12",
                "@project-serum/anchor": "^0.26.0",
                "@solana/web3.js": "^1.73.0",
                axios: "^1.2.2",
              },
            }}
            options={{
              showTabs: true,
              showNavigator: true,
              showLineNumbers: true,
              showInlineErrors: true,
              showConsoleButton: true,
              editorHeight: 'calc(100vh - 80px)',
              editorWidthPercentage: 69,
            }}
            theme={{
              "colors": {
                "surface1": "#1a1b25",
                "surface2": "#3c3836",
                "surface3": "#3c3836",
                "clickable": "#f5f5f5",
                "base": "#f5f5f5",
                "disabled": "#928374",
                "hover": "#fe8019",
                "accent": "#d65d0e",
                "error": "#ff453a",
                "errorSurface": "#3c3836"
              },
              "syntax": {
                "plain": "#f5f5f5",
                "comment": {
                  "color": "#928374",
                  "fontStyle": "italic"
                },
                "keyword": "#ff453a",
                "tag": "#83a598",
                "punctuation": "#f5f5f5",
                "definition": "#83a598",
                "property": "#fabd2f",
                "static": "#f5f5f5",
                "string": "#b8bb26"
              },
              "font": {
                "body": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
                "mono": "\"Fira Mono\", \"DejaVu Sans Mono\", Menlo, Consolas, \"Liberation Mono\", Monaco, \"Lucida Console\", monospace",
                "size": "13px",
                "lineHeight": "20px"
              }
            }}
            template="nextjs"
            
          />
            
          
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
