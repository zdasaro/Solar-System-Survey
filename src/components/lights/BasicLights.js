import { Group, SpotLight, AmbientLight, HemisphereLight, PointLight, TextureLoader, } from 'three';
import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        const dir = new SpotLight(0xffffff, 1.6, 7, 0.8, 1, 1);
        const ambi = new AmbientLight(0x404040, 0.4);
        const hemi = new HemisphereLight(0xffffbb, 0x080820, 2.3);
        const sunlight = new PointLight(0xffffff, 1, 0, 2);
        let lensflare = new Lensflare();
        let textureflare0 = new TextureLoader().load('src/img/lensflares/lensflare0.png');
        // let textureflare1 = new TextureLoader().load('src/img/lensflares/lensflare1.png');
        // let textureflare2 = new TextureLoader().load('src/img/lensflares/lensflare2.png');
        let textureflare3 = new TextureLoader().load('src/img/lensflares/lensflare3.png');

        lensflare.addElement(new LensflareElement(textureflare0, 256, 0));
        // lensflare.addElement(new LensflareElement(textureflare1, 256, 0.0));
        // lensflare.addElement(new LensflareElement(textureflare2, 512, 0.6));
        lensflare.addElement(new LensflareElement(textureflare3, 100, 0.9));
        lensflare.addElement(new LensflareElement(textureflare3, 90, 0.8));
        lensflare.addElement(new LensflareElement(textureflare3, 97, 0.67));
        sunlight.add(lensflare);

        dir.position.set(5, 1, 2);
        dir.target.position.set(0, 0, 0);

        this.add(ambi, sunlight);
    }
}

export default BasicLights;
