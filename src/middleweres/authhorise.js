const authorise = (permittedRole) => {
  return (req, res, next) => {
    //console.log(permittedRole);
    const user = req.user;
    let isPermitted = false;
    permittedRole.map((role) => {
      if (user.role.includes(role)) {
        isPermitted = true;
      }
    });
    if (isPermitted) {
      return next();
    } else {
      return res
        .status(401)
        .send({ message: "you are not authorised to perform this oprations" });
    }
  };
};

module.exports = authorise;
