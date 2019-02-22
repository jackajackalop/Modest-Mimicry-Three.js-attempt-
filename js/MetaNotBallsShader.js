
THREE.MetaNotBallsShader = {
	uniforms: {
		"tDiffuse": 	{ type: "t", value: null },
		// "time": 		{ type: "f", value: 0.0 },
		// "distortion":   { type: "f", value: 3.0 },
		// "distortion2":  { type: "f", value: 5.0 },
		// "speed":     	{ type: "f", value: 0.2 },
		// "rollSpeed":    { type: "f", value: 0.1 },
	},

	vertexShader: [
		"varying vec2 vUv;",
		"void main() {",
		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		// "uniform float time;",
		// "uniform float distortion;",
		// "uniform float distortion2;",
		// "uniform float speed;",
		// "uniform float rollSpeed;",
		"varying vec2 vUv;",

		"void main() {",

			//"vec2 p = vUv;",
			// "gl_FragColor = texture2D(tDiffuse,  p);",

  			"vec4 currentScreen = texture2D(tDiffuse, vUv);",
  			"gl_FragColor = vec4(currentScreen.xyz * 1.5, currentScreen.w) * max(sign(currentScreen.w - 0.8), 0.0);",

		"}"

	].join("\n")

};