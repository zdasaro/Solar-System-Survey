import { Group, SphereGeometry, MeshBasicMaterial, Mesh, Vector3, Matrix3, ImageUtils, BackSide } from 'three';

class Starfield extends Group {
    constructor() {
        super();

        const geometry = new SphereGeometry(500, 64, 64);
        const material = new MeshBasicMaterial({
            map: ImageUtils.loadTexture('src/img/galaxy_starfield.png'),
            side: BackSide // visible on the interior
        });
        const starfield = new Mesh(geometry, material);

        this.add(starfield);
    }
}

export default Starfield;