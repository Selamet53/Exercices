const fsPromises = require('fs').promises;
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_CONSTS = require("./env");

class CourseManager {
    constructor() {
        // this.courses = [];
        // this.path = path.join(__dirname + "../../data/courses.json");

        // MongoDB
        this.collection = null;
        this.client = null;
        this.options = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        };
    }

    async init() {
        try {
            this.client = await MongoClient.connect(DB_CONSTS.DB_URL, this.options);
            this.collection = this.client.db(DB_CONSTS.DB_DB).collection(DB_CONSTS.DB_COLLECTION);
            // Force "sigle" a être unique dans les documents
            this.collection.createIndex("sigle", { unique: true });
            console.log("Connexion à la base de données réussie");
        }
        catch (e) {
            console.log(`Vous n'avez pas réussit à vous connecter à MongoDB`);
        }
    }

    async getAllCourses() {
        return this.collection.find({}, { projection: { _id: 0 } }).toArray();
    }

    findCourse(sigle) {
        return this.collection.findOne({sigle: sigle}, { projection: { _id: 0 } });
    }

    async addCourse(sigle) {
        const course = { sigle, credits: Math.floor(Math.random() * 5 + 1) };
        try {
            await this.collection.insertOne(course);
            return true;
        }
        catch (e) {
            return false;
        }
    }

    async deleteCourse(sigle) {
        const deleteResult = await this.collection.deleteMany({ sigle });
        return deleteResult.deletedCount;
    }

    async modifyCourse(modifiedCourse) {
        const modifiedResult = await this.collection.updateOne(
            { sigle: modifiedCourse.sigle },
            { $set: { credits: modifiedCourse.credits } });
        return modifiedResult.matchedCount;
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany({});
            return true;
        }
        catch (e) {
            console.log('Erreur de suppression');
            return false;
        }
    }

}

module.exports = CourseManager;