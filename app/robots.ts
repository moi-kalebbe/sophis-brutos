import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/site'

/**
 * Rotas fechadas para todo mundo: o painel administrativo e a LP2, que é uma
 * variação da home e seria conteúdo duplicado.
 */
const BLOQUEADO = ['/admin/', '/lp2']

/**
 * Crawlers de buscadores com IA. Liberados de propósito: é o que permite a
 * Sophia Brutos ser citada em respostas do Google AI Overviews, ChatGPT,
 * Perplexity e Claude quando alguém pergunta por semijoias no bruto em Limeira.
 *
 * Para sair dessas respostas no futuro, basta trocar o `allow` do bot por
 * `disallow: '/'`.
 */
const BOTS_DE_IA = [
    'Google-Extended',   // Gemini e AI Overviews
    'GPTBot',            // treino da OpenAI
    'OAI-SearchBot',     // busca do ChatGPT
    'ChatGPT-User',      // navegação sob pedido do usuário no ChatGPT
    'ClaudeBot',         // Anthropic
    'Claude-User',
    'PerplexityBot',
    'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: BLOQUEADO,
            },
            ...BOTS_DE_IA.map((userAgent) => ({
                userAgent,
                allow: '/',
                disallow: BLOQUEADO,
            })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
