import { Scene, Mesh, BoxGeometry, MeshBasicMaterial, PerspectiveCamera } from 'three';

class LoadingScreen extends Object {
    constructor() {
        super();

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(90, 1280/720, 0.1, 1000);
        this.box = new Mesh(
            new BoxGeometry(0.5,0.5,0.5),
            new MeshBasicMaterial({color:0x4444ff})
        );
        
        this.box.position.set(0,0,5);
        this.camera.lookAt(this.box.position);
        this.scene.add(this.box);
    }

 

    update(timeStamp) {
    }
}

export default LoadingScreen;