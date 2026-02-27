"use client";

import { allCocktails } from "../../constants/index.js";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  // GSAP অ্যানিমেশন সেটআপ
  useGSAP(() => {
    // আগের কোনো অ্যানিমেশন চালু থাকলে তা বন্ধ করার জন্য kill ব্যবহার করা ভালো
    gsap.killTweensOf([
      ".title-anim",
      ".cocktail img",
      ".details h2",
      ".details p",
    ]);

    // টাইটেল অ্যানিমেশন
    gsap.fromTo(
      ".title-anim",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    );

    // ইমেজ স্লাইড অ্যানিমেশন
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -50 },
      { xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" },
    );

    // ডিটেইলস (h2 এবং p) অ্যানিমেশন - opacity: 1 ব্যবহার করা হয়েছে
    gsap.fromTo(
      ".details h2, .details p",
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power1.out",
      },
    );
  }, [currentIndex]); // currentIndex পরিবর্তন হলেই অ্যানিমেশন চলবে

  const totalCocktails = allCocktails.length;

  // স্লাইড পরিবর্তনের ফাংশন
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  // ইন্ডেক্স অনুযায়ী ককটেল ডেটা পাওয়ার ফাংশন
  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      {/* ককটেল ট্যাব বা নেভিগেশন */}
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50"}`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        {/* অ্যারো বাটনসমূহ */}
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="previous"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-right"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="next" aria-hidden="true" />
          </button>
        </div>

        {/* বর্তমান ককটেল ইমেজ */}
        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="object-contain"
          />
        </div>

        {/* রেসিপি এবং ডিটেইলস অংশ */}
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p className="title-anim">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
