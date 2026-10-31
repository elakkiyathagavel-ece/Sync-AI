/* ==========================================================
   SYNC AI - 3D INTERACTIVE MOVING ANIMATION BACKGROUND
   WebGL / Three.js 3D Constellation & Rotating Polyhedra
   With Automatic High-DPI Perspective Canvas Fallback
   ========================================================== */

(function () {
    "use strict";

    // Inject canvas into DOM if not present
    let canvas = document.getElementById("sync-3d-canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "sync-3d-canvas";
        document.body.prepend(canvas);
    }

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener("mousemove", (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            mouse.targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    }, { passive: true });

    // Try loading Three.js from CDN, or fallback to native 3D perspective engine
    function loadThreeScript(callback) {
        if (window.THREE) {
            return callback(true);
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.async = true;
        script.onload = () => callback(true);
        script.onerror = () => callback(false);
        document.head.appendChild(script);
    }

    // ----------------------------------------------------------
    // MODE A: THREE.JS WEBGL 3D SCENE
    // ----------------------------------------------------------
    function initThreeJS() {
        const THREE = window.THREE;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0f1d, 0.0012);

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        camera.position.z = 600;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 1. 3D PARTICLE CONSTELLATION
        const particleCount = 140;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

            velocities.push({
                x: (Math.random() - 0.5) * 0.6,
                y: (Math.random() - 0.5) * 0.6,
                z: (Math.random() - 0.5) * 0.6
            });
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        // Particle Points
        const pMaterial = new THREE.PointsMaterial({
            color: 0x6366f1,
            size: 4.5,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });
        const particleSystem = new THREE.Points(geometry, pMaterial);
        scene.add(particleSystem);

        // Dynamic Connecting Lines
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x4f46e5,
            transparent: true,
            opacity: 0.22,
            blending: THREE.AdditiveBlending
        });

        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(particleCount * particleCount * 6);
        lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineMesh);

        // 2. ROTATING 3D WIREFRAME POLYHEDRA
        const polyGroup = new THREE.Group();

        // Icosahedron 1 (Neon Cyan)
        const icoGeo = new THREE.IcosahedronGeometry(110, 1);
        const icoMat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const icoMesh = new THREE.Mesh(icoGeo, icoMat);
        icoMesh.position.set(-280, 80, -100);
        polyGroup.add(icoMesh);

        // Dodecahedron 2 (Electric Violet)
        const dodecaGeo = new THREE.DodecahedronGeometry(90, 0);
        const dodecaMat = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.38
        });
        const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
        dodecaMesh.position.set(300, -60, -80);
        polyGroup.add(dodecaMesh);

        // Torus Wireframe (Golden Tech)
        const torusGeo = new THREE.TorusGeometry(80, 24, 16, 50);
        const torusMat = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.25
        });
        const torusMesh = new THREE.Mesh(torusGeo, torusMat);
        torusMesh.position.set(0, 220, -200);
        polyGroup.add(torusMesh);

        scene.add(polyGroup);

        // RESIZE HANDLER
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // ANIMATION LOOP
        let clock = 0;
        function animate() {
            requestAnimationFrame(animate);
            clock += 0.01;

            // Smooth mouse camera interpolation (Parallax)
            mouse.x += (mouse.targetX - mouse.x) * 0.04;
            mouse.y += (mouse.targetY - mouse.y) * 0.04;

            camera.position.x = mouse.x * 120;
            camera.position.y = mouse.y * 90;
            camera.lookAt(scene.position);

            // Rotate polyhedra
            icoMesh.rotation.x += 0.005;
            icoMesh.rotation.y += 0.008;
            dodecaMesh.rotation.x -= 0.006;
            dodecaMesh.rotation.z += 0.007;
            torusMesh.rotation.x += 0.004;
            torusMesh.rotation.y -= 0.006;

            // Float polyhedra smoothly
            icoMesh.position.y = 80 + Math.sin(clock * 1.2) * 20;
            dodecaMesh.position.y = -60 + Math.cos(clock * 1.4) * 20;

            // Update particle positions
            const posArray = particleSystem.geometry.attributes.position.array;
            let lineIdx = 0;
            const linePos = lineMesh.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                posArray[i * 3] += velocities[i].x;
                posArray[i * 3 + 1] += velocities[i].y;
                posArray[i * 3 + 2] += velocities[i].z;

                // Bounce boundaries
                if (Math.abs(posArray[i * 3]) > 600) velocities[i].x *= -1;
                if (Math.abs(posArray[i * 3 + 1]) > 500) velocities[i].y *= -1;
                if (Math.abs(posArray[i * 3 + 2]) > 400) velocities[i].z *= -1;

                // Connecting lines between nearby particles
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = posArray[i * 3] - posArray[j * 3];
                    const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
                    const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < 15000) { // proximity threshold
                        linePos[lineIdx++] = posArray[i * 3];
                        linePos[lineIdx++] = posArray[i * 3 + 1];
                        linePos[lineIdx++] = posArray[i * 3 + 2];

                        linePos[lineIdx++] = posArray[j * 3];
                        linePos[lineIdx++] = posArray[j * 3 + 1];
                        linePos[lineIdx++] = posArray[j * 3 + 2];
                    }
                }
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;
            lineMesh.geometry.setDrawRange(0, lineIdx / 3);
            lineMesh.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        }

        animate();
    }

    // ----------------------------------------------------------
    // MODE B: PURE 3D PERSPECTIVE CANVAS ENGINE (FALLBACK)
    // ----------------------------------------------------------
    function initCanvas3D() {
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const FOV = 450;
        const numPoints = 90;
        const points = [];

        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: (Math.random() - 0.5) * width * 1.5,
                y: (Math.random() - 0.5) * height * 1.5,
                z: Math.random() * 800 + 100,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                vz: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2.2 + 1.2
            });
        }

        let angle = 0;
        function render() {
            requestAnimationFrame(render);
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            const cx = width / 2 + mouse.x * 60;
            const cy = height / 2 - mouse.y * 60;
            angle += 0.008;

            const projected = [];

            for (let i = 0; i < numPoints; i++) {
                const p = points[i];
                p.x += p.vx;
                p.y += p.vy;
                p.z += p.vz;

                if (p.z <= 20) p.z = 800;
                if (p.z > 800) p.z = 21;
                if (Math.abs(p.x) > width) p.vx *= -1;
                if (Math.abs(p.y) > height) p.vy *= -1;

                const scale = FOV / (FOV + p.z);
                const projX = cx + p.x * scale;
                const projY = cy + p.y * scale;

                projected.push({ x: projX, y: projY, scale, z: p.z });

                // Draw point
                ctx.beginPath();
                ctx.arc(projX, projY, p.radius * scale * 1.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${Math.min(1, scale * 1.4)})`;
                ctx.shadowColor = "#06b6d4";
                ctx.shadowBlur = 8;
                ctx.fill();
            }

            // Draw connecting lines
            ctx.shadowBlur = 0;
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const dx = projected[i].x - projected[j].x;
                    const dy = projected[i].y - projected[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        const alpha = (1 - dist / 100) * 0.25;
                        ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(projected[i].x, projected[i].y);
                        ctx.lineTo(projected[j].x, projected[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        render();
    }

    // Initialize with Three.js or fallback to Canvas 3D
    loadThreeScript((success) => {
        if (success && window.THREE) {
            try {
                initThreeJS();
                console.log("SYNC AI: 3D WebGL Three.js background active.");
            } catch (e) {
                console.warn("Three.js WebGL error, fallback to 3D Canvas:", e);
                initCanvas3D();
            }
        } else {
            console.log("SYNC AI: 3D Perspective Canvas background active.");
            initCanvas3D();
        }
    });

})();
