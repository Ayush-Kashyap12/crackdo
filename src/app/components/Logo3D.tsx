"use client";

import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useState, useRef, MouseEvent } from "react";

interface Logo3DProps {
  size?: "sm" | "md" | "hero";
  showSubtext?: boolean;
}

export default function Logo3D({ size = "md", showSubtext = true }: Logo3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x pos within element
    const y = e.clientY - rect.top;  // y pos within element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-15deg to 15deg)
    const rotateX = ((centerY - y) / centerY) * 16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(45px) scale(1.08)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)");
  };

  // Dimensions based on size
  const logoWidth = size === "hero" ? { base: "320px", md: "520px", lg: "640px" } : size === "md" ? "240px" : "160px";
  const logoHeight = size === "hero" ? { base: "140px", md: "240px", lg: "280px" } : size === "md" ? "90px" : "60px";

  return (
    <Box
      className="logo-3d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      display="inline-block"
      py={size === "hero" ? 4 : 1}
      px={size === "hero" ? 4 : 1}
    >
      <Box
        ref={cardRef}
        className="logo-3d-card neon-logo-glow"
        style={{
          transform: isHovered
            ? transformStyle
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-in-out, filter 0.4s ease",
        }}
        position="relative"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow={
          isHovered
            ? "0 25px 45px rgba(0, 242, 254, 0.45), 0 0 35px rgba(178, 36, 239, 0.4)"
            : "0 10px 20px rgba(0,0,0,0.5)"
        }
        border="1px solid"
        borderColor={isHovered ? "rgba(0, 242, 254, 0.6)" : "rgba(255, 255, 255, 0.15)"}
      >
        <Image
          src="/crackdo-logo.jpg"
          alt="CRACKDO AUCTION WEBSITE"
          w={logoWidth}
          h={logoHeight}
          objectFit="cover"
          borderRadius="2xl"
        />

        {/* Dynamic Light Sheen overlay on hover */}
        {isHovered && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)"
            pointerEvents="none"
            borderRadius="2xl"
          />
        )}
      </Box>
    </Box>
  );
}
