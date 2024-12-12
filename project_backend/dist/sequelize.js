"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Configuration de la base de données
const sequelize = new sequelize_1.Sequelize('mini_site_database', 'mini_site_owner', 'colin', {
    host: 'localhost',
    dialect: 'postgres', // Utilisation de PostgreSQL
    port: 5432, // Port PostgreSQL par défaut
    logging: false, // Désactivez pour éviter trop de logs
});
// connexion
sequelize.authenticate()
    .then(() => {
    console.log('Connexion réussie à la base de données PostgreSQL');
})
    .catch((err) => {
    console.error('Impossible de se connecter à la base de données :', err);
});
exports.default = sequelize;
