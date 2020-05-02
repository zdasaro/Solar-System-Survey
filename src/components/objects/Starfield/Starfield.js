import { Group, SphereGeometry, MeshBasicMaterial, Mesh, BackSide, TextureLoader, NearestFilter, CubeTextureLoader } from 'three';

class Starfield extends Group {
    constructor() {
        super();

        const geometry = new SphereGeometry(500, 64, 64);
        const texture = new TextureLoader().load('src/img/galaxy_starfield.png');
        texture.minFilter = NearestFilter;
        // const texture = new CubeTextureLoader().setPath('src/img/star_cubemap/')
        // .load([
        //     'px.png', 'nx.png',
        //     'py.png', 'ny.png',
        //     'pz.png', 'nz.png'
        // ]);
        const material = new MeshBasicMaterial({
            map: texture,
            side: BackSide // visible on the interior
        });
        const starfield = new Mesh(geometry, material);

        this.add(starfield);
    }
}

export default Starfield;