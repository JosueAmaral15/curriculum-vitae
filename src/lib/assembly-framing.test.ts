import { beforeAll, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { assemblyRadius, fitAssemblyCamera } from "./assembly-framing";

let root: THREE.Group;
beforeAll(async () => {
  const bytes = readFileSync("public/models/axis-q6010-e-surveillance-camera.glb");
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("9742eab1461de3d9b6ee6c2af448dbcf1e8bc37fcbf4c3abd0948e02b70cfe5e");
  // Copy into this test realm; Node Buffer's backing ArrayBuffer is from a
  // different realm under Vitest's VM pool and fails GLTFLoader's type check.
  const { scene } = await new GLTFLoader().parseAsync(new Uint8Array(bytes).buffer, "");
  const bounds = new THREE.Box3().setFromObject(scene);
  scene.position.sub(bounds.getCenter(new THREE.Vector3()));
  root = new THREE.Group();
  root.add(scene);
});

test("keeps every vertex of the 28 sourced meshes in view over rotation and aspect changes", () => {
  const camera = new THREE.PerspectiveCamera(34);
  const radius = assemblyRadius(root);
  const point = new THREE.Vector3();
  let vertexChecks = 0;
  for (const aspect of [0.35, 0.5, 1, 1.6, 2.5, 4]) {
    fitAssemblyCamera(camera, radius, aspect);
    camera.updateMatrixWorld(true);
    for (let angle = 0; angle < 16; angle++) {
      root.rotation.set(-0.12, angle * Math.PI / 8, 0.02);
      root.updateMatrixWorld(true);
      let meshes = 0;
      let furthest = 0;
      root.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        meshes++;
        const positions = object.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          point.fromBufferAttribute(positions, i).applyMatrix4(object.matrixWorld).project(camera);
          furthest = Math.max(furthest, Math.abs(point.x), Math.abs(point.y), Math.abs(point.z));
          vertexChecks++;
        }
      });
      expect(meshes).toBe(28);
      expect(furthest).toBeLessThan(1);
    }
  }
  expect(vertexChecks).toBeGreaterThan(1_000_000);
});
