import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { DoubleSide, WebGLRenderTarget, Scene, TextureLoader, EquirectangularReflectionMapping, LinearEncoding, AlwaysStencilFunc, ReplaceStencilOp } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useHighLight } from './hooks/useHighLight';
import { FillQuad } from './FillQuad';

const scene = new Scene()
scene.background = new TextureLoader().load("./textures/seamless-texture2.png", texture => {
    texture.encoding = LinearEncoding
    texture.mapping = EquirectangularReflectionMapping
})

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    stencilBuffer: false,
})

window.addEventListener('resize', () => {
    target.setSize(window.innerWidth, window.innerHeight)
})

export function Portal() {
    const model = useLoader(GLTFLoader, "./models/portal.glb");
    const mask = useLoader(GLTFLoader, "./models/portal_mask.glb");

    const { highLight, increaseHighLight, resetHighLight } = useHighLight(3.5, 5)

    useFrame(state => {
        state.gl.setRenderTarget(target);
        state.gl.render(scene, state.camera);
        state.gl.setRenderTarget(null);
    })

    useEffect(() => {
        if (!model) return

        let mesh = model.scene.children[0];
        mesh.material.envMapIntensity = 3.5;

        let maskMesh = mask.scene.children[0];
        maskMesh.material.transparent = false;
        maskMesh.material.side = DoubleSide;
        maskMesh.material.stencilFunc = AlwaysStencilFunc;
        maskMesh.material.stencilWrite = true;
        maskMesh.material.stencilRef = 1;
        maskMesh.material.stencilZPass = ReplaceStencilOp;

    }, [model, mask, highLight])

    return (
        <>


            <primitive onPointerOver={increaseHighLight} onPointerOut={resetHighLight} object={model.scene} />
            <primitive onPointerOver={increaseHighLight} onPointerOut={resetHighLight} object={mask.scene} />
            <FillQuad map={target.texture} maskId={1} />
        </>
    )
}