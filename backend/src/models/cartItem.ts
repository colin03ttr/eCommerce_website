// CartItem Model
import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export class CartItem extends Model {
    public id!: number;
    public cartId!: number;
    public watchId!: number;
    public quantity!: number;
}

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
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
}, {
    sequelize,
    tableName: 'cart_items',
    timestamps: false,
});

export default CartItem;
