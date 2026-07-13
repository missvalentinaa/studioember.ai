"use client";

import { useEffect, useRef } from "react";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";
import { clsx } from "@/lib/clsx";

export const FRAME_COUNT = 121;
const IMAGE_ASPECT = 1920 / 1080;
const frameSrc = (i: number) => `/hero/frame-${String(i + 1).padStart(3, "0")}.webp`;

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Samples a `cover`-fit crop of whichever of the two nearest frames is active,
// then blends them by uMix — the crossfade happens on the GPU instead of two
// CPU-composited draws, so scrubbing stays cheap at any frame rate.
const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform float uMix;
  uniform float uPlaneAspect;
  uniform float uImageAspect;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    float scaleX = 1.0;
    float scaleY = 1.0;
    if (uImageAspect > uPlaneAspect) {
      scaleX = uPlaneAspect / uImageAspect;
    } else {
      scaleY = uImageAspect / uPlaneAspect;
    }
    return (uv - 0.5) * vec2(scaleX, scaleY) + 0.5;
  }

  void main() {
    vec2 st = coverUv(vUv);
    vec4 a = texture2D(uTexA, st);
    vec4 b = texture2D(uTexB, st);
    gl_FragColor = mix(a, b, uMix);
  }
`;

/**
 * WebGL scrubber for the hero prism sequence, built on three.js.
 *
 * Preloads every frame as a texture and renders the scroll-mapped frame onto
 * a fullscreen quad, crossfading the two nearest frames by the fractional
 * part of `frame` in a fragment shader so the sequence reads as fluid motion.
 * Only re-renders when `frame` actually changes (batched to one rAF).
 * `frame` is a continuous MotionValue in [0, FRAME_COUNT - 1].
 */
export function HeroFrames({
  frame,
  className,
}: {
  frame: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      if (fallbackRef.current) fallbackRef.current.style.display = "block";
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // Our fragment shader writes gl_FragColor directly and never calls three's
    // linearToOutputTexel helper, so the renderer's outputColorSpace has no
    // effect here — leave it at its default and keep textures raw (below) so
    // reads/writes stay in the same passthrough space as the plain <img>
    // fallback, matching the source frames pixel-for-pixel.

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const textures: THREE.Texture[] = new Array(FRAME_COUNT);
    const loaded = new Array<boolean>(FRAME_COUNT).fill(false);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexA: { value: null },
        uTexB: { value: null },
        uMix: { value: 0 },
        uPlaneAspect: { value: 1 },
        uImageAspect: { value: IMAGE_ASPECT },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let rafPending = false;
    let disposed = false;

    function nearestLoaded(i: number) {
      for (let k = i; k >= 0; k--) if (loaded[k]) return k;
      for (let k = i + 1; k < FRAME_COUNT; k++) if (loaded[k]) return k;
      return -1;
    }

    function render() {
      rafPending = false;
      if (disposed) return;

      const f = Math.max(0, Math.min(FRAME_COUNT - 1, frame.get()));
      const i = Math.floor(f);
      const j = Math.min(i + 1, FRAME_COUNT - 1);
      const t = f - i;

      const base = loaded[i] ? i : nearestLoaded(i);
      if (base < 0) return;

      material.uniforms.uTexA.value = textures[base];
      if (base === i && t > 0.001 && j !== i && loaded[j]) {
        material.uniforms.uTexB.value = textures[j];
        material.uniforms.uMix.value = t;
      } else {
        material.uniforms.uTexB.value = textures[base];
        material.uniforms.uMix.value = 0;
      }

      renderer.render(scene, camera);
    }

    function scheduleRender() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(render);
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      renderer.setSize(rect.width, rect.height, false);
      material.uniforms.uPlaneAspect.value = rect.width / rect.height;
      scheduleRender();
    }

    // Preload every frame; nearestLoaded() covers gaps if the scrub outruns it.
    for (let n = 0; n < FRAME_COUNT; n++) {
      const idx = n;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (disposed) return;
        const tex = new THREE.Texture(img);
        tex.colorSpace = THREE.NoColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.needsUpdate = true;
        textures[idx] = tex;
        loaded[idx] = true;
        scheduleRender();
      };
      img.src = frameSrc(n);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const unsubscribe = frame.on("change", scheduleRender);

    return () => {
      disposed = true;
      unsubscribe();
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      textures.forEach((t) => t?.dispose());
      renderer.dispose();
    };
  }, [frame]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className={clsx("h-full w-full", className)} />
      <img
        ref={fallbackRef}
        src={frameSrc(FRAME_COUNT - 1)}
        alt=""
        aria-hidden="true"
        className={clsx("hidden h-full w-full object-cover", className)}
      />
    </>
  );
}
