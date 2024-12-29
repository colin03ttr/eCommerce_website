import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';



class User extends Model{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public solde!: number;
    public creationdate!: Date;
    public discount!: number;
    public isAdmin!: boolean;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    solde: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue:0,
    },
    creationdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
    },
    
    discount: {
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }    
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
});


export default User;