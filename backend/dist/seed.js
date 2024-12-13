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
const watch_1 = __importDefault(require("./models/watch")); // Modèle Sequelize
// Fonction pour insérer des données
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Synchroniser les modèles (si nécessaire)
        yield sequelize_1.default.sync();
        // Insert data into the table
        yield watch_1.default.bulkCreate([
            {
                name: 'Tissot Collection Gentleman',
                description: 'Luxury watch',
                price: 475,
                imageurl: 'https://guildedesorfevres.fr/17084-thumbnail_product/montre-tissot-en-acier-acier.jpg',
                brand: 'Tissot',
            },
            {
                name: 'Apple Watch',
                description: 'Connected watch',
                price: 449,
                imageurl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MXLN3ref_VW_34FR+watch-case-42-aluminum-rosegold-nc-s10_VW_34FR+watch-face-42-aluminum-rosegold-s10_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=1724336463964',
                brand: 'Apple',
            },
            {
                name: 'Rolex Cosmograph Daytona',
                description: 'Luxury watch',
                price: 11100,
                imageurl: 'https://arije.paris/wp-content/uploads/rolex/watch_assets/upright_watches_assets/desktop/m126598tbr-0001_drp-upright-bba-with-shadow.webp',
                brand: 'Rolex',
            },
            {
                name: 'Omega Seamaster',
                description: 'Diver watch',
                price: 5200,
                imageurl: 'https://www.omegawatches.com/media/catalog/product/o/m/omega-seamaster-diver-300m-co-axial-master-chronometer-chronograph-44-mm-21030445103001-922b75.png?w=1100',
                brand: 'Omega',
            },
            {
                name: 'Tag Heuer Carrera',
                description: 'Sport watch',
                price: 4500,
                imageurl: 'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwcac44508/images/sprites/Carrera/CBU2050.FT6273/RTW_backUp.jpg',
                brand: 'Tag Heuer',
            },
            {
                name: 'Casio F91W',
                description: 'Affordable digital watch',
                price: 20,
                imageurl: 'https://www.casio.com/content/dam/casio/product-info/locales/fr/fr/timepiece/product/watch/F/F9/F91/F-91W-1/assets/F-91W-1_Seq1.png.transform/main-visual-sp/image.png',
                brand: 'Casio',
            }
        ]);
        console.log('Data has been successfully inserted.');
        process.exit(0); // Exit the script
    }
    catch (err) {
        console.error('Erreur lors de l\'insertion des données :', err);
        process.exit(1); // Quitter avec une erreur
    }
});
// Lancer la fonction
seedDatabase();
