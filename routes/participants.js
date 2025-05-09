const express = require("express");
const router = express.Router();
const db = require('../models');
const ParticipantService = require('../services/participantService');
const participantService = new ParticipantService(db);
const isAdmin = require("../middleware/isAdmin");
const { validateParticipant } =require("../middleware/validate");

router.post("/add", isAdmin, validateParticipant, async(req, res, next) => {
    try {
        const allreadyExists = await participantService.getDetailsByEmail(req.body.email);
        if(allreadyExists) {
            return res.status(409).json({ error: "A participant with that email allready exist "});
        }
        const created = await participantService.addParticipant(req.body);
        return res.status(201).json(created)
    } catch (err) {
        return next(err);
    }
});

router.delete("/:email", isAdmin, async(req,res, next) => {
    try {
        const { email } = req.params;
        const deleted = await participantService.deleteParticipant(email);
        if(!deleted) {
            return res.status(404).json({message: `No user found with email: ${email}`});
        } 
        return res.status(200).json({ message: `User ${email} has been deleted`});
    } catch (err) {
        return next(err);
    }
});

router.put("/:email", isAdmin, validateParticipant, async(req, res, next) => {
    try {
        const { email } = req.params;
        const updated = await participantService.updateParticipant({email, ...req.body});
        if(!updated) {
            return res.status(404).json({ message: `No user found with email: ${email}`});
        }
        return res.status(200).json({ participant: updated});
    } catch (err) {
        return next(err);
    }
});

router.get("/", isAdmin, async(req, res, next) => {
    try {
        const listDetails = await participantService.listAll();
        return res.status(200).json({ participants: listDetails });
    } catch (err) {
        return next(err);
    }
});

router.get("/details", isAdmin, async(req, res, next) => {
    try {
        const allDetails = await participantService.listDetails();
        return res.status(200).json({ participants: allDetails });
    } catch (err) {
        return next(err);
    }
});

router.get("/details/:email", isAdmin, async(req, res, next) => {
    try {
        const { email } = req.params;
        const specifiedDetails = await participantService.getDetailsByEmail(email);
        if(!specifiedDetails) {
            return res.status(404).json({message: `User with email: ${email} does not exist`});
        }
        return res.status(200).json({ participant: specifiedDetails });
    } catch (err) {
        return next(err);
    }
});

router.get("/work/:email", isAdmin, async(req, res, next) => {
    try{
        const { email } = req.params;
        const workDetails = await participantService.getWorkByEmail(email);
        if(!workDetails) {
            return res.status(404).json({ message: `No work details connected to email: ${email}`});
        }
        return res.status(200).json({ work: workDetails });
    } catch (err) {
        return next(err);
    }
});

router.get("/home/:email", isAdmin, async(req, res, next) => {
    try {
        const { email } = req.params;
        const homeDetails = await participantService.getHomeByEmail(email);
        if(!homeDetails) {
            return res.status(404).json({ message: `No home details connected to email: ${email}`});
        }
        return res.status(200).json({ home: homeDetails });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;