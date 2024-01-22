import { Image } from './media'

export interface ProjectPost {
    _id: string
    title: string
    content: string
    link: string
    images: Image[]
    tags: string[]
    stack: string[]
    user: string
    language: string
    slug: string
    date: string
    __v: number
    excerpt: string
}
