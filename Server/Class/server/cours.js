const router = require("express").Router();
const CourseManager = require('./courseManager');
const courseManager = new CourseManager();

const urlencodedParser = require('express').urlencoded({ extended: false });

courseManager.readCoursesFromFile().then(() => {
    app.get("/obtenirCours", function (req, res) {
        if (courseManager.courses) {
            res.status(200).send(courseManager.courses);
        }
        else {
            res.status(404).send();
        }
    });
    
    app.get("/obtenirCours/:sigle", function (req, res) {
        const course = courseManager.findCourse(req.params.sigle);
        if (course) {
            res.status(200).send(course);
        } else {
            res.status(404).send("Cours non trouvé");
        }
    });
    
    app.post("/ajouterCours", urlencodedParser, function (req, res) {
        const course = req.body;
        if (!courseManager.findCourse(course.sigle)) {
            
        }
    });
    
    app.delete("/supprimerCours/:sigle", function (req, res) {
    });
    
    app.delete("/supprimerTout", function (req, res) {
    });
    
    app.patch("/modifierCours/", urlencodedParser, function (req, res) {
    });
});

module.exports = { router };
