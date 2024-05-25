"use client";

import { useState, useRef, MouseEvent } from "react";
import { Inter } from "next/font/google";
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { ScrollArea, Text } from "@mantine/core";
import { indexFile } from "@/files/index";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState<number>(500);
  const [previewHeight, setPreviewHeight] = useState<number>(80);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVerticalDragging, setIsVerticalDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      className={`flex min-h-screen min-w-screen max-w-screen h-full w-full flex-row ${inter.className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ width: leftWidth, minWidth: "20vw" }}>
        <ScrollArea className="h-full bg-[#151515]">
          {/* Course content goes here */}
          <Text size="md">Course Content</Text>
          <Text>
            This is where the course content will be displayed. Add your course
            sections, lessons, or any other relevant information here.
          </Text>
          {/* Example course sections */}
          <ul>
            <li>Introduction</li>
            <li>Lesson 1: Getting Started</li>
            <li>Lesson 2: Setting Up</li>
            <li>Lesson 3: First Steps</li>
            <li>Conclusion</li>
          </ul>
        </ScrollArea>
      </div>
      <div
        onMouseDown={(e) => handleMouseDown(e, "horizontal")}
        className="w-2 bg-gray-600 cursor-col-resize"
        style={{ width: "10px", cursor: "col-resize" }}
      />
      <div className="flex-1 h-full" style={{ maxWidth: "80vw" }}>
        <SandpackProvider
          files={{
            "pages/index.js": indexFile,
          }}
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
              style={{ height: "100vh" }}
            />
            <div style={{ height: "100vh", width: '400px', display: 'flex', flexDirection: 'column' }}>
              <SandpackPreview
                showNavigator
                showRefreshButton
                style={{ height: `${previewHeight}vh`, width: "100%" }}
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, "vertical")}
                className="h-2 bg-gray-600 cursor-row-resize"
                style={{ height: "10px", cursor: "row-resize" }}
              />
              <SandpackConsole style={{ height: `${100 - previewHeight}vh`, width: "100%" }} />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </main>
  );
};

export default Home;
