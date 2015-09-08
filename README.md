## How it happened

WikiText Generator is the result of an experiment. Create a sample-text generator using something different from the well known "Lorem Ipsum". Since the only purpose of the text is filling up empty space, I though about doing something more random. I simply used MediaWiki's APIs to fetch random excerpts from Wikipedia articles and then I randomized all the words.

## 3rd-party script used

### Fisher-Yates Shuffle

To randomize words I decided to use the Fisher-Yates algorithm, as explained [here](http://bost.ocks.org/mike/shuffle/ "Yates-Fisher Shuffle") wordefully by Mike Bostock.

### Media-Wiki APIs

In order to access the APIs I used brettz9's [mediawiki-js](https://github.com/brettz9/mediawiki-js). It is very lightweight and easy to use. It let you fire a callback after the server sends the JSONP reply ([a clear explanation of JSONP](http://stackoverflow.com/questions/2067472/what-is-jsonp-all-about) by jvenema).

## Who am I

I am Samuele Papa, known as apra on the internet. I tweet [@oneapra](https://twitter.com/oneapra "@oneapra"). Feel free to PM me if you have any suggestion or requests.