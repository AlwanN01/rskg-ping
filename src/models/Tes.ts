import sequelize, { Model } from 'sequelize'
import Host from './Host'
class Tes implements BelongsToAssoc<Host, 'Cat'> {
  declare getCat: sequelize.HasManyGetAssociationsMixin<Host>
  declare setCat: sequelize.HasManySetAssociationsMixin<Host, number>
  declare createCat: sequelize.HasManyCreateAssociationMixin<Host, 'id', never>
  associate(db: DB): void {
    throw new Error('Method not implemented.')
  }
}
