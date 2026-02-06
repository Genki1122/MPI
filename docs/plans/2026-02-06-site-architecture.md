# MPI Site Architecture Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 4月公開に向けて、ハイブリッド構成のMPIサイトを完成させる（メインページ + 詳細ページ + 記事機能）

**Architecture:** シングルページ（概要） + 独立詳細ページ（Service/Works/記事）のハイブリッド構成

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Google Fonts

---

## Site Architecture Overview

```
MPI Corporate Site (ハイブリッド構成)
│
├── index.html (メインページ - シングルページ構成)
│   ├── Hero / Top
│   ├── Philosophy (01) - 概要のみ
│   ├── Service (02) - 概要 + 詳細へのリンク
│   ├── Works (03) - 画像付きカード + 詳細へのリンク
│   ├── News/Articles (04) - 最新記事3件
│   ├── Profile (05) - 代表者情報含む
│   └── Contact (06)
│
├── /service/
│   └── index.html (Service 詳細ページ)
│
├── /works/
│   ├── hint-mint.html (既存)
│   ├── ukiyoe.html (既存)
│   └── jasdf.html (既存)
│
├── /articles/ (記事コンテンツ - Phase 1 で実装)
│   ├── index.html (記事一覧)
│   └── [slug].html (個別記事)
│
└── /images/
    ├── MPI.png (ロゴ)
    ├── works/ (Works サムネイル)
    └── articles/ (記事画像)
```

---

## Phase 1 Implementation Tasks

### Task 1: Works セクションの画像対応

**Files:**
- Create: `site/images/works/hint-mint-thumb.jpg`
- Create: `site/images/works/ukiyoe-thumb.jpg`
- Create: `site/images/works/jasdf-thumb.jpg`
- Modify: `site/index.html`
- Modify: `site/css/style.css`

**Step 1: Works グリッドを画像付きカードに変更**

```html
<div class="works-grid">
    <a href="works/hint-mint.html" class="work-card fade-in delay-1">
        <div class="work-card-image">
            <img src="images/works/hint-mint-thumb.jpg" alt="Hint Mint" loading="lazy">
        </div>
        <div class="work-card-content">
            <span class="work-category">Brand Produce</span>
            <h3 class="work-title">Hint Mint</h3>
            <p class="work-achievement">アカデミー賞公式ギフト採用</p>
        </div>
    </a>
    <!-- 他のカードも同様 -->
</div>
```

**Step 2: CSS でカードスタイルを更新**

```css
.work-card {
    display: block;
    text-decoration: none;
}

.work-card-image {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    margin-bottom: var(--space-md);
}

.work-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-normal) var(--ease-out-expo);
}

.work-card:hover .work-card-image img {
    transform: scale(1.05);
}

.work-achievement {
    font-size: 0.8125rem;
    color: var(--color-purple);
    margin-top: var(--space-sm);
}
```

**Note:** 画像は仮のプレースホルダーまたは実際のプロジェクト画像を用意する

---

### Task 2: News/Articles セクションの追加

**Files:**
- Modify: `site/index.html`
- Modify: `site/css/style.css`
- Create: `site/articles/index.html`

**Step 1: index.html に News セクションを追加（Works と Profile の間）**

```html
<!-- Section 5: News / Articles -->
<section class="section section--news" id="news">
    <div class="section-inner">
        <div class="section-label fade-in">
            <span class="label-number">04</span>
            <span class="label-text">News</span>
        </div>

        <h2 class="section-heading fade-in">
            <span class="heading-en">Articles</span>
        </h2>

        <div class="news-grid">
            <article class="news-item fade-in delay-1">
                <time class="news-date">2026.04.01</time>
                <h3 class="news-title">
                    <a href="articles/first-article.html">記事タイトル</a>
                </h3>
            </article>
            <!-- 最新3件を表示 -->
        </div>

        <div class="news-more fade-in delay-2">
            <a href="articles/" class="link-more">View All Articles</a>
        </div>
    </div>
</section>
```

**Step 2: CSS で News スタイルを追加**

```css
.section--news {
    background: var(--color-white);
}

.news-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: var(--space-xl);
}

.news-item {
    padding: var(--space-lg) 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: var(--space-lg);
    align-items: baseline;
}

.news-date {
    font-family: var(--font-en);
    font-size: 0.8125rem;
    color: var(--color-text-light);
    letter-spacing: 0.1em;
}

.news-title a {
    font-size: 1rem;
    color: var(--color-text);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out-quart);
}

.news-title a:hover {
    color: var(--color-purple);
}

.news-more {
    margin-top: var(--space-lg);
    text-align: center;
}

.link-more {
    font-family: var(--font-en);
    font-size: 0.875rem;
    letter-spacing: 0.15em;
    color: var(--color-text-light);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out-quart);
}

.link-more:hover {
    color: var(--color-purple);
}
```

---

### Task 3: Profile セクションの更新（代表者情報追加）

**Files:**
- Modify: `site/index.html`

**Step 1: Profile の情報を更新**

```html
<div class="profile-content">
    <div class="profile-info fade-in delay-1">
        <dl class="profile-list">
            <div class="profile-row">
                <dt>Company</dt>
                <dd>株式会社MPI</dd>
            </div>
            <div class="profile-row">
                <dt>Founded</dt>
                <dd>20XX年X月</dd>  <!-- 実際の設立日 -->
            </div>
            <div class="profile-row">
                <dt>Representative</dt>
                <dd>代表取締役 [氏名]</dd>  <!-- 実際の代表者名 -->
            </div>
            <div class="profile-row">
                <dt>Business</dt>
                <dd>Strategic Consulting / Brand Development / Project Management</dd>
            </div>
        </dl>
    </div>

    <div class="profile-background fade-in delay-2">
        <h3 class="profile-subtitle">Representative Background</h3>
        <ul class="background-list">
            <li>慶應義塾大学法学部卒</li>
            <li>USCPA（米国公認会計士）</li>
            <li>元国際線CA</li>
            <li>外資系コンサルティングファーム出身</li>
        </ul>
    </div>
</div>
```

---

### Task 4: Service 詳細ページの作成（オプション）

**Files:**
- Create: `site/service/index.html`

**Step 1: Service 詳細ページを作成**

メインページの Service セクションからリンクする詳細ページ。
各サービスの詳細説明、アプローチ、事例紹介などを含む。

---

### Task 5: Articles 一覧ページの作成

**Files:**
- Create: `site/articles/index.html`
- Create: `site/articles/sample-article.html`

**Step 1: 記事一覧ページを作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Articles | MPI</title>
    <!-- ... -->
</head>
<body class="page-articles">
    <!-- Navigation -->
    <nav class="nav nav--detail">...</nav>

    <!-- Header -->
    <header class="page-header">
        <div class="page-header-inner">
            <h1 class="page-title">Articles</h1>
        </div>
    </header>

    <!-- Article List -->
    <main class="articles-content">
        <div class="articles-list">
            <article class="article-item">
                <time>2026.04.01</time>
                <h2><a href="sample-article.html">記事タイトル</a></h2>
                <p class="article-excerpt">記事の概要...</p>
            </article>
            <!-- 記事を追加 -->
        </div>
    </main>

    <footer class="footer">...</footer>
</body>
</html>
```

---

### Task 6: セクション番号の更新

News セクション追加に伴い、番号を更新:

| セクション | 旧番号 | 新番号 |
|-----------|--------|--------|
| Philosophy | 01 | 01 |
| Service | 02 | 02 |
| Works | 03 | 03 |
| **News** | — | **04** |
| Profile | 04 | **05** |
| Contact | 05 | **06** |

---

## File Structure (Phase 1 Complete)

```
site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── MPI.png
│   ├── logo-symbol.svg
│   └── works/
│       ├── hint-mint-thumb.jpg
│       ├── ukiyoe-thumb.jpg
│       └── jasdf-thumb.jpg
├── works/
│   ├── hint-mint.html
│   ├── ukiyoe.html
│   └── jasdf.html
└── articles/
    ├── index.html
    └── [記事ページ].html
```

---

## Content Requirements (要確認)

### 画像素材
- [ ] Works サムネイル画像 3点（Hint Mint, 浮世絵, JASDF）
- [ ] 記事用画像（必要に応じて）

### テキストコンテンツ
- [ ] 代表者氏名
- [ ] 会社設立日
- [ ] 記事コンテンツ（最低1本）

---

## Priority Order

1. **高**: Profile 情報の更新（代表者名、設立日）
2. **高**: News セクション追加（HTML/CSS）
3. **中**: Works 画像対応（画像素材必要）
4. **中**: Articles 一覧ページ作成
5. **低**: Service 詳細ページ（オプション）

---

## Checklist Before April Launch

- [ ] 全ページのリンクが正常に動作
- [ ] レスポンシブ表示が正常
- [ ] 画像の最適化（WebP変換など）
- [ ] OGP/SEO メタタグ
- [ ] Google Analytics 設定
- [ ] カスタムドメイン設定
- [ ] HTTPS 有効化
