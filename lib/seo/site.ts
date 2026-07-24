/**
 * Fonte única dos dados públicos da empresa.
 *
 * Endereço, horário e nome das lojas vivem aqui para que o JSON-LD e os
 * componentes nunca divirjam. Quando algo mudar (a loja da fábrica já mudou de
 * endereço uma vez), mexer só neste arquivo.
 *
 * Estes mesmos dados existem na base de conhecimento da IA (Supabase, tabelas
 * `documents` e `knowledge_base`) — atualizar os dois lados.
 */

export const SITE_URL = "https://sophiabrutos.com.br";

export const EMPRESA = {
    nome: "Sophia Brutos",
    descricaoCurta:
        "Indústria de semijoias no bruto em Limeira/SP, com atacado para lojistas e revendedores.",
    telefone: "+55 19 97125-4342",
    catalogo: "https://app.conectavenda.com.br/8267e2cda86b6e94e639434a6cee993c/",
    fundacao: "2014",
} as const;

/** Seg a qui até 18h, sex até 17h, não abre sábado nem domingo. */
export const HORARIOS = [
    { dias: ["Monday", "Tuesday", "Wednesday", "Thursday"], abre: "08:00", fecha: "18:00" },
    { dias: ["Friday"], abre: "08:00", fecha: "17:00" },
] as const;

export type Loja = {
    nome: string;
    rua: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
};

export const LOJAS: readonly Loja[] = [
    {
        nome: "Sophia Brutos | Loja da Fábrica",
        rua: "Rua José Faccioni Filho, 301",
        bairro: "Jardim Glória",
        cep: "13487-211",
        cidade: "Limeira",
        uf: "SP",
    },
    {
        nome: "Sophia Brutos | Shopping Boulevard",
        rua: "Av. Marechal Arthur da Costa e Silva, 795 - Loja 144",
        bairro: "Jardim Glória",
        cep: "13487-220",
        cidade: "Limeira",
        uf: "SP",
    },
] as const;

/** A fábrica é a sede: é onde fica a indústria e a coleção completa. */
export const SEDE = LOJAS[0];

export function enderecoPostal(loja: Loja) {
    return {
        "@type": "PostalAddress",
        streetAddress: loja.rua,
        addressLocality: loja.cidade,
        addressRegion: loja.uf,
        postalCode: loja.cep,
        addressCountry: "BR",
    };
}

function horarioEstruturado() {
    return HORARIOS.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...h.dias],
        opens: h.abre,
        closes: h.fecha,
    }));
}

/** Cada loja como um ponto físico, para busca local e mapas. */
export function lojasEstruturadas() {
    return LOJAS.map((loja) => ({
        "@type": "Store",
        name: loja.nome,
        address: enderecoPostal(loja),
        telephone: EMPRESA.telefone,
        openingHoursSpecification: horarioEstruturado(),
        parentOrganization: { "@type": "Organization", name: EMPRESA.nome },
    }));
}
