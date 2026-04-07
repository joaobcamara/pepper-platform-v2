export async function handler(event) {
  try {
    const { descricao } = JSON.parse(event.body);

    if (!descricao) {
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
    "descricao": ""
  },
  "shopee": {
    "titulo": "",
    "descricao": ""
  },
  "mercado_livre": {
    "titulo": "",
    "descricao": ""
  },
  "tiktok": {
    "titulo": "",
    "descricao": ""
  }
}

REGRAS:

TÍTULOS:
- Clareza + SEO
- 1 a 2 palavras a mais (como solicitado)

DESCRIÇÃO:
- Texto completo e profissional
- Seguir estrutura:

Introdução do produto

Principais características (em lista)

Material

Tamanhos

Cores (se houver)

Indicação de uso

Diferenciais

OBS:
- Tiny e Mercado Livre: SEM emojis
- Shopee e TikTok: COM emojis leves

Produto:
${descricao}
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

    let content = data.choices?.[0]?.message?.content;

    // 🧠 LIMPEZA AUTOMÁTICA (ESSA É A CHAVE)
    if (!content) {
      throw new Error("Resposta vazia da IA");
    }

    // Remove possíveis textos antes/depois do JSON
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("JSON inválido retornado pela IA");
    }

    const jsonString = content.slice(start, end + 1);

    let parsed;

    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
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