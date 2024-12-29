import { Sequelize } from 'sequelize';
import { DataTypes, Model } from 'sequelize';


// Configuration de la base de données
const sequelize = new Sequelize('db', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres', // Utilisation de PostgreSQL
  port: 5432, // Port PostgreSQL par défaut
  logging: false, // Désactivez pour éviter trop de logs
});
sequelize.authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données PostgreSQL');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données :', err);
  });
  export default sequelize;

class Order extends Model {
  public id!: number;
  public items?: OrderWatch[];

  public static associations: {
    items: Association<Order, OrderWatch>;
  };
}

// connexion



