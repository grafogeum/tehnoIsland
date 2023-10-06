import { Sparkles } from "@react-three/drei";

export const SceneParticles = () => (
    <>
        <Sparkles position={[1, 8, -4]} count={50} size={6} scale={[5, 3.5, 2.5]} color={'#33ee66'} speed={0.2} noise={0.1} />

        <Sparkles position={[0, 6, 0]} count={50} size={10} scale={[12, 2, 12]} color={'#33ee66'} speed={0.2} noise={0.2} />

        <Sparkles position={[-5, 9, -5]} count={50} size={6} scale={[4, 4, 4]} color={'#33ee66'} speed={0.2} noise={0.2} />

        <Sparkles position={[5.5, 9, -8]} count={50} size={6} scale={[5, 5, 5]} color={'#33ee66'} speed={0.2} noise={0.2} />

    </>
)