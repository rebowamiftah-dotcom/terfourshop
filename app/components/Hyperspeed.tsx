// @ts-nocheck
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';

const DEFAULT_EFFECT_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 300,             // Dikurangi dari 400 agar beban render lebih ringan
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 1.5,
  carLightsFade: 0.4,
  totalSideLightSticks: 12, // Dikurangi dari 20
  lightPairsPerRoadWay: 20, // Dikurangi dari 40 (beban render berkurang 50%)
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [12, 60],
  carLightsRadius: [0.05, 0.12],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3
  }
};

export default function Hyperspeed({ effectOptions = DEFAULT_EFFECT_OPTIONS }: { effectOptions?: any }) {
  const hyperspeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = hyperspeedRef.current;
    if (!container) return;

    let isVisible = true; // Flag untuk mengecek apakah elemen terlihat di layar

    const options = {
      ...DEFAULT_EFFECT_OPTIONS,
      ...effectOptions,
      colors: { ...DEFAULT_EFFECT_OPTIONS.colors, ...effectOptions?.colors }
    };

    const mountainUniforms = {
      uFreq: { value: new THREE.Vector3(3, 6, 10) },
      uAmp: { value: new THREE.Vector3(30, 30, 20) }
    };

    const turbulentUniforms = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
    };

    const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

    const distortions = {
      mountainDistortion: {
        uniforms: mountainUniforms,
        getDistortion: `
uniform vec3 uAmp;
uniform vec3 uFreq;
uniform float uTime;
#ifndef PI
#define PI 3.14159265358979
#endif
float distortionNsin(float val){ return sin(val) * 0.5 + 0.5; }
vec3 getDistortion(float progress){
  float movementProgressFix = 0.02;
  return vec3( 
    cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
    distortionNsin(progress * PI * uFreq.y + uTime) * uAmp.y - distortionNsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
    distortionNsin(progress * PI * uFreq.z + uTime) * uAmp.z - distortionNsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
  );
}
        `,
        getJS: (progress: number, time: number) => {
          const movementProgressFix = 0.02;
          const uFreq = mountainUniforms.uFreq.value;
          const uAmp = mountainUniforms.uAmp.value;
          const distortion = new THREE.Vector3(
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x - Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
            nsin(progress * Math.PI * uFreq.y + time) * uAmp.y - nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
            nsin(progress * Math.PI * uFreq.z + time) * uAmp.z - nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z
          );
          return distortion.multiply(new THREE.Vector3(2, 2, 2)).add(new THREE.Vector3(0, 0, -5));
        }
      },
      turbulentDistortion: {
        uniforms: turbulentUniforms,
        getDistortion: `
uniform vec4 uFreq;
uniform vec4 uAmp;
uniform float uTime;
#ifndef PI
#define PI 3.14159265358979
#endif
float distortionNsin(float val){ return sin(val) * 0.5 + 0.5; }
float getDistortionX(float progress){
  return (cos(PI * progress * uFreq.r + uTime) * uAmp.r + pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2.0) * uAmp.g);
}
float getDistortionY(float progress){
  return (-distortionNsin(PI * progress * uFreq.b + uTime) * uAmp.b - pow(distortionNsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.0) * uAmp.a);
}
vec3 getDistortion(float progress){
  return vec3(getDistortionX(progress) - getDistortionX(0.0125), getDistortionY(progress) - getDistortionY(0.0125), 0.0);
}
        `,
        getJS: (progress: number, time: number) => {
          const uFreq = turbulentUniforms.uFreq.value;
          const uAmp = turbulentUniforms.uAmp.value;
          const getX = (p: number) => Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x + Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;
          const getY = (p: number) => -nsin(Math.PI * p * uFreq.z + time) * uAmp.z - Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;
          const distortion = new THREE.Vector3(getX(progress) - getX(progress + 0.007), getY(progress) - getY(progress + 0.007), 0);
          return distortion.multiply(new THREE.Vector3(-2, -5, 0)).add(new THREE.Vector3(0, 0, -10));
        }
      }
    };

    options.distortion = distortions[options.distortion] || distortions.turbulentDistortion;

    class App {
      constructor(container, options) {
        this.options = options;
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        
        // OPTIMASI: Dibatasi maksimal 1.25x agar GPU laptop tidak bekerja keras
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

        this.composer = new EffectComposer(this.renderer);
        this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);
        this.camera.position.set(0, 8, -5);

        this.scene = new THREE.Scene();
        const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
        this.scene.fog = fog;
        this.fogUniforms = { fogColor: { value: fog.color }, fogNear: { value: fog.near }, fogFar: { value: fog.far } };
        this.clock = new THREE.Clock();

        this.road = new Road(this, options);
        this.leftCarLights = new CarLights(this, options, options.colors.leftCars, options.movingAwaySpeed, new THREE.Vector2(0, 1 - options.carLightsFade));
        this.rightCarLights = new CarLights(this, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
        this.leftSticks = new LightsSticks(this, options);

        this.speedUp = 0;
        this.timeOffset = 0;
        this.disposed = false;

        this.tick = this.tick.bind(this);
        this.onResize = this.onResize.bind(this);

        this.initPasses();
        this.road.init();
        this.leftCarLights.init();
        this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);
        this.rightCarLights.init();
        this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);
        this.leftSticks.init();
        this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));

        container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onResize);
        this.tick();
      }

      initPasses() {
        const renderPass = new RenderPass(this.scene, this.camera);
        // OPTIMASI: Intensitas bloom diturunkan
        const bloomPass = new EffectPass(this.camera, new BloomEffect({ luminanceThreshold: 0.3, luminanceSmoothing: 0.1, resolutionScale: 0.5 }));
        this.composer.addPass(renderPass);
        this.composer.addPass(bloomPass);
      }

      onResize() {
        if (!this.container) return;
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        this.renderer.setSize(width, height, false);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.composer.setSize(width, height);
      }

      update(delta) {
        this.timeOffset += delta;
        const time = this.clock.getElapsedTime() + this.timeOffset;
        this.rightCarLights.update(time);
        this.leftCarLights.update(time);
        this.leftSticks.update(time);
        this.road.update(time);

        if (this.options.distortion.getJS) {
          const distortion = this.options.distortion.getJS(0.025, time);
          this.camera.lookAt(new THREE.Vector3(this.camera.position.x + distortion.x, this.camera.position.y + distortion.y, this.camera.position.z + distortion.z));
          this.camera.updateProjectionMatrix();
        }
      }

      render(delta) { this.composer.render(delta); }

      tick() {
        if (this.disposed) return;
        
        // OPTIMASI: Hentikan perhitungan render jika user meng-scroll jauh dari 3D Hero Section
        if (isVisible) {
          const delta = this.clock.getDelta();
          this.render(delta);
          this.update(delta);
        }
        
        requestAnimationFrame(this.tick);
      }

      dispose() {
        this.disposed = true;
        window.removeEventListener('resize', this.onResize);
        if (this.renderer) {
          this.renderer.dispose();
          if (this.renderer.domElement && this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
          }
        }
      }
    }

    const random = (base) => Array.isArray(base) ? Math.random() * (base[1] - base[0]) + base[0] : Math.random() * base;
    const pickRandom = (arr) => Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr;

    class CarLights {
      constructor(webgl, options, colors, speed, fade) {
        this.webgl = webgl; this.options = options; this.colors = colors; this.speed = speed; this.fade = fade;
      }
      init() {
        const options = this.options;
        const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
        
        // OPTIMASI: Segmen tube dikurangi dari (40, 8) menjadi (15, 4)
        const geometry = new THREE.TubeGeometry(curve, 15, 1, 4, false);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.instanceCount = options.lightPairsPerRoadWay * 2;
        const laneWidth = options.roadWidth / options.lanesPerRoad;

        const aOffset = [], aMetrics = [], aColor = [];
        const colors = Array.isArray(this.colors) ? this.colors.map(c => new THREE.Color(c)) : new THREE.Color(this.colors);

        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
          const radius = random(options.carLightsRadius);
          const length = random(options.carLightsLength);
          const speed = random(this.speed);
          const carLane = i % options.lanesPerRoad;
          let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;
          const carWidth = random(options.carWidthPercentage) * laneWidth;
          laneX += random(options.carShiftX) * laneWidth;
          const offsetY = random(options.carFloorSeparation) + radius * 1.3;
          const offsetZ = -random(options.length);

          aOffset.push(laneX - carWidth / 2, offsetY, offsetZ, laneX + carWidth / 2, offsetY, offsetZ);
          aMetrics.push(radius, length, speed, radius, length, speed);
          const color = pickRandom(colors);
          aColor.push(color.r, color.g, color.b, color.r, color.g, color.b);
        }

        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));

        const material = new THREE.ShaderMaterial({
          fragmentShader: `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_fragment']}
varying vec3 vColor;
varying vec2 vUv;
uniform vec2 uFade;
void main() {
  float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
  gl_FragColor = vec4(vColor, alpha);
  if (gl_FragColor.a < 0.0001) discard;
  ${THREE.ShaderChunk['fog_fragment']}
}
          `,
          vertexShader: `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_vertex']}
attribute vec3 aOffset;
attribute vec3 aMetrics;
attribute vec3 aColor;
uniform float uTravelLength;
varying vec2 vUv;
varying vec3 vColor;
${options.distortion.getDistortion}
void main() {
  vec3 transformed = position.xyz;
  transformed.xy *= aMetrics.r;
  transformed.z *= aMetrics.g;
  transformed.z += aMetrics.g - mod(uTime * aMetrics.b + aOffset.z, uTravelLength);
  transformed.xy += aOffset.xy;
  transformed.xyz += getDistortion(abs(transformed.z / uTravelLength));
  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
  vColor = aColor;
  ${THREE.ShaderChunk['fog_vertex']}
}
          `,
          transparent: true,
          uniforms: Object.assign({ uTime: { value: 0 }, uTravelLength: { value: options.length }, uFade: { value: this.fade } }, this.webgl.fogUniforms, options.distortion.uniforms)
        });

        this.mesh = new THREE.Mesh(instanced, material);
        this.mesh.frustumCulled = false;
        this.webgl.scene.add(this.mesh);
      }
      update(time) { this.mesh.material.uniforms.uTime.value = time; }
    }

    class LightsSticks {
      constructor(webgl, options) { this.webgl = webgl; this.options = options; }
      init() {
        const options = this.options;
        const instanced = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1));
        const totalSticks = options.totalSideLightSticks;
        instanced.instanceCount = totalSticks;
        const stickoffset = options.length / (totalSticks - 1);
        const aOffset = [], aColor = [], aMetrics = [];
        const colors = Array.isArray(options.colors.sticks) ? options.colors.sticks.map(c => new THREE.Color(c)) : new THREE.Color(options.colors.sticks);

        for (let i = 0; i < totalSticks; i++) {
          aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());
          const color = pickRandom(colors);
          aColor.push(color.r, color.g, color.b);
          aMetrics.push(random(options.lightStickWidth), random(options.lightStickHeight));
        }

        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2));

        const material = new THREE.ShaderMaterial({
          fragmentShader: `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_fragment']}
varying vec3 vColor;
void main() {
  gl_FragColor = vec4(vColor, 1.0);
  ${THREE.ShaderChunk['fog_fragment']}
}
          `,
          vertexShader: `
#define USE_FOG
${THREE.ShaderChunk['fog_pars_vertex']}
attribute float aOffset;
attribute vec3 aColor;
attribute vec2 aMetrics;
uniform float uTravelLength;
varying vec3 vColor;
mat4 rotationY(in float angle) { return mat4(cos(angle),0.0,sin(angle),0.0, 0.0,1.0,0.0,0.0, -sin(angle),0.0,cos(angle),0.0, 0.0,0.0,0.0,1.0); }
${options.distortion.getDistortion}
void main() {
  vec3 transformed = position.xyz;
  transformed.xy *= aMetrics;
  float time = mod(uTime * 120.0 + aOffset, uTravelLength);
  transformed = (rotationY(3.14159265/2.0) * vec4(transformed, 1.0)).xyz;
  transformed.z += - uTravelLength + time;
  transformed.xyz += getDistortion(abs(transformed.z / uTravelLength));
  transformed.y += aMetrics.y / 2.0;
  transformed.x += -aMetrics.x / 2.0;
  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vColor = aColor;
  ${THREE.ShaderChunk['fog_vertex']}
}
          `,
          side: THREE.DoubleSide,
          uniforms: Object.assign({ uTravelLength: { value: options.length }, uTime: { value: 0 } }, this.webgl.fogUniforms, options.distortion.uniforms)
        });

        this.mesh = new THREE.Mesh(instanced, material);
        this.mesh.frustumCulled = false;
        this.webgl.scene.add(this.mesh);
      }
      update(time) { this.mesh.material.uniforms.uTime.value = time; }
    }

    class Road {
      constructor(webgl, options) { this.webgl = webgl; this.options = options; this.uTime = { value: 0 }; }
      createPlane(side, isRoad) {
        const options = this.options;
        // OPTIMASI: Segmen bidang jalan dikurangi dari (20, 100) menjadi (10, 40)
        const geometry = new THREE.PlaneGeometry(isRoad ? options.roadWidth : options.islandWidth, options.length, 10, 40);
        let uniforms = { uTravelLength: { value: options.length }, uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) }, uTime: this.uTime };

        if (isRoad) {
          uniforms = Object.assign(uniforms, {
            uLanes: { value: options.lanesPerRoad },
            uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) },
            uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) },
            uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage },
            uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage },
            uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage }
          });
        }

        const material = new THREE.ShaderMaterial({
          fragmentShader: `
#define USE_FOG
varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;
${isRoad ? 'uniform float uLanes;\nuniform vec3 uBrokenLinesColor;\nuniform vec3 uShoulderLinesColor;\nuniform float uShoulderLinesWidthPercentage;\nuniform float uBrokenLinesWidthPercentage;\nuniform float uBrokenLinesLengthPercentage;' : ''}
${THREE.ShaderChunk['fog_pars_fragment']}
void main() {
  vec2 uv = vUv;
  vec3 color = vec3(uColor);
  ${isRoad ? `
    uv.y = mod(uv.y + uTime * 0.05, 1.0);
    float laneWidth = 1.0 / uLanes;
    float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
    float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(1.0 - uBrokenLinesLengthPercentage, fract(uv.y * 10.0));
    brokenLines = mix(brokenLines, step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x), uv.x);
  ` : ''}
  gl_FragColor = vec4(color, 1.0);
  ${THREE.ShaderChunk['fog_fragment']}
}
          `,
          vertexShader: `
#define USE_FOG
uniform float uTravelLength;
varying vec2 vUv;
${THREE.ShaderChunk['fog_pars_vertex']}
${options.distortion.getDistortion}
void main() {
  vec3 transformed = position.xyz;
  vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.0) / uTravelLength);
  transformed.x += distortion.x;
  transformed.z += distortion.y;
  transformed.y += -1.0 * distortion.z;
  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
  ${THREE.ShaderChunk['fog_vertex']}
}
          `,
          side: THREE.DoubleSide,
          uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms)
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -options.length / 2;
        mesh.position.x += (options.islandWidth / 2 + options.roadWidth / 2) * side;
        this.webgl.scene.add(mesh);
      }
      init() { this.createPlane(-1, true); this.createPlane(1, true); this.createPlane(0, false); }
      update(time) { this.uTime.value = time; }
    }

    // OPTIMASI: Observer untuk jeda render saat out-of-view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const app = new App(container, options);

    return () => {
      observer.disconnect();
      app.dispose();
    };
  }, [effectOptions]);

  return (
    <div 
      ref={hyperspeedRef} 
      className="absolute inset-0 w-full h-full overflow-hidden [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:absolute [&>canvas]:inset-0 pointer-events-none" 
    />
  );
}