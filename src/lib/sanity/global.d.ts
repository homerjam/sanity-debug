import {FieldDefinition, SchemaTypeDefinition, SortOrdering, defineField} from 'sanity'
import '@pothos/plugin-scope-auth'
import {SchemaTypes} from '../api/graphql/types'

interface TypeApiOptions {
  auth: {
    grantScopes?: PothosSchemaTypes.ObjectTypeOptions<SchemaTypes>['grantScopes']
    authScopes?: PothosSchemaTypes.ObjectTypeOptions<SchemaTypes>['authScopes']
  }
}

interface FieldApiOptions {
  auth: {
    grantScopes?: PothosSchemaTypes.FieldOptions<SchemaTypes>['grantScopes']
    authScopes?: PothosSchemaTypes.FieldOptions<SchemaTypes>['authScopes']
  }
}

declare global {
  type SanitySchemaTypeExtended = SchemaTypeDefinition & {
    // fields: (ReturnType<typeof defineField> & {_api?: FieldApiOptions})[]
    fields: (FieldDefinition & {_api?: FieldApiOptions})[]
    orderings?: SortOrdering[]
  } & {_api?: TypeApiOptions}
}
