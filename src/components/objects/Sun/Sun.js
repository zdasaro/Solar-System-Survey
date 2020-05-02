import { Group, SphereGeometry, MeshBasicMaterial, Mesh, BackSide, TextureLoader, NearestFilter, CubeTextureLoader } from 'three';

class Starfield extends Group {
    constructor() {
        super();

        const geometry = new SphereGeometry(1, 32, 32);
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