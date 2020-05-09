import { Group, SphereGeometry, MeshBasicMaterial, Mesh, Vector3, Matrix3, LineBasicMaterial, BufferGeometry, Line, TextureLoader, NearestFilter, MeshPhongMaterial, Vector2, Color, PlaneGeometry, DoubleSide, RingGeometry, Geometry, Face3, RingBufferGeometry, Texture, MeshLambertMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import earthTexture from '../../../img/earth/Earth.png';
import earthNormal from '../../../img/earth/Earth-normal-8k.png';
import earthSpec from '../../../img/earth/EarthSpec.png';
import mercuryTexture from '../../../img/mercury.jpg';
import venusTexture from '../../../img/venus/4k_venus_atmosphere.jpg';
import marsTexture from '../../../img/mars/Mars_4k.png';
import marsNormal from '../../../img/mars/MarsNormal.png';
import jupiterTexture from '../../../img/jupiter/Jupiter.png';
import saturnTexture from '../../../img/saturn/8k_saturn.jpg';
import saturnRing from '../../../img/saturn/SatRing.png';
import uranusTexture from '../../../img/uranus/UranusJVV.png';
import neptuneTexture from '../../../img/neptune/neptune2k.jpg';
import earthMoonTexture from '../../../img/earth/moon/moon-4k.png';
import earthMoonNormal from '../../../img/earth/moon/moon_normal.jpg';
import callistoTexture from '../../../img/jupiter/moons/Callisto.png';
import callistoNormal from '../../../img/jupiter/moons/CallistoNormal.png';
import europaTexture from '../../../img/jupiter/moons/Europa.png';
import ganymedeTexture from '../../../img/jupiter/moons/ganymede.jpg';
import ioTexture from '../../../img/jupiter/moons/Io.png';
import ioNormal from '../../../img/jupiter/moons/IoNormal.png';
import deimosModel from '../../../img/mars/moons/Deimos_1_1000.glb';
import phobosModel from '../../../img/mars/moons/Phobos_1_1000.glb';
import dioneTexture from '../../../img/saturn/moons/Dione.jpg';
import enceladusTexture from '../../../img/saturn/moons/Enceladus.png';
import hyperionModel from '../../../img/saturn/moons/Hyperion_1_1000.glb';
import iapetusTexture from '../../../img/saturn/moons/iapetus4kalb.jpg';
import mimasTexture from '../../../img/saturn/moons/mimas2kalb.jpg';
import rheaTexture from '../../../img/saturn/moons/rhea4kalb.jpg';
import tethysTexture from '../../../img/saturn/moons/tethys4kalb.jpg';
import titanTexture from '../../../img/saturn/moons/Titan.png';
import arielTexture from '../../../img/uranus/moons/Ariel-0.jpg';
import mirandaTexture from '../../../img/uranus/moons/miranda3.jpg';
import oberonTexture from '../../../img/uranus/moons/Oberonmap1.png';
import titaniaTexture from '../../../img/uranus/moons/titania.jpg';
import umbrielTexture from '../../../img/uranus/moons/Umbriel.png';
import tritonTexture from '../../../img/neptune/triton.jpg';



class Body extends Group {
    
    constructor(scene, parent, parameters, indexID) {
        // Call parent Group() constructor
        super();

        this.auToWorldUnits = 748000; // 1 AU is how many world units
        // Set the radius to be 600 times its real size. If the radius is less than 0.005 world units, set that as the floor
        let radius = parameters.radius * 6.6846e-9 * this.auToWorldUnits; // temporary parameter
        if (radius < 0.005) {
            radius = 0.005
        }

        this.type = parameters.type; // 0 for planet, 1 for moon, 2 for dwarf planet, 3 for asteroid, 4 for comet
        
        const geometry = new SphereGeometry(radius,32,32);
        let material = new MeshBasicMaterial({color: 0xffff00});
        let addons = []; // additional geometries (rings or clouds) to add to the planet
        this.isModel = false;
        switch (parameters.id) {
            // planets
            case "terra":
                material = this.createPhongMaterial(earthTexture, earthNormal,
                earthSpec, {
                    normalScale: new Vector2(3, 3),
                    specular: new Color(0x262626)
                });
                break;
            case "mercury":
                material = this.createPhongMaterial(mercuryTexture, undefined, undefined, {
                    shininess: 10
                });
                break;
            case "venus":
                material = this.createPhongMaterial(venusTexture, undefined, undefined, {
                    shininess: 5
                });
                break;
            case "mars":
                material = this.createPhongMaterial(marsTexture, marsNormal, undefined, {
                    normalScale: new Vector2(1.5, 1.5),
                    shininess: 5,
                    specular: new Color(0x262626)
                });
                break;
            case "jupiter":
                material = this.createPhongMaterial(jupiterTexture, undefined, undefined, {
                    shininess: 10
                });
                break;
            case "saturn":
                material = this.createPhongMaterial(saturnTexture, undefined, undefined, {
                    shininess: 2,
                    specular: new Color(0x060606)
                });

                // add rings
                // radius data from: https://nssdc.gsfc.nasa.gov/planetary/factsheet/satringfact.html
                const innerR = radius * 1.11;
                const outerR = radius * 2.27;
                const ringGeometry = this.makeRing(innerR, outerR);
                // var ringMaterial = new MeshBasicMaterial({color: 0xff0000, side: DoubleSide});
                // let ringTexture = new TextureLoader().load('https://i.postimg.cc/zz7Gr430/saturn-rings-top.png');
                let ringTexture = new TextureLoader().load(saturnRing);
                // let ringMaterial = new MeshPhongMaterial({
                let ringMaterial = new MeshLambertMaterial({
                    map: ringTexture,
                    side: DoubleSide,
                    transparent: true,
                    opacity: 1,
                    emissive: new Color(0x504D4D)
                })
                addons.push(new Mesh(ringGeometry, ringMaterial))
                break;
            case "uranus":
                material = this.createPhongMaterial(uranusTexture, undefined, undefined, {
                    shininess: 4,
                    specular: new Color(0x505050)
                });
                break;
            case "neptune":
                material = this.createPhongMaterial(neptuneTexture, undefined, undefined, {
                    shininess: 10
                });
                break;
            /////// moons
            // earth moon
            case "luna":
                material = this.createPhongMaterial(earthMoonTexture, earthMoonNormal, undefined, {
                    shininess: 4,
                    specular: new Color(0x333333)
                });
                break;
            // jupiter moons
            case "callisto":
                material = this.createPhongMaterial(callistoTexture, callistoNormal, undefined, {
                    shininess: 3,
                    specular: new Color(0x898989), // Callisto is very bright
                    normalScale: new Vector2(0.7, 0.7)
                });
                break;
            case "europa":
                material = this.createPhongMaterial(europaTexture, undefined, undefined, {
                    shininess: 8,
                    specular: new Color(0x211511) // red-orange tint
                });
                break;
            case "ganymede":
                material = this.createPhongMaterial(ganymedeTexture, undefined, undefined, {
                    shininess: 5,
                    specular: new Color(0x555555)
                });
                break;
            case "io":
                material = this.createPhongMaterial(ioTexture, ioNormal, undefined, {
                    specular: new Color(0x606022), // yellow tint
                    shininess: 5
                });
                break;
            // Mars moons
            case "deimos":
                this.loadModel(deimosModel, radius, {
                    // specular: new Color(0xB08060),
                    // color: new Color(0xB08060)
                });
                break;
            case "phobos":
                this.loadModel(phobosModel, radius, {
                    // specular: new Color(0xB08060),
                    // color: new Color(0x958575)
                });
                break;
            // Saturn moons
            case "dione":
                material = this.createPhongMaterial(dioneTexture, undefined, undefined, {
                    shininess: 5,
                    specular: new Color(0x555555)
                });
                break;
            case "enceladus":
                material = this.createPhongMaterial(enceladusTexture, undefined, undefined, {
                    shininess: 5,
                    specular: new Color(0x555555)
                });
                break;
            case "hyperion":
                this.loadModel(hyperionModel, radius);
                break;
            case "iapetus":
                material = this.createPhongMaterial(iapetusTexture, undefined, undefined, {
                    shininess: 3,
                    specular: new Color(0x555555)
                });
                break;
            case "mimas":
                material = this.createPhongMaterial(mimasTexture, undefined, undefined, {
                    shininess: 3,
                    specular: new Color(0x777777)
                });
                break;
            case "rhea":
                material = this.createPhongMaterial(rheaTexture, undefined, undefined, {
                    shininess: 5,
                    specular: new Color(0x404040)
                });
                break;
            case "tethys":
                material = this.createPhongMaterial(tethysTexture, undefined, undefined, {
                    shininess: 3,
                    specular: new Color(0x606060)
                });
                break;
            case "titan":
                material = this.createPhongMaterial(titanTexture, undefined, undefined, {
                    shininess: 3,
                    specular: new Color(0x888888)
                });
                break;
            // uranus moons
            case "ariel":
                material = this.createPhongMaterial(arielTexture, undefined, undefined, {
                    shininess: 4,
                    specular: new Color(0x555555)
                });
                break;
            case "miranda":
                material = this.createPhongMaterial(mirandaTexture, undefined, undefined, {
                    shininess: 4,
                    specular: new Color(0x555555)
                });
                break;
            case "oberon":
                material = this.createPhongMaterial(oberonTexture, undefined, undefined, {
                    shininess: 3,
                    specular: new Color(0xB09090)
                });
                break;
            case "titania":
                material = this.createPhongMaterial(titaniaTexture, undefined, undefined, {
                    shininess: 4,
                    specular: new Color(0x333333)
                });
            case "umbriel":
                material = this.createPhongMaterial(umbrielTexture, undefined, undefined, {
                    shininess: 4,
                    specular: new Color(0x202020)
                });
                break;
            // Neptune moon
            case "triton":
                material = this.createPhongMaterial(tritonTexture, undefined, undefined, {
                    shininess: 4,
                    specular: new Color(0x202020)
                });
                break;
        }
        
        if (!this.isModel) {
            const sphere = new Mesh(geometry, material);
            this.add(sphere);
        }
        if (parameters.tilt) {
            this.rotateX(parameters.tilt * Math.PI / 180);
        }
        for (const a of addons) {
            this.add(a);
        }

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

        this.minZoom = radius * 1.3;
        this.maxZoom = 70000000;

        // Calculate Equatorial Position Vector 
        this.eqPosition = function(daysSinceJ2000) {
            let n;
            if (parameters.mu == -1) {
                n = 0.01720209894 * Math.sqrt(1.0 / Math.pow(this.a, 3));
            }
            else {
                let aMeters = this.a * 1.496e11;
                n = Math.sqrt(parameters.mu / Math.pow(aMeters, 3)) * 86400;
            }
            
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

            return new Vector3(posVector.y, posVector.z, posVector.x);
        }

        this.orbitPositions = [] // Orbit positions for each day

        this.orbitalPeriod = Math.sqrt(Math.pow(this.a, 3) / parameters.parentMass) * 365.25; // in days
        this.lengthTimeSlice = this.orbitalPeriod / 3000; // in days
        if (this.lengthTimeSlice > 1) {
            this.lengthTimeSlice = 1;
        }
        let numTimeSlices = Math.floor(this.orbitalPeriod / this.lengthTimeSlice);
        for (let i = 0; i < numTimeSlices; i++) {
            this.orbitPositions.push(this.eqPosition(i * this.lengthTimeSlice).multiplyScalar(this.auToWorldUnits))
        }

        let orbitPathLineMaterial = new LineBasicMaterial({color: 0xffffff});
        let orbitPathLineGeo = new BufferGeometry().setFromPoints(this.orbitPositions);
        this.orbitPathLine = new Line(orbitPathLineGeo, orbitPathLineMaterial);
        this.internalOrbitPathToggle = false;

        this.parentBody = parent;
        this.parentid = parameters.parent;
        this.indexID = indexID;
    }

    toggleOrbitPathLine(showOrbitPathLines) {
        if (showOrbitPathLines && !this.internalOrbitPathToggle) {
            this.parentBody.add(this.orbitPathLine);
            this.internalOrbitPathToggle = true;
        }
        else if (!showOrbitPathLines && this.internalOrbitPathToggle) {
            this.parentBody.remove(this.orbitPathLine);
            this.internalOrbitPathToggle = false;
        }
    }

    selectThisObject(on) {
        if (on) {
            this.orbitPathLine.material.color.setHex(0xff0000);
        }
        else {
            this.orbitPathLine.material.color.setHex(0xffffff);
        }
    }

    getTexture(file, minFilter) {
        const texture = new TextureLoader().load(file);
        if (minFilter !== undefined) texture.minFilter = minFilter;
        return texture;
    }

    createPhongMaterial(mapFile, normalMapFile, specMapFile, phongProps) {
        if (phongProps == undefined) phongProps = {};
        const minFilter = NearestFilter;
        phongProps.map = this.getTexture(mapFile, minFilter);
        if (normalMapFile) phongProps.normalMap = this.getTexture(normalMapFile, minFilter);
        if (specMapFile) phongProps.specularMap = this.getTexture(specMapFile, minFilter);
        const material = new MeshPhongMaterial(phongProps);
        return material;
    }

    makeRing(innerR, outerR) {
        // credits: https://discourse.threejs.org/t/applying-a-texture-to-a-ringgeometry/9990/2
        // https://codepen.io/prisoner849/pen/zYOgroW?editors=0010
        let ringGeometry = new RingBufferGeometry(innerR, outerR, 64);
        let pos = ringGeometry.attributes.position;
        let v3 = new Vector3();
        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            ringGeometry.attributes.uv.setXY(i, v3.length() < (innerR + outerR) / 2 ? 0 : 1, 1);
        }
        ringGeometry.rotateX(Math.PI / 2);
        return ringGeometry;
    }

    loadModel(file, radius, materialProps) {
        if (materialProps == undefined) materialProps = {};
        this.isModel = true;
        const loader = new GLTFLoader();
        const self = this;
        loader.load(file, function(gltf){
            const model = gltf.scene.children[0];
            let modelRadius = model.geometry.boundingSphere.radius;
            const scaleFactor = radius / modelRadius;
            model.geometry.scale(scaleFactor, scaleFactor, scaleFactor);
            // model.material = new MeshPhongMaterial(materialProps);
            for (let i in materialProps){
                model.material[i] = materialProps[i];
            }
            self.add(model);
        });
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