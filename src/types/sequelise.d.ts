import type sequelize from 'sequelize'
import { Model } from 'sequelize'
interface Associate {
  associate(db: DB): void
}
interface Methods<T, U> {
  add: sequelize.HasManyAddAssociationsMixin<T, number>
  has: sequelize.HasManyHasAssociationMixin<T, number>
  get: sequelize.HasManyGetAssociationsMixin<T>
  set: sequelize.HasManySetAssociationsMixin<T, number>
  create: sequelize.HasManyCreateAssociationMixin<T, `id`>
  remove: sequelize.HasManyRemoveAssociationMixin<T, number>
  count: sequelize.HasManyCountAssociationsMixin
}

type Plural<Type, Name, Irregular> = {
  [Property in keyof Type as `${Property}${Irregular extends string ? Capitalize<Irregular> : Capitalize<Name>}s`]: Type[Property]
}
type Singular<Type, Name> = {
  [Property in keyof Type as `${Property}${Capitalize<Name>}`]: Type[Property]
}

declare global {
  type HasOneAssoc<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T, U>, 'count' | 'remove' | 'has' | 'add'>, U> &
    Associate
  type BelongsToAssoc<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T, U>, 'count' | 'remove' | 'has' | 'add'>, U> &
    Associate
  type HasManyAssoc<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T, U>, 'count' | 'get'>, U> &
    Plural<Methods<T, U>, U, Irregular> &
    Associate
  type belongsToMany<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T, U>, 'count' | 'get'>, U> &
    Plural<Methods<T, U>, U, Irregular> &
    Associate
}
