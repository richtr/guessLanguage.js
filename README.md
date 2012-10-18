guessLanguage.js
====================

A JavaScript language detection library based on trigram statistical analysis. This library works equally well when run in either the Browser or Node.js.

#### Usage ####

You can clone this repo as follows:

    git clone git@github.com:richtr/guessLanguage.js.git

You can use this library in a web page as follows:

    <script src="lib/_languageData.js"></script>
    <script src="lib/guessLanguage.js"></script>
    <script>
      guessLanguage.detect('...input text here...', function(language) {
        console.log('Detected language of provided text is [' + language + ']');
      });
    </script>

You can use this library in a Node.js project. This library is available as an npm package:

    sudo npm install -g guesslanguage

Using this library in a Node.js project can be done as follows:

    var guessLanguage = require('./lib/guessLanguage');

    guessLanguage.detect('...input text here...', function(language) {
      console.log('Detected language of provided text is [' + language + ']');
    });

#### Feedback ####

Please note this library is in the early stages of development. If you find any bugs or issues please file them on this project and I'll take a look.

Please also feel free to catch me on Twitter [@richtibbett](http://twitter.com/richtibbett/).