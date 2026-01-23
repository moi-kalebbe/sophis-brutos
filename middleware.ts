import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    try {
        // Create client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('Middleware skipped: Supabase environment variables missing');
            return supabaseResponse;
        }

        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            request.cookies.set(name, value)
                        )

                        supabaseResponse = NextResponse.next({
                            request,
                        })

                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        )
                    },
                },
            }
        )

        // Refresh session
        const {
            data: { user },
        } = await supabase.auth.getUser()

        // Protect admin routes
        if (request.nextUrl.pathname.startsWith('/admin') &&
            !request.nextUrl.pathname.startsWith('/admin/login') &&
            !user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }

        // Redirect to dashboard if logged in and trying to access login
        if (request.nextUrl.pathname.startsWith('/admin/login') && user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/dashboard'
            return NextResponse.redirect(url)
        }

        return supabaseResponse
    } catch (e) {
        console.error('Middleware error:', e);
        // Fallback to allow request even if middleware fails
        return NextResponse.next({
            request,
        })
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}
