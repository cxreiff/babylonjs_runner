import "@babylonjs/loaders/legacy/legacy-glTF2";

import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { Scene } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";

import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

// Get the canvas element from the DOM.
const canvas = document.getElementById("babylonjs_canvas") as HTMLCanvasElement;

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
const scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Create a grid material
const material = new GridMaterial("grid", scene);

// Our built-in 'sphere' shape.
SceneLoader.ImportMeshAsync(
  "",
  "https://cxreiff.sfo3.cdn.digitaloceanspaces.com/models/",
  "key.glb",
  scene
)
  .then((result) => {
    const key = result.meshes[0];

    // Affect a material
    key.material = material;

    // Render every frame
    engine.runRenderLoop(() => {
      key.rotate(new Vector3(0, 1, 0), 0.01);
      scene.render();
    });
  })
  .catch(console.log);

// Our built-in 'ground' shape.
const ground = CreateGround(
  "ground1",
  { width: 6, height: 6, subdivisions: 2 },
  scene
);

ground.position.y = -1;

// Affect a material
ground.material = material;
