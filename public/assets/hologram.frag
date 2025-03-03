#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
varying vec2 fragCoord;

void main() {
    vec2 uv = fragCoord.xy / resolution.xy;
    
    // 🌀 UV 좌표를 대각선으로 흐르게 조정
    float diag = (uv.x + uv.y) * 0.5; // 대각선 변환

    // 🎨 컬러 강도를 줄여 은은한 효과 적용
    float colorShift = sin(time * 3.0 + diag * 5.0);

    // 🌈 무지개 홀로그램 색상 조절 (부드러운 컬러 변화)
    vec3 holoColor = mix(vec3(0.0, 0.0, 0.0), vec3(uv.x + colorShift, uv.y, 1.0 - uv.x), 0.1);

    // ✨ 부드러운 반투명 효과 적용
    gl_FragColor = vec4(holoColor, 0.00);
}
