import { Image } from './media'
import { User } from './user'

export interface BlogPost {
    _id: string
    title: string
    excerpt: string
    content: string
    images: Image[]
    user: User
    language: string
    slug: string
    date: string
}
