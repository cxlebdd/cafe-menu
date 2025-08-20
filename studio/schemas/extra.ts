import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'extra',
  title: 'Extra',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'price', title: 'Precio', type: 'number' }),
    defineField({ name: 'applicableTo', title: 'Aplica a', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }, { type: 'product' }] }] })
  ]
})
