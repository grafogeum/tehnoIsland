import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useHighLight } from './hooks/useHighLight';

export function Trees() {
    const gltf = useLoader(GLTFLoader, "./models/trees.glb");
    const { highLight, increaseHighLight, resetHighLight } = useHighLight(2.5, 5)

    useEffect(() => {
        if (!gltf) return

        let mesh = gltf.scene.children[0]
        mesh.material.envMapIntensity = highLight
    }, [gltf, highLight])

    return (
        <primitive onPointerOver={increaseHighLight} onPointerOut={resetHighLight} object={gltf.scene} />
    )
}