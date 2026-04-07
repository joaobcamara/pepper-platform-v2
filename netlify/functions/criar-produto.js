export async function handler(event) {
  try {
    const { productContext } = JSON.parse(event.body || "{}");

    if (!productContext) {
      return response(400, { error: "Descrição não enviada" });
    }

    const prompt = `
Você é um especialista em e-commerce.

Gere conteúdos profissionais com base na descrição abaixo.

IMPORTANTE:
- Responda APENAS em JSON válido
- NÃO inclua texto fora do JSON
- NÃO use crases
- NÃO use explicações

Formato obrigatório:

{
  "tiny": {
    "titulo": "",
    "descricao": "",
    "slug": "",
    "keywords": "",
    "seoTitle": "",
    "seoDesc": ""
  },
  "shopee": {
    "unidade": { "titulo": "", "descricao": "" },
    "kit3": { "titulo": "", "descricao": "" },
    "kit5": { "titulo": "", "descricao": "" },
    "kit8": { "titulo": "", "descricao": "" }
  },
  "ml": {
    "unidade": { "titulo": "", "descricao": "" },
    "kit3": { "titulo": "", "descricao": "" },
    "kit5": { "titulo": "", "descricao": "" },
    "kit8": { "titulo": "", "descricao": "" }
  },
  "tiktok": {
    "unidade": { "titulo": "", "descricao": "" },
    "kit3": { "titulo": "", "descricao": "" },
    "kit5": { "titulo": "", "descricao": "" },
    "kit8": { "titulo": "", "descricao": "" }
  }
}

REGRAS:
- Títulos um pouco maiores, com 1 ou 2 palavras a mais
- Tiny e Mercado Livre sem emojis
- Shopee e TikTok com emojis leves
- Descrições completas e profissionais

Formato da descrição:
Parágrafo inicial explicando o produto e benefícios

Principais Características:
• lista detalhada

Tamanhos Disponíveis:
(se houver)

Cores Disponíveis:
(se houver)

Indicado Para:
...

Produto:
${productContext}
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    let content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Resposta vazia da IA");
    }

    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("JSON inválido retornado pela IA");
    }

    const jsonString = content.slice(start, end + 1);

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      throw new Error("Erro ao fazer parse do JSON");
    }

    return response(200, parsed);
  } catch (error) {
    console.error("Erro:", error.message);

    return response(500, {
      error: "Erro ao gerar conteúdo",
      detalhe: error.message,
    });
  }
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}