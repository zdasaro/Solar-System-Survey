class Bodies extends Object {
    constructor() {
        super();

        this.bodyList = [
            // PLANETS
            {
                "id": "mercury", // name
                "type": 0, // 0 for planet, 1 for moon, 2 for dwarf planet, 3 for asteroid, 4 for comet
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
                "type": 0,
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
                "type": 0,
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
                "id": "mars",
                "type": 0,
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
                "type": 0,
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
                "type": 0,
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
                "type": 0,
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
                "type": 0,
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
            // EARTH'S MOON
            {
                "id": "terra_moon",
                "type": 1,
                "parent": 2,
                "parentMass": 3.003963e-6,
                "radius": 1737.4,
                "a": 0.00257,
                "e": 0.0554,
                "i": 5.16,
                "o": 125.08,
                "w": 318.15,
                "m": 135.27
            },
            // MOONS OF JUPITER
            {
                "id": "callisto",
                "type": 1,
                "parent": 4,
                "parentMass": 0.0009543,
                "radius": 2410.3,
                "a": 0.012585,
                "e": 0.0074,
                "i": 0.192,
                "o": 298.848,
                "w": 52.643,
                "m": 181.408
            },
            {
                "id": "europa",
                "type": 1,
                "parent": 4,
                "parentMass": 0.0009543,
                "radius": 1560.8,
                "a": 0.004486,
                "e": 0.0094,
                "i": 0.466,
                "o": 219.106,
                "w": 88.970,
                "m": 171.016
            },
            {
                "id": "ganymede",
                "type": 1,
                "parent": 4,
                "parentMass": 0.0009543,
                "radius": 2634.1,
                "a": 0.007155,
                "e": 0.0013,
                "i": 0.177,
                "o": 63.552,
                "w": 192.417,
                "m": 317.540
            },
            {
                "id": "io",
                "type": 1,
                "parent": 4,
                "parentMass": 0.0009543,
                "radius": 1821.6,
                "a": 0.00282,
                "e": 0.0041,
                "i": 0.036,
                "o": 43.977,
                "w": 84.129,
                "m": 342.021
            },
            // MOONS OF MARS
            {
                "id": "deimos",
                "type": 1,
                "parent": 3,
                "parentMass": 3.213e-7,
                "radius": 6.2,
                "a": 0.000157,
                "e": 0.0002,
                "i": 1.788,
                "o": 24.525,
                "w": 260.729,
                "m": 325.329
            },
            {
                "id": "phobos",
                "type": 1,
                "parent": 3,
                "parentMass": 3.213e-7,
                "radius": 11.2667,
                "a": 0.000063,
                "e": 0.0151,
                "i": 1.075,
                "o": 207.784,
                "w": 150.057,
                "m": 91.059
            },
            // MOONS OF SATURN
            {
                "id": "dione",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 561.4,
                "a": 0.002523,
                "e": 0.0022,
                "i": 0.028,
                "o": 290.415,
                "w": 284.315,
                "m": 322.232
            },
            {
                "id": "enceladus",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 252.1,
                "a": 0.001591,
                "e": 0.0,
                "i": 0.003,
                "o": 342.507,
                "w": 0.076,
                "m": 199.686
            },
            {
                "id": "hyperion",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 135,
                "a": 0.010033,
                "e": 0.0232,
                "i": 0.615,
                "o": 263.847,
                "w": 303.178,
                "m": 86.342
            },
            {
                "id": "iapetus",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 734.5,
                "a": 0.023803,
                "e": 0.0293,
                "i": 8.298,
                "o": 81.805,
                "w": 271.606,
                "m": 201.789
            },
            {
                "id": "mimas",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 198,
                "a": 0.00124,
                "e": 0.0196,
                "i": 1.574,
                "o": 173.027,
                "w": 332.499,
                "m": 14.848
            },
            {
                "id": "phoebe",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 106.5,
                "a": 0.086552,
                "e": 0.1634,
                "i": 175.243,
                "o": 241.086,
                "w": 342.5,
                "m": 53.038
            },
            {
                "id": "rhea",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 763.8,
                "a": 0.003523,
                "e": 0.0002,
                "i": 0.333,
                "o": 351.042,
                "w": 241.619,
                "m": 179.781
            },
            {
                "id": "tethys",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 531.1,
                "a": 0.00197,
                "e": 0.0001,
                "i": 1.091,
                "o": 259.842,
                "w": 45.202,
                "m": 243.367
            },
            {
                "id": "titan",
                "type": 1,
                "parent": 5,
                "parentMass": 0.0002857,
                "radius": 2574.73,
                "a": 0.008168,
                "e": 0.0288,
                "i": 0.306,
                "o": 28.060,
                "w": 180.532,
                "m": 163.310
            },
            // MOONS OF URANUS
            {
                "id": "ariel",
                "type": 1,
                "parent": 6,
                "parentMass": 4.365e-5,
                "radius": 578.9,
                "a": 0.001276,
                "e": 0.0012,
                "i": 0.041,
                "o": 22.394,
                "w": 115.349,
                "m": 39.481
            },
            {
                "id": "miranda",
                "type": 1,
                "parent": 6,
                "parentMass": 4.365e-5,
                "radius": 235.8,
                "a": 0.000868,
                "e": 0.0013,
                "i": 4.338,
                "o": 326.438,
                "w": 68.312,
                "m": 311.330
            },
            {
                "id": "oberon",
                "type": 1,
                "parent": 6,
                "parentMass": 4.365e-5,
                "radius": 761.4,
                "a": 0.0039,
                "e": 0.0014,
                "i": 0.068,
                "o": 279.771,
                "w": 104.4,
                "m": 283.088
            },
            {
                "id": "titania",
                "type": 1,
                "parent": 6,
                "parentMass": 4.365e-5,
                "radius": 788.4,
                "a": 0.002916,
                "e": 0.0011,
                "i": 0.079,
                "o": 99.771,
                "w": 284.4,
                "m": 24.614
            },
            {
                "id": "umbriel",
                "type": 1,
                "parent": 6,
                "parentMass": 4.365e-5,
                "radius": 584.7,
                "a": 0.001778,
                "e": 0.0039,
                "i": 0.128,
                "o": 33.485,
                "w": 84.709,
                "m": 12.469
            },
            // MOONS OF NEPTUNE
            {
                "id": "triton",
                "type": 1,
                "parent": 7,
                "parentMass": 0.00005149,
                "radius": 1353.4,
                "a": 0.002371,
                "e": 0.0,
                "i": 156.865,
                "o": 177.608,
                "w": 66.142,
                "m": 352.257
            },
            // DWARF PLANETS
            {
                "id": "1 Ceres",
                "type": 2,
                "parent": -1,
                "parentMass": 1,
                "radius": 469.73,
                "a": 2.7691651545,
                "e": 0.0760090291,
                "i": 10.59406704,
                "o": 80.3055316,
                "w": 73.5976941,
                "m": 77.37209589
            },
            {
                "id": "136108 Haumea",
                "type": 2,
                "parent": -1,
                "parentMass": 1,
                "radius": 800,
                "a": 43.182,
                "e": 0.19489,
                "i": 28.214,
                "o": 122.163,
                "w": 238.778,
                "m": 217.774
            },
            {
                "id": "136199 Eris",
                "type": 2,
                "parent": -1,
                "parentMass": 1,
                "radius": 1163,
                "a": 67.864,
                "e": 0.43607,
                "i": 44.0396,
                "o": 35.951,
                "w": 151.639,
                "m": 205.989
            },
            {
                "id": "13672 Makemake",
                "type": 2,
                "parent": -1,
                "parentMass": 1,
                "radius": 739,
                "a": 45.430,
                "e": 0.16126,
                "i": 28.9835,
                "o": 79.62,
                "w": 294.834,
                "m": 165.514
            },
            {
                "id": "Pluto",
                "type": 2,
                "parent": -1,
                "parentMass": 1,
                "radius": 1188.3,
                "a": 39.482,
                "e": 0.2488,
                "i": 17.16,
                "o": 110.299,
                "w": 113.834,
                "m": 14.53
            },
            // MAJOR ASTEROIDS
            {
                "id": "vesta",
                "type": 3,
                "parent": -1,
                "parentMass": 1,
                "radius": 263,
                "a": 2.36179,
                "e": 0.08874,
                "i": 7.14043,
                "o": 103.85136,
                "w": 151.19853,
                "m": 20.86384
            },
            {
                "id": "pallas",
                "type": 3,
                "parent": -1,
                "parentMass": 1,
                "radius": 256,
                "a": 2.773841434,
                "e": 0.22997227,
                "i": 34.832932,
                "o": 173.024741,
                "w": 310.202392,
                "m": 334.32
            },
            {
                "id": "hygiea",
                "type": 3,
                "parent": -1,
                "parentMass": 1,
                "radius": 217,
                "a": 3.1415,
                "e": 0.1125,
                "i": 3.8316,
                "o": 283.20,
                "w": 312.32,
                "m": 152.18
            },
            // MAJOR COMETS
            {
                "id": "1P/Halley",
                "type": 4,
                "parent": -1,
                "parentMass": 1,
                "radius": 10,
                "a": 17.834,
                "e": 0.96714,
                "i": 162.26,
                "o": 58.42,
                "w": 111.33,
                "m": 38.38
            },
            {
                "id": "19P/Borrelly",
                "type": 4,
                "parent": -1,
                "parentMass": 1,
                "radius": 2.4,
                "a": 3.609,
                "e": 0.623289,
                "i": 30.31307,
                "o": 75.53597,
                "w": 353.35068,
                "m": 137.9304
            },
        ];
    }
}
export default Bodies;
    