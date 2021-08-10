# [nettori.netlify.app](https://nettori.netlify.app)
## contentfulのmarkdownにつけるfrontmatterについて
yamlで書く。`gatsby-transformer-remark`がパースしてくれる。
- title:String・・・タイトル
- date:String・・・日付。YYYY-MM-DDの形。yaml
- category:Array<String>・・・カテゴリの配列
- slug:String・・・URLで使うやつ

***`key:`の後、配列の`m`の後はスペースいるよ***
