"use strict";
//    npx ts-node src/seed.ts   to run the script WHEN TABLES ARE EMPTY !!
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("./sequelize")); // Connexion à la DB
const LearningPackage_1 = __importDefault(require("./models/LearningPackage")); // Modèle Sequelize
const learningFact_1 = __importDefault(require("./models/learningFact")); // Modèle Sequelize
// Fonction pour insérer des données
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Synchroniser les modèles (si nécessaire)
        yield sequelize_1.default.sync();
        // Insérer des données dans la table
        yield LearningPackage_1.default.bulkCreate([
            { id: 1, name: "Learn React", description: "Frontend library", category: "Web Development", targetAudience: "Developers", difficultyLevel: 3 },
            { id: 2, name: "Learn Vue.js", description: "Progressive JavaScript framework", category: "Web Development", targetAudience: "Developers", difficultyLevel: 4 },
            { id: 3, name: "Learn Python", description: "General-purpose programming language", category: "Programming", targetAudience: "Beginners", difficultyLevel: 2 },
            { id: 4, name: "Learn Java", description: "Object-oriented programming language", category: "Programming", targetAudience: "Intermediate Developers", difficultyLevel: 5 }
        ]);
        console.log('Les données LearningPackage ont été insérées avec succès.');
        yield learningFact_1.default.bulkCreate([
            { id: 1, packageId: 1, fact: "React is a JavaScript library for building user interfaces." },
            { id: 2, packageId: 1, fact: "React allows developers to create large web applications that can update and render efficiently." },
            { id: 3, packageId: 1, fact: "React components can be reused, making development faster and more efficient." },
            { id: 4, packageId: 2, fact: "Vue.js is a progressive JavaScript framework for building user interfaces." },
            { id: 5, packageId: 2, fact: "Vue.js is designed to be incrementally adoptable." },
            { id: 6, packageId: 2, fact: "Vue.js features an approachable core library that focuses on the view layer only." },
            { id: 7, packageId: 3, fact: "Python is a high-level, interpreted programming language." },
            { id: 8, packageId: 3, fact: "Python is known for its readability and simplicity." },
            { id: 9, packageId: 3, fact: "Python supports multiple programming paradigms, including procedural, object-oriented, and functional programming." },
            { id: 10, packageId: 4, fact: "Java is a high-level, class-based, object-oriented programming language." },
            { id: 11, packageId: 4, fact: "Java is designed to have as few implementation dependencies as possible." },
            { id: 12, packageId: 4, fact: "Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM)." }
        ]);
        console.log('Les données LearningFact ont été insérées avec succès.');
        process.exit(0); // Quitter le script
    }
    catch (err) {
        console.error('Erreur lors de l\'insertion des données :', err);
        process.exit(1); // Quitter avec une erreur
    }
});
// Lancer la fonction
seedDatabase();
