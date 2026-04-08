/* ================================================
   KAHO TSANG — PORTFOLIO
   Interactive Experience Engine
   ================================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// THREE.JS 3D HERO BACKGROUND - REALISTIC WHITE HOLE
// Based on General Relativity: Time-reversed black hole
// - One-way horizon (reversed): matter ejected OUT, nothing falls in
// - Singularity in the past: central source from which worldlines emerge
// - Unstable under perturbations: chaotic, growing instabilities
// - Ambient matter quenching: external matter accumulates at horizon
// ============================================
class HeroBackground3D {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas || typeof THREE === 'undefined') return;
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mainModel = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.clock = new THREE.Clock();
        
        // White hole instability parameters
        this.instabilityPhase = 0;
        this.burstTimer = 0;
        this.burstIntensity = 1;
        
        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 55;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create the white hole
        this.createWhiteHole();
        
        // Events
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Start animation
        this.animate();
    }

    createWhiteHole() {
        const group = new THREE.Group();
        
        // ========== THE SINGULARITY (Past Singularity) ==========
        // The source from which all worldlines emerge - intensely bright
        const singularityGeometry = new THREE.SphereGeometry(1.2, 32, 32);
        const singularityMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: false
        });
        const singularity = new THREE.Mesh(singularityGeometry, singularityMaterial);
        group.add(singularity);
        
        // Inner corona - the immediate emission zone
        const corona1Geometry = new THREE.SphereGeometry(2.0, 32, 32);
        const corona1Material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const corona1 = new THREE.Mesh(corona1Geometry, corona1Material);
        group.add(corona1);
        
        // Outer corona - softer glow representing emitted light
        const corona2Geometry = new THREE.SphereGeometry(3.5, 32, 32);
        const corona2Material = new THREE.MeshBasicMaterial({
            color: 0xfffef0,
            transparent: true,
            opacity: 0.4
        });
        const corona2 = new THREE.Mesh(corona2Geometry, corona2Material);
        group.add(corona2);
        
        // ========== PAST HORIZON (One-way boundary - reversed) ==========
        // The horizon from which matter emerges - visualized as a shell
        const horizonGeometry = new THREE.SphereGeometry(6, 64, 64);
        const horizonMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.05,
            wireframe: true
        });
        const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
        group.add(horizon);
        
        // ========== ACCUMULATED AMBIENT MATTER ==========
        // External matter that piles up trying to "fall in" but can't
        // This represents the instability/quenching effect
        const ambientParticleCount = 150;
        const ambientGeometry = new THREE.BufferGeometry();
        const ambientPositions = new Float32Array(ambientParticleCount * 3);
        const ambientVelocities = new Float32Array(ambientParticleCount * 3);
        const ambientPhases = new Float32Array(ambientParticleCount);
        
        for (let i = 0; i < ambientParticleCount; i++) {
            // Ambient matter hovers just outside the horizon (can't enter)
            const radius = 7 + Math.random() * 4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            ambientPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            ambientPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            ambientPositions[i * 3 + 2] = radius * Math.cos(phi);
            
            // Slow orbital/drift motion (matter trying to approach but repelled)
            ambientVelocities[i * 3] = (Math.random() - 0.5) * 0.01;
            ambientVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            ambientVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
            
            ambientPhases[i] = Math.random() * Math.PI * 2;
        }
        
        ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
        
        const ambientMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.12,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        
        const ambientParticles = new THREE.Points(ambientGeometry, ambientMaterial);
        group.add(ambientParticles);
        
        // ========== EJECTED MATTER (Primary outflow) ==========
        // Matter being expelled from the white hole - the main visual
        const ejectaCount = 300;
        const ejectaGeometry = new THREE.BufferGeometry();
        const ejectaPositions = new Float32Array(ejectaCount * 3);
        const ejectaVelocities = new Float32Array(ejectaCount * 3);
        const ejectaSpeeds = new Float32Array(ejectaCount);
        const ejectaAges = new Float32Array(ejectaCount);
        
        for (let i = 0; i < ejectaCount; i++) {
            this.initEjectaParticle(i, ejectaPositions, ejectaVelocities, ejectaSpeeds, ejectaAges);
        }
        
        ejectaGeometry.setAttribute('position', new THREE.BufferAttribute(ejectaPositions, 3));
        
        const ejectaMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.18,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });
        
        const ejectaParticles = new THREE.Points(ejectaGeometry, ejectaMaterial);
        group.add(ejectaParticles);
        
        // ========== LIGHT RAYS (Radial emission lines) ==========
        // Representing photons escaping from the white hole
        const rayCount = 24;
        const rays = [];
        
        for (let i = 0; i < rayCount; i++) {
            const theta = (i / rayCount) * Math.PI * 2;
            const phi = Math.acos(2 * (i % 6) / 6 - 1);
            
            const rayGeometry = new THREE.BufferGeometry();
            const rayPositions = new Float32Array(6); // 2 points
            
            // Ray starts near singularity, extends outward
            const dir = new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta),
                Math.sin(phi) * Math.sin(theta),
                Math.cos(phi)
            ).normalize();
            
            rayPositions[0] = dir.x * 2;
            rayPositions[1] = dir.y * 2;
            rayPositions[2] = dir.z * 2;
            rayPositions[3] = dir.x * 8;
            rayPositions[4] = dir.y * 8;
            rayPositions[5] = dir.z * 8;
            
            rayGeometry.setAttribute('position', new THREE.BufferAttribute(rayPositions, 3));
            
            const rayMaterial = new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.15
            });
            
            const ray = new THREE.Line(rayGeometry, rayMaterial);
            ray.userData = { baseOpacity: 0.15, phase: Math.random() * Math.PI * 2 };
            rays.push(ray);
            group.add(ray);
        }
        
        // ========== INSTABILITY SHELL ==========
        // Visualizes the unstable nature - perturbations that grow
        const instabilityGeometry = new THREE.IcosahedronGeometry(5, 2);
        const instabilityMaterial = new THREE.MeshBasicMaterial({
            color: 0xc9a227,
            wireframe: true,
            transparent: true,
            opacity: 0.08
        });
        const instabilityShell = new THREE.Mesh(instabilityGeometry, instabilityMaterial);
        group.add(instabilityShell);
        
        // Outer geometric frame
        const outerGeometry = new THREE.IcosahedronGeometry(18, 1);
        const outerMaterial = new THREE.MeshBasicMaterial({
            color: 0xc9a227,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
        group.add(outerMesh);
        
        // Middle frame
        const middleGeometry = new THREE.IcosahedronGeometry(14, 1);
        const middleMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.08
        });
        const middleMesh = new THREE.Mesh(middleGeometry, middleMaterial);
        middleMesh.rotation.x = Math.PI / 4;
        middleMesh.rotation.z = Math.PI / 4;
        group.add(middleMesh);
        
        // Store references
        this.singularity = singularity;
        this.corona1 = corona1;
        this.corona2 = corona2;
        this.horizon = horizon;
        this.ambientParticles = ambientParticles;
        this.ambientVelocities = ambientVelocities;
        this.ambientPhases = ambientPhases;
        this.ejectaParticles = ejectaParticles;
        this.ejectaVelocities = ejectaVelocities;
        this.ejectaSpeeds = ejectaSpeeds;
        this.ejectaAges = ejectaAges;
        this.rays = rays;
        this.instabilityShell = instabilityShell;
        this.outerMesh = outerMesh;
        this.middleMesh = middleMesh;
        
        this.mainModel = group;
        this.scene.add(this.mainModel);
    }
    
    initEjectaParticle(i, positions, velocities, speeds, ages) {
        // Particles spawn from the singularity region
        const spawnRadius = 0.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = spawnRadius * Math.sin(phi) * Math.cos(theta);
        const y = spawnRadius * Math.sin(phi) * Math.sin(theta);
        const z = spawnRadius * Math.cos(phi);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // Velocity pointing OUTWARD (white hole ejects matter)
        // Add some randomness for instability
        const baseSpeed = 0.03 + Math.random() * 0.05;
        const instabilityFactor = 1 + (Math.random() - 0.5) * 0.4;
        const speed = baseSpeed * instabilityFactor;
        
        const norm = Math.sqrt(x*x + y*y + z*z);
        velocities[i * 3] = (x / norm) * speed;
        velocities[i * 3 + 1] = (y / norm) * speed;
        velocities[i * 3 + 2] = (z / norm) * speed;
        
        speeds[i] = speed;
        ages[i] = Math.random(); // Stagger initial ages
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(e) {
        this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        const elapsedTime = this.clock.getElapsedTime();
        const deltaTime = this.clock.getDelta();
        
        // Update instability phase (grows over time, representing GR instability)
        this.instabilityPhase += deltaTime * 0.5;
        
        // Random burst intensity (unstable ejection)
        this.burstTimer += deltaTime;
        if (this.burstTimer > 0.5 + Math.random() * 1.5) {
            this.burstIntensity = 0.8 + Math.random() * 0.6;
            this.burstTimer = 0;
        }
        
        if (this.mainModel) {
            // Smooth rotation following mouse
            this.targetRotationY = this.mouseX * 0.4;
            this.targetRotationX = this.mouseY * 0.25;
            
            this.mainModel.rotation.y += (this.targetRotationY - this.mainModel.rotation.y) * 0.05;
            this.mainModel.rotation.x += (this.targetRotationX - this.mainModel.rotation.x) * 0.05;
            
            // Slow base rotation
            this.mainModel.rotation.z = elapsedTime * 0.03;
            
            // ========== SINGULARITY PULSING ==========
            // Irregular pulsing representing instability
            const pulse = 1 + Math.sin(elapsedTime * 3) * 0.1 + 
                         Math.sin(elapsedTime * 7.3) * 0.05 +
                         Math.sin(elapsedTime * 11.7) * 0.03;
            
            if (this.singularity) {
                this.singularity.scale.setScalar(pulse);
            }
            
            if (this.corona1) {
                this.corona1.scale.setScalar(pulse * 1.1);
                this.corona1.material.opacity = 0.7 + Math.sin(elapsedTime * 5) * 0.15;
            }
            
            if (this.corona2) {
                this.corona2.scale.setScalar(pulse * 1.15);
                this.corona2.material.opacity = 0.35 + Math.sin(elapsedTime * 3.7) * 0.1;
            }
            
            // ========== HORIZON BREATHING ==========
            if (this.horizon) {
                // Subtle instability in the horizon
                const horizonPulse = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
                this.horizon.scale.setScalar(horizonPulse);
                this.horizon.rotation.y = elapsedTime * 0.1;
            }
            
            // ========== EJECTED MATTER ANIMATION ==========
            if (this.ejectaParticles) {
                const positions = this.ejectaParticles.geometry.attributes.position.array;
                
                for (let i = 0; i < positions.length / 3; i++) {
                    // Move particles outward
                    positions[i * 3] += this.ejectaVelocities[i * 3] * this.burstIntensity;
                    positions[i * 3 + 1] += this.ejectaVelocities[i * 3 + 1] * this.burstIntensity;
                    positions[i * 3 + 2] += this.ejectaVelocities[i * 3 + 2] * this.burstIntensity;
                    
                    this.ejectaAges[i] += deltaTime;
                    
                    // Calculate distance from center
                    const dist = Math.sqrt(
                        positions[i * 3] ** 2 + 
                        positions[i * 3 + 1] ** 2 + 
                        positions[i * 3 + 2] ** 2
                    );
                    
                    // Reset particle when it gets too far (continuous ejection)
                    if (dist > 20 || this.ejectaAges[i] > 3) {
                        this.initEjectaParticle(
                            i, 
                            positions, 
                            this.ejectaVelocities, 
                            this.ejectaSpeeds, 
                            this.ejectaAges
                        );
                    }
                }
                
                this.ejectaParticles.geometry.attributes.position.needsUpdate = true;
            }
            
            // ========== AMBIENT MATTER (trying to fall in, but can't) ==========
            if (this.ambientParticles) {
                const positions = this.ambientParticles.geometry.attributes.position.array;
                
                for (let i = 0; i < positions.length / 3; i++) {
                    const x = positions[i * 3];
                    const y = positions[i * 3 + 1];
                    const z = positions[i * 3 + 2];
                    
                    const dist = Math.sqrt(x*x + y*y + z*z);
                    
                    // Orbital drift + gentle push outward (can't enter white hole)
                    const repulsion = 0.001 / (dist * dist);
                    positions[i * 3] += this.ambientVelocities[i * 3] + (x/dist) * repulsion;
                    positions[i * 3 + 1] += this.ambientVelocities[i * 3 + 1] + (y/dist) * repulsion;
                    positions[i * 3 + 2] += this.ambientVelocities[i * 3 + 2] + (z/dist) * repulsion;
                    
                    // Oscillate slightly (hovering at horizon boundary)
                    const phase = this.ambientPhases[i];
                    positions[i * 3] += Math.sin(elapsedTime * 2 + phase) * 0.005;
                    positions[i * 3 + 1] += Math.cos(elapsedTime * 1.7 + phase) * 0.005;
                    
                    // Keep within bounds
                    const newDist = Math.sqrt(
                        positions[i * 3] ** 2 + 
                        positions[i * 3 + 1] ** 2 + 
                        positions[i * 3 + 2] ** 2
                    );
                    
                    if (newDist < 6.5 || newDist > 14) {
                        // Reset to hovering zone
                        const radius = 7 + Math.random() * 4;
                        const theta = Math.random() * Math.PI * 2;
                        const phi = Math.acos(2 * Math.random() - 1);
                        
                        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                        positions[i * 3 + 2] = radius * Math.cos(phi);
                    }
                }
                
                this.ambientParticles.geometry.attributes.position.needsUpdate = true;
            }
            
            // ========== LIGHT RAYS ANIMATION ==========
            if (this.rays) {
                this.rays.forEach((ray, i) => {
                    // Flickering opacity (photon emission)
                    const flicker = Math.sin(elapsedTime * 8 + ray.userData.phase) * 0.5 + 0.5;
                    ray.material.opacity = ray.userData.baseOpacity * (0.5 + flicker * 0.5);
                });
            }
            
            // ========== INSTABILITY SHELL ==========
            if (this.instabilityShell) {
                // Growing perturbations (GR predicts instability)
                const instabilityScale = 1 + Math.sin(this.instabilityPhase) * 0.1 + 
                                        Math.sin(this.instabilityPhase * 2.3) * 0.05;
                this.instabilityShell.scale.setScalar(instabilityScale);
                this.instabilityShell.rotation.x = elapsedTime * 0.2;
                this.instabilityShell.rotation.y = elapsedTime * 0.15;
                
                // Opacity fluctuates
                this.instabilityShell.material.opacity = 0.06 + Math.sin(elapsedTime * 4) * 0.03;
            }
            
            // ========== OUTER FRAMES ==========
            if (this.outerMesh) {
                this.outerMesh.rotation.x = elapsedTime * 0.08;
                this.outerMesh.rotation.y = elapsedTime * 0.06;
            }
            
            if (this.middleMesh) {
                this.middleMesh.rotation.x = Math.PI / 4 + elapsedTime * -0.1;
                this.middleMesh.rotation.y = elapsedTime * 0.08;
            }
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// ============================================
// PRELOADER
// ============================================
class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.counter = document.getElementById('counter');
        this.progress = document.getElementById('preloader-progress');
        this.preloaderName = document.querySelector('.preloader-name');
        this.preloaderSurname = document.querySelector('.preloader-surname');
        this.count = 0;
        this.init();
    }

    init() {
        // Animate preloader text in
        gsap.to([this.preloaderName, this.preloaderSurname], {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.3
        });

        // Simulate loading progress
        this.simulateLoading();
    }

    simulateLoading() {
        const interval = setInterval(() => {
            this.count += Math.floor(Math.random() * 10) + 1;
            
            if (this.count >= 100) {
                this.count = 100;
                clearInterval(interval);
                this.complete();
            }
            
            this.counter.textContent = this.count;
            this.progress.style.width = `${this.count}%`;
        }, 50);
    }

    complete() {
        const tl = gsap.timeline();

        tl.to([this.preloaderName, this.preloaderSurname], {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
            stagger: 0.05
        })
        .to(this.preloader, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut'
        }, '-=0.2')
        .add(() => {
            this.preloader.style.display = 'none';
            document.body.style.overflow = '';
            // Trigger hero animations
            window.dispatchEvent(new CustomEvent('preloaderComplete'));
        });
    }
}

// ============================================
// CUSTOM CURSOR
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorDot = this.cursor.querySelector('.cursor-dot');
        this.cursorCircle = this.cursor.querySelector('.cursor-circle');
        this.cursorText = this.cursor.querySelector('.cursor-text');
        
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        // Check if device has touch
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
            return;
        }

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.setupHoverEffects();
        this.animate();
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    setupHoverEffects() {
        // Magnetic elements
        document.querySelectorAll('[data-cursor="magnetic"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('is-magnetic');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('is-magnetic');
            });
        });

        // View elements
        document.querySelectorAll('[data-cursor="view"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('is-view');
                this.cursorText.textContent = 'View';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('is-view');
                this.cursorText.textContent = '';
            });
        });

        // Drag elements
        document.querySelectorAll('[data-cursor="drag"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('is-view');
                this.cursorText.textContent = 'Drag';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('is-view');
                this.cursorText.textContent = '';
            });
        });

        // Links and buttons
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('is-hovering');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('is-hovering');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.classList.add('is-hidden');
        });
        document.addEventListener('mouseenter', () => {
            this.cursor.classList.remove('is-hidden');
        });
    }

    animate() {
        // Instant movement - no lag
        this.cursorDot.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px) translate(-50%, -50%)`;
        this.cursorCircle.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px) translate(-50%, -50%)`;
        this.cursorText.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px) translate(-50%, -50%)`;

        requestAnimationFrame(this.animate.bind(this));
    }
}

// ============================================
// MAGNETIC EFFECT
// ============================================
class MagneticEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-cursor="magnetic"]');
        this.init();
    }

    init() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.onMouseMove(e, el));
            el.addEventListener('mouseleave', (e) => this.onMouseLeave(e, el));
        });
    }

    onMouseMove(e, el) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out'
        });
    }

    onMouseLeave(e, el) {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)'
        });
    }
}

// ============================================
// NAVIGATION
// ============================================
class Navigation {
    constructor() {
        this.nav = document.getElementById('nav');
        this.menuBtn = document.getElementById('menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-link');
        this.isMenuOpen = false;
        this.lastScrollTop = 0;
        
        this.init();
    }

    init() {
        // Scroll detection
        window.addEventListener('scroll', this.onScroll.bind(this));
        
        // Mobile menu toggle
        this.menuBtn.addEventListener('click', this.toggleMenu.bind(this));
        
        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.onLinkClick(e, link));
        });
    }

    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background when scrolled
        if (scrollTop > 100) {
            this.nav.classList.add('is-scrolled');
        } else {
            this.nav.classList.remove('is-scrolled');
        }
        
        this.lastScrollTop = scrollTop;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.mobileMenu.classList.toggle('is-active', this.isMenuOpen);
        this.menuBtn.classList.toggle('is-active', this.isMenuOpen);
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        
        // Animate menu lines
        const lines = this.menuBtn.querySelectorAll('.menu-line');
        if (this.isMenuOpen) {
            gsap.to(lines[0], { rotation: 45, y: 4, duration: 0.3 });
            gsap.to(lines[1], { rotation: -45, y: -4, duration: 0.3 });
        } else {
            gsap.to(lines, { rotation: 0, y: 0, duration: 0.3 });
        }
    }

    onLinkClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        
        if (this.isMenuOpen) {
            this.toggleMenu();
        }
        
        if (targetEl) {
            gsap.to(window, {
                scrollTo: { y: targetEl, offsetY: 80 },
                duration: 1.2,
                ease: 'power3.inOut'
            });
        }
    }
}

// ============================================
// HERO ANIMATIONS
// ============================================
class HeroAnimations {
    constructor() {
        this.titleWords = document.querySelectorAll('.title-word');
        this.taglineWords = document.querySelectorAll('.tagline-word');
        this.stats = document.querySelectorAll('.stat');
        this.heroIntro = document.querySelector('.hero-intro');
        this.heroImage = document.querySelector('.hero-image-wrapper');
        this.heroScroll = document.querySelector('.hero-scroll');
        
        // Set initial states immediately
        this.setInitialStates();
        
        window.addEventListener('preloaderComplete', this.animate.bind(this));
    }

    setInitialStates() {
        // Elements start hidden but ready
        gsap.set(this.heroIntro, { opacity: 0, y: 30 });
        gsap.set(this.titleWords, { y: '100%', opacity: 0 });
        gsap.set(this.taglineWords, { y: 20, opacity: 0 });
        gsap.set(this.stats, { opacity: 0, y: 20 });
        if (this.heroImage) gsap.set(this.heroImage, { opacity: 0, y: 30 });
        if (this.heroScroll) gsap.set(this.heroScroll, { opacity: 0 });
    }

    animate() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Intro elements
        tl.to(this.heroIntro, { opacity: 1, y: 0, duration: 0.8 });

        // Title words with stagger
        tl.to(this.titleWords, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out'
        }, '-=0.4');

        // Tagline words
        tl.to(this.taglineWords, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03
        }, '-=0.5');

        // Stats
        tl.to(this.stats, {
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.1
        }, '-=0.3');

        // Hero image
        if (this.heroImage) {
            tl.to(this.heroImage, {
                opacity: 1, 
                y: 0, 
                duration: 0.8
            }, '-=0.5');
        }

        // Scroll indicator
        if (this.heroScroll) {
            tl.to(this.heroScroll, {
                opacity: 1, 
                duration: 0.4
            }, '-=0.2');
        }
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // About lead text - split by words
        const aboutLead = document.querySelector('.about-lead');
        if (aboutLead) {
            const words = aboutLead.textContent.split(' ');
            aboutLead.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
            
            gsap.fromTo(aboutLead.querySelectorAll('.word'),
                { opacity: 0.2 },
                {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.02,
                    scrollTrigger: {
                        trigger: aboutLead,
                        start: 'top 70%',
                        end: 'bottom 50%',
                        scrub: 1
                    }
                }
            );
        }

        // About details columns
        gsap.utils.toArray('.about-column').forEach((col, i) => {
            gsap.fromTo(col,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: col,
                        start: 'top 80%'
                    }
                }
            );
        });

        // Visual card
        const visualCard = document.querySelector('.visual-card');
        if (visualCard) {
            gsap.fromTo(visualCard,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: visualCard,
                        start: 'top 80%'
                    }
                }
            );
        }

        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%'
                    }
                }
            );
        });

        // Project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        });

        // Contact section
        const contactTitle = document.querySelector('.contact-title');
        if (contactTitle) {
            gsap.fromTo(contactTitle.querySelectorAll('.contact-title-line'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contactTitle,
                        start: 'top 80%'
                    }
                }
            );
        }

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            gsap.fromTo(contactForm,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contactForm,
                        start: 'top 80%'
                    }
                }
            );
        }
    }
}

// ============================================
// PARALLAX EFFECTS
// ============================================
class ParallaxEffects {
    constructor() {
        // Disabled - was causing hero content to overlap marquee
        // this.init();
    }

    init() {
        // Parallax removed for cleaner scroll behavior
    }
}

// ============================================
// FORM HANDLING
// ============================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.message = document.getElementById('form-message');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    async onSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = this.form.querySelector('.form-submit');
        const originalText = submitBtn.querySelector('.submit-text').textContent;
        submitBtn.querySelector('.submit-text').textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        try {
            await this.simulateSubmit(data);
            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Something went wrong. Please try again or email me directly.', 'error');
        } finally {
            submitBtn.querySelector('.submit-text').textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateSubmit(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Log data for development
                console.log('Form submission:', data);
                resolve();
            }, 1500);
        });
    }

    showMessage(text, type) {
        this.message.textContent = text;
        this.message.className = `form-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.message.className = 'form-message';
        }, 5000);
    }
}

// ============================================
// TIME DISPLAY
// ============================================
class TokyoTime {
    constructor() {
        this.element = document.getElementById('tokyo-time');
        if (this.element) {
            this.update();
            setInterval(this.update.bind(this), 1000);
        }
    }

    update() {
        const options = {
            timeZone: 'Asia/Tokyo',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        const time = new Date().toLocaleTimeString('en-US', options);
        this.element.textContent = `JST ${time}`;
    }
}

// ============================================
// IMAGE LAZY LOADING
// ============================================
class ImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        this.images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }
}

// ============================================
// TECH ITEM HOVER EFFECTS
// ============================================
class TechItemEffects {
    constructor() {
        this.items = document.querySelectorAll('.tech-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// ============================================
// MARQUEE PAUSE ON HOVER
// ============================================
class MarqueeEffect {
    constructor() {
        this.marquee = document.querySelector('.hero-marquee');
        this.track = document.querySelector('.marquee-track');
        
        if (this.marquee && this.track) {
            this.init();
        }
    }

    init() {
        this.marquee.addEventListener('mouseenter', () => {
            this.track.style.animationPlayState = 'paused';
        });
        
        this.marquee.addEventListener('mouseleave', () => {
            this.track.style.animationPlayState = 'running';
        });
    }
}

// ============================================
// SMOOTH REVEAL FOR SECTIONS
// ============================================
class SectionReveal {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        this.sections.forEach(section => {
            gsap.fromTo(section,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }
}

// ============================================
// STAT NUMBER ANIMATION
// ============================================
class StatAnimation {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.animated = new Set();
        this.init();
    }

    init() {
        this.stats.forEach(stat => {
            const originalText = stat.textContent;
            const numericValue = parseInt(originalText);
            const suffix = originalText.replace(/[0-9]/g, '');
            
            if (!isNaN(numericValue)) {
                ScrollTrigger.create({
                    trigger: stat,
                    start: 'top 80%',
                    onEnter: () => {
                        if (!this.animated.has(stat)) {
                            this.animateNumber(stat, numericValue, suffix);
                            this.animated.add(stat);
                        }
                    }
                });
            }
        });
    }

    animateNumber(element, target, suffix) {
        const obj = { value: 0 };
        gsap.to(obj, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                element.textContent = Math.round(obj.value) + suffix;
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';
    
    // Initialize all modules
    new HeroBackground3D();
    new Preloader();
    new CustomCursor();
    new MagneticEffect();
    new Navigation();
    new HeroAnimations();
    new ScrollAnimations();
    new ParallaxEffects();
    new ContactForm();
    new TokyoTime();
    new ImageLoader();
    new TechItemEffects();
    new MarqueeEffect();
    new SectionReveal();
    new StatAnimation();
    
    // Set current year
    const yearElements = document.querySelectorAll('[data-year]');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle utility
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll event
const optimizedScroll = throttle(() => {
    ScrollTrigger.update();
}, 100);

window.addEventListener('scroll', optimizedScroll, { passive: true });

// Handle resize
const optimizedResize = debounce(() => {
    ScrollTrigger.refresh();
}, 250);

window.addEventListener('resize', optimizedResize);

// Clean up on page leave
window.addEventListener('beforeunload', () => {
    ScrollTrigger.killAll();
});