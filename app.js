function latLongToXZ(lat, long, originLat, originLong) {
    const latDiff = lat - originLat;
    const longDiff = long - originLong;

    const x = longDiff * 111320 * Math.cos(originLat * Math.PI / 180); // Convert longitude difference to meters
    const z = latDiff * 111320; // Convert latitude difference to meters

    return { x, z };
}

const originLat = 10.767278; // Latitude of corner 1
const originLong = 78.813397; // Longitude of corner 1

// Other corners
const corner2 = { lat: 10.767559, long: 78.813377 };
const corner3 = { lat: 10.767347, long: 78.814065 };
const corner4 = { lat: 10.767636, long: 78.814041 };

// User's current position
const userLat = 10.7674534;
const userLong = 78.8136162;

const userPosition = latLongToXZ(userLat, userLong, originLat, originLong);
console.log(userPosition);  // { x: userX, z: userZ }

const corner2Position = latLongToXZ(corner2.lat, corner2.long, originLat, originLong);
const corner3Position = latLongToXZ(corner3.lat, corner3.long, originLat, originLong);
const corner4Position = latLongToXZ(corner4.lat, corner4.long, originLat, originLong);

        let scene, camera, renderer, userMarker;

        // Initialize Three.js scene
        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 20, 50);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // Platform (Representing the area enclosed by your 4 coordinates)
            const geometry = new THREE.PlaneGeometry(100, 100); // Adjust size to match your platform
            const material = new THREE.MeshBasicMaterial({ color: 0xCCCCCC, side: THREE.DoubleSide });
            const platform = new THREE.Mesh(geometry, material);
            platform.rotation.x = -Math.PI / 2; // Lay flat on the ground
            scene.add(platform);

            // Create a marker for the user position
            const markerGeometry = new THREE.ConeGeometry(1, 2, 3);
            const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            userMarker = new THREE.Mesh(markerGeometry, markerMaterial);
            scene.add(userMarker);

            // Convert lat/long to X, Z and update user marker position
            function updateUserPosition(x, z) {
                userMarker.position.set(x, 1, z);  // y=1 to position it above the platform
            }

            // Set user's GPS position (example values)
            const userPosition = { x: 23, z: 15 }; // Replace with real converted values
            updateUserPosition(userPosition.x, userPosition.z);

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }

            animate();
        }

        // Initialize the scene
        init();