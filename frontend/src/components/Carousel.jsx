import React, { useReducer, useEffect, useRef } from "react";
import "./Carousel.css";

function useTilt(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % event.totalSlides
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? event.totalSlides - 1 : state.slideIndex - 1
    };
  }
};

function Slide({ slide, offset, tech, demo, code }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <p className="slideDescription">{slide.description}</p>
          <div className="slideTech">
            {tech.map((t, i) => (
              <span key={i} className="tech-tag">{t}</span>
            ))}
          </div>
          <div className="slideLinks">
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className="demo-link">
                Demo
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener noreferrer" className="code-link">
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Carousel({ items = [] }) {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "NEXT", totalSlides: items.length });
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="slides carousel-slides">
      <button onClick={() => dispatch({ type: "PREV", totalSlides: items.length })}>‹</button>

      {[...items, ...items, ...items].map((slide, i) => {
        let offset = items.length + (state.slideIndex - i);
        return (
          <Slide 
            slide={slide} 
            offset={offset} 
            key={i}
            tech={slide.tech}
            demo={slide.demo}
            code={slide.code}
          />
        );
      })}
      <button onClick={() => dispatch({ type: "NEXT", totalSlides: items.length })}>›</button>
    </div>
  );
} 