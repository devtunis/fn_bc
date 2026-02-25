import React, { useRef, useEffect } from "react";

export default function BigFire() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createParticles(x, y, count = 200) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          radius: Math.random() * 8 + 4,
          color: ["#ff0", "#f90", "#f00", "#ff6600"][Math.floor(Math.random() * 4)],
          speedX: (Math.random() - 0.5) * 10,
          speedY: (Math.random() - 0.5) * 10,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.01,
        });
      }
    }

    // initial explosion in center
    createParticles(canvas.width / 2, canvas.height / 2);

    function animate() {
        if(particles.length==0) return;
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2

        );
        ctx.fillStyle = `rgba(${parseInt(p.color.slice(1,3),16)},${parseInt(p.color.slice(3,5),16)},${parseInt(p.color.slice(5,7),16)},${p.alpha})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;

        if (p.alpha <= 0) particles.splice(i, 1);
      });
      console.log(particles)
      requestAnimationFrame(animate);
    }

    animate();

    // Add explosion on click
    canvas.addEventListener("click", (e) => {
      createParticles(e.clientX, e.clientY, 300);
    });

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return <canvas ref={canvasRef} />;
}
