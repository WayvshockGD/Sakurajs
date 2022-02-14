let COLOR_PALLET = {
    red: 0xf94144,
    orange: 0xf3722c,
    yellow: 0xf9c74f,
    green: 0x90be6d,
    blue: 0x013a63,
    lime: 0xbfd200,
    violet: 0x7400b8,
    white: 0xfaf9f9,
    navy: 0x34495e,
    luminousVividPink: 0xe91e63,
    fuchsia: 0xeb459e
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
    darkPurple: 0x4a0366,
    darkGold: 0xc27c0e
}

let COLOR_PALLET_LIGHT = {
    lightRed: 0xff0000,
    lightOrange: 0xff8700,
    lightYellow: 0xffd300,
    lightGreen: 0xdeff0a,
    lightBlue: 0x580aff,
    lightPurple: 0xbe0aff
}

let COLOR_PALLET_PRIDE = {
    cornFlowerBlue: 0x1E3888,
    pacificBlue: 0x47A8BD,
    corn: 0xF5E663,
    rajah: 0xFFAD69,
    bigDipOruby: 0x9C3848,
    prideRed: 0xfd0207,
    prideOrange: 0xfd7f00,
    prideYellow: 0xfeff04,
    prideGreen: 0x058204,
    prideBlue: 0x0902ff,
    pridePurple: 0x7f017c
}

let COLOR_PALLET_DISCORD = {
    blurple: 0x5865f2,
    greyple: 0xc27c0e,
    notQuiteBlack: 0x23272a,
    darkButNotQuiteBlack: 0x2c2f33
}

let COLOR_PALLET_OUTRUN = {
    outPink: 0xf6019d,
    outRed: 0xfd1d53,
    outOrange: 0xff6c11,
    outYellow: 0xf9c80e,
    outCyan: 0x2de2e6,
    outPurple: 0x791e94,
    outDarkPurple: 0x540d6e
}

let ALL_COLOR_PALLETS = {
    ...COLOR_PALLET,
    ...COLOR_PALLET_PASTEL,
    ...COLOR_PALLET_DARK,
    ...COLOR_PALLET_LIGHT,
    ...COLOR_PALLET_PRIDE,
    ...COLOR_PALLET_DISCORD,
    ...COLOR_PALLET_OUTRUN
}

module.exports = {
    COLOR_PALLET,
    COLOR_PALLET_DARK,
    COLOR_PALLET_LIGHT,
    COLOR_PALLET_PASTEL,
    COLOR_PALLET_PRIDE,
    COLOR_PALLET_DISCORD,
    COLOR_PALLET_OUTRUN,
    ALL_COLOR_PALLETS
};
