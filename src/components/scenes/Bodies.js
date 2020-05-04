class Bodies extends Object {
    constructor() {
        super();

        this.bodyList = [
            {
                "id": "mercury", // name
                "parent": -1, // ID (index in this list) of parent. -1 for sun
                "parentMass": 1, // mass of parent object in solar masses (technically should be sum of parent and object mass)
                "radius": 2439.7, // in km
                "a": 0.387098, // sem-major axis in AU
                "e": 0.205630, // eccentricity
                "i": 7.005, // inclination in degrees with respect to ecliptic
                "o": 48.331, // longitude of ascending node in degrees 
                "w": 29.124, // argument of perihelion in degrees
                "m": 174.796 // mean anomoly at Jan 1, 2000, 12:00 UTC (J2000)
            },
            {
                "id": "venus",
                "parent": -1,
                "parentMass": 1,
                "radius": 6051.8,
                "a": 0.723332,
                "e": 0.006772,
                "i": 3.39458,
                "o": 76.680,
                "w": 54.884,
                "m": 50.115
            },
            {
                "id": "terra",
                "parent": -1,
                "parentMass": 1,
                "radius": 6371,
                "a": 1,
                "e": 0.0167086,
                "i": 0.00005,
                "o": 348.739,
                "w": 114.20783,
                "m": 358.617
            },
            {
                "id": "terra_moon",
                "parent": 2,
                "parentMass": 3.003963e-6,
                "radius": 1737.4,
                "a": 0.257,
                "e": 0.0549,
                "i": 5.145,
                "o": 348.739,
                "w": 114.20783,
                "m": 358.617
            },
            {
                "id": "mars",
                "parent": -1,
                "parentMass": 1,
                "radius": 3389.5,
                "a": 1.523679,
                "e": 0.0934,
                "i": 1.850,
                "o": 49.558,
                "w": 286.502,
                "m": 19.412
            },
            {
                "id": "jupiter",
                "parent": -1,
                "parentMass": 1,
                "radius": 69911,
                "a": 5.2044,
                "e": 0.0489,
                "i": 1.303,
                "o": 100.464,
                "w": 273.867,
                "m": 20.020
            },
            {
                "id": "saturn",
                "parent": -1,
                "parentMass": 1,
                "radius": 58232,
                "a": 9.5826,
                "e": 0.0565,
                "i": 2.485,
                "o": 113.665,
                "w": 339.392,
                "m": 317.020,
                'tilt':27
            },
            {
                "id": "uranus",
                "parent": -1,
                "parentMass": 1,
                "radius": 25362,
                "a": 19.2184,
                "e": 0.046381,
                "i": 0.773,
                "o": 74.006,
                "w": 96.998857,
                "m": 142.2386
            },
            {
                "id": "neptune",
                "parent": -1,
                "parentMass": 1,
                "radius": 24622,
                "a": 30.11,
                "e": 0.009456,
                "i": 1.767975,
                "o": 131.784,
                "w": 276.336,
                "m": 256.228
            },
            {
                "id": "1P/Halley",
                "parent": -1,
                "parentMass": 1,
                "radius": 10,
                "a": 17.834,
                "e": 0.96714,
                "i": 162.26,
                "o": 58.42,
                "w": 111.33,
                "m": 38.38
            }
        ];
    }
}
export default Bodies;
    