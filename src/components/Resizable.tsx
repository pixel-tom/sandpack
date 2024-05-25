import React, { useState, useRef, MouseEvent } from 'react';

interface ResizableLayoutProps {
  leftWidth: number;
  setLeftWidth: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}

const ResizableLayout: React.FC<ResizableLayoutProps> = ({ leftWidth, setLeftWidth, children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      if (newWidth > 200 && newWidth < containerRect.width - 200) {
        setLeftWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen min-w-screen max-w-screen h-full w-full flex-row"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
      <div
        onMouseDown={handleMouseDown}
        className="w-2 bg-gray-600 cursor-col-resize"
        style={{ width: "10px", cursor: "col-resize" }}
      />
    </div>
  );
};

export default ResizableLayout;
