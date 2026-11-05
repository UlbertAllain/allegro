"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "../lib/scroll-morph-shaders";
import { getMorphProgress } from "../lib/get-morph-progress";

interface ScrollMorphImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * A single lazy-loaded WebGL surface for the Camping category.
 * The real Image remains the accessible, zero-JavaScript/reduced-motion fallback.
 */
export function ScrollMorphImage({ src, alt, width, height }: ScrollMorphImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;
    if (!window.WebGLRenderingContext || !window.IntersectionObserver) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let cancelled = false;
    let started = false;
    let destroyScene: (() => void) | undefined;

    const initialise = async () => {
      if (started || cancelled) return;
      started = true;
      let incompleteRenderer: import("three").WebGLRenderer | null = null;

      try {
        // Three.js is downloaded only as this particular section approaches view.
        const THREE = await import("three");
        if (cancelled) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        incompleteRenderer = renderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);

        const texture = await new Promise<import("three").Texture>((resolve, reject) => {
          new THREE.TextureLoader().load(src, resolve, undefined, reject);
        });
        if (cancelled) {
          texture.dispose();
          renderer.dispose();
          return;
        }

        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTexture: { value: texture },
            uProgress: { value: 0 },
            uFrameAspect: { value: 1 },
            uImageAspect: { value: width / height },
          },
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        const scene = new THREE.Scene();
        scene.add(mesh);
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        let currentProgress = 0;
        let targetProgress = 0;
        let frameId = 0;

        function draw() {
          frameId = 0;
          currentProgress += (targetProgress - currentProgress) * 0.24;
          if (Math.abs(targetProgress - currentProgress) < 0.001) {
            currentProgress = targetProgress;
          }
          material.uniforms.uProgress.value = currentProgress;
          renderer.render(scene, camera);
          if (currentProgress !== targetProgress) {
            frameId = requestAnimationFrame(draw);
          }
        }

        function scheduleDraw() {
          if (!frameId) frameId = requestAnimationFrame(draw);
        }

        function updateProgress() {
          targetProgress = getMorphProgress(frame.getBoundingClientRect().top, window.innerHeight);
          scheduleDraw();
        }

        function resize() {
          const bounds = frame.getBoundingClientRect();
          if (bounds.width <= 0 || bounds.height <= 0) return;
          renderer.setSize(bounds.width, bounds.height, false);
          material.uniforms.uFrameAspect.value = bounds.width / bounds.height;
          updateProgress();
        }

        const observer = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
        observer?.observe(frame);
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", resize, { passive: true });
        const onContextLost = (event: Event) => {
          event.preventDefault();
          setReady(false);
        };
        canvas.addEventListener("webglcontextlost", onContextLost);

        resize();
        // WebGL has rendered a first frame; reveal it in place of the static image.
        renderer.render(scene, camera);
        setReady(true);

        destroyScene = () => {
          observer?.disconnect();
          window.removeEventListener("scroll", updateProgress);
          window.removeEventListener("resize", resize);
          canvas.removeEventListener("webglcontextlost", onContextLost);
          if (frameId) cancelAnimationFrame(frameId);
          geometry.dispose();
          material.dispose();
          texture.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
        };
        incompleteRenderer = null;
      } catch {
        incompleteRenderer?.dispose();
        // Browser denied WebGL, failed to load a texture, or the module could not load.
        // Keep the static image instead of showing a blank card.
        setReady(false);
      }
    };

    const lazyObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        lazyObserver.disconnect();
        void initialise();
      },
      { rootMargin: "280px 0px" },
    );
    lazyObserver.observe(frame);

    return () => {
      cancelled = true;
      lazyObserver.disconnect();
      destroyScene?.();
    };
  }, [src, width, height]);

  return (
    <div className="scroll-morph-image" data-webgl-ready={ready ? "true" : "false"} ref={frameRef}>
      <Image
        className="scroll-morph-image__fallback"
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 700px) 100vw, 50vw"
      />
      <canvas className="scroll-morph-image__canvas" ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
