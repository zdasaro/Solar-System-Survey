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
            SimulationDaystoSecond: 10,
            pause: false,
            showOrbitLines: false,
            followEarth: false,
            updateList: [],
        };

        // Fetch list of body parameters
        const BODIES = new Bodies().bodyList;

        // Set background to a nice color
        this.background = new Color(0x000000);
        this.prevOrbitLineToggle = false;
        
        // this.background = new CubeTextureLoader().setPath('src/img/star_cubemap/')
        // .load([
        //     'px.png', 'nx.png',
        //     'py.png', 'ny.png',
        //     'pz.png', 'nz.png'
        // ]);

        // Time related variables
        this.prevTimestamp = -1
        this.simulationTime = 2451545;
        this.year = 2000;
        this.month = 'Jan';
        this.day = 1;
        this.monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Time menu modification
        this.modYear = 2000;
        this.modMonth = 'Jan';
        this.modDay = 1;
        this.prevYear = 2000;
        this.prevMonth = 'Jan';
        this.prevDay = 1;

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
        

        // Populate GUI
        var modifyGUI = this.state.gui.addFolder('Modifiable Values');
        modifyGUI.add(this.state, 'SimulationDaystoSecond', -100, 100);
        modifyGUI.add(this.state, 'pause');
        modifyGUI.add(this.state, 'showOrbitLines');
        modifyGUI.add(this.state, 'followEarth');
        modifyGUI.add(this, 'modYear');
        modifyGUI.add(this, 'modMonth', this.monthArray);
        modifyGUI.add(this, 'modDay');

        var readOnlyGUI = this.state.gui.addFolder('Read Only Values (Do NOT Change)');
        readOnlyGUI.add(this, 'year').listen();
        readOnlyGUI.add(this, 'month').listen();
        readOnlyGUI.add(this, 'day').listen();
    }

    addControls(ctrl) {
        this.controls = ctrl;
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    // Convert a Julian Day number to a year, month, day
    JDtoDate(jd) {
        let z = Math.floor(jd + 0.5);
        let f = jd + 0.5 - Math.floor(jd + 0.5);
        let a = 0;
        if (z < 2299161) {
            a = z;
        }
        else {
            let alpha = Math.floor((z - 1867216.25) / 36524.25);
            a = z + 1 + alpha - Math.floor(alpha / 4);
        }
        let b = a + 1524;
        let c = Math.floor((b - 122.1) / 365.25);
        let d = Math.floor(365.25 * c);
        let e = Math.floor((b - d) / 30.6001);
        this.day = Math.floor(b - d - Math.floor(30.6001 * e) + f);

        let monthNumber = e - 13;
        if (e < 14) {
            monthNumber = e - 1;
        }
        this.month = this.monthArray[monthNumber - 1];

        if (monthNumber > 2) {
            this.year = c - 4716;
        }
        else {
            this.year = c - 4715;
        }
    }

    // If GUI has updated the mod times, update simulation time (JD) to match
    dateToJD() {
        if (this.prevYear != this.modYear || this.prevMonth != this.modMonth || this.prevDay != this.modDay) {
            this.prevYear = this.modYear;
            this.prevMonth = this.modMonth;
            this.prevDay = this.modDay;

            let monthNumber = this.monthArray.indexOf(this.modMonth) + 1;
            // Sets time to UTC 12:00 of this day
            this.simulationTime = 367 * this.modYear - Math.floor(7 * (this.modYear + Math.floor((monthNumber + 9) / 12.0)) / 4) + Math.floor(275 * monthNumber / 9) + this.modDay + 1721014;
        }
    }

    update(timeStamp) {
        const { SimulationDaystoSecond, pause, updateList, showOrbitLines, followEarth } = this.state;
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

        this.dateToJD(); // Update time from GUI input if necessary
        if (!pause) {
            this.JDtoDate(this.simulationTime);
            if (this.prevTimestamp == -1) {
                this.simulationTime = 2451545 + timeStamp * (SimulationDaystoSecond / 1000.0);
                this.prevTimestamp = timeStamp;
            }
            this.simulationTime = this.simulationTime + (timeStamp - this.prevTimestamp) * (SimulationDaystoSecond / 1000.0);
    
            // Call update for each object in the updateList
            for (const obj of updateList) {
                obj.update(this.simulationTime);
            }
        }
        this.prevTimestamp = timeStamp;
    }
}

export default SeedScene;