import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

import { TextureLoader } from 'three';

// Function to convert latitude/longitude to 3D coordinates
const latLonToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};


// Calculates the position of the sun
const getSunPosition = () => {
    const date = new Date();
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const angle = (dayOfYear / 365.25) * 2 * Math.PI; // Position on ecliptic plane

    // Sun's distance (can be any large number)
    const distance = 100;

    // Simplified orbit - for a more accurate model, you'd account for elliptical orbit
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);

    // No axial tilt applied to the sun's path, instead the Earth is tilted.
    return new THREE.Vector3(x, 0, z);
};

function Globe({ cities }) {
  const globeRef = useRef();
  const lightRef = useRef();
  const [hoveredCity, setHoveredCity] = useState(null);

  // Load textures
  const [dayTexture, nightTexture] = useLoader(TextureLoader, [
    '/earth_day.jpg',
    '/earth_night.jpg',
  ]);

  // Earth's axial tilt in radians
  const axialTilt = 23.5 * (Math.PI / 180);

  // Custom shader material for day/night blending
  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      sunDirection: { value: new THREE.Vector3(0, 0, 1) },
      dayTexture: { value: dayTexture },
      nightTexture: { value: nightTexture },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 sunDirection;
      uniform sampler2D dayTexture;
      uniform sampler2D nightTexture;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        // Lighting calculation
        float intensity = dot(vNormal, normalize(sunDirection));

        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv);

        // Smooth transition at the terminator
        float mixFactor = smoothstep(-0.1, 0.1, intensity);

        // Final color is a mix of day and night textures
        gl_FragColor = mix(nightColor, dayColor, mixFactor);
      }
    `,
  }), [dayTexture, nightTexture]);


  useFrame(({ clock }) => {
    // Earth's rotation
    if (globeRef.current) {
        // Rotate on its own axis (Y-axis in model space)
        globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    // Update sun position and light
    const sunPos = getSunPosition();
    shaderMaterial.uniforms.sunDirection.value.copy(sunPos);

    if (lightRef.current) {
        lightRef.current.position.copy(sunPos);
    }
  });

  return (
    <>
      <directionalLight ref={lightRef} intensity={2.5} castShadow />
      <group rotation={[0, 0, axialTilt]} ref={globeRef}>
        <mesh material={shaderMaterial}>
            <sphereGeometry args={[1.5, 64, 64]} />
        </mesh>

        {/* Render city markers */}
        {cities.map(city => (
          <Marker
            key={city.name}
            city={city}
            onHover={setHoveredCity}
          />
        ))}
      </group>

      {/* Display tooltip for hovered city */}
      {hoveredCity && (
        <Html position={latLonToVector3(hoveredCity.lat, hoveredCity.lon, 1.6)}>
          <div className="bg-gray-800 text-white text-xs p-1 rounded">
            {hoveredCity.name}
          </div>
        </Html>
      )}
    </>
  );
}

// Marker component for cities
function Marker({ city, onHover }) {
    const position = latLonToVector3(city.lat, city.lon, 1.51); // Slightly above surface
    return (
      <Sphere
        position={position}
        args={[0.02, 16, 16]}
        onPointerOver={() => onHover(city)}
        onPointerOut={() => onHover(null)}
      >
        <meshBasicMaterial color="red" />
      </Sphere>
    );
}

export default Globe;
