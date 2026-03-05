# トップページ再構成 + 核心ページ新設 実装プラン

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 里舘さんの「導入ステイトメントと別ページの情報誘導との関係」に基づき、トップページの構造を再編し、「核心（実体）」を別ページとして新設する。

**Architecture:** トップページの Pillar 1（導入）結論直後に、「核心」別ページへの導線を挿入。核心ページには事業の実体（二つの事業領野）を配置。トップページには導入 → 深化 → 境界突破が残る。

**Tech Stack:** HTML / CSS（既存style.css拡張）/ 既存JS（fade-in）

---

## 里舘さんの設計意図（修正版）

### 文書の読み解き

「導入ステイトメントと別ページの情報誘導との関係」は、トップページの**3つのPillar全てに導線を付ける**話ではなく、
もっと根本的な**ページ構成の再編**を求めている。

### 新しいページフロー

```
【トップページ（川上）】

  Hero: MPI ロゴ + Managing Professional Intellect

  ──────────────────────────────────────────

  Pillar 1: 導入「知の真価とは何か。」
  → 哲学の提示、30年の実証
  → 結論:「それこそが、MPIの考える『知の真価』への答えです。」

  ※ ここで一旦、読者の「何をしているのか？」に応える実体を表示
  ┌─────────────────────────────────────────┐
  │  → 核心ページへの導線                      │
  │  「経済と知の主従を逆転する。」              │
  │   MPIの実体（二つの事業領野）を見る →        │
  └─────────────────────────────────────────┘

  ──────────────────────────────────────────

  Pillar 2（旧3→新「深化」）: 心の温度や感性を、時代を超える資本へ。
  → 「人間が主人である」の納得を得た後に、日本の救済へ
  → CTA → Works / Service

  ──────────────────────────────────────────

  Pillar 3: 境界は、すでに存在しない時代です。
  → 超言語、MPIの使命
  → CTA → Works / Profile

  ──────────────────────────────────────────

  INDEX: 川中ページへのリンク一覧


【核心ページ（別ページ・新設）】 ← ★ NEW

  見出し: 経済と知の主従を逆転する。

  本文: 「通常、世の中は『金を稼ぐために、知を使う』……
         MPIは真逆の引力を提唱します。」

  引用: 「磨き抜かれた知を資本として確立し、
         経済はその必然的な結果としての報酬に変える。」

  二つの事業領野:
    ● Intelligence Capital Farm（実践の領野）
      → Service ページへ
    ● Intelligence Capital Lab（研究の領野）
      → 教育・講演活動の紹介へ

  ← トップページへ戻る導線
```

### 現在との差分

| 現在 | 新構成 |
|------|--------|
| Pillar 1: 知の真価 | Pillar 1: 知の真価（変更なし） |
| Pillar 2: 心の温度を資本へ | **核心ページへの導線**（新設） → Pillar 2: 心の温度を資本へ（深化として再配置） |
| Pillar 3: 境界突破 | Pillar 3: 境界突破（変更なし） |
| — | **核心ページ（新設）**: 経済と知の主従逆転 + 二つの事業領野 |

つまり:
- トップページの Pillar 2 テキスト自体は「心の温度〜」のまま残る（位置は変わらない）
- Pillar 1 と Pillar 2 の**間**に、核心ページへの導線ブロックを挿入
- 核心ページは新しいHTMLとして新設

---

## タスク

### Task 1: 核心ページ HTML 新設

**Files:**
- Create: `site/core/index.html`

核心ページは「導入ステイトメントと別ページの情報誘導との関係」の 2. に基づく。
デザインは既存の Pillar スタイルを踏襲しつつ、二つの事業領野を並べる。

```html
<!-- 構成 -->
<nav>Back → トップ / MPI ロゴ</nav>

<section class="pillar">
  <h1>経済と知の主従を逆転する。</h1>

  <p>通常、世の中は「金（資本）を稼ぐために、知（道具）を使う」…</p>

  <blockquote>
    「磨き抜かれた知を資本として確立し、
    経済はその必然的な結果としての報酬に変える。」
  </blockquote>

  <p>…二つの事業領野を展開しています。</p>

  <!-- 二つの領野 -->
  <div class="domain-grid">
    <div class="domain-item">
      <h2>Intelligence Capital Farm</h2>
      <p class="domain-subtitle">実践の領野</p>
      <p>固定概念・既成概念を離れ、経済と知の主従の逆転に必要な戦略と設計</p>
      <a href="../service/">→ Service</a>
    </div>
    <div class="domain-item">
      <h2>Intelligence Capital Lab</h2>
      <p class="domain-subtitle">研究の領野</p>
      <p>知の三階層、五箇条の憲法、個別のオリジナル憲法…</p>
      <a href="#">→ 構造化の研究</a>
    </div>
  </div>
</section>
```

### Task 2: トップページ HTML — 導線ブロック挿入

**Files:**
- Modify: `site/index.html`

Pillar 1 の結論（「それこそが〜答えです。」）と `.pillar-cta` の**直後**、
`<hr class="section-divider">` の**前**に、核心ページへの導線ブロックを挿入。

```html
<!-- Pillar 1 の後、hr の前に挿入 -->
<section class="core-bridge fade-in" id="core-bridge">
    <div class="core-bridge-inner">
        <a href="core/" class="core-bridge-link">
            <span class="core-bridge-label">核心</span>
            <h3 class="core-bridge-heading">経済と知の主従を逆転する。</h3>
            <p class="core-bridge-desc">MPIの二つの事業領野を見る</p>
            <span class="core-bridge-arrow">&rarr;</span>
        </a>
    </div>
</section>
```

### Task 3: CSS — 導線ブロック + 核心ページスタイル

**Files:**
- Modify: `site/css/style.css`

導線ブロック（`.core-bridge`）のスタイル:
- Pillar 間の余白を保ちつつ、視覚的に「次はここ」と示す
- 装飾を排したテキスト主導の設計（MPI設計書の指示通り）
- ホバーで静かなインタラクション

核心ページの事業領野グリッド（`.domain-grid`）のスタイル:
- 2カラム（Farm / Lab）
- 既存の index-grid に近いテイスト

### Task 4: コミット・プッシュ

```bash
git add site/index.html site/css/style.css site/core/index.html
git commit -m "YYYY/MM/DD/HHMM"
git push origin main
```

---

## 里舘さんへの確認事項

1. **核心ページのURL**: `site/core/index.html` でよいか？ あるいは `site/philosophy/` や `site/about/` など別の名前が適切か？
2. **二つの事業領野の名称**: 「Intelligence Capital Farm」「Intelligence Capital Lab」をそのまま使用するか？
3. **核心ページの本文**: 「導入ステイトメントと別ページの情報誘導との関係」の行9-27のテキストをそのまま使用してよいか？
4. **Pillar 2（深化）の見出し変更**: 現在の「心の温度や感性を、時代を超える資本へ。」のまま据え置くか、新文書の「深化：感性と救済への没入」の表現を反映するか？
