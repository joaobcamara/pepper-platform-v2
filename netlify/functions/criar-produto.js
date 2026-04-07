export async function handler(event) {
  const json = (statusCode, payload) => ({
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Método não permitido." });
    }

    const body = JSON.parse(event.body || "{}");
    const productContext = body.productContext || "";

    if (!productContext.trim()) {
      return json(400, { error: "O campo productContext é obrigatório." });
    }

    return json(200, {
      tiny: {
        titulo: "Calcinha Tapa Fralda Infantil com Babado em Organza Premium",
        descricao:
          "A calcinha tapa fralda infantil com babado em organza foi desenvolvida para oferecer charme, conforto e excelente acabamento para compor looks delicados e elegantes.\n\nPrincipais Características:\n• Modelo infantil com acabamento refinado\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Fita cetim na ponta e laço central acetinado\n• Elástico embutido no cós e nas pernas com acabamento acetinado\n\nTamanhos Disponíveis:\n• Tamanho único\n• Veste de 6 meses com fralda até 2 anos sem fralda\n\nCores Disponíveis:\n• Pink, rosé, rosa claro, vermelho, branco, salmão, lilás, vinho, preto, azul claro, azul marinho, creme, verde claro, amarelo, laranja, verde esmeralda e bege\n\nIndicado Para:\n• Ensaios fotográficos\n• Festas e aniversários\n• Produção de looks infantis delicados",
        slug: "calcinha-tapa-fralda-infantil-babado-organza-premium",
        keywords:
          "calcinha tapa fralda infantil, calcinha infantil babado, tapa fralda organza, calcinha bebê luxo",
        seoTitle:
          "Calcinha Tapa Fralda Infantil com Babado em Organza Premium",
        seoDesc:
          "Calcinha tapa fralda infantil com babado em organza, acabamento acetinado, tamanho único e diversas cores disponíveis.",
      },
      shopee: {
        unidade: {
          titulo: "✨ Calcinha Tapa Fralda Infantil com Babado Organza Premium",
          descricao:
            "A calcinha tapa fralda infantil foi criada para deixar o look da bebê ainda mais delicado, confortável e encantador.\n\nPrincipais Características:\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Laço central acetinado com acabamento refinado\n• Elástico embutido no cós e nas pernas\n• Tamanho único\n\nCores Disponíveis:\n• Diversas opções de cores para combinar com vários looks\n\nIndicado Para:\n• Festinhas\n• Ensaios fotográficos\n• Produções infantis delicadas",
        },
        kit3: {
          titulo: "✨ Kit 3 Calcinhas Tapa Fralda Infantil com Babado Premium",
          descricao:
            "O kit com 3 calcinhas tapa fralda infantis é ideal para quem busca variedade, praticidade e excelente apresentação em peças delicadas para bebê.\n\nPrincipais Características:\n• 3 unidades com acabamento refinado\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Laço central acetinado\n• Tamanho único\n\nIndicado Para:\n• Uso em diferentes ocasiões\n• Quem deseja mais opções de cores e combinações",
        },
        kit5: {
          titulo: "✨ Kit 5 Calcinhas Tapa Fralda Infantil com Babado Luxo",
          descricao:
            "O kit com 5 calcinhas tapa fralda infantis oferece mais variedade e custo-benefício para montar looks delicados com acabamento premium.\n\nPrincipais Características:\n• 5 unidades\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Acabamento acetinado no cós e pernas\n• Tamanho único\n\nIndicado Para:\n• Uso frequente\n• Ensaios, festas e looks especiais",
        },
        kit8: {
          titulo: "✨ Kit 8 Calcinhas Tapa Fralda Infantil com Babado Premium",
          descricao:
            "O kit com 8 calcinhas tapa fralda infantis é perfeito para quem quer máxima variedade, praticidade e excelente apresentação em peças infantis delicadas.\n\nPrincipais Características:\n• 8 unidades com acabamento refinado\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Laço central acetinado\n• Tamanho único\n\nIndicado Para:\n• Rotina com mais praticidade\n• Quem quer variedade de cores e combinações",
        },
      },
      ml: {
        unidade: {
          titulo: "Calcinha Tapa Fralda Infantil com Babado em Organza Premium",
          descricao:
            "A calcinha tapa fralda infantil com babado em organza foi desenvolvida para oferecer charme, conforto e excelente acabamento para compor looks delicados.\n\nPrincipais Características:\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Fita cetim na ponta e laço central acetinado\n• Elástico embutido no cós e nas pernas\n• Acabamento acetinado\n\nTamanhos Disponíveis:\n• Tamanho único\n• Veste de 6 meses com fralda até 2 anos sem fralda\n\nCores Disponíveis:\n• Grande variedade de cores\n\nIndicado Para:\n• Produções infantis delicadas\n• Ensaios e festas",
        },
        kit3: {
          titulo: "Kit 3 Calcinhas Tapa Fralda Infantil com Babado Premium",
          descricao:
            "Kit com 3 calcinhas tapa fralda infantis ideal para quem busca praticidade, variedade e excelente acabamento em peças delicadas.\n\nPrincipais Características:\n• 3 unidades\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Laço central acetinado\n• Tamanho único\n\nIndicado Para:\n• Uso frequente\n• Produções infantis e ocasiões especiais",
        },
        kit5: {
          titulo: "Kit 5 Calcinhas Tapa Fralda Infantil com Babado Luxo",
          descricao:
            "Kit com 5 calcinhas tapa fralda infantis pensado para ampliar a variedade de looks com conforto e ótimo acabamento.\n\nPrincipais Características:\n• 5 unidades\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Acabamento refinado\n• Tamanho único\n\nIndicado Para:\n• Uso recorrente\n• Festas, ensaios e looks especiais",
        },
        kit8: {
          titulo: "Kit 8 Calcinhas Tapa Fralda Infantil com Babado Premium",
          descricao:
            "Kit com 8 calcinhas tapa fralda infantis para quem deseja maior variedade, praticidade e excelente apresentação.\n\nPrincipais Características:\n• 8 unidades\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Laço central acetinado\n• Tamanho único\n\nIndicado Para:\n• Uso contínuo\n• Composição de diversos looks infantis",
        },
      },
      tiktok: {
        unidade: {
          titulo: "✨ Calcinha Tapa Fralda Infantil Babado Organza Delicada",
          descricao:
            "A calcinha tapa fralda infantil é perfeita para criar looks delicados, charmosos e confortáveis para a bebê.\n\nPrincipais Características:\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Laço central acetinado\n• Elástico embutido no cós e pernas\n• Tamanho único\n\nIndicado Para:\n• Looks infantis especiais\n• Ensaios e festas",
        },
        kit3: {
          titulo: "✨ Kit 3 Tapa Fralda Infantil com Babado Organza Premium",
          descricao:
            "Kit com 3 peças para quem quer mais variedade e praticidade em looks infantis delicados.\n\nPrincipais Características:\n• 3 unidades\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Acabamento refinado\n• Tamanho único\n\nIndicado Para:\n• Festas\n• Produções infantis",
        },
        kit5: {
          titulo: "✨ Kit 5 Tapa Fralda Infantil com Babado Organza Luxo",
          descricao:
            "Kit com 5 peças ideal para quem busca mais opções de cores e ótimo custo-benefício em peças infantis delicadas.\n\nPrincipais Características:\n• 5 unidades\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Laço central acetinado\n• Tamanho único\n\nIndicado Para:\n• Ensaios fotográficos\n• Looks especiais",
        },
        kit8: {
          titulo: "✨ Kit 8 Tapa Fralda Infantil com Babado Organza Premium",
          descricao:
            "Kit com 8 peças para montar vários looks delicados com praticidade, variedade e excelente acabamento.\n\nPrincipais Características:\n• 8 unidades\n• Babado em organza e cambraia ou renda\n• Material 100% poliéster\n• Acabamento refinado\n• Tamanho único\n\nIndicado Para:\n• Uso recorrente\n• Produções infantis especiais",
        },
      },
    });
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        error: error?.message || "Erro interno no servidor.",
      }),
    };
  }
}