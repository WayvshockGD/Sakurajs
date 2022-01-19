let COLOR_PALLET = {
    red: 0xf94144,
    orange: 0xf3722c,
    yellow: 0xf9c74f,
    green: 0x90be6d,
    blue: 0x013a63,
    lime: 0xbfd200,
    violet: 0x7400b8,
    white: 0xfaf9f9
}

let COLOR_PALLET_PASTEL = {
    pasRed: 0xffadad,
    pasOrange: 0xffd6a5,
    pasYellow: 0xfdffb6,
    pasGreen: 0xcaffbf,
    pasBlue: 0xa0c4ff,
    pasPurple: 0xffc6ff
}

let COLOR_PALLET_DARK = {
    darkRed: 0x650303,
    darkOrange: 0x662403,
    darkYellow: 0x4d6603,
    darkGreen: 0x036624,
    darkBlue: 0x032966,
    darkPurple: 0x4a0366
}

let COLOR_PALLET_LIGHT = {
    lightRed: 0xff0000,
    lightOrange: 0xff8700,
    lightYellow: 0xffd300,
    lightGreen: 0xdeff0a,
    lightBlue: 0x580aff,
    lightPurple: 0xbe0aff
}

let ALL_COLOR_PALLETS = {
    ...COLOR_PALLET,
    ...COLOR_PALLET_PASTEL,
    ...COLOR_PALLET_DARK,
    ...COLOR_PALLET_LIGHT
}

module.exports = {
    COLOR_PALLET,
    COLOR_PALLET_DARK,
    COLOR_PALLET_LIGHT,
    COLOR_PALLET_PASTEL,
    ALL_COLOR_PALLETS
};