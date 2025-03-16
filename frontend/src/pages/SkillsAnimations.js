/**
 * Advanced animations for Skills component
 * Import this in your Skills component to enable extra animations
 */

export const initSkillsAnimations = () => {
    // Add particles effect
    createParticles();
    
    // Add glowing trail effect on mouse move
    addMouseTrail();
    
    // Add 3D perspective effect on skills section
    add3DPerspective();
    
    // Add scroll trigger animations
    addScrollTriggers();
  };
  
  /**
   * Creates floating particles in the skills section
   */
  const createParticles = () => {
    const particlesContainer = document.querySelector('.skills__particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'skills__particle';
      
      // Random properties
      const size = Math.random() * 3 + 1; // 1-4px
      const duration = Math.random() * 20 + 10; // 10-30s
      const delay = Math.random() * 10;
      const initialLeft = Math.random() * 100; // 0-100%
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${initialLeft}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
      
      particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
      .skills__particle {
        position: absolute;
        background: white;
        border-radius: 50%;
        bottom: -10px;
        pointer-events: none;
        animation: particleFloat linear infinite;
      }
      
      @keyframes particleFloat {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: var(--opacity);
        }
        90% {
          opacity: var(--opacity);
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
};

/**
 * Creates a glowing mouse trail effect
 */
const addMouseTrail = () => {
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection) return;
  
  // Create trail container if it doesn't exist
  let trailContainer = document.querySelector('.mouse-trail-container');
  if (!trailContainer) {
    trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail-container';
    trailContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    skillsSection.appendChild(trailContainer);
  }
  
  let dots = [];
  const maxDots = 20;
  
  // Mouse move handler
  skillsSection.addEventListener('mousemove', (e) => {
    const rect = skillsSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new dot
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.cssText = `
      position: absolute;
      background: radial-gradient(circle at center, rgba(var(--color-accent-rgb), 0.8), rgba(var(--color-accent-rgb), 0));
      width: 15px;
      height: 15px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      opacity: 0.8;
      transition: all 0.7s ease-out;
    `;
    
    trailContainer.appendChild(dot);
    dots.push(dot);
    
    // Fade out and remove
    setTimeout(() => {
      dot.style.width = '50px';
      dot.style.height = '50px';
      dot.style.opacity = '0';
      
      setTimeout(() => {
        dot.remove();
        dots = dots.filter(d => d !== dot);
      }, 700);
    }, 10);
    
    // Limit number of dots
    if (dots.length > maxDots) {
      dots[0].remove();
      dots.shift();
    }
  });
};

/**
 * Adds 3D perspective effect to the skills section
 */
const add3DPerspective = () => {
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection) return;
  
  skillsSection.addEventListener('mousemove', (e) => {
    const rect = skillsSection.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate the distance from center as a percentage
    const moveX = (mouseX - centerX) / 20;
    const moveY = (mouseY - centerY) / 20;
    
    // Apply 3D transform to categories
    document.querySelectorAll('.skills__category').forEach((category) => {
      const depth = Math.random() * 0.5 + 0.8; // Random depth between 0.8 and 1.3
      category.style.transform = `perspective(1000px) translateZ(0px) rotateX(${-moveY * depth}deg) rotateY(${moveX * depth}deg)`;
    });
  });
  
  // Reset on mouse leave
  skillsSection.addEventListener('mouseleave', () => {
    document.querySelectorAll('.skills__category').forEach((category) => {
      category.style.transform = 'perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg)';
    });
  });
};

/**
 * Adds scroll-triggered animations
 */
const addScrollTriggers = () => {
  // Add progress bar animation when cards come into view
  const progressBars = document.querySelectorAll('.skills__progress-fill');
  const cards = document.querySelectorAll('.skills__card');
  
  const options = {
    threshold: 0.3,
    rootMargin: "0px 0px -10% 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector('.skills__progress-fill');
        if (progressFill) {
          // Get the width from data attribute or CSS variable
          const card = entry.target;
          const skill = card.getAttribute('data-skill');
          progressFill.style.width = getProgressWidth(skill);
        }
        
        // Add entry animation class
        entry.target.classList.add('card-in-view');
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  cards.forEach(card => {
    observer.observe(card);
  });
  
  // Add counter animation to show skill percentages
  addCounterAnimation();
};

/**
 * Gets the appropriate progress width for each skill
 */
const getProgressWidth = (skill) => {
  const skillLevels = {
    'javascript': '90%',
    'react': '85%',
    'html': '95%',
    'css': '92%',
    'django': '80%',
    'node.js': '83%',
    'python': '88%',
    'flask': '75%',
    'sqlite': '82%',
    'mysql': '78%',
    'mongodb': '80%'
  };
  
  return skillLevels[skill.toLowerCase()] || '80%';
};

/**
 * Adds counter animation to show skill percentages
 */
const addCounterAnimation = () => {
  const cards = document.querySelectorAll('.skills__card');
  
  cards.forEach(card => {
    const skill = card.getAttribute('data-skill');
    const percentage = parseInt(getProgressWidth(skill));
    
    if (!percentage) return;
    
    // Create percentage counter element
    const counter = document.createElement('span');
    counter.className = 'skills__percentage';
    counter.textContent = '0%';
    counter.style.cssText = `
      position: absolute;
      right: 12px;
      bottom: 12px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
      transition: color 0.3s ease;
    `;
    
    card.appendChild(counter);
    
    // Animate counter when card comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(counter, 0, percentage);
          observer.unobserve(card);
          
          // Change counter color on hover
          card.addEventListener('mouseenter', () => {
            counter.style.color = 'var(--color-accent)';
          });
          
          card.addEventListener('mouseleave', () => {
            counter.style.color = 'rgba(255, 255, 255, 0.7)';
          });
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(card);
  });
};

/**
 * Animates a counter from start to end
 */
const animateCounter = (element, start, end) => {
  let current = start;
  const increment = end > start ? 1 : -1;
  const duration = 1500; // ms
  const steps = Math.abs(end - start);
  const stepTime = Math.abs(Math.floor(duration / steps));
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = `${current}%`;
    
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.textContent = `${end}%`;
      clearInterval(timer);
    }
  }, stepTime);
};

export default {
  initSkillsAnimations
};