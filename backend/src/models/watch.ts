import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';


export class Watch extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageurl!: string;
  public brand!: string;
}

Watch.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageurl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    sequelize,
    tableName: 'watches',
    timestamps: false,
});
export default Watch;