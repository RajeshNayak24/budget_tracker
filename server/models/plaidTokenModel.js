const mongoose = require('mongoose')
const { RequiredError } = require('plaid/dist/base')

const plaidTokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    access_token:{
        type:String,
        required:true,
    },
    item_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})


module.exports= mongoose.model("PlaidToken", plaidTokenSchema)