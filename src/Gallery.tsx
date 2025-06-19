import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type GalleryProps = {
  images: Array<{
    src: string;
    alt: string;
  }>;
};

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images.length) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // centerMode: true,
    // centerPadding: "20px",
    // adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ padding: "0 5px" }}>
            <img
              src={`./images/${image.src}`}
              alt={image.alt}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                cursor: "pointer",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
              onClick={() => setSelectedImage(index)}
            />
          </div>
        ))}
      </Slider>

      {selectedImage !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={`./images/${images[selectedImage].src}`}
            alt={images[selectedImage].alt}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
}
