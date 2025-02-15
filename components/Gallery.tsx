"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ZoomIn, ZoomOut } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [mainSlider, setMainSlider] = useState<Slider | null>(null);
  const [thumbnailSlider, setThumbnailSlider] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleZoom = (e: MouseEvent) => {
      if (zoomRef.current && isZoomed) {
        const { left, top, width, height } =
          zoomRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        zoomRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      }
    };

    document.addEventListener("mousemove", handleZoom);
    return () => document.removeEventListener("mousemove", handleZoom);
  }, [isZoomed]);

  const mainSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    rtl: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0px",
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto px-2">
      <div className="relative mb-4">
        <Slider
          {...mainSettings}
          asNavFor={thumbnailSlider || undefined}
          ref={(slider) => setMainSlider(slider)}
        >
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </Slider>
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="absolute bottom-3 left-2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              onClick={() => setModalImage(images[currentSlide])}
            >
              <ZoomIn className="w-6 h-6 text-gray-800" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full h-full flex items-center justify-center bg-white bg-opacity-90">
            <div
              ref={zoomRef}
              className={`relative w-full h-full transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
            >
              {modalImage && (
                <Image
                  src={modalImage || "/placeholder.svg"}
                  alt="Full size product image"
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
            <button
              className="absolute top-4 left-4 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {isZoomed ? (
                <ZoomOut className="w-6 h-6 text-gray-800" />
              ) : (
                <ZoomIn className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        <Slider
          {...thumbnailSettings}
          asNavFor={mainSlider || undefined}
          ref={(slider) => setThumbnailSlider(slider)}
          beforeChange={(current, next) => {
            if (mainSlider) {
              mainSlider.slickGoTo(next);
            }
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="px-1">
              <div className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg cursor-pointer"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
