import type s from 'sequelize'
import { Model } from 'sequelize'
interface Associate {
  associate?(db: DB): void
}
interface Methods<T> {
  add: s.HasManyAddAssociationsMixin<T, number>
  has: s.HasManyHasAssociationMixin<T, number>
  get: s.HasManyGetAssociationsMixin<T>
  set: s.HasManySetAssociationsMixin<T, number>
  create: s.HasManyCreateAssociationMixin<T, `id`>
  remove: s.HasManyRemoveAssociationMixin<T, number>
  count: s.HasManyCountAssociationsMixin
}

type Plural<Type, Name, Irregular> = {
  [Property in keyof Type as `${Property}${Irregular extends string ? Capitalize<Irregular> : `${Capitalize<Name>}s`}`]: Type[Property]
}
type Singular<Type, Name> = {
  [Property in keyof Type as `${Property}${Capitalize<Name>}`]: Type[Property]
}

declare global {
  type HasOneAssoc<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T>, 'count' | 'remove' | 'has' | 'add'>, U> &
    Associate
  type BelongsToAssoc<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T>, 'count' | 'remove' | 'has' | 'add'>, U> &
    Associate
  type HasManyAssoc<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T>, 'count' | 'get' | 'set'>, U> &
    Plural<Omit<Methods<T>, 'create'>, U, Irregular> &
    Associate
  type belongsToMany<T, U extends string, Irregular extends string = void> = Singular<Omit<Methods<T>, 'count' | 'get'>, U> &
    Plural<Methods<T>, U, Irregular> &
    Associate
}
