---
title: TypeScriptでNode.js用HTTPクライアントライブラリのgotを使ってみた
category: [TypeScript, got]
slug: /blog/got-tutorial
date: 2022-12-09
---

Node.jsの組み込みのhttpモジュールは低レベルな感じであんまり使いやすそうな感じではないしラッパー作るのも面倒だなと思って調べたらNode.js用のHTTPクライアントライブラリの[got](https://github.com/sindresorhus/got)を見つけたよという話。TypeScriptを使っています。

## 環境

```
node -v
v16.13.1
```

package.json

```json
{
  "name": "tutorial",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "c": "npx tsc",
    "start": "npx tsc && node ./dist/index.js"
  },
  "dependencies": {
    "got": "^12.5.3"
  },
  "devDependencies": {
    "@types/node": "^18.11.0",
    "typescript": "^4.8.4"
  }
}
```

## インストール

```bash
yarn add got
```

## 使い方

Promiseチェーンで使う場合

```ts
const url = new URL(
  `/base64/eyAiaG9nZSI6ICJodWdhIiB9`,
  'https://httpbin.org'
);
got
  .get(url)
  .json<{ hoge: string }>()
  .then((data) => console.log(data.hoge))
  .catch((err) => {
    if (err instanceof RequestError) console.log(`RequestError: ${err.code}`);
    else if (err instanceof Error) console.log(`other: ${err.message}`);
    });
```

async/awaitで使う場合

```ts
import got, { RequestError } from 'got';

// https://httpbin.org/base64/eyAiaG9nZSI6ICJodWdhIiB9にリクエストを送る。
// { hoge: 'huga' }が返ってくる
try {
  const url = new URL(
    `/base64/eyAiaG9nZSI6ICJodWdhIiB9`,
    'https://httpbin.org'
  );
  const req = got.get(url);
  const data = await req.json<{ hoge: string }>();

  console.log(data.hoge);
} catch (err) {
  if (err instanceof RequestError) console.log(`RequestError: ${err.code}`);
  else if (err instanceof Error) console.log(`other: ${err.message}`);
}
```

以降async/awaitで説明します。

GETメソッド以外も使える。urlにはNode.jsのURLオブジェクトとstringが使える。bodyの取り出し方もいくつかある。（[https://github.com/sindresorhus/got/blob/main/documentation/1-promise.md](https://github.com/sindresorhus/got/blob/main/documentation/1-promise.md)）

gotで投げられる例外は基本的に`RequestError`を継承している。ブラウザのFetch APIとは違い2xxと3xx以外のレスポンスはrejectされる。

オプションでヘッダーなどの設定ができる。（[https://github.com/sindresorhus/got/blob/main/documentation/2-options.md](https://github.com/sindresorhus/got/blob/main/documentation/2-options.md)）

```ts
import got, { RequestError } from 'got';

// https://httpbin.org/base64/eyAiaG9nZSI6ICJodWdhIiB9にリクエストを送る。
// { hoge: 'huga' }が返ってくる
const url = new URL(`/base64/eyAiaG9nZSI6ICJodWdhIiB9`, 'https://httpbin.org');
const req = got.get({
  url,
  headers: {
    hogefuga: 'piyopiyo',
  },
  username: 'tanaka',
  password: '1234',
});
const data = await req.json<{ hoge: string }>();

console.log(data.hoge);
```

`new Option()`みたいな感じでオプションを作ることもできる。

## 使ってみた感想
シンプルで使いやすい。オプションからリトライみたいな便利機能を設定できてよい。

TypeScript使って日が浅いのでなんとも言えないが捕捉した例外に型がつかないのがちょっと面倒かもしれない。

## 余談
ドキュメントのサンプルコードのインデントが東京駅の新幹線改札から京葉線の改札くらい長い。

あとブラウザ向けに[ky](https://github.com/sindresorhus/ky)というライブラリもあるらしい。こっちもシンプルで使いやすそう。

![ky](./ky.png)

極楽要求してえ！