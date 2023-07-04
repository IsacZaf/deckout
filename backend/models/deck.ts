import { Sequelize, Model, DataTypes, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin } from 'sequelize';
import CardModel from './Card';

export class DeckModel extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public cards?: CardModel[];

  public getCards!: BelongsToManyGetAssociationsMixin<CardModel>;
  public addCards!: BelongsToManyAddAssociationMixin<CardModel, number>;
  public removeCards!: BelongsToManyRemoveAssociationMixin<CardModel, number>;

  public static associate(models: any) {
    DeckModel.belongsToMany(models.Card, { through: 'DeckCard' });
  }
}

export const initializeDeckModel = (sequelize: Sequelize) => {
  DeckModel.init(
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
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Deck',
    }
  );

  return DeckModel;
};
