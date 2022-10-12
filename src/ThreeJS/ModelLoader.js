import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useEffect } from 'react';
import gsap from 'gsap';
import { useModelStore } from '../Store/ModelStore';

const ModelLoader = () => {
  const currentModelUrl = useModelStore((state) => state.currentModelUrl);
  const setCurModelAnimLength = useModelStore(
    (state) => state.setCurModelAnimLength
  );
  const currentModelAnim = useModelStore((state) => state.currentModelAnim);
  const result = useLoader(GLTFLoader, currentModelUrl);
  console.log(result);
  const currentModelData = useModelStore((state) => state.currentModelData);
  let mixer = null;

  useEffect(() => {
    result?.scene?.scale.set(0, 0, 0);
    gsap.to(result.scene.scale, {
      duration: 1.5,
      ease: 'ease-in',
      x: currentModelData.scale || 1,
      y: currentModelData.scale || 1,
      z: currentModelData.scale || 1,
    });
  }, [currentModelUrl, currentModelData.scale, result.scene.scale]);

  if (result.animations.length) {
    setCurModelAnimLength(result.animations.length);
    mixer = new THREE.AnimationMixer(result.scene);
    const action = mixer.clipAction(result.animations[currentModelAnim]);
    action.play();
  } else {
    setCurModelAnimLength(0);
  }
  useFrame((_, delta) => {
    mixer?.update(delta);
  });
  return (
    <>
      {currentModelUrl !== '' && result.scene && (
        <primitive object={result.scene} />
      )}
    </>
  );
};

export default ModelLoader;
