import { Group, SphereGeometry, MeshBasicMaterial, Mesh, BackSide, TextureLoader, NearestFilter, CubeTextureLoader, SpriteMaterial, Sprite } from 'three';

class Sun extends Group {
    constructor() {
        super();

        const geometry = new SphereGeometry(748000 * 6.6846e-9 * 696340, 32, 32); // Objects are scaled by 600 of their real size
        const texture = new TextureLoader().load('src/img/realsun.jpg');
        texture.minFilter = NearestFilter;
        const material = new MeshBasicMaterial({
            map: texture
        });
        const sun = new Mesh(geometry, material);

        this.add(sun);
    }
}

export default Sun;