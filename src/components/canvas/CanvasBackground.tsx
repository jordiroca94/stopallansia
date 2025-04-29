"use client";

import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Create particles for the animation
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      type: "note" | "leaf";
      rotation: number;
      rotationSpeed: number;
      opacity: number;

      constructor(type: "note" | "leaf") {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.type = type;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset position when out of bounds
        if (!canvas) return;

        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === "note") {
          this.drawMusicNote();
        } else {
          this.drawLeaf();
        }

        ctx.restore();
      }

      drawMusicNote() {
        if (!ctx) return;

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

        // Draw note head
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw note stem
        ctx.fillRect(this.size - 1, -this.size, 1, -this.size * 3);
      }

      drawLeaf() {
        if (!ctx) return;

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

        // Draw a simple leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2);
        ctx.bezierCurveTo(
          this.size * 2,
          -this.size,
          this.size * 2,
          this.size,
          0,
          this.size * 2
        );
        ctx.bezierCurveTo(
          -this.size * 2,
          this.size,
          -this.size * 2,
          -this.size,
          0,
          -this.size * 2
        );
        ctx.fill();

        // Draw leaf vein
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2);
        ctx.lineTo(0, this.size * 2);
        ctx.stroke();
      }
    }

    // Create array of particles
    const particles: Particle[] = [];
    const particleCount = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 10000)
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(Math.random() > 0.5 ? "note" : "leaf"));
    }

    // Create flowing wave effect
    class Wave {
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;
      phase: number;

      constructor(
        amplitude: number,
        frequency: number,
        speed: number,
        color: string
      ) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.color = color;
        this.phase = 0;
      }

      update() {
        this.phase += this.speed;
        if (this.phase > Math.PI * 2) {
          this.phase = 0;
        }
      }

      draw() {
        if (!ctx || !canvas) return;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
          const y =
            Math.sin(x * this.frequency + this.phase) * this.amplitude +
            canvas.height / 2;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Create waves
    const waves = [
      new Wave(50, 0.01, 0.02, "rgba(255, 255, 255, 0.1)"),
      new Wave(30, 0.02, 0.01, "rgba(255, 255, 255, 0.05)"),
      new Wave(20, 0.03, 0.03, "rgba(255, 255, 255, 0.03)"),
    ];

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(45, 17, 43, 0.2)"; // #2d112b with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw waves
      waves.forEach((wave) => {
        wave.update();
        wave.draw();
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 h-full w-full bg-black"
    />
  );
}
