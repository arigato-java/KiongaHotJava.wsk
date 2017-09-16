# OpenWhisk版 今日も気温がホットジャバ

## これは何？

あの150億ダウンロードを記録した人気格闘ゲーム　今日も気温がHotJava がIBM Bluemix クラウドに移植されることが、TGS 2017で発表されました。
IBM Bluemix Functions は、Apache OpenWhisk方式のAWS Lambdaです(ぉぃ

特に、コンソールページで一貫してBluemix Functionsが「Bluemix 機能」と翻訳されていたり、ラベルのないタブがあったりと、ジャバ感の高い仕上がりなのが好意的に受け止められています。

## Requirements

Works with Node.js:6 runtime on the OpenWhisk.

## Deploy

Put your consumer/API credentials on the `src/hotjava.js` .

Set `bx` command path in the `deploy.sh`.

Run `deploy.sh` script.

## Trigger the function every morning

I've done that on the nice console page.


