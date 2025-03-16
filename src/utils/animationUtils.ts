
export const setupScrollAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.hidden-initially');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });

  return () => {
    elementsToAnimate.forEach(element => {
      observer.unobserve(element);
    });
  };
};

export const setupParallaxEffect = () => {
  const handleMouseMove = (e: MouseEvent) => {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    parallaxElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      const speed = index * 0.01;
      
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      
      htmlElement.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  document.addEventListener('mousemove', handleMouseMove);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
};

export const createFairyDust = (container: HTMLElement) => {
  const createDust = () => {
    const dust = document.createElement('div');
    dust.classList.add('fairy-dust');
    
    // Random position within the container
    const x = Math.random() * container.offsetWidth;
    const y = Math.random() * container.offsetHeight;
    
    dust.style.left = `${x}px`;
    dust.style.top = `${y}px`;
    
    container.appendChild(dust);
    
    // Remove dust after animation completes
    setTimeout(() => {
      dust.remove();
    }, 4000);
  };
  
  // Create dust particles at interval
  const interval = setInterval(createDust, 500);
  
  return () => {
    clearInterval(interval);
    // Clean up any remaining dust particles
    const dustParticles = container.querySelectorAll('.fairy-dust');
    dustParticles.forEach(dust => dust.remove());
  };
};
