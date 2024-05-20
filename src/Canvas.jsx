import { useRef } from 'react'
import {
  AccumulativeShadows,
  RandomizedLight,
  useGLTF,
  Decal,
  useTexture
} from '@react-three/drei'
import { Center, Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { BoxGeometry, Material } from 'three'
import { easing } from 'maath'
import { state } from './store'
import { useSnapshot } from 'valtio'

export function App({ position = [0, 0, 2.5], fov = 25 }) {
  const snap = useSnapshot(state)

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      shadows={true}
      eventSource={document.getElementById('root')}
      eventPrefix={'client'}
      camera={{ position, fov }}>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Center>
          <Shirt />
          <Backdrop />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

const Shirt = (props) => {
  const snap = useSnapshot(state)

  const texture = useTexture(`${snap.selectedDecal}.png`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.selectedColor, 0.15, delta)
  })
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}>
        <Decal
          map={texture}
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          opacity={0.7}
          anisotropy={16}
        />
      </mesh>
    </group>
  )
}

const Backdrop = () => {
  const shadows = useRef(null)
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    easing.dampC(
      shadows.current.getMesh().material.color,
      snap.selectedColor,
      0.05,
      delta
    )
  })

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal={true}
      frames={60}
      alphaTest={0.85}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      scale={10}>
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />

      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

const CameraRig = ({ children }) => {
  const group = useRef(null)
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    )

    if (snap.intro) {
      return
    }
    easing.dampE(
      group.current.rotation,
      [-state.pointer.y / 10, state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })

  return <group ref={group}>{children}</group>
}

useGLTF.preload('/shirt_baked_collapsed.glb')
