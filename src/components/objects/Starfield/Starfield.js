import { Group, SphereGeometry, MeshBasicMaterial, Mesh, BackSide, TextureLoader, NearestFilter, CubeTextureLoader } from 'three';

class Starfield extends Group {
    constructor() {
        super();

        const geometry = new SphereGeometry(1000, 64, 64);
        const texture = new TextureLoader().load('src/img/starfield/starmap_16k.jpg');
        const cubeTex = new CubeTextureLoader().setPath('src/img/starfield/')
            .load([
                'xp.jpg', 'xm.jpg',
                'yp.jpg', 'ym.jpg',
                'zp.jpg', 'zm.jpg'
            ]);
        texture.minFilter = NearestFilter;
        
        const material = new MeshBasicMaterial({
            envMap: cubeTex,
            side: BackSide // visible on the interior
        });
        const starfield = new Mesh(geometry, material);

        this.add(starfield);
    }
}

// class Starfield extends TextureLoader {
//     constructor() {
//         super();
//     }
//     loadMap() {
//         return this.load('src/img/starfield/starmap_16k.jpg')
//     }
// }

// class Starfield extends CubeTextureLoader {
//     constructor() {
//         super();
//         this.setPath('src/img/starfield/')
//     }
//     loadMap() {
//         return (this.load([
//             'xp.jpg', 'xm.jpg',
//             'yp.jpg', 'ym.jpg',
//             'zp.jpg', 'zm.jpg'
//         ]));
//     }
// }

export default Starfield;