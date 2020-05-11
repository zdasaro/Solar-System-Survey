import loaderCSS from './loader.css';

class Interface {

	constructor() {

        this.loadingscreen = document.createElement("SECTION");
        this.loadingscreen.id = "loading-screen";
        document.body.appendChild(this.loadingscreen);

        this.loader = document.createElement("DIV");
        this.loader.className = "loader";
        this.loadingscreen.appendChild(this.loader);

        this.face = document.createElement("DIV");
        this.face.className = "face";
        this.loader.appendChild(this.face);

        this.circle = document.createElement("DIV");
        this.circle.className = "circle";
        this.face.appendChild(this.circle);

        this.face2 = document.createElement("DIV");
        this.face2.className = "face";
        this.loader.appendChild(this.face2);

        this.circle2 = document.createElement("DIV");
        this.circle2.className = "circle";
        this.face2.appendChild(this.circle2);
	}
}	  

export default Interface;