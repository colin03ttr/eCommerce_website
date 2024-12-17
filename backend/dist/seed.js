"use strict";
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
                imageurl: 'https://assets.tissotwatches.com/transform/Extend/5f4b20a5-02aa-4d03-8eed-b0b1262fc796/T127_410_11_041_00',
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
                imageurl: 'https://www.tagheuer.com/on/demandware.static/-/Sites-tagheuer-master/default/dwdb18e51e/TAG_Heuer_Carrera/CBN2A1M.FC6526/CBN2A1M.FC6526_1000.png',
                brand: 'Tag Heuer',
            },
            {
                name: 'Casio F91W',
                description: 'Affordable digital watch',
                price: 20,
                imageurl: 'https://www.casio.com/content/dam/casio/product-info/locales/fr/fr/timepiece/product/watch/F/F9/F91/F-91W-1/assets/F-91W-1_Seq1.png.transform/main-visual-sp/image.png',
                brand: 'Casio',
            },
            {
                name: 'Seiko Presage Cocktail Time',
                description: 'Elegant automatic watch',
                price: 350,
                imageurl: 'https://www.seikoboutique.eu/fr/26895-superZoom/montre-homme-presage-cocktail-time-aviation-srpj13j1-cadran-bleu.jpg',
                brand: 'Seiko',
            },
            {
                name: 'Patek Philippe Nautilus',
                description: 'Luxury watch with iconic design',
                price: 35000,
                imageurl: 'https://images.montro.com/3PV13ewptleF6-MoKdQsXVLz6_0=/1200x0/https://amz.luxewatches.co.uk/app/uploads/2022/12/16162919/5712_1R_001_1-1.png',
                brand: 'Patek Philippe',
            },
            {
                name: 'Audemars Piguet Royal Oak',
                description: 'Luxury sports watch',
                price: 23000,
                imageurl: 'https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTR011010AA/importer/watch.png.transform.appdpmain.png',
                brand: 'Audemars Piguet',
            },
            {
                name: 'Fossil Hybrid HR',
                description: 'Smartwatch with analog dial',
                price: 190,
                imageurl: 'https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2019/12/fossil-hybride-hr-frandroid-2019-768x768.png?webp=1&resize=580,580&key=43755db2',
                brand: 'Fossil',
            },
            {
                name: 'Breitling Navitimer',
                description: 'Pilot’s watch with chronograph',
                price: 5500,
                imageurl: 'https://galli.ch/wp-content/uploads//ab0138241c1p1-navitimer-b01-chronograph-43-soldier.png',
                brand: 'Breitling',
            },
            {
                name: 'Citizen Eco-Drive',
                description: 'Solar powered analog watch',
                price: 200,
                imageurl: 'https://www.citizenwatch-global.com/promaster/assets/img/page/sky/eco_drive_global_radio_controlled/products-kv.webp',
                brand: 'Citizen',
            },
            {
                name: 'IWC Big Pilot',
                description: 'Classic pilot’s watch',
                price: 12000,
                imageurl: 'https://www.watchesworld.com/wp-content/uploads/2022/05/fb91da19220c70f3011651482673776.png',
                brand: 'IWC',
            },
            {
                name: 'Panerai Luminor Marina',
                description: 'Diving watch with strong design',
                price: 7500,
                imageurl: 'https://www.panerai.com/content/dam/rcq/pan/W5/ST/Kr/7w/hU/eg/bj/8z/Cy/sv/tw/W5STKr7whUegbj8zCysvtw.png',
                brand: 'Panerai',
            },
            {
                name: 'Tag Heuer Monaco',
                description: 'Iconic square chronograph',
                price: 4700,
                imageurl: 'https://www.tagheuer.com/on/demandware.static/-/Sites-tagheuer-master/default/dw8601ab73/TAG_Heuer_Monaco/CAW211T.FC6440/CAW211T.FC6440_0913.png?impolicy=resizeTrim&width=884&height=1106',
                brand: 'Tag Heuer',
            },
            {
                name: 'Longines Master Collection',
                description: 'Automatic watch with moonphase',
                price: 3000,
                imageurl: 'https://api.ecom.longines.com/media/catalog/product/w/a/watch-collection-longines-master-collection-chrono-moonphase-l2-773-4-78-3-1733406401-hero.png',
                brand: 'Longines',
            },
            {
                name: 'Vacheron Constantin Overseas',
                description: 'Luxury sports watch',
                price: 23000,
                imageurl: 'https://www.vacheron-constantin.com/dam/rcq/vac/N4/Yr/Eb/uG/yk/m8/ai/qG/-V/mS/QQ/N4YrEbuGykm8aiqG-VmSQQ.png.transform.vacproddetails.png',
                brand: 'Vacheron Constantin',
            },
            {
                name: 'Breguet Classique',
                description: 'Classical and elegant watch',
                price: 18000,
                imageurl: 'https://www.breguet.com/sites/default/files/images/7327BB119VU.png?im=Resize,width=800',
                brand: 'Breguet',
            },
            {
                name: 'Jaeger-LeCoultre Reverso',
                description: 'Reversible watch for sports and elegance',
                price: 9000,
                imageurl: 'https://www.edouardgenton.com/image/catalog/upload_products/manufacturer_21/2588422-1.png',
                brand: 'Jaeger-LeCoultre',
            },
            {
                name: 'Hublot Big Bang',
                description: 'Bold luxury watch',
                price: 11500,
                imageurl: 'https://www.hublot.com/sites/default/files/styles/watch_item_desktop_1x_scale_no_crop_600_6000_/public/big-bang-original-steel-44-mm-301.SX.130.RX-soldier-shot.png?itok=a9pECLr7',
                brand: 'Hublot',
            },
            {
                name: 'Casio G-Shock',
                description: 'Tough digital watch',
                price: 100,
                imageurl: 'https://www.casio.com/content/dam/casio/product-info/locales/fr/fr/timepiece/product/watch/G/GM/gmb/gm-b2100pc-1a/assets/GM-B2100PC-1A.png.transform/main-visual-sp/image.png',
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
