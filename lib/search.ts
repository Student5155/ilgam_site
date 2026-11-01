import { CATEGORIES, type Category, type Item, type Status } from "./catalog";

export type SearchHit =
  | { type: "category"; category: Category; score: number }
  | { type: "item"; category: Category; item: Item; status: Status; score: number };

// Народные названия → слова из каталога
const SYNONYMS: Record<string, string[]> = {
  колес: ["шин", "диск"],
  колёс: ["шин", "диск"],
  резин: ["шин"],
  покрыш: ["шин"],
  желез: ["арматур"],
  метал: ["арматур", "профнастил"],
  прут: ["арматур", "сетк"],
  пенопл: ["пеноплекс"],
  ват: ["минват"],
  крыш: ["профнастил"],
  кровл: ["профнастил"],
  забор: ["профнастил"],
  стеклопак: ["окн"],
  стяжк: ["сетк", "цемент"],
  бетон: ["цемент"],
  утепл: ["утеплит", "минват", "пеноплекс"],
};

export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[«»"(),.;:!?/×–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Простейшее «обрезание окончаний»: цемента → цеме, окно → окн
function stem(token: string) {
  if (/^\d/.test(token) || token.length <= 3) return token;
  return token.slice(0, Math.max(3, token.length - 2));
}

function variants(token: string): string[] {
  const s = stem(token);
  const out = [s];
  for (const [key, list] of Object.entries(SYNONYMS)) {
    const k = normalize(key);
    if (s.startsWith(k) || (s.length >= 3 && k.startsWith(s))) out.push(...list.map(normalize));
  }
  return out;
}

function matchScore(text: string, tokens: string[]) {
  let score = 0;
  for (const t of tokens) {
    const vs = variants(t);
    if (!vs.some((v) => text.includes(v))) return 0;
    score += 1;
  }
  return score;
}

export function search(query: string): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter(Boolean);
  const hits: SearchHit[] = [];

  for (const c of CATEGORIES) {
    const catText = normalize([c.title, c.short, c.group, c.keywords.join(" ")].join(" "));
    const s = matchScore(catText, tokens);
    if (s) hits.push({ type: "category", category: c, score: s + 10 });

    for (const item of c.items) {
      const itemText = normalize([item.name, item.spec, c.title, c.keywords.join(" ")].join(" "));
      const si = matchScore(itemText, tokens);
      if (si) {
        // Совпадение по самому товару важнее, чем по ключевым словам раздела
        const direct = matchScore(normalize(item.name + " " + item.spec), tokens) ? 5 : 0;
        hits.push({ type: "item", category: c, item, status: item.status ?? c.status, score: si + direct });
      }
    }
  }
  return hits.sort((a, b) => b.score - a.score);
}
