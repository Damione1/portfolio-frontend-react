import { Image } from './media'

export interface ProjectPost {
    _id: string
    title: string
    content: string
    images: Image[]
    tags: string[]
    stack: string[]
    user: string
    language: string
    slug: string
    createdAt: string
    updatedAt: string
    link: string
    __v: number
    excerpt: string
}
