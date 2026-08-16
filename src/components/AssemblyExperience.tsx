"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import styles from "./AssemblyExperience.module.css";

type AssemblyCopy = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  creditPrefix: string;
};

type AnimatedPart = {
  object: THREE.Object3D;
  assembledPosition: THREE.Vector3;
  explodedPosition: THREE.Vector3;
  assembledQuaternion: THREE.Quaternion;
  explodedQuaternion: THREE.Quaternion;
  start: number;
  end: number;
};

const sourceUrl = "https://sketchfab.com/3d-models/axis-q6010-e-surveillance-camera-143e552bde554ea2aaa72664efab003e";

const directionFor = (index: number) => {
  const directions = [
    new THREE.Vector3(-1.12, 0.68, 0.65),
    new THREE.Vector3(1.08, 0.78, -0.56),
    new THREE.Vector3(-1.16, -0.68, -0.44),
    new THREE.Vector3(1.2, -0.62, 0.62),
    new THREE.Vector3(0.06, 1.2, -0.76),
    new THREE.Vector3(-0.12, -1.08, 0.82),
  ];
  return directions[index % directions.length].clone();
};

const phaseFor = (name: string) => {
  if (/^camera\.00\d/.test(name)) return 0.1;
  if (name.startsWith("cameraBrackets")) return 0.23;
  if (name.startsWith("cameraSmall")) return 0.38;
  if (name.startsWith("cameraLense1")) return 0.5;
  if (name.startsWith("cameraLense2")) return 0.58;
  if (name.includes("panorama")) return 0.68;
  if (name.startsWith("housing")) return 0.76;
  if (name.startsWith("glass")) return 0.86;
  return 0.72;
};

const isAssemblyPart = (name: string) => /^(camera\.00\d|cameraBrackets|cameraSmall|cameraLense|camera\.panorama|housing|glass)/.test(name);

export function AssemblyExperience({ copy, modelUrl }: { copy: AssemblyCopy; modelUrl: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || !canvas || reduceMotion) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas, powerPreference: "low-power" });
    } catch {
      return;
    }

    let cancelled = false;
    let visible = true;
    let model: THREE.Group | undefined;
    let parts: AnimatedPart[] = [];
    let animation: gsap.core.Tween | undefined;
    let observer: IntersectionObserver | undefined;
    const state = { progress: 0 };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.2, 10.6);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    scene.add(new THREE.HemisphereLight(0xb9ecff, 0x080e19, 1.15));
    const keyLight = new THREE.DirectionalLight(0x9ceeff, 3.8);
    keyLight.position.set(4.5, 5.5, 6);
    scene.add(keyLight);
    keyLight.intensity = 2.55;
    const edgeLight = new THREE.PointLight(0xff8c58, 7.5, 18);
    edgeLight.position.set(-4, -1.8, 4);
    scene.add(edgeLight);

    const resize = () => {
      const { width, height } = section.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 640 ? 12.2 : 10.6;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    gsap.registerPlugin(ScrollTrigger);
    new GLTFLoader().load(modelUrl, (gltf) => {
      if (cancelled) return;
      model = gltf.scene;
      model.rotation.set(-0.12, 0.15, 0.02);
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const largestDimension = Math.max(size.x, size.y, size.z);
      model.position.sub(center);
      model.position.x += 2.15;
      model.position.y -= size.y * 0.1;
      model.scale.setScalar(2.2 / largestDimension);

      let partIndex = 0;
      model.traverse((object) => {
        if (!isAssemblyPart(object.name)) return;
        const assembledPosition = object.position.clone();
        const assembledQuaternion = object.quaternion.clone();
        const phase = phaseFor(object.name);
        const distance = largestDimension * (0.32 + phase * 0.42);
        const explodedPosition = assembledPosition.clone().addScaledVector(directionFor(partIndex), distance);
        const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.24 + partIndex * 0.045, -0.2 + partIndex * 0.065, 0.14 - partIndex * 0.03));
        parts.push({ object, assembledPosition, explodedPosition, assembledQuaternion, explodedQuaternion: assembledQuaternion.clone().multiply(rotation), start: phase, end: Math.min(1, phase + 0.25) });
        partIndex += 1;
      });

      scene.add(model);
      animation = gsap.to(state, {
        progress: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "+=1600", scrub: 1, pin: true, invalidateOnRefresh: true },
      });
      setSceneReady(true);
    }, undefined, () => {
      if (!cancelled) setSceneReady(false);
    });

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
      observer.observe(section);
    }

    const render = () => {
      if (!visible) return;
      for (const part of parts) {
        const progress = THREE.MathUtils.smoothstep((state.progress - part.start) / (part.end - part.start), 0, 1);
        part.object.position.lerpVectors(part.explodedPosition, part.assembledPosition, progress);
        part.object.quaternion.slerpQuaternions(part.explodedQuaternion, part.assembledQuaternion, progress);
      }
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(render);

    return () => {
      cancelled = true;
      observer?.disconnect();
      animation?.scrollTrigger?.kill();
      animation?.kill();
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      model?.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${sceneReady ? styles.ready : ""}`} aria-labelledby="assembly-title">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.fallback} aria-hidden="true" />
      <div className={styles.copy}>
        <p className={styles.eyebrow}>02 / {copy.eyebrow}</p>
        <h2 id="assembly-title">{copy.title}</h2>
        <p>{copy.description}</p>
        <span className={styles.status}><i /> {copy.status}</span>
        <p className={styles.credit}>{copy.creditPrefix}: <a href={sourceUrl} target="_blank" rel="noreferrer">AXIS-Q6010-E Surveillance Camera — ArtOfSylr, CC BY 4.0</a></p>
      </div>
    </section>
  );
}
