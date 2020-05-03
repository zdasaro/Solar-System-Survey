import { Group, SphereGeometry, MeshBasicMaterial, Mesh, BackSide, TextureLoader, NearestFilter, CubeTextureLoader } from 'three';

class Starfield extends Group {
    constructor() {
        super();

        const geometry = new SphereGeometry(4e-6 * 696340, 32, 32); // Objects are scaled by 600 of their real size
        const texture = new TextureLoader().load('src/img/8k_earth_daymap.jpg');
        texture.minFilter = NearestFilter;
        const material = new MeshBasicMaterial({
            map: texture
        });
        const starfield = new Mesh(geometry, material);

        this.add(starfield);
    }
}

export default Starfield;