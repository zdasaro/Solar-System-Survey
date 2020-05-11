# COS 426 Final Project: Solar-System-Survey

This project was made as part of a final assignment in COS 426: Computer Graphics at Princeton University by Zak Dasaro and Jason Kim in Spring 2020.

[Online Demo](https://zdasaro.github.io/Solar-System-Survey/)

## Installation
This project uses the GitHub's NodeJS Package Manager (npm) to manage project dependencies. All npm settings, as well as your project dependencies and their versionings, are defined in the file `package.json`.

The NodeJS Package Manager, which is the world's largest software registry and supports over one million open source JavaScript packages and libraries, runs in a NodeJS runtime. The NodeJS runtime is essentially a port of Google Chrome's JavaScript V8 engine that will run in your terminal.

To run locally, you will need to install [NodeJS and npm](https://www.npmjs.com/get-npm). Then, open a terminal instance and set your working directory to the root of the project and run `npm install`.

## Description
The goal of this project was to create a graphical representation of the solar system, including its planets, major moons, and other prominent objects like dwarf planets, asteroids, and comets. In this program, planets are accurately positioned in the simulation according to their orbital data, so the user can see an accurate spatial layout of the solar system. Celestial bodies are rendered with great visual accuracy, using available textures and carefully tuned reflection models. The user may move the view throughout the solar system, zoom in on different objects, and look around using mouse controls.

## Controls
The left mouse button can be used to drag and rotate the camera around an object. The scroll wheel is used to zoom in and out.
Use the arrow keys to pan the camera and the WASD keys to free-fly the camera around the environment. The L and K key scan be used to spin the camera.
The speed of the free-fly camera mode is controlled by the "Rocket Power" slider.
You can select an object from the left menu or by clicking on its text label in the scene. This will highlight the object's orbit in red.
If you have selected an object and click "F", the camera will center and focus on the selected object.
Pressing the "I" key will get an image capture of the scene.
The GUI on the right side of the screen includes options to manipulate time and various visuals in the scene.

## Sources
Projects of inspiration:
https://shamailah.github.io/COS426-final-project/
http://earth.plus360degrees.com/
https://celestia.space
Sources for creating orbital data:
https://en.wikipedia.org/wiki/Orbital_elements
ftp://ssd.jpl.nasa.gov/pub/eph/planets/ioms/ExplSupplChap8.pdf
https://ssd.jpl.nasa.gov/?sat_elem
Sources of textures and 3D models (as explained in sources.txt):
http://www.celestiamotherlode.net/
https://www.solarsystemscope.com/textures/
https://solarsystem.nasa.gov/resources
https://github.com/mrdoob/three.js/tree/master/examples/textures/lensflare
https://planet-texture-maps.fandom.com/
http://celestia.simulatorlabbs.com/CelSL/textures/medres/
https://svs.gsfc.nasa.gov/3572
https://3d-asteroids.space/
https://in-the-sky.org/solarsystem.php

## License
[MIT](./LICENSE)
