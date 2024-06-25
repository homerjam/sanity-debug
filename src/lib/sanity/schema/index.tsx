import React from 'react'
import {defineField} from 'sanity'

export const schemaTypes: SanitySchemaTypeExtended[] = [
  {
    type: 'document',
    name: 'test',
    title: 'Test',
    fields: [
      {
        type: 'string',
        name: 'title',
        title: 'Title',
      },
      defineField({
        name: 'computed',
        title: 'Computed',
        // description: '...',
        type: 'computedNumber',
        readOnly: true,
        options: {
          buttonText: 'Refresh',
          documentQuerySelection: `
            "numberOfReferences": count(*[references(^._id)])
          `,
          reduceQueryResult: (result: {
            draft?: {numberOfReferences: number}
            published: {numberOfReferences: number}
          }) => {
            // When 'Refresh' button is pressed, this value will be set to result.published.numberOfReferences, from the documentQuerySelection above.
            return result.published.numberOfReferences
          },
        },
      }),
    ],
    preview: {
      prepare: () => ({
        title: 'Test',
      }),
    },
  },
]
