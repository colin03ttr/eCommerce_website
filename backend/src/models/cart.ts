// models/cart.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Watch from './watch';

class Cart extends Model {
  public id!:Number;
  public watchId!:Number;
  public quantity!:Number;
}


Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    watchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Watch,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { sequelize, modelName: 'Cart' }
);

Cart.belongsTo(Watch, { foreignKey: 'watchId', as: 'Watch' });

export default Cart;
