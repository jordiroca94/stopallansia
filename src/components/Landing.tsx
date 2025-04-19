"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Menu,
  X,
  Music,
  Headphones,
  Calendar,
  MapPin,
} from "lucide-react";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle mouse movement for light effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle scroll for parallax effects
  // Canvas animation for light particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const colors = [
      "#ffcccc",
      "#ff9999",
      "#ff6666",
      "#ff3333",
      "#cc0000",
      "#990000",
      "#660000",
    ];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glow around mouse position
      const gradient = ctx.createRadialGradient(
        mousePosition.x,
        mousePosition.y,
        0,
        mousePosition.x,
        mousePosition.y,
        150
      );
      gradient.addColorStop(0, "rgba(255, 0, 0, 0.3)");
      gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.1)");
      gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1;
        }

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        particleGradient.addColorStop(0, particle.color);
        particleGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Canvas for particle animations */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      />

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-pink-500/15 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-20">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-500/20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-red-500 font-bold text-2xl flex items-center"
            >
              <Music className="mr-2" />
              <span className="tracking-wider">STOP ALL ANSIA</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#location">Location</NavLink>
              <NavLink href="#accommodation">Accommodation</NavLink>
              <NavLink href="#food">Food & Drink</NavLink>
            </nav>
          </div>
        </header>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/95 pt-20"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center space-y-6 p-8">
                <MobileNavLink
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </MobileNavLink>
                <MobileNavLink
                  href="#location"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Location
                </MobileNavLink>
                <MobileNavLink
                  href="#accommodation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accommodation
                </MobileNavLink>
                <MobileNavLink
                  href="#food"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Food & Drink
                </MobileNavLink>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="pt-20">
          {/* Hero section */}
          <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center z-10"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-6 tracking-tighter">
                STOP ALL ANSIA
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-8">
                A techno music festival where art, nature, and people unite
              </p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Link
                  href="#about"
                  className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                >
                  Discover
                </Link>
                <Link
                  href="https://instagram.com/stopallansiaofficial"
                  target="_blank"
                  className="px-8 py-3 bg-transparent border border-red-500 text-red-500 rounded-full hover:bg-red-500/10 transition-colors duration-300 flex items-center"
                >
                  <Instagram className="mr-2" size={18} />
                  Follow Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Animated elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </div>
            </motion.div>
          </section>

          {/* About section */}
          <section id="about" className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <SectionTitle>About the Festival</SectionTitle>

              <div className="grid md:grid-cols-2 gap-10 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-red-500 mb-4">
                    Una experiencia única
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Una oportunidad para abrazar, crecer y sumergirse plenamente
                    en el momento presente con un corazón y mente abiertos.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Este es un espacio donde el arte trasciende los límites,
                    cultivando un intercambio auténtico y duradero entre
                    diversas formas de expresión.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur-sm"></div>
                  <div className="relative bg-black p-6 rounded-lg border border-red-500/20">
                    <Headphones className="text-red-500 mb-4" size={32} />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Nuestra misión
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Stop all Ansia Festival es un retiro creativo que une
                      naturaleza, personas y arte en un viaje lejos de la
                      ansiedad cotidiana.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Features */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Music />}
                  title="Música Techno"
                  description="Los mejores DJs y productores de la escena techno internacional"
                />
                <FeatureCard
                  icon={<Calendar />}
                  title="Experiencia Inmersiva"
                  description="Tres días de música, arte y conexión con la naturaleza"
                />
                <FeatureCard
                  icon={<MapPin />}
                  title="Ubicación Única"
                  description="Un entorno natural espectacular lejos de la ciudad"
                />
              </div>
            </div>
          </section>

          {/* Location section */}
          <section id="location" className="py-20 px-4 relative">
            <div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ff0000' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="container mx-auto max-w-4xl relative z-10">
              <SectionTitle>Location</SectionTitle>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-12 bg-gradient-to-r from-black to-gray-900 p-8 rounded-lg border border-red-500/20"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-4">
                  Ubicación
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Lejos de las preocupaciones diarias, rodeado de naturaleza:
                  aquí es donde ocurre Stop all Ansia. Información por DM en
                  Instagram.
                </p>

                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto text-red-500 mb-2" size={32} />
                      <p className="text-white font-medium">
                        Ubicación secreta revelada al comprar tu entrada
                      </p>
                      <Link
                        href="https://instagram.com/stopallansiaofficial"
                        target="_blank"
                        className="inline-flex items-center mt-4 text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Instagram className="mr-1" size={16} />
                        Contáctanos para más información
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Accommodation section */}
          <section
            id="accommodation"
            className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
          >
            <div className="container mx-auto max-w-4xl">
              <SectionTitle>Accommodation</SectionTitle>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-12 p-8 rounded-lg border border-red-500/20 bg-black/50 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-4">
                  Alojamiento
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Para quedarte, trae tu propia tienda de campaña y acampa en el
                  área designada. Se proporcionan servicios básicos: hay baños
                  disponibles.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                    <h4 className="text-xl font-bold text-white mb-2">
                      Camping
                    </h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Trae tu propia tienda de campaña
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Áreas designadas para acampar
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Baños disponibles
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                    <h4 className="text-xl font-bold text-white mb-2">
                      Servicios
                    </h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Duchas comunitarias
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Áreas de descanso
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Puntos de carga para dispositivos
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Food & Drink section */}
          <section
            id="food"
            className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
          >
            <div className="container mx-auto max-w-4xl">
              <SectionTitle>Food & Drink</SectionTitle>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-12 p-8 rounded-lg border border-red-500/20 bg-black/50 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-4">
                  Comida y Bebida
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Para ayudarnos a organizar, puedes preordenar tus comidas al
                  reservar tu lugar en el evento (siempre puedes comprarlas en
                  el lugar). También puedes traer tu propia comida.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                    <h4 className="text-xl font-bold text-white mb-2">
                      Opciones de Comida
                    </h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Puestos de comida local
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Opciones vegetarianas y veganas
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Preordena al comprar tu entrada
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                    <h4 className="text-xl font-bold text-white mb-2">
                      Bebidas
                    </h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Barra de bebidas
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Cócteles especiales
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        Agua y refrescos disponibles
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA section */}
          <section className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-red-500 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="container mx-auto max-w-4xl text-center relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Únete a la <span className="text-red-500">experiencia</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                Escapa de la ansiedad cotidiana y sumérgete en un mundo de
                música, arte y conexión.
              </p>

              <Link
                href="https://instagram.com/stopallansiaofficial"
                target="_blank"
                className="px-10 py-4 bg-red-600 text-white rounded-full text-lg font-medium hover:bg-red-700 transition-colors duration-300 inline-flex items-center"
              >
                <Instagram className="mr-2" size={20} />
                Síguenos para más información
              </Link>
            </motion.div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-black border-t border-red-500/20 py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <Link
                  href="/"
                  className="text-red-500 font-bold text-xl flex items-center"
                >
                  <Music className="mr-2" />
                  <span>STOP ALL ANSIA</span>
                </Link>
                <p className="text-gray-400 mt-2">
                  Un retiro creativo de música techno
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <Link
                  href="https://instagram.com/stopallansiaofficial"
                  target="_blank"
                  className="text-white hover:text-red-500 transition-colors flex items-center"
                >
                  <Instagram className="mr-2" size={20} />
                  @stopallansiaofficial
                </Link>
                <p className="text-gray-400 mt-2">
                  © {new Date().getFullYear()} Stop All Ansia Festival
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Component for section titles with animation
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
        <span className="relative z-10 text-white">{children}</span>
        <motion.span
          className="absolute -bottom-2 left-0 w-full h-3 bg-red-500/30"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </h2>
    </motion.div>
  );
}

// Component for feature cards with animation
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-lg border border-red-500/20 transition-all duration-300 group-hover:border-red-500/50 group-hover:shadow-lg group-hover:shadow-red-500/10">
        <div className="text-red-500 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}

// Navigation link component
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-red-500 transition-colors duration-300 relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

// Mobile navigation link component
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-2xl text-white hover:text-red-500 transition-colors duration-300"
    >
      {children}
    </Link>
  );
}
