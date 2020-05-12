import { Vector3 } from 'three';

class CustomControl extends Object {
    constructor(idsToIgnore) {
        // Call parent camera constructor
        super();
        window.addEventListener("mousemove", this.handleDrag.bind(this));
        window.addEventListener("wheel", this.handleZoom.bind(this));
        window.addEventListener("keydown", this.handleKey.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.idsToIgnore = idsToIgnore;
    }

    // Handle key release
    handleKeyUp(event) {
        if (this.targetedAnIgnoredElement(event.target)) return;
        if (event.key === "ArrowUp") {
            window.keyControls.up = false;
        }
        else if (event.key === "ArrowDown") {
            window.keyControls.down = false;
        }
        else if (event.key === "ArrowLeft") {
            window.keyControls.left = false;
        }
        else if (event.key === "ArrowRight") {
            window.keyControls.right = false;
        }
        else if (event.key === "k") {
            window.keyControls.spinleft = false;
        }
        else if (event.key === "l") {
            window.keyControls.spinright = false;
        }
        else if (event.key === "w") {
            window.keyControls.w = false;
        }
        else if (event.key === "s") {
            window.keyControls.s = false;
        }
        else if (event.key === "a") {
            window.keyControls.a = false;
        }
        else if (event.key === "d") {
            window.keyControls.d = false;
        }
    }

    // Handle key presses
    handleKey(event) {
        if (this.targetedAnIgnoredElement(event.target)) return;
        // focus on the selected object
        if (event.key === "f") {
            if (window.focusId === window.selectId) {
                window.focusId = "ReFocus";
            }
            else {
                window.focusId = window.selectId;
            }
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
            window.keyControls.up = true;
        }
        else if (event.key === "ArrowDown") {
            window.keyControls.down = true;
        }
        else if (event.key === "ArrowLeft") {
            window.keyControls.left = true;
        }
        else if (event.key === "ArrowRight") {
            window.keyControls.right = true;
        }
        else if (event.key === "k") {
            window.keyControls.spinleft = true;
        }
        else if (event.key === "l") {
            window.keyControls.spinright = true;
        }
        else if (event.key === "w") {
            window.keyControls.w = true;
        }
        else if (event.key === "s") {
            window.keyControls.s = true;
        }
        else if (event.key === "a") {
            window.keyControls.a = true;
        }
        else if (event.key === "d") {
            window.keyControls.d = true;
        }
    }

    // Code based off of: https://andreasrohner.at/posts/Web%20Development/JavaScript/Simple-orbital-camera-controls-for-THREE-js/
    handleDrag(event) {
        if (event.which == 1 && !this.targetedAnIgnoredElement(event.target)) {
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
        if (this.targetedAnIgnoredElement(event.target)) return;
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

    targetedAnIgnoredElement(target) {
        for (let id of this.idsToIgnore) {
            if (document.getElementById(id).contains(target)) return true;
        }
        return false;
    }
}

export default CustomControl;