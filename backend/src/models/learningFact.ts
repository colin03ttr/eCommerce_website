import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class LearningFact extends Model {
  public id!: number;
  public fact!: string;
  public packageId!: number;
}

// Define the Sequelize model
LearningFact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'LearningFact',
    tableName: 'learning_facts',
    timestamps: false,
  }
);


export default LearningFact;