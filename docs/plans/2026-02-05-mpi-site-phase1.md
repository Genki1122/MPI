# MPI Corporate Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 4月のフェーズ1公開に向けて、MPIコーポレートサイトを完成させる

**Architecture:** 静的HTML/CSS/JSによるミニマルな構成。「Static yet Dynamic」のコンセプトに基づき、余白とイージングを重視したスクロール体験を実現。メインサイト + 3つのCase Studyページで構成。

**Tech Stack:** HTML5, CSS3 (CSS Variables), Vanilla JavaScript, Google Fonts (Cormorant Garamond, Noto Serif JP, Tangerine)

---

## Current Implementation Status (現状)

### ✅ 実装済み

| Component | File | Status |
|-----------|------|--------|
| メインページ | `site/index.html` | 完了 (278行) |
| CSS スタイリング | `site/css/style.css` | 完了 (1,101行) |
| JavaScript | `site/js/main.js` | 完了 (227行) |
| Hint Mint Case Study | `site/works/hint-mint.html` | 完了 |
| 浮世絵 Case Study | `site/works/ukiyoe.html` | 完了 |
| JASDF Case Study | `site/works/jasdf.html` | 完了 |

### 実装済み機能詳細

- **Navigation:** 固定ナビ、スクロール検知、backdrop-blur、モバイルメニュー
- **Hero Section:** SVGロゴアニメーション（60秒回転）、グラデーションテキスト
- **Philosophy Section:** PFP（Philosophy First Policy）コンセプト表示
- **Service Section:** 3サービスのグリッドレイアウト
- **Works Section:** 3案件のカードレイアウト（ホバーエフェクト付き）
- **Profile Section:** 会社情報 + Background
- **Contact Section:** メールリンク
- **Animations:** IntersectionObserver によるfade-in、パララックス効果
- **Responsive:** 768px breakpoint でモバイル対応
- **Typography:** 指定フォント適用済み
- **Color System:** Purple (#5C00A4) / Magenta (#C4007B) グラデーント

---

## Phase 1 Tasks (4月公開向け)

### Task 1: Profile セクションの情報更新

**Files:**
- Modify: `site/index.html:218-229`

**Step 1: 会社情報のプレースホルダーを更新**

現在 "—" となっている箇所に実データを入れる。

```html
<div class="profile-row">
    <dt>Founded</dt>
    <dd>20XX年X月</dd>  <!-- 実際の設立日 -->
</div>
<div class="profile-row">
    <dt>Representative</dt>
    <dd>代表者名</dd>  <!-- 実際の代表者名 -->
</div>
```

**Step 2: ブラウザで確認**

Run: ローカルサーバーで `site/index.html` を開き、Profileセクションを確認
Expected: 会社情報が正しく表示される

**Step 3: Commit**

```bash
git add site/index.html
git commit -m "$(cat <<'EOF'
content: update profile section with company information

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Favicon の追加

**Files:**
- Create: `site/favicon.ico` または `site/favicon.svg`
- Modify: `site/index.html:3-5`
- Modify: `site/works/hint-mint.html:3-5`
- Modify: `site/works/ukiyoe.html:3-5`
- Modify: `site/works/jasdf.html:3-5`

**Step 1: Faviconファイルを作成**

ロゴのSVGを基にfaviconを作成（Purple/Magentaグラデーションの円形）

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5C00A4"/>
      <stop offset="100%" stop-color="#C4007B"/>
    </linearGradient>
  </defs>
  <circle cx="16" cy="16" r="14" fill="none" stroke="url(#g)" stroke-width="2"/>
</svg>
```

**Step 2: HTMLにfaviconリンクを追加**

各HTMLファイルの `<head>` 内に追加:

```html
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.ico" sizes="32x32">
```

Works配下は相対パス調整:
```html
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
```

**Step 3: ブラウザで確認**

Run: 各ページを開きブラウザタブにfaviconが表示されることを確認
Expected: Purple/Magentaの円形アイコンがタブに表示

**Step 4: Commit**

```bash
git add site/favicon.svg site/index.html site/works/*.html
git commit -m "$(cat <<'EOF'
feat: add favicon with brand colors

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: OGP (Open Graph Protocol) メタタグ追加

**Files:**
- Modify: `site/index.html:6-8`
- Create: `site/ogp.png` (1200x630px)

**Step 1: OGP画像を作成**

1200x630px の画像を作成:
- 背景: #fcfcfc (off-white)
- 中央: MPIロゴ + "Managing Professional Intellect" テキスト

**Step 2: index.html に OGP メタタグを追加**

```html
<!-- OGP -->
<meta property="og:title" content="MPI - Managing Professional Intellect">
<meta property="og:description" content="株式会社MPI - 知の複利を追求するプロフェッショナル集団。">
<meta property="og:image" content="https://mpi.co.jp/ogp.png">
<meta property="og:url" content="https://mpi.co.jp/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MPI">
<meta name="twitter:card" content="summary_large_image">
```

**Step 3: 各ページにも適切なOGPを追加**

Works ページには個別のタイトル・説明を設定

**Step 4: OGP Debugger で確認**

Run: Facebook Sharing Debugger または Twitter Card Validator で確認
Expected: 正しいプレビューが表示される

**Step 5: Commit**

```bash
git add site/ogp.png site/index.html site/works/*.html
git commit -m "$(cat <<'EOF'
feat: add OGP meta tags for social sharing

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: SEO メタタグの強化

**Files:**
- Modify: `site/index.html:5-8`
- Create: `site/robots.txt`
- Create: `site/sitemap.xml`

**Step 1: robots.txt を作成**

```txt
User-agent: *
Allow: /

Sitemap: https://mpi.co.jp/sitemap.xml
```

**Step 2: sitemap.xml を作成**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mpi.co.jp/</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mpi.co.jp/works/hint-mint.html</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mpi.co.jp/works/ukiyoe.html</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mpi.co.jp/works/jasdf.html</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Step 3: 追加メタタグ**

```html
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://mpi.co.jp/">
```

**Step 4: Google Search Console で確認**

Run: sitemap.xml を登録し、インデックス状況を確認
Expected: 全ページがインデックス対象として認識される

**Step 5: Commit**

```bash
git add site/robots.txt site/sitemap.xml site/index.html
git commit -m "$(cat <<'EOF'
feat: add robots.txt, sitemap.xml, and SEO meta tags

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: 404 エラーページの作成

**Files:**
- Create: `site/404.html`

**Step 1: 404.html を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found | MPI</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Noto+Serif+JP:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
</head>
<body>
    <nav class="nav nav--detail" id="nav">
        <div class="nav-logo">
            <a href="index.html">MPI</a>
        </div>
    </nav>

    <section class="section section--hero">
        <div class="hero-content">
            <h1 class="hero-title fade-in">
                <span class="hero-title-main">404</span>
            </h1>
            <p class="hero-tagline fade-in delay-1">Page Not Found</p>
            <div class="fade-in delay-2" style="margin-top: 4rem;">
                <a href="index.html" class="contact-email">Back to Home</a>
            </div>
        </div>
    </section>

    <script src="js/main.js"></script>
</body>
</html>
```

**Step 2: ブラウザで確認**

Run: `site/404.html` を直接開いて表示を確認
Expected: ブランドに沿った404ページが表示される

**Step 3: Commit**

```bash
git add site/404.html
git commit -m "$(cat <<'EOF'
feat: add 404 error page

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: パフォーマンス最適化

**Files:**
- Modify: `site/index.html:9-13`
- Modify: `site/css/style.css:1-5`

**Step 1: フォントの preload を追加**

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&display=swap" as="style">
```

**Step 2: Critical CSS のインライン化を検討**

ファーストビューに必要な最小限のCSSをインラインで記述（オプション）

**Step 3: Lighthouse で計測**

Run: Chrome DevTools の Lighthouse で Performance スコアを確認
Expected: Performance スコア 90+ を目指す

**Step 4: Commit**

```bash
git add site/index.html
git commit -m "$(cat <<'EOF'
perf: add font preload for faster rendering

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: iist.jp ベンチマーク比較・調整

**Files:**
- Modify: `site/css/style.css` (animation timing)
- Modify: `site/js/main.js` (scroll behavior)

**Step 1: iist.jp のスクロール体験を分析**

ベンチマークサイトの以下を確認:
- テキスト出現のタイミング
- フェードインのduration/easing
- 余白の取り方

**Step 2: Animation timing の調整**

現在の設定:
```css
--duration-slow: 1s;
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

必要に応じて調整

**Step 3: IntersectionObserver の threshold 調整**

```javascript
const observerOptions = {
    threshold: 0.15,  // 現在の値を確認・調整
    rootMargin: '0px 0px -50px 0px'
};
```

**Step 4: ブラウザで確認**

Run: スクロール時の体験を確認
Expected: 「重い言葉が適切な余白を伴って現れる」体験

**Step 5: Commit**

```bash
git add site/css/style.css site/js/main.js
git commit -m "$(cat <<'EOF'
refine: adjust animation timing for better scroll experience

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Phase 2 Tasks (将来の改善)

以下は4月公開後に検討する項目:

### 2-1: コンタクトフォームの実装
- 現在: mailto リンクのみ
- 改善: Netlify Forms / Formspree 等を利用したフォーム

### 2-2: 記事コンテンツセクションの追加
- 設計書記載: 「エモーショナルな内容は別途記事コンテンツへ」
- Blog/Articles セクションの追加

### 2-3: アクセス解析の導入
- Google Analytics 4 または Plausible Analytics
- プライバシー配慮型の計測

### 2-4: Case Study 画像の追加
- 各プロジェクトの視覚素材
- WebP形式での最適化

### 2-5: 多言語対応
- 英語版の作成（グローバル展開向け）

### 2-6: ダークモード対応
- CSS variables を活用した切り替え機能

### 2-7: アクセシビリティ改善
- WCAG 2.1 AA 準拠
- スクリーンリーダー対応強化

---

## File Structure (完成形)

```
site/
├── index.html
├── 404.html
├── favicon.svg
├── favicon.ico
├── ogp.png
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── main.js
└── works/
    ├── hint-mint.html
    ├── ukiyoe.html
    └── jasdf.html
```

---

## Checklist Before Launch

- [ ] Profile セクションの会社情報を確定
- [ ] Favicon が全ページで表示される
- [ ] OGP がSNSで正しくプレビューされる
- [ ] robots.txt / sitemap.xml が設置済み
- [ ] 404 ページが機能する
- [ ] Lighthouse Performance 90+
- [ ] Mobile でのスクロール体験が良好
- [ ] Contact のメールアドレスが正しい
- [ ] ドメイン設定完了 (mpi.co.jp 想定)
- [ ] HTTPS 有効化
