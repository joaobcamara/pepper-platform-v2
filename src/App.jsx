import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Copy,
  Loader2,
  Package2,
  ShoppingBag,
  Store,
  Music2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

const PLATFORM_META = {
  tiny: {
    title: 'Tiny ERP',
    subtitle: 'Cadastro do produto, slug, keywords e SEO',
    icon: Package2,
    accentClass: 'tiny-section',
  },
  shopee: {
    title: 'Shopee',
    subtitle: 'Copy comercial com apelo de marketplace',
    icon: ShoppingBag,
    accentClass: 'shopee-section',
  },
  ml: {
    title: 'Mercado Livre',
    subtitle: 'Texto profissional, claro e confiável',
    icon: Store,
    accentClass: 'ml-section',
  },
  tiktok: {
    title: 'TikTok Shop',
    subtitle: 'Texto mais chamativo e atrativo para conversão',
    icon: Music2,
    accentClass: 'tiktok-section',
  },
};

const KIT_ORDER = ['unidade', 'kit3', 'kit5', 'kit8'];
const KIT_LABELS = {
  unidade: 'Unidade',
  kit3: 'Kit 3',
  kit5: 'Kit 5',
  kit8: 'Kit 8',
};

const TEXTAREA_MAX = 2000;

const exampleText = `Produto: Calcinha tapa fralda infantil com babado em organza e cambraia ou renda.
Material: 100% poliéster.
Acabamento: fita cetim na ponta, laço central acetinado, elástico embutido no cós e pernas com acabamento acetinado.
Tamanho: único.
Veste: 6 meses (com fralda) a 2 anos (sem fralda).
Medidas: cintura 40cm em descanso e 60cm esticado; quadril 54cm em descanso e 68cm esticado; comprimento 18cm.
Cores: pink, rosé, rosa claro, vermelho, branco, salmão, lilás, vinho, preto, azul claro, azul marinho, creme, verde claro, amarelo, laranja, verde esmeralda e bege.`;

function safeString(value) {
  return typeof value === 'string' ? value : '';
}

function normalizeResponse(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new Error('A função retornou um formato inválido.');
  }

  if (raw.error) {
    throw new Error(raw.error);
  }

  const normalized = {
    tiny: {
      titulo: safeString(raw?.tiny?.titulo),
      descricao: safeString(raw?.tiny?.descricao),
      slug: safeString(raw?.tiny?.slug),
      keywords: safeString(raw?.tiny?.keywords),
      seoTitle: safeString(raw?.tiny?.seoTitle),
      seoDesc: safeString(raw?.tiny?.seoDesc),
    },
    shopee: {},
    ml: {},
    tiktok: {},
  };

  for (const platform of ['shopee', 'ml', 'tiktok']) {
    for (const kit of KIT_ORDER) {
      normalized[platform][kit] = {
        titulo: safeString(raw?.[platform]?.[kit]?.titulo),
        descricao: safeString(raw?.[platform]?.[kit]?.descricao),
      };
    }
  }

  return normalized;
}

function extractJson(text) {
  if (!text) {
    throw new Error('A função retornou resposta vazia.');
  }

  try {
    return JSON.parse(text);
  } catch {
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first !== -1 && last !== -1 && last > first) {
      return JSON.parse(text.slice(first, last + 1));
    }
    throw new Error('A função retornou um formato inválido. Verifique o deploy da function.');
  }
}

function CopyButton({ value }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value || '');
    } catch {
      // sem ação extra
    }
  };

  return (
    <button type="button" className="copy-btn" onClick={handleCopy} title="Copiar">
      <Copy size={16} />
    </button>
  );
}

function FieldCard({ label, value, long = false, emphasis = false }) {
  return (
    <div className="field-card">
      <div className="field-header">
        <span className="field-label">{label}</span>
        <CopyButton value={value} />
      </div>
      <p className={`field-value ${long ? 'field-long' : ''} ${emphasis ? 'field-emphasis' : ''}`}>{value || '—'}</p>
    </div>
  );
}

function TinySection({ data }) {
  const Icon = PLATFORM_META.tiny.icon;

  return (
    <section className={`result-section ${PLATFORM_META.tiny.accentClass}`}>
      <div className="section-header">
        <div className="section-icon-wrap"><Icon size={20} /></div>
        <div>
          <h3>{PLATFORM_META.tiny.title}</h3>
          <p>{PLATFORM_META.tiny.subtitle}</p>
        </div>
      </div>

      <div className="grid-two">
        <FieldCard label="Título do Produto" value={data.titulo} emphasis />
        <FieldCard label="Slug" value={data.slug} />
        <FieldCard label="Keywords" value={data.keywords} long />
        <FieldCard label="Título SEO" value={data.seoTitle} emphasis />
        <div className="span-two"><FieldCard label="Descrição do Produto" value={data.descricao} long /></div>
        <div className="span-two"><FieldCard label="Descrição SEO" value={data.seoDesc} long /></div>
      </div>
    </section>
  );
}

function MarketplaceSection({ platformKey, data }) {
  const meta = PLATFORM_META[platformKey];
  const Icon = meta.icon;

  return (
    <section className={`result-section ${meta.accentClass}`}>
      <div className="section-header">
        <div className="section-icon-wrap"><Icon size={20} /></div>
        <div>
          <h3>{meta.title}</h3>
          <p>{meta.subtitle}</p>
        </div>
      </div>

      <div className="market-grid">
        {KIT_ORDER.map((kit) => (
          <div key={kit} className="kit-panel">
            <div className="kit-panel-title">{KIT_LABELS[kit]}</div>
            <FieldCard label="Título" value={data?.[kit]?.titulo} emphasis />
            <FieldCard label="Descrição" value={data?.[kit]?.descricao} long />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [texto, setTexto] = useState(exampleText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [responseMeta, setResponseMeta] = useState('');

  const remaining = TEXTAREA_MAX - texto.length;
  const disabled = useMemo(() => !texto.trim() || loading || texto.length > TEXTAREA_MAX, [texto, loading]);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResponseMeta('');
    setResult(null);

    try {
      const response = await fetch('/.netlify/functions/criar-produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productContext: texto }),
      });

      const rawText = await response.text();
      const parsed = extractJson(rawText);

      if (!response.ok) {
        throw new Error(parsed?.error || 'Falha ao gerar conteúdo.');
      }

      const normalized = normalizeResponse(parsed);
      setResult(normalized);
      setResponseMeta(parsed?.meta || 'Conteúdo gerado com sucesso.');
    } catch (err) {
      setError(err?.message || 'Não foi possível gerar o conteúdo agora.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <div className="app-container">
        <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="hero-card">
          <div className="hero-logo-wrap">
            <img src="/logo-pepper.jpg" alt="Pepper E-commerce" className="hero-logo" />
          </div>
          <div className="hero-copy">
            <div className="hero-pill"><Sparkles size={16} /> Plataforma Pepper AI</div>
            <h1>Criador Profissional de Anúncios</h1>
            <p>
              Gere títulos, descrições completas, cadastro para Tiny e variações por marketplace em uma plataforma mais estável,
              pronta para uso interno da sua equipe.
            </p>
          </div>
        </motion.header>

        <div className="layout-grid">
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="sidebar-card">
            <div className="card-head">
              <div className="card-icon"><Sparkles size={20} /></div>
              <div>
                <h2>Gerar anúncios</h2>
                <p>Cada clique cria uma nova variação para todas as plataformas.</p>
              </div>
            </div>

            <label className="textarea-label">Características principais</label>
            <textarea
              className="product-textarea"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={TEXTAREA_MAX + 200}
              placeholder="Descreva o produto com material, medidas, público, cores, variações e benefícios."
            />

            <div className="char-box">
              <span>Caracteres</span>
              <strong>{texto.length}/{TEXTAREA_MAX}</strong>
            </div>

            <p className="helper-text">
              Inclua categoria, material, tamanho, cor, diferenciais, público-alvo e benefícios principais. Restantes: {remaining >= 0 ? remaining : 0}.
            </p>

            <button type="button" onClick={handleGenerate} disabled={disabled} className="generate-button">
              {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
              {loading ? 'Gerando conteúdo...' : 'Gerar conteúdo com IA'}
            </button>

            <div className="info-stack">
              <div className="info-pill"><ShieldCheck size={15} /> Resposta em JSON validado</div>
              <div className="info-pill"><CheckCircle2 size={15} /> Tiny e marketplaces integrados</div>
            </div>

            {error && (
              <div className="error-panel">
                <AlertTriangle size={18} />
                <div>
                  <strong>Falha ao gerar conteúdo</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </motion.aside>

          <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="results-card">
            <div className="results-head">
              <div>
                <h2>Resultados</h2>
                <p>Ordem sugerida: Tiny, Shopee, Mercado Livre e TikTok Shop.</p>
              </div>
              <div className="api-status"><CheckCircle2 size={15} /> OpenAI via Netlify Function</div>
            </div>

            {!result && !loading && (
              <div className="empty-state">
                <div className="empty-icon">IA</div>
                <h3>Os resultados vão aparecer aqui</h3>
                <p>Use a descrição do produto ao lado e clique em gerar para receber a estrutura completa.</p>
              </div>
            )}

            {loading && (
              <div className="empty-state">
                <Loader2 size={34} className="spin loading-accent" />
                <h3>Processando o produto...</h3>
                <p>Montando títulos, descrições, SEO e textos adaptados para cada marketplace.</p>
              </div>
            )}

            {result && !loading && (
              <div className="results-stack">
                {responseMeta && <div className="response-meta">{responseMeta}</div>}
                <TinySection data={result.tiny} />
                <MarketplaceSection platformKey="shopee" data={result.shopee} />
                <MarketplaceSection platformKey="ml" data={result.ml} />
                <MarketplaceSection platformKey="tiktok" data={result.tiktok} />
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
