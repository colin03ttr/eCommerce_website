import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export class OrderItem extends Model {
    public id!: number;
    public orderId!: number;
    public watchId!: number;
    public quantity!: number;
    public price!: number;
}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'order_items',
    timestamps: false,
});

export default OrderItem;
