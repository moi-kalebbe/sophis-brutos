import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Email autorizado para acessar o super admin
const AUTHORIZED_ADMIN_EMAIL = 'trabalhosmktsophia@gmail.com';

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

        // Protect admin routes - require authentication
        if (request.nextUrl.pathname.startsWith('/admin') &&
            !request.nextUrl.pathname.startsWith('/admin/login') &&
            !user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }

        // Check if user is authorized super admin
        if (request.nextUrl.pathname.startsWith('/admin') &&
            !request.nextUrl.pathname.startsWith('/admin/login') &&
            user &&
            user.email !== AUTHORIZED_ADMIN_EMAIL) {
            // User is logged in but not authorized - sign them out and redirect
            await supabase.auth.signOut();
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            url.searchParams.set('error', 'unauthorized')
            return NextResponse.redirect(url)
        }

        // Redirect to dashboard if authorized admin is trying to access login
        if (request.nextUrl.pathname.startsWith('/admin/login') &&
            user &&
            user.email === AUTHORIZED_ADMIN_EMAIL) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/dashboard'
            return NextResponse.redirect(url)
        }

        // If user is on login page but not authorized, allow access to show error
        if (request.nextUrl.pathname.startsWith('/admin/login')) {
            return supabaseResponse;
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
