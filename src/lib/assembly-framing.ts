import * as THREE from "three";

/** Radius about the assembly pivot containing every transformed mesh sphere. */
export function assemblyRadius(root: THREE.Object3D): number {
  root.updateMatrixWorld(true);
  const sphere = new THREE.Sphere();
  let radius = 0;
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    if (!object.geometry.boundingSphere) object.geometry.computeBoundingSphere();
    sphere.copy(object.geometry.boundingSphere!).applyMatrix4(object.matrixWorld);
    radius = Math.max(radius, sphere.center.length() + sphere.radius);
  });
  return radius;
}

/** Fit a pivot-centred sphere in both axes, with a margin for the whole rotation. */
export function fitAssemblyCamera(camera: THREE.PerspectiveCamera, radius: number, aspect: number) {
  const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov / 2);
  const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * aspect);
  const distance = radius * 1.08 / Math.sin(Math.min(verticalHalfFov, horizontalHalfFov));
  camera.aspect = aspect;
  camera.position.set(0, 0, distance);
  camera.near = Math.max(0.01, distance - radius * 1.5);
  camera.far = distance + radius * 1.5;
  camera.updateProjectionMatrix();
}
