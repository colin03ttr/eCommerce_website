
import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class LearningPackage extends Model {
    public id!: number;                 // Primary Key
    public title!: string;
    public description!: string;
    public category!: string;
    public targetAudience!: string;     // Prerequisite or audience information
    public difficultyLevel!: number;    // Range: 1 to 10
}

LearningPackage.init({
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
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAudience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficultyLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
}, {
    sequelize,
    modelName: 'LearningPackage',
    tableName: 'learning_packages', // Nom de la table dans la base
    timestamps: false, // Pas de colonnes createdAt et updatedAt
});

export default LearningPackage;