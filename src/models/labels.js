const mongoose = require('mongoose')

 const Labels = mongoose.model('labels',{

    image_id: {
        type: String
    },
    Arched_Eyebrows: {
        type: Number,
    },
    Bags_under_eyes: {
        type: Number,
    },
    Bald: {
        type: Number,
    },
    Bangs: {
        type: Number,
    },
    Big_Lips: {
        type: Number,
    },
    Big_Nose: {
        type: Number,
    },
    Black_Hair: {
        type: Number,
    },
    Blond_hair: {
        type: Number,
    },
    Brown_Hair: {
        type: Number,
    },
    Bushy_Eyebrows: {
        type: Number,
    },
    Chubby: {
        type: Number,
    },
    Double_Chin: {
        type: Number,
    },
    Eyeglasses: {
        type: Number,
    },
    Goatee: {
        type: Number,
    },
    Gray_Hair: {
        type: Number,
    },
    High_Cheekbone: {
        type: Number,
    },
    Male: {
        type: Number,
    },
    Mustache: {
        type: Number,
    },
    Narrow_Eyes: {
        type: Number,
    },
    No_Beard: {
        type: Number,
    },
    Pale_Skin: {
        type: Number,
    },
    Pointy_Nose: {
        type: Number,
    },
    Receding_Hairline: {
        type: Number,
    },
    Sideburns: {
        type: Number,
    },
    Straight_Hair: {
        type: Number,
    },
    Wavy_Hair: {
        type: Number,
    },
    Young: {
        type: Number,
    },
 })

 module.exports = Labels