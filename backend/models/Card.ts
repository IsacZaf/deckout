import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../src/database';

class CardModel extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public type!: string;
  public race!: string;
  public attribute?: string;
  public level?: number;
  public attack?: number;
  public defense?: number;
  public linkval?: number;
  public linkmarkers?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CardModel.init(
  {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attribute: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    linkval: {
      type: DataTypes.INTEGER,
    },
    linkmarkers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize,
    modelName: 'Card',
  }
);

export default CardModel;
