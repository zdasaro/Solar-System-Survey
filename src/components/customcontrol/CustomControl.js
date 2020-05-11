import { Vector3 } from 'three';

class CustomControl extends Object {
    constructor() {
        // Call parent camera constructor
        super();
        window.addEventListener("mousemove", this.handleDrag);
        window.addEventListener("wheel", this.handleZoom);
        window.addEventListener("keydown", this.handleKey);
    }

    // Handle key presses
    handleKey(event) {
        // focus on the selected object
        if (event.key === "f") {
            window.focusId = window.selectId;
        }
        // Take an image
        else if (event.key === "i") {
            try {
                var dataURL = window.canvas.toDataURL();
              } catch (err) {
                alert("Sorry, your browser does not support capturing an image.");
                return;
              }
            
              // Create a download link and click it
              let link = document.createElement('a');
              let filename = prompt("Enter a filename:");
              let ext = ".png"
            
              let suffix = "" + Math.round(Math.random() * 10000);
              suffix = suffix.padStart(4, "0")
              if (!filename) filename = `cloth-${suffix}`;
            
              if (!filename.endsWith(ext)) filename = filename + ext;
            
              link.download = filename;
              link.href = dataURL;
              link.click();
        }
        else if (event.key === "ArrowUp") {
            window.cam.rotateX(0.1);
        }
        else if (event.key === "ArrowDown") {
            window.cam.rotateX(-0.1);
        }
        else if (event.key === "ArrowLeft") {
            window.cam.rotateY(0.1);
        }
        else if (event.key === "ArrowRight") {
            window.cam.rotateY(-0.1);
        }
    }

    // Code based off of: https://andreasrohner.at/posts/Web%20Development/JavaScript/Simple-orbital-camera-controls-for-THREE-js/
    handleDrag(event) {
        if (event.which == 1) {
            let worldPos = new Vector3();
            window.focusObj.getWorldPosition(worldPos); // Note can be unstable when focused on an object orbiting another orbiting object (moons)
            window.cam.lookAt(worldPos);

            let deltaX = event.movementX;
            let deltaY = event.movementY;

            var radPerPixel = (Math.PI / 450),
            deltaPhi = radPerPixel * deltaX,
            deltaTheta = radPerPixel * deltaY,
            pos = window.cam.position,
            radius = pos.length(),
            theta = Math.acos(pos.y / radius),
            phi = Math.atan2(pos.x, pos.z);

            // Subtract deltaTheta and deltaPhi
            theta = Math.min(Math.max(theta - deltaTheta, 0), Math.PI);
            phi -= deltaPhi;

            // Turn back into Cartesian coordinates
            pos.z = radius * Math.sin(theta) * Math.cos(phi);
            pos.x = radius * Math.sin(theta) * Math.sin(phi);
            pos.y = radius * Math.cos(theta);

            
            window.focusObj.getWorldPosition(worldPos); // Note can be unstable when focused on an object orbiting another orbiting object (moons)
            window.cam.lookAt(worldPos);
        }
    }

    handleZoom(event) {
        let worldPos = new Vector3();
        window.focusObj.getWorldPosition(worldPos); // Note can be unstable when focused on an object orbiting another orbiting object (moons)
        window.cam.lookAt(worldPos);
        let delta = event.deltaY;
        if (Math.abs(delta) < 2) {
            window.focusObj.getWorldPosition(worldPos); // Note can be unstable when focused on an object orbiting another orbiting object (moons)
            window.cam.lookAt(worldPos);
            return;
        }
        if (delta < 0) {
            window.cam.position.multiplyScalar(0.9);
        }
        else {
            window.cam.position.multiplyScalar(1.1);
        }
        window.cam.position.clampLength(window.focusObj.minZoom, window.focusObj.maxZoom);
        window.focusObj.getWorldPosition(worldPos); // Note can be unstable when focused on an object orbiting another orbiting object (moons)
        window.cam.lookAt(worldPos);
    }
}

export default CustomControl;