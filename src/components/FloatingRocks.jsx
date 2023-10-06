import { useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useHighLight } from './hooks/useHighLight';

export function FloatingRocks({ darkMode }) {
    const rock1 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_1.glb");
    const rock2 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_2.glb");
    const rock3 = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/floating_rock_3.glb");

    const { highLight, increaseHighLight, resetHighLight } = useHighLight(2.5, 5)

    const rocks = useMemo(() => [rock1, rock2, rock3], [rock1, rock2, rock3])
    const rocksPositions = {
        rock1: [-20.5, -7, -19],
        rock2: [-5, 10, -33],
        rock3: [20, 3.5, -9]
    }

    useEffect(() => {
        if (!rock1 || !rock2 || !rock3) return

        let mesh = rocks.map(rock => rock.scene.children[0])
        mesh.forEach(rock => {
            rock.material.side = DoubleSide
            rock.material.envMapIntensity = highLight
        })

    }, [rock1, rock2, rock3, highLight, rocks])

    return (
        <>
            {rocks.map((_, i) =>
                <Float
                    key={[i, rocksPositions[i]].join('')}
                    speed={1.5}
                    rotationIntensity={darkMode ? 40 : 1.5}
                    floatIntensity={darkMode ? 70 : 0}
                    position={rocksPositions[`rock${i + 1}`]}
                >

                    <primitive onPointerOver={increaseHighLight} onPointerOut={resetHighLight} object={rocks[i].scene} />

                </Float>
            )}
        </>
    )
}