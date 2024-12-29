import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import OrderWatch from './orderWatch';

class Order extends Model {
  public id!: number;
  public userId!: number;
  public status!: string;
  public items!:OrderWatch[];

  public static associate() {
    this.hasMany(OrderWatch, { as: 'items', foreignKey: 'orderId' });
  }
}

Order.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

export default Order;
