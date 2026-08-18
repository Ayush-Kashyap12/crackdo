"use client";

import React, { useEffect, useRef } from "react";

interface CrystalParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedY: number;
  speedX: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  opacity: number;
  scale: number;
}

export default function BlackMirrorCrystalBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Preload logo image to draw inside transparent crystals
    const logoImg = new Image();
    logoImg.src = "/crackdo-logo.jpg";

    // Generate falling crystals
    const crystalCount = 28;
    const crystals: CrystalParticle[] = Array.from({ length: crystalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      z: Math.random() * 0.8 + 0.2,
      size: Math.random() * 35 + 45, // Crystal jewel size 45px-80px
      speedY: Math.random() * 0.8 + 0.4, // Gentle top-to-bottom fall
      speedX: (Math.random() - 0.5) * 0.3,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.02,
      rotSpeedZ: (Math.random() - 0.5) * 0.01,
      opacity: Math.random() * 0.45 + 0.5,
      scale: Math.random() * 0.4 + 0.8,
    }));

    // Draw 3D Faceted Transparent Diamond Jewel with CRACKDO logo visible inside
    const drawDiamondCrystal = (
      cCtx: CanvasRenderingContext2D,
      c: CrystalParticle
    ) => {
      cCtx.save();
      cCtx.translate(c.x, c.y);
      cCtx.scale(c.scale * c.z, c.scale * c.z);
      cCtx.rotate(c.rotZ);

      const radius = c.size;

      // 1. Crystal Diamond Outer Shadow & Glow
      cCtx.shadowColor = "rgba(0, 242, 254, 0.4)";
      cCtx.shadowBlur = 15;

      // 2. Transparent Diamond Jewel Silhouette Path (Brilliant-cut / Octahedron diamond)
      cCtx.beginPath();
      cCtx.moveTo(0, -radius); // Top tip
      cCtx.lineTo(radius * 0.85, -radius * 0.35); // Upper right facet
      cCtx.lineTo(radius * 0.6, radius * 0.5); // Lower right facet
      cCtx.lineTo(0, radius); // Bottom tip
      cCtx.lineTo(-radius * 0.6, radius * 0.5); // Lower left facet
      cCtx.lineTo(-radius * 0.85, -radius * 0.35); // Upper left facet
      cCtx.closePath();

      // Glass Crystal Refractive Gradient Fill
      const glassGrad = cCtx.createLinearGradient(-radius, -radius, radius, radius);
      glassGrad.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      glassGrad.addColorStop(0.3, "rgba(0, 242, 254, 0.15)");
      glassGrad.addColorStop(0.7, "rgba(178, 36, 239, 0.15)");
      glassGrad.addColorStop(1, "rgba(255, 255, 255, 0.2)");
      cCtx.fillStyle = glassGrad;
      cCtx.fill();

      // 3. Draw "crackdo" visible INSIDE the transparent jewel
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        cCtx.save();
        cCtx.clip(); // Clip image inside diamond shape
        cCtx.globalAlpha = 0.85 * c.opacity;

        // Subtle 3D tilt effect on the interior logo
        cCtx.rotate(c.rotY * 0.3);
        const imgW = radius * 1.5;
        const imgH = radius * 0.75;
        cCtx.drawImage(logoImg, -imgW / 2, -imgH / 2, imgW, imgH);
        cCtx.restore();
      } else {
        // Fallback transparent glowing text "crackdo" inside
        cCtx.save();
        cCtx.clip();
        cCtx.font = `900 ${Math.floor(radius * 0.35)}px system-ui, sans-serif`;
        cCtx.textAlign = "center";
        cCtx.textBaseline = "middle";
        cCtx.fillStyle = "rgba(0, 242, 254, 0.9)";
        cCtx.fillText("crackdo", 0, 0);
        cCtx.restore();
      }

      // 4. Draw Diamond Facet Cut Lines (Refractive Glass Facets)
      cCtx.lineWidth = 1.5;
      cCtx.strokeStyle = "rgba(255, 255, 255, 0.6)";

      // Top crown facets
      cCtx.beginPath();
      cCtx.moveTo(0, -radius);
      cCtx.lineTo(0, radius * 0.2);
      cCtx.moveTo(-radius * 0.85, -radius * 0.35);
      cCtx.lineTo(radius * 0.85, -radius * 0.35);
      cCtx.stroke();

      // Side facets
      cCtx.strokeStyle = "rgba(0, 242, 254, 0.4)";
      cCtx.beginPath();
      cCtx.moveTo(-radius * 0.85, -radius * 0.35);
      cCtx.lineTo(0, radius);
      cCtx.moveTo(radius * 0.85, -radius * 0.35);
      cCtx.lineTo(0, radius);
      cCtx.stroke();

      // Top Glint Light Sparkle
      cCtx.beginPath();
      cCtx.arc(-radius * 0.3, -radius * 0.4, 2.5, 0, Math.PI * 2);
      cCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
      cCtx.fill();

      cCtx.restore();
    };

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Black Mirror Background Base Gradient
      const mirrorGrad = ctx.createLinearGradient(0, 0, 0, height);
      mirrorGrad.addColorStop(0, "#05070a");
      mirrorGrad.addColorStop(0.3, "#0a0e17");
      mirrorGrad.addColorStop(0.7, "#0e1320");
      mirrorGrad.addColorStop(1, "#040608");
      ctx.fillStyle = mirrorGrad;
      ctx.fillRect(0, 0, width, height);

      // Black Mirror Surface Reflection Beams
      const beamGrad = ctx.createLinearGradient(0, 0, width, height);
      beamGrad.addColorStop(0, "rgba(255, 255, 255, 0.02)");
      beamGrad.addColorStop(0.5, "rgba(0, 242, 254, 0.03)");
      beamGrad.addColorStop(1, "rgba(178, 36, 239, 0.02)");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, width, height);

      // Render and update each 3D falling crystal
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];

        // Update positions (top to bottom fall)
        c.y += c.speedY;
        c.x += c.speedX;
        c.rotX += c.rotSpeedX;
        c.rotY += c.rotSpeedY;
        c.rotZ += c.rotSpeedZ;

        // Reset when falling past bottom of screen
        if (c.y > height + c.size * 2) {
          c.y = -c.size * 2;
          c.x = Math.random() * width;
        }

        drawDiamondCrystal(ctx, c);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
