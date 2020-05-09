import * as Dat from 'dat.gui';
import { Scene, Color, CubeTextureLoader, Vector3 } from 'three';
import { Body, Starfield } from 'objects';
import { BasicLights } from 'lights';
import {Bodies} from '.';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        this.minZoom = 4000;
        this.maxZoom = 74800000;

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            SimulationDaystoSecond: 10,
            pause: false,
            showOrbitLines: true,
            selectObject: "Sol",
            defaultUpdateList: [],
            defaultSleepList: [] // bodies not loaded
        };

        this.updateList = [];

        // Fetch list of body parameters
        this.BODIES = new Bodies().bodyList;

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
        this.prevFocus = "Sol";
        this.bodyIDs = ["Sol"];
        // sun
        // const sun = new Sun();
        const starfield = new Starfield();
        //const flower = new Flower(this);
        for (let i = 0; i < this.BODIES.length; i++) {
            this.bodyIDs.push(this.BODIES[i].id);

            // planets
            if (this.BODIES[i].type == 0) {
                const body = new Body(this, this, this.BODIES[i], i);
                this.updateList.push(body);
                this.state.defaultUpdateList.push(body);
                this.add(body);
            }
            // moons
            else if (this.BODIES[i].type == 1) {
                let parentObject = this.updateList[this.BODIES[i].parent]
                const body = new Body(this, parentObject, this.BODIES[i], i);
                this.state.defaultSleepList.push(body);
                //parentObject.add(body);
            }
            // not planest nor moons
            else {
                const body = new Body(this, this, this.BODIES[i], i);
                this.state.defaultSleepList.push(body);
            }
        }
        
        const lights = new BasicLights();
        this.add(/*sun, */lights, starfield);
        // this.background = new Starfield().loadMap();

        // Populate GUI
        var modifyGUI = this.state.gui.addFolder('Modifiable Values');
        modifyGUI.add(this.state, 'SimulationDaystoSecond', -100, 100);
        modifyGUI.add(this.state, 'pause');
        modifyGUI.add(this.state, 'showOrbitLines');
        modifyGUI.add(this.state, 'selectObject', this.bodyIDs);
        modifyGUI.add(this, 'modYear');
        modifyGUI.add(this, 'modMonth', this.monthArray);
        modifyGUI.add(this, 'modDay');

        var readOnlyGUI = this.state.gui.addFolder('Read Only Values (Do NOT Change)');
        readOnlyGUI.add(this, 'year').listen();
        readOnlyGUI.add(this, 'month').listen();
        readOnlyGUI.add(this, 'day').listen();
    }

    addCamera(camera) {
        this.camera = camera;
        this.add(camera);
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
            return true;
        }
        return false;
    }

    update(timeStamp) {
        const { SimulationDaystoSecond, pause, defaultUpdateList, defaultSleepList, showOrbitLines, selectObject } = this.state;
        if (showOrbitLines && !this.prevOrbitLineToggle) {
            for (const obj of this.updateList) {
                obj.toggleOrbitPathLine(showOrbitLines);
            }
        }
        else if (!showOrbitLines && this.prevOrbitLineToggle) {
            for (const obj of this.updateList) {
                obj.toggleOrbitPathLine(showOrbitLines);
            }
        }
        this.prevOrbitLineToggle = showOrbitLines;

        // camera
        if (this.prevFocus != window.focusId) {
            if (window.focusId === "Sol") {
                window.focusObj.remove(this.camera);
                window.focusObj = this;
                this.add(this.camera);
                this.camera.position.clampLength(this.minZoom, this.maxZoom);
                this.prevFocus = window.focusId;
            }
            else {
                for (const p of this.updateList) {
                    if (p.bodyid === window.focusId) {
                        window.focusObj.remove(this.camera);
                        window.focusObj = p;
                        p.add(this.camera);
                        this.camera.position.clampLength(p.minZoom, p.maxZoom);
                        this.prevFocus = window.focusId;
                        break;
                    }
                }
            }
        }
        
        // body selector
        if (window.selectId != selectObject) {

            // de-select previous selection -> deload if not a planet. If planet de-load all moons
            for (let i = 0; i < this.updateList.length; i++) {
                const b = this.updateList[i];
                if (b.bodyid === window.selectId) {
                    b.selectThisObject(false);
                    // not a planet or moon, deload
                    if (b.type > 1) {
                        b.toggleOrbitPathLine(false);
                        b.parentBody.remove(b);
                        if (window.focusId === b.bodyid) {
                            window.focusId = selectObject;
                        }
                    }
                    else if (b.type == 1) { // deload all moons of the same planet
                        let parentid = b.parentid;
                        for (let j = 0; j < this.updateList.length; j++) {
                            const p = this.updateList[j];
                            if (parentid === p.parentid) {
                                p.toggleOrbitPathLine(false);
                                p.parentBody.remove(p);
                                if (window.focusId === p.bodyid) {
                                    window.focusId = selectObject;
                                }
                            }
                        }
                    }
                    else if (b.type == 0) { // deload all moons of this planet
                        let parentid = b.indexID;
                        for (let j = 0; j < this.updateList.length; j++) {
                            const p = this.updateList[j];
                            if (parentid === p.parentid) {
                                p.toggleOrbitPathLine(false);
                                b.remove(p);
                                if (window.focusId === p.bodyid) {
                                    window.focusId = selectObject;
                                }
                            }
                        }
                    }
                    break;
                }
            }
            window.selectId = selectObject;

            // load new object and its moons if applicable
            // Add to focus list, turn orbit lines to red, add to updatelist, take off of sleep list
            let newUpdateList = defaultUpdateList.slice();

            if (selectObject != "Sol") {
                // Should be a planet if in this list. Load moons
                let found = false;
                for (const b of defaultUpdateList) {
                    if (b.bodyid == selectObject) {
                        b.selectThisObject(true);
                        let parentid = b.indexID;
                        for (let i = 0; i < defaultSleepList.length; i++) {
                            const p = defaultSleepList[i];
                            if (parentid === p.parentid) {
                                b.add(p);
                                newUpdateList.push(p);
                                p.toggleOrbitPathLine(showOrbitLines);
                            }
                        }
                        found = true;
                        break;
                    }
                }

                // Search sleepList
                if (!found) {
                    for (let i = 0; i < defaultSleepList.length; i++) {
                        const b = defaultSleepList[i];

                        if (b.bodyid == selectObject) {
                            let parentid = b.parentid;

                            // Is moon
                            if (parentid != -1) {
                                for (let j = 0; j < defaultSleepList.length; j++) {
                                    const p = defaultSleepList[j];
                                    if (parentid === p.parentid) {
                                        b.parentBody.add(p);
                                        newUpdateList.push(p);
                                        p.toggleOrbitPathLine(showOrbitLines);
                                        p.selectThisObject(true);
                                    }
                                }
                            }
                            else {
                                b.parentBody.add(b);
                                newUpdateList.push(b);
                                b.toggleOrbitPathLine(showOrbitLines);
                                b.selectThisObject(true);
                            }

                            found = true;
                            break;
                        }
                    }
                }
            }
            this.updateList = newUpdateList;
        }

        if (!pause || this.dateToJD()) {
            this.JDtoDate(this.simulationTime);
            if (this.prevTimestamp == -1) {
                this.simulationTime = 2451545 + timeStamp * (SimulationDaystoSecond / 1000.0);
                this.prevTimestamp = timeStamp;
            }
            this.simulationTime = this.simulationTime + (timeStamp - this.prevTimestamp) * (SimulationDaystoSecond / 1000.0);
    
            // Call update for each object in the updateList
            for (const obj of this.updateList) {
                obj.update(this.simulationTime);
            }
        }
        this.prevTimestamp = timeStamp;
    }
}

export default SeedScene;