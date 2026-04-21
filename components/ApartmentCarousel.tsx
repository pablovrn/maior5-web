"use client";

import { useState, useEffect } from "react";
import ApartmentCard from "./ApartmentCard";

interface ApartmentCarouselProps {
  apartments: any[];
}

export default function ApartmentCarousel({ apartments }: ApartmentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Show 2 apartments at a time
  const itemsPerView = 2;
  const totalSlides = Math.ceil(apartments.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const startIndex = currentIndex * itemsPerView;
  const visibleApartments = apartments.slice(startIndex, startIndex + itemsPerView);

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "#4d9de0",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 10,
          boxShadow: "0 4px 12px rgba(77, 157, 224, 0.3)",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#3a8bc7";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#4d9de0";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "#4d9de0",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 10,
          boxShadow: "0 4px 12px rgba(77, 157, 224, 0.3)",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#3a8bc7";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#4d9de0";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        ›
      </button>

      {/* Carousel Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(0)`,
        }}
      >
        {visibleApartments.map((apt) => (
          <ApartmentCard key={apt.id} apt={apt} />
        ))}
      </div>

      {/* Dots Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "30px",
        }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              background: currentIndex === index ? "#4d9de0" : "#e0e0e0",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}