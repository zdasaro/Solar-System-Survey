import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Body, Land, Starfield } from 'objects';
import { BasicLights } from 'lights';

// Tried loading from the JSON file, but was having trouble, so I'm hard coding it here for now
const BODIES = [
    {
        "id": "mercury",
        "parent": -1,
        "radius": 2439.7,
        "a": 0.387098,
        "e": 0.205630,
        "i": 7.005,
        "o": 48.331,
        "w": 29.124,
        "m": 174.796
    },
    {
        "id": "venus",
        "parent": -1,
        "radius": 6051.8,
        "a": 0.723332,
        "e": 0.006772,
        "i": 3.39458,
        "o": 76.680,
        "w": 54.884,
        "m": 50.115
    },
    {
        "id": "terra",
        "parent": -1,
        "radius": 6371,
        "a": 1,
        "e": 0.0167086,
        "i": 0.00005,
        "o": 348.739,
        "w": 114.20783,
        "m": 358.617
    },
    {
        "id": "terra_moon",
        "parent": 2,
        "radius": 1737.4,
        "a": 0.00257,
        "e": 0.0549,
        "i": 5.145,
        "o": 348.739,
        "w": 114.20783,
        "m": 358.617
    },
    {
        "id": "mars",
        "parent": -1,
        "radius": 3389.5,
        "a": 1.523679,
        "e": 0.0934,
        "i": 1.850,
        "o": 49.558,
        "w": 286.502,
        "m": 19.412
    },
    {
        "id": "jupiter",
        "parent": -1,
        "radius": 69911,
        "a": 5.2044,
        "e": 0.0489,
        "i": 1.303,
        "o": 100.464,
        "w": 273.867,
        "m": 20.020
    },
    {
        "id": "saturn",
        "parent": -1,
        "radius": 58232,
        "a": 9.5826,
        "e": 0.0565,
        "i": 2.485,
        "o": 113.665,
        "w": 339.392,
        "m": 317.020
    },
    {
        "id": "uranus",
        "parent": -1,
        "radius": 25362,
        "a": 19.2184,
        "e": 0.046381,
        "i": 0.773,
        "o": 74.006,
        "w": 96.998857,
        "m": 142.2386
    },
    {
        "id": "neptune",
        "parent": -1,
        "radius": 24622,
        "a": 30.11,
        "e": 0.009456,
        "i": 1.767975,
        "o": 131.784,
        "w": 276.336,
        "m": 256.228
    },
    {
        "id": "1P/Halley",
        "parent": -1,
        "radius": 10,
        "a": 17.834,
        "e": 0.96714,
        "i": 162.26,
        "o": 58.42,
        "w": 111.33,
        "m": 38.38
    }
];

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            MStoSimulationDays: 10,
            pause: false,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x000000);
        this.prevTimestamp = -1;
        this.simulationTime = -1;

        // Add meshes to scene
        const land = new Land();
        const starfield = new Starfield();
        //const flower = new Flower(this);
        for (let i = 0; i < BODIES.length; i++) {
            if (BODIES[i].parent == -1) {
                const body = new Body(this, BODIES[i]);
                this.add(body);
            }
        }

        

        const lights = new BasicLights();
        this.add(land, lights, starfield);

        // Populate GUI
        this.state.gui.add(this.state, 'MStoSimulationDays', 10, 1000);
        this.state.gui.add(this.state, 'pause');
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { MStoSimulationDays, pause, updateList } = this.state;

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