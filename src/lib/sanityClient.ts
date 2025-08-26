import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'xclbx4yr', // from sanity.json
  dataset: 'production', // or your dataset
  apiVersion: '2025-08-26', // use today's date
  useCdn: true, // set to false to get fresh data
})
