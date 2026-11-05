/** GLSL is isolated here so the WebGL component stays focused on lifecycle/scroll logic. */
export const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform float uFrameAspect;
  uniform float uImageAspect;
  varying vec2 vUv;

  void main() {
    vec2 point = vUv - vec2(0.5);
    float angle = atan(point.y, point.x);
    vec2 direction = vec2(cos(angle), sin(angle));

    // First silhouette: a slightly irregular oval, not a decorative random polygon.
    float organic = 0.380
      + 0.037 * sin(angle * 3.0 + 0.60)
      + 0.016 * sin(angle * 5.0 - 0.40);

    // For each ray from the center, the rectangle is an exact boundary.
    float rectangular = min(
      0.505 / max(abs(direction.x), 0.0001),
      0.505 / max(abs(direction.y), 0.0001)
    );

    float progress = uProgress * uProgress * (3.0 - 2.0 * uProgress);
    float boundary = mix(organic, rectangular, progress);
    float mask = 1.0 - smoothstep(boundary - 0.004, boundary + 0.004, length(point));

    // object-fit: cover, preserving the original photo without stretching.
    vec2 cover = vec2(
      min(uFrameAspect / uImageAspect, 1.0),
      min(uImageAspect / uFrameAspect, 1.0)
    );
    vec2 photoUv = (vUv - 0.5) * cover * mix(0.93, 1.0, progress) + 0.5;
    vec3 photo = texture2D(uTexture, photoUv).rgb;

    gl_FragColor = vec4(photo, mask);
  }
`;
