# [https://furafrafrfr.github.io](https://furafrafrfr.github.io)
## contentfulのmarkdownにつけるfrontmatterについて
yamlで書く。`gatsby-transformer-remark`がパースしてくれる。
- title:String・・・タイトル
- date:Date・・・日付。YYYY-MM-DDの形。**ダブルクォーテーションはつけない**
- category:Array<String>・・・カテゴリの配列
- slug:String・・・URLで使うやつ

***各keyの後と配列の`-`の後はスペースいるよ***

### テンプレ
```yaml
---
title: "hogehoge"
date: YYYY-MM-DD
category: 
  - "piyo"
slug: /blog/huga
---
```
