import guiCSS from './gui.css';

const PLANET = 0, MOON = 1, DWARF = 2, ASTEROID = 3, COMET = 4;

class GuiElem {
    constructor() {
        this.gui = document.createElement("DIV");
        this.gui.id = "gui-pane";
        
        this.dateElem = document.createElement("DIV");
        this.gui.appendChild(this.dateElem);
        document.body.appendChild(this.gui);
        this.folders = [];
        this.folders[PLANET] = {displayName: "Planets", list: []};
        this.folders[MOON] = {displayName: "Moons", list: []};
        this.folders[DWARF] = {displayName: "Dwarf Planets", list: []};
        this.folders[ASTEROID] = {displayName: "Asteroids", list: []};
        this.folders[COMET] = {displayName: "Comets", list: []};
        this.folderDisplay = document.createElement("UL");
        this.folderDisplay.id = "folder-display";
        this.gui.appendChild(this.folderDisplay);
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
            if (body.type === PLANET) {
                this.folders[MOON].list.push({
                    id: body.id,
                    displayName: body.displayName ? body.displayName : body.id,
                    list: []
                });
            }
            if (body.type === MOON) {
                // find the planet it orbits
                let planet = this.findPlanet(body.parent, bodyList);
                planet.list.push({
                    id: body.id,
                    displayName: body.displayName ? body.displayName : body.id
                });
            } else {
                this.folders[body.type].list.push({
                    id: body.id,
                    displayName: body.displayName ? body.displayName : body.id
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
            // let li = document.createElement("LI");
            // // li.classList.add("folder-head");
            // let title = document.createElement("SPAN");
            // title.classList.add("folder-title");
            // title.innerHTML = folder.displayName;
            // li.appendChild(title);
            // let ul = document.createElement("UL");
            // ul.classList.add("hidden");
            // for (let body of folder.list) {
            //     this.addListItem(body, ul);
            // }

            // li.appendChild(ul);

            // this.folderDisplay.appendChild(li);
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
            label.addEventListener("click", function() {
                if (self.selected) self.selected.classList.remove("selected");
                self.selected = this;
                // self.selectObject(body.id);
                self.state.guiSelectObject = body.id;
                // console.log(self.selectObject);
                this.classList.add("selected");
            })
        }
    }
}

export default GuiElem