# Hero セクション微調整 — クライアントフィードバック対応

## クライアントからのフィードバック

### 1) ロゴの位置調整
- ロゴを少し下げて英文字に近づける（上に余白を取る）
- ロゴと文字のバランス改善

### 2) P・I の頭文字の存在感
- M が最も目立つ現状に対し、P・I を並列で目立つ太さと大きさに
- ロゴをひと回り小さくして文字とバランスを取る実験も視野

### 3) 本文フォントサイズ
- 高年齢読者を考慮し、本文のフォントサイズを少し上げる
- エレガントさとメリハリとの兼ね合いを保つ

---

## 対応方針

### Step 1: Hero ロゴ＋ロゴタイプのバランス調整

**現状の問題:**
- `.hero-logo-img`: max-width: 400px
- `.hero-inner`: gap: var(--ma-md) = 3rem
- `.hero-logotype`: margin-top: var(--ma-md) = 3rem
- ロゴと文字の間に計6rem（96px）の距離がある

**対応:**
- `.hero-inner` の上部に padding-top を追加し、ロゴを下方にずらす（視覚的に上余白を増やす）
- `.hero-logotype` の margin-top を縮小（var(--ma-md) → var(--ma-sm)）でロゴと文字を近づける
- ロゴ画像をひと回り小さくする（400px → 320px）で文字との比率を改善

### Step 2: P・I 頭文字のサイズ・ウェイト強化

**現状:**
- M (Tangerine Bold): clamp(5rem, 11vw, 8rem) — 非常に大きく目立つ
- P, I (Kapakana Regular): clamp(4rem, 9vw, 6.5rem) — M より一段小さい
- ovo部分: clamp(1.5rem, 3.5vw, 2.5rem)

**対応:**
- P, I のサイズを M に近づける: clamp(4.5rem, 10vw, 7.5rem)
- Kapakana は Regular のみなので、font-weight での調整は不可
- 代わりに letter-spacing を少し広げて視覚的存在感を出す
- M のサイズを若干抑制: clamp(4.5rem, 10vw, 7.5rem) で3文字を揃える方向
  → ただし M は Tangerine Bold のスクリプト体なので同サイズでも印象が異なる
  → M を少し大きめに残しつつ、P/I を引き上げる方向: M=clamp(5rem, 11vw, 7.5rem), P/I=clamp(4.5rem, 10vw, 7rem)

### Step 3: 本文フォントサイズ引き上げ

**現状:**
- `.pillar-body p`: clamp(0.875rem, 1.2vw, 0.9375rem) = 14px〜15px
- `.statement-quote p`: clamp(0.9375rem, 1.4vw, 1.0625rem) = 15px〜17px

**対応:**
- `.pillar-body p`: clamp(0.9375rem, 1.4vw, 1.0625rem) — 15px〜17px に引き上げ
- `.statement-quote p`: clamp(1rem, 1.6vw, 1.125rem) — 16px〜18px に引き上げ
- line-height はそのまま（2.6 / 2.8）で呼吸感を維持
- エレガントさを損なわないよう、letter-spacing を微増して空気感を保つ

---

## 変更対象ファイル

1. `site/css/style.css` — 上記3点のCSS調整のみ
