"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = images.indexOf(mainImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setMainImage(images[nextIndex]);
    },
    onSwipedRight: () => {
      const currentIndex = images.indexOf(mainImage);
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setMainImage(images[prevIndex]);
    },
    trackMouse: true,
  });

  return (
    <div className="flex flex-col gap-3 max-w-[500px]" id="gallery" dir="rtf">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <div {...handlers} className="relative">
            <Image
              src={mainImage}
              width={300}
              height={300}
              alt="product"
              className="w-96 h-96 rounded-lg shadow-xl object-cover relative cursor-pointer"
              onClick={() => openModal(mainImage)}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white w-full max-h-screen p-0">
          <DialogHeader className="hidden">
            <DialogTitle>Full image</DialogTitle>
          </DialogHeader>
          {modalImage && (
            <Image
              src={modalImage}
              alt="Full Image"
              width={600}
              height={700}
              className="rounded-lg w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
      <div className="flex gap-2 overflow-x-auto tailwind-scrollbar-hide custom-scrollbar max-w-96">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={200}
            width={200}
            alt={`product-${index}`}
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
              mainImage === image ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

