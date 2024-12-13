import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';


class User extends Model{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    solde: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
    },
    creationdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Définit la valeur par défaut à la date/heure actuelle
    },
    
    discount: {
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,



    }
    
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
});


export default User;