import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { BufferAttribute, Color } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const FloatingIsland = () => {
    const glft = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/floating_island.glb");

    useEffect(() => {
        if (!glft) return
        let mesh = glft.scene.children[0]

        let uvs = mesh.geometry.attributes.uv.array
        mesh.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2))

        mesh.material.lightMap = mesh.material.map
        mesh.material.lightMapIntensity = 700
        mesh.material.color = new Color(0.04, 0.06, 0.01)


    }, [glft])

    return (
        <primitive object={glft.scene} />
    )


}