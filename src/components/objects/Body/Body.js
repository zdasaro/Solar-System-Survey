import { Group, SphereGeometry, MeshBasicMaterial, Mesh, Vector3, Matrix3, LineBasicMaterial, BufferGeometry, Line, TextureLoader, NearestFilter, MeshPhongMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Body extends Group {
    
    constructor(scene, parent, parameters) {
        // Call parent Group() constructor
        super();

        let radius = 0.25 // temporary parameter
        const geometry = new SphereGeometry(radius,32,32);
        let material = new MeshBasicMaterial({color: 0xffff00});
        if (parameters.id === "terra_moon") {
            material = new MeshBasicMaterial({color: 0xff0000});
        } else if (parameters.id === "terra") {
            const texture = new TextureLoader().load('src/img/8k_earth_daymap.jpg');
            texture.minFilter = NearestFilter;
            // material = new MeshBasicMaterial({
            material = new MeshPhongMaterial({
                map: texture
            });
        }
        const sphere = new Mesh(geometry, material);
        this.add(sphere);

        // Add self to scene's update list
        scene.addToUpdateList(this);

        function degToRad(angle) {
            return angle * Math.PI / 180;
        }

        this.a = parameters.a; // semi-major axis in AU
        this.e = parameters.e; // eccentricity
        this.i = degToRad(parameters.i); // inclination
        this.o = degToRad(parameters.o); // longitude of ascending node
        this.w = degToRad(parameters.w); // argument of perihelion
        this.m = degToRad(parameters.m); // mean anomaly at J2000
        this.bodyid = parameters.id; // body name

        // Calculate Equatorial Position Vector 
        this.eqPosition = function(daysSinceJ2000) {
            let n = 0.01720209894 * Math.sqrt(1.0 / Math.pow(this.a, 3));
            let mNow = n * daysSinceJ2000 + this.m;

            // Use Newton's Method to approximate E (true anomaly)
            let Eguess = mNow;
            let Mguess = Eguess - this.e * Math.sin(Eguess);
            while (Math.abs(Mguess - mNow) > 1e-004) {
                Eguess = Eguess - (mNow - (Eguess - this.e * Math.sin(Eguess))) / (this.e * Math.cos(Eguess) - 1)
                Mguess = Eguess - this.e * Math.sin(Eguess)
            }
            
            // Calculate cartesian vector position based on a, e, and E
            let x = (this.a * Math.cos(Eguess)) - (this.a * this.e);
            let y = this.a * Math.sqrt(1 - this.e * this.e) * Math.sin(Eguess);
            let z = 0
            let posVector = new Vector3(x, y, z);

            // Calculate ecliptic vector position
            let m1 = new Matrix3();
            m1.set(Math.cos(this.o), -Math.sin(this.o), 0,
                            Math.sin(this.o), Math.cos(this.o), 0,
                            0, 0, 1);

            let m2 = new Matrix3();
            m2.set(1, 0, 0,
                    0, Math.cos(this.i), -Math.sin(this.i),
                    0, Math.sin(this.i), Math.cos(this.i));

            let m3 = new Matrix3();
            m3.set(Math.cos(this.w), -Math.sin(this.w), 0,
                Math.sin(this.w), Math.cos(this.w), 0,
                0, 0, 1);
            
            m1.multiply(m2).multiply(m3);
            posVector.applyMatrix3(m1);

            return new Vector3(posVector.x, posVector.z, posVector.y);
        }

        this.auToWorldUnits = 10; // 1 AU is how many world units
        this.lengthTimeSlice = 0.1; // in days
        this.orbitPositions = [] // Orbit positions for each day

        this.orbitalPeriod = Math.sqrt(Math.pow(this.a, 3) / parameters.parentMass) * 365.25; // in days
        let numTimeSlices = Math.floor(this.orbitalPeriod / this.lengthTimeSlice);
        for (let i = 0; i < numTimeSlices; i++) {
            this.orbitPositions.push(this.eqPosition(i * this.lengthTimeSlice).multiplyScalar(this.auToWorldUnits))
        }

        let orbitPathLineMaterial = new LineBasicMaterial({color: 0xffffff});
        let orbitPathLineGeo = new BufferGeometry().setFromPoints(this.orbitPositions);
        this.orbitPathLine = new Line(orbitPathLineGeo, orbitPathLineMaterial);
        this.parent = parent;
    }

    toggleOrbitPathLine(showOrbitPathLines) {
        if (showOrbitPathLines) {
            this.parent.add(this.orbitPathLine);
        }
        else {
            this.parent.remove(this.orbitPathLine);
        }
    }

    getOrbitPosition(jd) {
        let jd2000 = 2451545 // Jan 1, 2000 12:00 noon UTC
        let currentTime = jd - jd2000;

        let timeInPeriod = currentTime % this.orbitalPeriod;
        if (timeInPeriod < 0) {
            timeInPeriod = timeInPeriod + this.orbitalPeriod;
        }
        let index = Math.round(timeInPeriod / this.lengthTimeSlice) % this.orbitPositions.length;
        return this.orbitPositions[index];
    }

    update(timeStamp) {
        let posVector = this.getOrbitPosition(timeStamp)
        this.position.x = posVector.x;
        this.position.y = posVector.y;
        this.position.z = posVector.z;
    }
}

export default Body;