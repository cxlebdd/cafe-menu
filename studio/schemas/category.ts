import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', description: 'Opcional, para describir la categoría' }),
    defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }),
  ]
})
