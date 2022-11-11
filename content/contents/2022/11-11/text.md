---
title: TypeScriptでオブジェクトのプロパティを上書きする型を作った
category: [TypeScript]
slug: /blog/typescript-override-type
date: 2022-11-11
---

例えば

```ts
type Hoge = {
  fuga: 'fugafuga';
  piyo: unknown;
};
```

のような型があったときに`piyo`の型を上書きしてくれる型が必要だった。バグの原因になりそうではあるのでなるべく避けたほうが良さそう？

## 作ったもの

```ts
type Override<T, K extends { [P in keyof T]?: K[P] }> = Omit<T, keyof K> & K;
```

型`T`を型`K`で上書きする。`T`は`K`の部分型もどき（プロパティの名前だけ共通していてプロパティの型は同じとは限らない）。`Omit<T, keyof K>`で`T`から上書きしたいプロパティを取り除いた型を作り、それを`K`とのインターセクション型で拡張。

というのを作ってから調べてみたら似たようなことをされている方がいらっしゃった。([https://qiita.com/ibaragi/items/2a6412aeaca5703694b1](https://qiita.com/ibaragi/items/2a6412aeaca5703694b1))

## なぜ必要だったか

Gatsby.js のお話。GraphQL Typegen でクエリの結果の型を生成したが gatsby-plugin-image の`gatsbyImageData`の型が`IGatsbyImageData`ではなく`Record<string, unknown>`で生成されていた。それが原因で`getImage`だったり`getSrc`に引数としてクエリの結果を渡せなかった。そこで、生成された型を上書きして新しい型を作ることにした。

```graphql
query BlogPage {
  file(name: { eq: "hogehoge" }) {
    childImageSharp {
      gatsbyImageData(height: 600, width: 600)
    }
  }
  hokanimo {
    iroiro {
      arimasu
    }
  }
}
```

みたいなクエリに対して

```ts
declare namespace Queries {
  // ...
  type BlogPageQuery {
    readonly file: {
      readonly childImageSharp: {
        readonly gatsbyImageData: Record<string, unknown>
      } | null
    } | null;
    readonly hokanimo: {
      readonly iroiro: {
        readonly arimasu: string | null
      } | null
    } | null
  }
  // ...
}
```

みたいな型が GraphQL Typegen で生成される。これを

```ts
type ImageFileNode = {
  file: {
    childImageSharp: {
      gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData;
    };
  };
};

const BlogTemplate: React.FC<
  PageProps<Override<Queries.BlogPageQuery, ImageFileNode>>
> = ({ data }) => {
  // ...
};
```

というような感じで使うとうまくいく。

ドキュメントには gatsby-plugin-image についても正しい型が生成されるみたいなことが書いてあるはずなんですけどね（[https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/#tips](https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/#tips)）。後で調べます。

## 終わりに
TypeScript、概ねいいけどTypeScript以外の部分？に型を与えるのが大変そう。

## 参考にしたもの
- [[Typescript] オブジェクトの特定プロパティの型を上書きする型関数をつくる](https://qiita.com/ibaragi/items/2a6412aeaca5703694b1)
