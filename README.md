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

#### Languages supported: 62 ####
Sorted by BCP 47 Language code

* "af": Afrikaans
* "ar": Arabic
* "az": Azerbaijani
* "bg": Bulgarian
* "ca": Catalan, Valencian
* "ceb": Cebuano
* "cs": Czech
* "cy": Welsh
* "da": Danish
* "de": German
* "en": English
* "es": Spanish, Castilian
* "et": Estonian
* "eu": Basque
* "fa": Persian
* "fi": Finnish
* "fr": French
* "ha": Hausa
* "haw": Hawaiian
* "hi": Hindi
* "hr": Croatian
* "hu": Hungarian
* "id": Indonesian
* "is": Icelandic
* "it": Italian
* "kk": Kazakh
* "ky": Kirghiz, Kyrgyz
* "la": Latin
* "lt": Lithuanian
* "lv": Latvian
* "mk": Macedonian
* "mn": Mongolian
* "nb": Norwegian Bokmål
* "ne": Nepali
* "nl": Dutch, Flemish
* "nr": South Ndebele
* "nso": Pedi, Northern Sotho, Sepedi
* "pl": Polish
* "ps": Pushto, Pashto
* "pt": Portuguese
* "pt-BR": Portuguese (Brazilian)
* "pt-PT": Portuguese (Portugal)
* "ro": Romanian, Moldavian, Moldovan
* "ru": Russian
* "sk": Slovak
* "sl": Slovenian
* "so": Somali
* "sq": Albanian
* "sr": Serbian
* "ss": Swati
* "st": Southern Sotho
* "sv": Swedish
* "sw": Swahili (macrolanguage)
* "tl": Tagalog
* "tlh": Klingon, tlhIngan-Hol
* "tn": Tswana
* "tr": Turkish
* "ts": Tsonga
* "uk": Ukrainian
* "ur": Urdu
* "uz": Uzbek
* "ve": Venda
* "vi": Vietnamese
* "xh": Xhosa
* "zu": Zulu

#### Feedback ####

Please note this library is in the early stages of development. If you find any bugs or issues please file them on this project and I'll take a look.

Please also feel free to catch me on Twitter [@richtibbett](http://twitter.com/richtibbett/).
