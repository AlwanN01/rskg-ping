import type s from 'sequelize'
import { Model } from 'sequelize'
interface Associate {
  associate?(db: DB): void
}
interface Methods<T, Type> {
  add: s.HasManyAddAssociationsMixin<T, number>
  has: s.HasManyHasAssociationMixin<T, number>
  get: Type extends 'HasOne' ? s.BelongsToGetAssociationMixin<T> : s.HasManyGetAssociationsMixin<T>
  set: Type extends 'HasOne' ? s.BelongsToSetAssociationMixin<T, number> : s.HasManySetAssociationsMixin<T, number>
  create: Type extends 'HasOne' ? s.BelongsToCreateAssociationMixin<T> : s.HasManyCreateAssociationMixin<T, `id`>
  remove: s.HasManyRemoveAssociationMixin<T, number>
  count: s.HasManyCountAssociationsMixin
}

type Plural<Method, Name, Irregular> = {
  [Property in keyof Method as `${Property}${Irregular extends string ? Capitalize<Irregular> : `${Capitalize<Name>}s`}`]: Method[Property]
}
type Singular<Method, Name> = {
  [Property in keyof Method as `${Property}${Capitalize<Name>}`]: Method[Property]
}

declare global {
  type HasOneAssoc<T, Singular extends string, Irregular extends string = void> = Singular<Omit<Methods<T, 'HasOne'>, 'count' | 'remove' | 'has' | 'add'>, Singular> &
    Associate

  type BelongsToAssoc<T, Singular extends string, Irregular extends string = void> = Singular<Omit<Methods<T, 'HasOne'>, 'count' | 'remove' | 'has' | 'add'>, Singular> &
    Associate

  type HasManyAssoc<T, Singular extends string, Irregular extends string = void> = Singular<Omit<Methods<T, 'HasMany'>, 'count' | 'get' | 'set'>, Singular> &
    Plural<Omit<Methods<T, 'HasMany'>, 'create'>, Singular, Irregular> &
    Associate
    
  type BelongsToManyAssoc<T, Singular extends string, Irregular extends string = void> = Singular<Omit<Methods<T, 'HasMany'>, 'count' | 'get' | 'set'>, Singular> &
    Plural<Omit<Methods<T, 'HasMany'>, 'create'>, Singular, Irregular> &
    Associate

}
