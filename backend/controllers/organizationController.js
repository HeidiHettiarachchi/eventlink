const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Organization = require("../models/Organization");

const organizationValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 3 })
    .withMessage("Organization name must be at least 3 characters long"),
  
  body("president")
    .trim()
    .notEmpty()
    .withMessage("President name is required"),

  body("staffAdvisor")
    .trim()
    .notEmpty()
    .withMessage("Staff Advisor name is required"),

  body("eventIds")
    .isArray({ min: 1 })
    .withMessage("At least one event ID is required")
    .custom((value) => value.every((id) => mongoose.Types.ObjectId.isValid(id)))
    .withMessage("Invalid Event ID(s)"),
];

const createOrganization = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, president, staffAdvisor, eventIds } = req.body;

    const newOrganization = new Organization({
      name,
      president,
      staffAdvisor,
      eventIds,
    });

    await newOrganization.save();
    res.status(201).json({ message: "Organization created successfully", organization: newOrganization });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrganizationById = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(organization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, president, staffAdvisor, eventIds } = req.body;

    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    organization.name = name || organization.name;
    organization.president = president || organization.president;
    organization.staffAdvisor = staffAdvisor || organization.staffAdvisor;
    organization.eventIds = eventIds || organization.eventIds;

    await organization.save();
    res.json({ message: "Organization updated successfully", organization });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteOrganization = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedOrganization = await Organization.findByIdAndDelete(id);
  
      if (!deletedOrganization) {
        return res.status(404).json({ message: "Organization not found" });
      }
  
      res.status(200).json({ message: "Organization deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete organization" });
    }
  };
  
module.exports = {
  organizationValidator,
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};
