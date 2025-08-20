import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ 
      name: 'category', 
      title: 'Categoría', 
      type: 'reference', 
      to: [{ type: 'category' }] 
    }),
    defineField({ name: 'price', title: 'Precio base', type: 'number' }),
    defineField({ name: 'note', title: 'Notas adicionales', type: 'text' }),
    defineField({
      name: 'extras',
      title: 'Extras disponibles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'extra' }] }]
    }),
    defineField({ name: 'image', title: 'Imagen (opcional)', type: 'image', options: { hotspot: true } }),
  ]
})
