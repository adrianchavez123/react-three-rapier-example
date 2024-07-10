import { useFrame } from "@react-three/fiber";
import {
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  Grid,
  Pixelation,
  Scanline,
  Vignette,
  DotScreen,
  Noise,
  Glitch,
  GodRays,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { forwardRef, useEffect, useRef } from "react";
// import { BlendFunction } from "postprocessing";

const Effect = forwardRef((props, circleRef) => {
  const scanline = useRef();
  // console.log(BlendFunction);
  const { brightness, contrast } = useControls({
    brightness: { value: 0, min: -1, max: 1, step: 0.01 },
    contrast: { value: 0, min: -1, max: 1, step: 0.01 },
  });

  useFrame((_, delta) => {
    // scanline.current.density += delta * 0.5;
  });

  useEffect(() => {
    console.log(circleRef);
  });
  return (
    <EffectComposer>
      {/* <Pixelation granularity={10} /> */}
      {/* <Vignette
        eskil={false}
        offset={0.3}
        darkness={0.9}
        // blendFunction={BlendFunction.NORMAL}
      /> */}
      {/* <BrightnessContrast brightness={brightness} contrast={contrast} /> */}
      {/* <ChromaticAberration offset={[0.02, 0.02]} /> */}
      {/* <Scanline density={7} ref={scanline} /> */}
      {/* <Grid scale={0.25} lineWidth={0.1} /> */}
      {/* <DotScreen scale={0.1} angle={Math.PI * 0.25} /> */}
      {/* <Noise /> */}
      {/* <Glitch delay={[1.5, 3.5]} duration={[0.6, 1.0]} strength={[0.3, 1.0]} /> */}
      {circleRef?.current && (
        <GodRays sun={circleRef.current} samples={60} density={0.44} />
      )}
    </EffectComposer>
  );
});
export default Effect;
