import React, { ReactNode } from "react";
import CanvasBackground from "./CanvasBackground";
import Footer from "../Footer";

interface CanvasWrapperProps {
  children: ReactNode;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="relative min-h-screen overflow-hidden">
        <CanvasBackground />
        <div className="relative z-10">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CanvasWrapper;
