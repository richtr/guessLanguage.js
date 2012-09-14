guessLanguage.js
====================

A JavaScript language detection library based on trigram statistical analysis. This library works equally well when run in either the Browser or Node.js.

#### Usage ####

You can clone this repo as follows:

    git clone git@github.com:richtr/guessLanguage.js.git

You can use this library in a web browser as follows:

    &lt;script src=&quot;lib/_languageData.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;lib/guessLanguage.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
      guessLanguage.detect('...input text here...', function(language) {
        console.log('Detected language of provided text is [' + language + ']');
      });
    &lt;/script&gt;

You can use this library in your Node.js project as follows (npm package coming soon!):

    var guessLanguage = require('./lib/guessLanguage');

    guessLanguage.detect('...input text here...', function(language) {
      console.log('Detected language of provided text is [' + language + ']');
    });

#### Feedback ####

Please note this library is in the early stages of development. If you find any bugs or issues please file them on this project directly.

Please also feel free to catch me on Twitter [@richtibbett](http://twitter.com/richtibbett/).