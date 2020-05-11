import guiCSS from './gui.css';

const PLANET = 0, MOON = 1, DWARF = 2, ASTEROID = 3, COMET = 4;

class GuiElem {
    constructor() {
        this.gui = document.createElement("DIV");
        this.gui.id = "gui-pane";
        
        // container for the simulation date
        this.dateElem = document.createElement("DIV");
        this.gui.appendChild(this.dateElem);

        // orbital info
        this.infoElem = document.createElement("DIV");
        this.infoElem.id = "info-elem";
        this.gui.appendChild(this.infoElem);

        // tree view of objects
        let folderHeader = document.createElement("DIV");
        folderHeader.classList.add("folder-header");
        folderHeader.innerHTML = "Select an object:"
        this.gui.appendChild(folderHeader);
        document.body.appendChild(this.gui);
        this.folders = [];
        this.folders[PLANET] = {displayName: "Planets", list: []};
        this.folders[MOON] = {displayName: "Moons of...", list: []};
        this.folders[DWARF] = {displayName: "Dwarf Planets", list: []};
        this.folders[ASTEROID] = {displayName: "Asteroids", list: []};
        this.folders[COMET] = {displayName: "Comets", list: []};
        this.folderDisplay = document.createElement("UL");
        this.folderDisplay.id = "folder-display";
        this.gui.appendChild(this.folderDisplay);

        // help tooltip
        this.help = document.createElement("DIV");
        this.help.innerHTML="Help";
        this.help.classList.add("tooltip");
        const helptext = document.createElement("SPAN");
        helptext.innerHTML = `
        <ul>
            <li>Scroll to zoom in and out.</li>
            <li>Click and drag to rotate the view.</li>
            <li>Use the arrow keys to pan the camera, and WASD to fly around, with a speed determined by the control Rocket Power.</li>
            <li>Select an object on the left panel to highlight its orbital path in red. Then press the F key to focus on that object.</li>
            <li>Press the I key to capture an image.</li>
            <li>The control pane on the right allows you to adjust several simulation parameters.</li>
        </ul>`;
        this.help.appendChild(helptext);
        this.gui.appendChild(this.help);
    }

    // layout of this.folders:
    // [
    //     {
    //         displayName: "Planets",
    //         list: [
    //             {
    //             id: "mercury",
    //             displayName: "mercury",
    //             },
    //             ...
    //         ]
    //     },
    //     {
    //         displayName: "Moons",
    //         list: [
    //             {
    //                 id: "earth",
    //                 displayName: "earth",
    //                 list: [
    //                     {
    //                         id: "moon",
    //                         displayName: "moon"
    //                     }
    //                 ]
    //             },
    //             ...
    //         ]
    //     },
    //     ...
    // ]

    info(body) {
        if (body.displayName === "Sun") {
            this.infoElem.innerHTML = "";
            return;
        }
        let type;
        if (body.type === PLANET) {
            type = "Planet";
        }
        else if (body.type === MOON) {
            type = "Moon";
        }
        else if (body.type === DWARF) {
            type = "Dwarf Planet";
        }
        else if (body.type === ASTEROID) {
            type = "Asteroid";
        }
        else {
            type = "Comet";
        }
        // this.infoElem.innerHTML = "<br>" + body.displayName + "<br>" + type + "<br>Radius: " + body.radius + " KM<br> Semi-Major Axis: " + 
        // body.a + " AU<br>Eccentricity: " + body.e + "<br>Inclination: " + body.i + " DEG<br>Long Asc Node: " + body.o + " DEG<br>Arg of Periapsis: " + body.w + "DEG";
        this.infoElem.innerHTML = 
        `<div class="type">${type} ${body.displayName}</div>
        <div class="km">Radius: ${body.radius}</div>
        <div class="au">Semi-Major Axis: ${body.a}</div>
        <div>Eccentricity: ${body.e}</div>
        <div class="deg">Inclination: ${body.i}</div>
        <div class="deg">Long Asc Node: ${body.o}</div>
        <div class="deg">Arg of Periapsis: ${body.w}</div>
        <hr>
        `;
    }

    date(month, day, year) {
        this.dateElem.innerHTML = month + " " + day + ", " + year;
    }

    findPlanet(parent, bodyList) {
        const planet = bodyList[parent];
        // find in this.folders[MOON].list
        const planetInMoonsList = this.folders[MOON].list.find(item => item.id === planet.id);
        return planetInMoonsList;
    }

    generateFolders(bodyList, state) {
        this.state = state;
        for (let i = 0; i < bodyList.length; i++) {
            const body = bodyList[i];
            const displayName = body.displayName ? body.displayName : this.capitalize(body.id);
            if (body.type === PLANET) {
                this.folders[MOON].list.push({
                    id: body.id,
                    displayName: displayName,
                    list: []
                });
            }
            if (body.type === MOON) {
                // find the planet it orbits
                let planet = this.findPlanet(body.parent, bodyList);
                planet.list.push({
                    id: body.id,
                    displayName: displayName,
                    type: body.type,
                    radius: body.radius,
                    a: body.a,
                    e: body.e,
                    i: body.i,
                    o: body.o,
                    w: body.w
                });
            } else {
                this.folders[body.type].list.push({
                    id: body.id,
                    displayName: displayName,
                    type: body.type,
                    radius: body.radius,
                    a: body.a,
                    e: body.e,
                    i: body.i,
                    o: body.o,
                    w: body.w
                });
            }
        }
        this.generateFolderDisplay();
    }

    generateFolderDisplay() {
        this.addListItem({id: "Sun", displayName: "Sun"}, this.folderDisplay);
        for (let i = 0; i < this.folders.length; i++) {
            let folder = this.folders[i];
            this.addListItem(folder, this.folderDisplay);
        }
    }

    addListItem(body, parent) {
        if (body.list && body.list.length == 0) return; // ignore things with empty lists
        let li = document.createElement("LI");
        let label = document.createElement("SPAN");
        label.innerHTML = body.displayName;
        
        li.appendChild(label);
        parent.appendChild(li);
        if (body.list) {
            label.classList.add("collapsed");
            label.addEventListener("click", function() {
                this.parentElement.querySelector('.hidden').classList.toggle("visible");
                this.classList.toggle("expanded");

            });
            label.classList.add("folder-title");
            // create nested list
            let ul = document.createElement("UL");
            ul.classList.add("hidden");
            li.appendChild(ul);
            for (let child of body.list) {
                this.addListItem(child, ul);
            }
        }
        else {
            const self = this;
            body.domElement = label;
            label.addEventListener("click", function() {
                self.select(body);
            });
        }
    }

    searchById(id, list) {
        if (list === undefined) list = this.folders;
        for (let body of list) {
            // if it has a list, search the list. if not, check the id.
            if (body.list) {
                const result = this.searchById(id, body.list);
                if (result) return result;
            } else if (body.id) {
                if (body.id === id) return body;
            }
        }
        return undefined;
    }

    select(body) {
        if (this.selected) this.selected.classList.remove("selected");
        this.selected = body.domElement;
        this.state.guiSelectObject = body.id;
        this.info(body);
        body.domElement.classList.add("selected");
    }

    selectById(id) {
        const body = this.searchById(id);
        if (body) {
            this.select(body)
        }
    }

    capitalize(name) {
        return name.substring(0,1).toUpperCase()+name.substring(1);
    }
}

export default GuiElem