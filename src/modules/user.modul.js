const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//const { hash } = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:[{type:String}],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save",function(next){
    // let modifindPassword = this.password + "secritxyz";
    // this.password = modifindPassword;
    const hash = bcrypt.hashSync(this.password,8);
    this.password = hash;

    //console.log(this.password)
    return next();
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model("user", userSchema);
