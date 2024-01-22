import { NextRequest, NextResponse } from 'next/server'
import { NextMiddleware } from 'next/server/middleware'
import cookie from 'cookie'

const middleware: NextMiddleware = async (req: NextRequest, ev) => {
    const cookies = cookie.parse(req.headers.get('Cookie') || '')
    const token = cookies.token

    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect('/auth')
    }

    return await ev.nextRequest(req)
}

export default middleware
