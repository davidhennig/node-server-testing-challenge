const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, onlyDepartment("web25"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

function onlyDepartment(department) {
  return function(req, res, next) {
    if (
      req.user &&
      req.user.department &&
      req.user.department.toLowerCase() === department
    ) {
      next();
    } else {
      res.status(403).json({ message: "403 message" });
    }
  };
}

module.exports = router;
