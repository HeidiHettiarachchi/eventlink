const express = require("express");
const { authenticationUtil,authorizationUtil } = require("../utils");
const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");

const organizationRouter = express.Router();

organizationRouter.post("/createOrganization", authenticationUtil,authorizationUtil(["admin"]),createOrganization);
organizationRouter.get("/getOrganizations", getAllOrganizations);
organizationRouter.get("/getOrganization/:id", getOrganizationById);
organizationRouter.put("/updateOrganization/:id", authenticationUtil,authorizationUtil(["admin"]), updateOrganization);
organizationRouter.delete("/deleteOrganization/:id", authenticationUtil,authorizationUtil(["admin"]), deleteOrganization);

module.exports = organizationRouter;
