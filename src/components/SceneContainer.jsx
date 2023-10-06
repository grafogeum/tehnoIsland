import { useState, useMemo, Suspense } from 'react';
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from 'three';
import { BrightnessContrast, ChromaticAberration, DepthOfField, EffectComposer, GodRays, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from 'postprocessing';
import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { FloatingIsland } from "./FloatingIsland";
import { Portal } from './Portal';
import { Rocks } from './Rocks';
import { FloatingRocks } from './FloatingRocks';
import { Trees } from "./Trees";
import { Grass } from "./Grass";
import { useFrame } from '@react-three/fiber';
import { SceneParticles } from './SceneParticles';

let lightColor = new Color(0.2, 1, 0.1)
let mesh = new Mesh(
    new CylinderGeometry(0.3, 0.3, 0.2),
    new MeshBasicMaterial({
        color: lightColor,
        transparent: true,
        opacity: 1
    })
)
mesh.rotation.x = Math.PI * 0.5
mesh.position.set(1.17, 10.7, -4.1)
mesh.scale.set(1.5, 1, 1)
export const SceneContainer = ({ darkMode }) => {
    const targetHue = useMemo(() => (darkMode ? 5 : 0), [darkMode]);
    const [hue, setHue] = useState(targetHue);

    useFrame(() => {
        if (hue !== targetHue) {
            const diff = targetHue - hue;
            const speed = 0.1;
            const newHue = hue + diff * speed

            if (Number(newHue.toFixed(0)) !== targetHue) {
                setHue(newHue);
            } else {
                setHue(targetHue);
            }
        }

    }, 0);

    return (
        <Suspense fallback={null}>
            <Environment background={"only"} files={process.env.PUBLIC_URL + "/textures/bg.hdr"} />
            <Environment background={false} files={process.env.PUBLIC_URL + "/textures/envmap.hdr"} />
            <PerspectiveCamera makeDefault fov={60} position={[-1.75, 7.85, 23.35]} />
            <OrbitControls target={[2, 5, 3]} maxPolarAngle={Math.PI * 0.5} />
            <Float
                speed={0.5}
                rotationIntensity={0.6}
                floatIntensity={0.6}
            >
                <primitive object={mesh} />
                <spotLight
                    penumbra={1}
                    distance={500}
                    angle={60.65}
                    anglePower={3}
                    attenuation={1}
                    color={lightColor}
                    intensity={0.3}
                    position={[1.19, 10.85, -4.45]}
                    target-position={[0, 0, -1]}
                />
                <FloatingIsland />
                <Portal />
                <Rocks />
                <Trees />
                <Grass />
                <SceneParticles />
            </Float>
            <FloatingRocks darkMode={darkMode} />
            <EffectComposer stencilBuffer={true}>
                <DepthOfField
                    focusDistance={0.012}
                    focalLength={0.015}
                    bokehScale={3}
                />
                <HueSaturation hue={hue} saturation={darkMode ? - 0.35 : -0.15} />
                <BrightnessContrast brightness={0.0} contrast={0.035} />
                <ChromaticAberration radialModulation={true} offset={[0.00175, 0.00175]} />
                <GodRays
                    sun={mesh}
                    blendFunction={BlendFunction.Screen}
                    samples={20}
                    density={0.97}
                    decay={0.97}
                    weight={0.6}
                    exposure={0.3}
                    clampMax={1}
                    width={Resizer.AUTO_SIZE}
                    height={Resizer.AUTO_SIZE}
                    kernelSize={KernelSize.SMALL}
                    blur={true}
                />
            </EffectComposer>
        </Suspense>
    )
}