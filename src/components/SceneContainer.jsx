import { useState, useMemo, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { FloatingIsland } from "./FloatingIsland";
import { Portal } from './Portal';
import { Rocks } from './Rocks';
import { FloatingRocks } from './FloatingRocks';
import { Trees } from "./Trees";
import { Grass } from "./Grass";
import { BrightnessContrast, ChromaticAberration, DepthOfField, EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { useFrame } from '@react-three/fiber';


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
                <FloatingIsland />
                <Portal />
                <Rocks />
                <Trees />
                <Grass />
            </Float>
            <FloatingRocks />

            <EffectComposer stencilBuffer={true}>
                <DepthOfField
                    focusDistance={0.012}
                    focalLength={0.015}
                    bokehScale={3}
                />
                <HueSaturation hue={hue} saturation={darkMode ? - 0.35 : -0.15} />
                <BrightnessContrast brightness={0.0} contrast={0.035} />
                <ChromaticAberration radialModulation={true} offset={[0.00175, 0.00175]} />
            </EffectComposer>
        </Suspense>
    )
}