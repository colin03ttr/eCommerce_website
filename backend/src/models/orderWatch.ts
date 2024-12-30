import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import Watch from './watch';
import Order from './order';

class OrderWatch extends Model {
  public id!: number;
  public orderId!: number;
  public watchId!: number;
  public quantity!: number;

  public static associate() {
    this.belongsTo(Watch, { as: 'watch', foreignKey: 'watchId' });
    this.belongsTo(Order, { as: 'order', foreignKey: 'orderId' });
    
  }
}

OrderWatch.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    watchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'orderWatch',
    timestamps: false,
  }
);

export default OrderWatch;
