import { Color, DoubleSide } from 'three';

import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const setupMaterial = (object) => {
    if (object) {
        object.material.alphaToCoverage = true;
        object.material.transparent = true;
        object.material.map = object.material.emissiveMap
        object.material.emissive = new Color(0.9, 1.5, 0.6)
        object.material.side = DoubleSide;

    }
};

export function Grass() {
    const gltf = useLoader(GLTFLoader, "./models/grass.glb");

    useEffect(() => {
        if (!gltf) return;
        setupMaterial(gltf.scene.children[0]);
    }, [gltf]);

    return (
        <primitive object={gltf.scene} />
    )
}