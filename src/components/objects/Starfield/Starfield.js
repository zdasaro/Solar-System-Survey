import { Group, SphereGeometry, MeshBasicMaterial, Mesh, BackSide, TextureLoader, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter } from 'three';
import skymap from "../../../img/starfield/TychoSkymap8k.jpg"

class Starfield extends Group {
    constructor(loadingManager) {
        super();

        const geometry = new SphereGeometry(748000000, 64, 64);
        const texture = new TextureLoader(loadingManager).load(skymap);
        texture.minFilter = NearestFilter; // this makes the stars look sharper, but dim stars disappear if the display resolution is too low. LinearFilter would fix this but make the stars blurrier.
        
        const material = new MeshBasicMaterial({
            map: texture,
            side: BackSide // visible on the interior
        });
        const starfield = new Mesh(geometry, material);
        starfield.scale.x = -1 // flip so we see the interior correctly
        this.add(starfield);
    }
}

export default Starfield;