import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";

const HumanModel = ({ product }) => {
  const humanRef = useRef();
  
  // Load the human model using useLoader
  const human = useLoader(OBJLoader, "/models/human_model.obj");

  // Load the texture based on the product or default texture
  const texture = useLoader(TextureLoader, product ? product.image : "/textures/default_texture.png");

  // Once the human model and texture are loaded, apply the texture
  useEffect(() => {
    if (human && texture) {
      human.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [human, texture]);

  if (!human || !texture) {
    return <p>Loading...</p>;
  }

  return (
    <group>
      {/* Render the human model with applied texture */}
      <primitive object={human} scale={[2, 2, 2]} ref={humanRef} />
    </group>
  );
};

export default HumanModel;
