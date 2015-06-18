guessLanguage.js
====================

A JavaScript language detection library based on trigram statistical analysis. This library works equally well when run in either the Browser or Node.js.

#### Demo ####

An online demo is available [here](http://richtr.github.com/guessLanguage.js/).

#### Usage ####

You can clone this repo as follows:

```bash
git clone git@github.com:richtr/guessLanguage.js.git
```

You can use this library in a web page by including the following files:

```html
<script src="lib/_languageData.js"></script>
<script src="lib/guessLanguage.js"></script>
```

You can also use this library in a Node.js project. This library can be installed via [npm](https://www.npmjs.com) as follows:

```bash
sudo npm install -g guesslanguage
```

Including this library for use in a Node.js project can then be done as follows:

```javascript
var guessLanguage = require('./lib/guessLanguage');
// See the API section for usage
```

#### API ####

You can use guessLanguage.js in any of the following ways:

``` javascript
guessLanguage.detect('...input text here...', function(language) {
  console.log('Detected language code of provided text is [' + language + ']');
});
```

``` javascript
guessLanguage.name('...input text here...', function(languageName) {
  console.log('Detected language name of provided text is [' + languageName + ']');
});
```

``` javascript
guessLanguage.code('...input text here...', function(languageIANA) {
  console.log('Detected language IANA number of provided text is [' + languageIANA + ']');
});
```

``` javascript
guessLanguage.info('...input text here...', function(languageInfo) {
  console.log('Detected language code of provided text is [' + languageInfo[0] + ']');
  console.log('Detected language IANA number of provided text is [' + languageInfo[1] + ']');
  console.log('Detected language name of provided text is [' + languageInfo[2] + ']');
});
```

#### Feedback ####

If you find any bugs or issues please file them on this project and I'll take a look.

Please also feel free to catch me on Twitter [@richtibbett](http://twitter.com/richtibbett/).
