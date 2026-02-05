# MPI GitHub連携 & サイト公開 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** MPIサイトをGitHubリポジトリに連携し、GitHub Pagesで自動公開できる状態にする

**Architecture:** 静的サイト (`site/` ディレクトリ) をGitHub Pagesで公開。mainブランチへのpush時に自動デプロイ。

**Tech Stack:** Git, GitHub, GitHub Pages (または GitHub Actions)

**Repository:** https://github.com/Genki1122/MPI.git

---

## Task 1: .gitignore ファイルの作成

**Files:**
- Create: `.gitignore`

**Step 1: .gitignore を作成**

```gitignore
# OS
.DS_Store
Thumbs.db

# Editor
*.swp
*.swo
.vscode/
.idea/

# Claude
.claude/

# Temporary
*.log
*.tmp
```

**Step 2: ファイルを確認**

Run: `cat .gitignore`
Expected: 上記内容が表示される

---

## Task 2: Git リポジトリの初期化

**Files:**
- Create: `.git/` (Git internal)

**Step 1: Git を初期化**

```bash
cd /Users/apple/MPI
git init
```

Expected: `Initialized empty Git repository in /Users/apple/MPI/.git/`

**Step 2: Git status を確認**

```bash
git status
```

Expected: Untracked files として `MPI設計書`, `docs/`, `site/` などが表示される

---

## Task 3: 初回コミット

**Files:**
- All files in repository

**Step 1: ファイルをステージング**

```bash
git add .gitignore
git add MPI設計書
git add docs/
git add site/
```

**Step 2: ステージング状態を確認**

```bash
git status
```

Expected: 全ファイルが `Changes to be committed` に表示される

**Step 3: 初回コミットを作成**

```bash
git commit -m "$(cat <<'EOF'
Initial commit: MPI corporate site

- Main page with 5 sections (Philosophy, Service, Works, Profile, Contact)
- 3 case study pages (Hint Mint, Ukiyoe, JASDF)
- Responsive design with scroll animations
- Design document (MPI設計書)
- Implementation plans

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

Expected: commit が成功し、ファイル数が表示される

---

## Task 4: GitHub リモートリポジトリへの接続

**Files:**
- Modify: `.git/config`

**Step 1: リモートを追加**

```bash
git remote add origin https://github.com/Genki1122/MPI.git
```

**Step 2: リモート設定を確認**

```bash
git remote -v
```

Expected:
```
origin  https://github.com/Genki1122/MPI.git (fetch)
origin  https://github.com/Genki1122/MPI.git (push)
```

**Step 3: mainブランチに名前変更（必要な場合）**

```bash
git branch -M main
```

---

## Task 5: GitHub へプッシュ

**Step 1: リモートへプッシュ**

```bash
git push -u origin main
```

Expected: プッシュが成功し、GitHub上にコードが表示される

**Step 2: GitHub で確認**

Run: ブラウザで https://github.com/Genki1122/MPI を開く
Expected: 全ファイルがリポジトリに表示される

---

## Task 6: GitHub Pages の設定

### Option A: GitHub Settings から設定（推奨・シンプル）

**Step 1: GitHub リポジトリ設定を開く**

1. https://github.com/Genki1122/MPI/settings/pages を開く
2. "Source" セクションで:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/site` ← 重要！サイトファイルがsite/にあるため

**Step 2: 保存して待機**

"Save" をクリックし、数分待つ

**Step 3: 公開URLを確認**

Expected URL: `https://genki1122.github.io/MPI/`

---

### Option B: GitHub Actions で設定（より柔軟）

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: ワークフローディレクトリを作成**

```bash
mkdir -p .github/workflows
```

**Step 2: deploy.yml を作成**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './site'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 3: コミットしてプッシュ**

```bash
git add .github/workflows/deploy.yml
git commit -m "$(cat <<'EOF'
ci: add GitHub Actions workflow for Pages deployment

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
git push
```

**Step 4: GitHub Settings で Pages を有効化**

1. https://github.com/Genki1122/MPI/settings/pages を開く
2. "Source" を **GitHub Actions** に変更

**Step 5: デプロイを確認**

1. https://github.com/Genki1122/MPI/actions でワークフロー実行を確認
2. 成功後、公開URLにアクセス

---

## Task 7: サイトURLの調整（Option Bの場合）

**注意:** GitHub Pages は `https://genki1122.github.io/MPI/` のようにサブディレクトリで公開される。

**Files:**
- Modify: `site/index.html` (必要な場合)
- Modify: `site/works/*.html` (必要な場合)

**Step 1: 相対パスの確認**

現在のHTML内のリンクが相対パスであることを確認:
- `css/style.css` ✅ (OK)
- `js/main.js` ✅ (OK)
- `works/hint-mint.html` ✅ (OK)

**Step 2: ルートパスを使用している箇所の確認**

もし `/css/style.css` のようなルートパスがあれば、相対パスに修正

Expected: 全リンクが相対パスで動作する

---

## 完成後の構成

```
MPI/
├── .git/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── MPI設計書
├── docs/
│   └── plans/
│       ├── 2026-02-05-mpi-site-phase1.md
│       └── 2026-02-05-github-deployment-setup.md
└── site/                    ← GitHub Pages で公開
    ├── index.html
    ├── css/
    ├── js/
    └── works/
```

---

## 公開URL

デプロイ後のサイトURL:
- **GitHub Pages:** `https://genki1122.github.io/MPI/`
- **カスタムドメイン（後日設定可）:** `https://mpi.co.jp/`

---

## Checklist

- [ ] .gitignore を作成
- [ ] Git を初期化
- [ ] 初回コミットを作成
- [ ] GitHub リモートを追加
- [ ] main ブランチをプッシュ
- [ ] GitHub Pages を有効化（Option A or B）
- [ ] 公開サイトにアクセスできる
- [ ] 全ページのリンクが正常に動作する

---

## 次のステップ（デプロイ後）

1. カスタムドメイン設定 (`mpi.co.jp`)
2. HTTPS の確認
3. sitemap.xml / robots.txt の URL を実際のドメインに更新
4. OGP の URL を実際のドメインに更新
