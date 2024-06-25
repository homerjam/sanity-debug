import React from 'react'

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
    ],
    preview: {
      prepare: () => ({
        title: 'Test',
      }),
    },
  },
]
