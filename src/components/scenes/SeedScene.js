import * as Dat from 'dat.gui';
import { Scene, Color, CubeTextureLoader, Vector3 } from 'three';
import { Body, Land, Starfield, Sun } from 'objects';
import { BasicLights } from 'lights';
import {Bodies} from '.';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            MStoSimulationDays: 10,
            pause: false,
            showOrbitLines: false,
            followEarth: false,
            updateList: [],
        };

        // Fetch list of body parameters
        const BODIES = new Bodies().bodyList;

        // Set background to a nice color
        this.background = new Color(0x000000);
        
        // this.background = new CubeTextureLoader().setPath('src/img/star_cubemap/')
        // .load([
        //     'px.png', 'nx.png',
        //     'py.png', 'ny.png',
        //     'pz.png', 'nz.png'
        // ]);
        this.prevOrbitLineToggle = false;
        this.prevTimestamp = -1;
        this.simulationTime = -1;

        // Add meshes to scene
        // const land = new Land();
        // sun
        const sun = new Sun();
        const starfield = new Starfield();
        //const flower = new Flower(this);
        for (let i = 0; i < BODIES.length; i++) {
            if (BODIES[i].parent == -1) {
                const body = new Body(this, this, BODIES[i]);
                this.add(body);
            }
            else {
                let parentObject = this.state.updateList[BODIES[i].parent]
                const body = new Body(this, parentObject, BODIES[i]);
                parentObject.add(body);
            }
        }

        

        const lights = new BasicLights();
        this.add(sun, lights, starfield);

        // Populate GUI
        this.state.gui.add(this.state, 'MStoSimulationDays', 10, 1000);
        this.state.gui.add(this.state, 'pause');
        this.state.gui.add(this.state, 'showOrbitLines');
        this.state.gui.add(this.state, 'followEarth');
    }

    addControls(ctrl) {
        this.controls = ctrl;
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { MStoSimulationDays, pause, updateList, showOrbitLines, followEarth } = this.state;
        if (showOrbitLines && !this.prevOrbitLineToggle) {
            for (const obj of updateList) {
                obj.toggleOrbitPathLine(showOrbitLines);
            }
        }
        else if (!showOrbitLines && this.prevOrbitLineToggle) {
            for (const obj of updateList) {
                obj.toggleOrbitPathLine(showOrbitLines);
            }
        }
        this.prevOrbitLineToggle = showOrbitLines;

        // camera
        if (followEarth && !this.prevFollowEarth) {
            for (const p of updateList) {
                if (p.bodyid === "terra") {
                    const earthPos = p.position;
                    if (this.controls) this.controls.target = earthPos;
                    this.prevFollowEarth = true;
                    break;
                }
            }
        } else if (!followEarth && this.prevFollowEarth) {
            this.controls.target = new Vector3(0, 0, 0);
            this.prevFollowEarth = false;
        }

        if (!pause) {
            if (this.prevTimestamp == -1) {
                this.simulationTime = timeStamp / MStoSimulationDays;
                this.prevTimestamp = timeStamp;
            }
            this.simulationTime = this.simulationTime + (timeStamp - this.prevTimestamp) / MStoSimulationDays;
    
            // Call update for each object in the updateList
            for (const obj of updateList) {
                obj.update(this.simulationTime);
            }
        }
        this.prevTimestamp = timeStamp;
    }
}

export default SeedScene;