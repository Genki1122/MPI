# ロゴタイプ配置 + スクロール演出 実装プラン

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** クライアントからのフィードバック（ロゴタイプの左斜め配置、スクロール演出によるテキスト体感長の短縮）を実装する。

**Architecture:** Hero ロゴタイプの3単語を左斜め階段状に配置し直し、トップページ本文にスクロール連動アニメーションとセクション別背景グラデーションを追加する。

**Tech Stack:** HTML（既存構造微修正）/ CSS（style.css拡張）/ JS（main.js拡張）

---

## クライアントフィードバックの分析

### ◆ ロゴタイプ配置（クライアント優先度：「後でいい」）

**要望:**
- 3単語（Managing / Professional / Intellect）を**左斜め階段状**に配置する
- 現在の**中央揃え縦積み**から、左上→右下へ流れるダイアゴナル配置へ
- イラストレーターの「三単語例」参照（手元になくてもCSSで再現可能）
- 頭文字（M/P/I）と残りの文字のサイズ**比率を統一**する

**現在の実装:**
```css
.hero-logotype {
    display: flex;
    flex-direction: column;
    align-items: center;  /* ← これを変更 */
    gap: 0.15em;
}
```

**変更方針:**
- `align-items: center` → `align-items: flex-start` に変更
- 各 `.hero-word` に `margin-left` の段階的インデントを付与
- 全体を中央寄せのコンテナ内で左斜め配置にすることで、バランスを保つ

### ◆ スクロール演出（クライアント優先度：「最後でいい」）

**要望:**
- スクロール中に長いテキストが**短く感じる**ようにする
- 「下にまだ続く」シグナルを適切に示す
- 特定テキストブロックの**センタリング**変化
- **カラーアクセント**（セクション間の色変化）
- セクション別の**微細な背景グラデーション**

**現在の実装:**
- `fade-in` + `IntersectionObserver` による出現アニメーション（main.js:13-29）
- スクロールプログレスバー（main.js:127-147）
- Hero ロゴのパララックス（main.js:79-101）

**変更方針:**
- パラグラフ単位のスタガード表示（段階的遅延）
- セクション間のグラデーション遷移背景
- スクロール速度に連動した微妙なパララックス効果
- スクロールヒント（セクション間のフェードイン矢印）

---

## タスク

### Task 1: ロゴタイプの左斜め階段配置（CSS）

**Files:**
- Modify: `site/css/style.css`（`.hero-logotype` + `.hero-word` 周辺）

**変更内容:**

```css
/* 既存: align-items: center → flex-start に変更 */
.hero-logotype {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: var(--ma-xs);
    gap: 0.15em;
    /* 左斜め配置の全体を中央に寄せるためのオフセット */
    padding-left: 10%;
}

/* 各単語の段階的インデント */
.hero-word:nth-child(1) { margin-left: 0; }
.hero-word:nth-child(2) { margin-left: 2.5em; }
.hero-word:nth-child(3) { margin-left: 5em; }
```

- `padding-left` で全体位置を調整し、中央から左斜めに流れるように配置
- レスポンシブ（768px以下）ではインデント幅を縮小
- 頭文字と残りの文字の比率は現在一貫しているため変更不要

### Task 2: ロゴタイプのレスポンシブ対応（CSS）

**Files:**
- Modify: `site/css/style.css`（`@media (max-width: 768px)` 内）

**変更内容:**

```css
@media (max-width: 768px) {
    .hero-logotype {
        padding-left: 5%;
    }
    .hero-word:nth-child(2) { margin-left: 1.5em; }
    .hero-word:nth-child(3) { margin-left: 3em; }
}
```

### Task 3: セクション別背景グラデーション（CSS）

**Files:**
- Modify: `site/css/style.css`

各 Pillar セクションに微細な背景グラデーションを追加。白→極薄色→白の流れで、セクションの切り替わりを視覚的に示す。

**変更内容:**

```css
/* Pillar 1: 極薄パープル */
#pillar-1 {
    background: linear-gradient(
        180deg,
        var(--color-white) 0%,
        rgba(92, 0, 164, 0.018) 30%,
        rgba(92, 0, 164, 0.018) 70%,
        var(--color-white) 100%
    );
}

/* Core Bridge: わずかにダーク */
.core-bridge {
    background: rgba(0, 0, 0, 0.012);
}

/* Pillar 2: 極薄マゼンタ */
#pillar-2 {
    background: linear-gradient(
        180deg,
        var(--color-white) 0%,
        rgba(175, 0, 102, 0.015) 30%,
        rgba(175, 0, 102, 0.015) 70%,
        var(--color-white) 100%
    );
}

/* Pillar 3: 極薄パープル再び */
#pillar-3 {
    background: linear-gradient(
        180deg,
        var(--color-white) 0%,
        rgba(92, 0, 164, 0.012) 30%,
        rgba(92, 0, 164, 0.012) 70%,
        var(--color-white) 100%
    );
}
```

### Task 4: パラグラフ単位のスタガードアニメーション（JS）

**Files:**
- Modify: `site/js/main.js`

現在の `fade-in` は全要素が同じタイミングで出現する。パラグラフが連続する `.pillar-body` 内では、各段落に自動的にスタガード遅延を付与する。

**変更内容:**

```javascript
// Pillar本文の段落にスタガード遅延を自動付与
document.querySelectorAll('.pillar-body').forEach((body) => {
    const paragraphs = body.querySelectorAll('.fade-in');
    paragraphs.forEach((p, i) => {
        p.style.transitionDelay = (i * 0.12) + 's';
    });
});
```

これにより、各段落が0.12秒間隔で順次浮かび上がり、テキストの体感長を短縮する。

### Task 5: セクション間スクロールヒント（CSS + HTML）

**Files:**
- Modify: `site/css/style.css`
- Modify: `site/index.html`（オプション）

`section-divider` の `<hr>` にスクロール方向を示す微細なアニメーションを追加。

**変更内容（CSS）:**

```css
.section-divider {
    position: relative;
}

.section-divider::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 1px;
    height: 16px;
    background: linear-gradient(to bottom, var(--color-rule), transparent);
    animation: scrollBreath 2.4s var(--ease-breath) infinite;
}
```

### Task 6: コミット・プッシュ

```bash
git add site/css/style.css site/js/main.js
git commit -m "YYYY/MM/DD/HHMM"
git push origin main
```

---

## 優先度と実施順序

| 優先 | タスク | クライアント指定 |
|------|--------|-----------------|
| A | Task 3: セクション背景グラデーション | 「最後」だが軽微で効果大 |
| A | Task 4: スタガードアニメーション | 「最後」だが軽微で効果大 |
| A | Task 5: セクション間スクロールヒント | 「最後」だが軽微で効果大 |
| B | Task 1-2: ロゴタイプ左斜め配置 | 「後でいい」 |

**推奨:** Task 3→4→5 はすべて軽微な変更で即実装可能。Task 1-2 のロゴタイプ配置はイラストレーターの「三単語例」を確認してから微調整が必要になる可能性があるため、先にスクロール演出を実装してクライアント確認後にロゴタイプに着手する。

---

## クライアントへの確認事項

1. **ロゴタイプ斜め配置の角度/幅**: イラストレーターの「三単語例」の画像を共有いただければ、より正確に再現可能
2. **背景グラデーションの色味**: パープル系 vs マゼンタ系の交互配置でよいか
3. **センタリング変化**: 特定のテキストブロックを中央寄せにする意図の詳細
