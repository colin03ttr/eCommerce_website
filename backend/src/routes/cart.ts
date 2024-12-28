// Cart Model
import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Cart extends Model {
    public id!: number;
    public userId!: number;
}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'carts',
    timestamps: false,
});

export default Cart;