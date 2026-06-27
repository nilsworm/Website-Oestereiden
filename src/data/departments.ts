import type { DepartmentInfo } from '@/lib/types'

export const departments: DepartmentInfo[] = [
  {
    id: 'fussball',
    label: 'Fußball',
    description: 'Von der E-Jugend bis zu den Senioren – Fußball für jedes Alter. Gemeinsam mit der SG Haarstrang.',
    head: 'Rolf Benteler',
    heroImage: '/images/hero/Fussball-30.jpg',
  },
  {
    id: 'volleyball',
    label: 'Volleyball',
    description: 'Hallenvolleyball für Damen, Herren und Jugend – von den Minis bis zur 1. Mannschaft.',
    head: 'Doris Witthaut',
    heroImage: '/images/hero/Verein-allgemein-16.jpg',
  },
  {
    id: 'tennis',
    label: 'Tennis',
    description: 'Moderne Tennisanlage mit mehreren Plätzen, Jugendförderung und eigenem Trainer.',
    head: 'Gerrit Keil',
    heroImage: '/images/hero/Tennis-2.jpg',
  },
  {
    id: 'breitensport',
    label: 'Breitensport',
    description: 'Kindertanzen, Kinderturnen, Fitness, Fit Mix, Nordic Walking – Sport für die ganze Familie.',
    head: 'Carina Kaltschmidt',
    heroImage: '/images/hero/Kindertanzen-6.jpg',
  },
]
