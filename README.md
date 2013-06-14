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

#### Languages Supported: 100 ####

* "ab": Abkhazian
* "af": Afrikaans
* "ar": Arabic
* "az": Azerbaijani
* "be": Belarusian
* "bg": Bulgarian
* "bn": Bengali
* "bo": Tibetan
* "br": Breton
* "ca": Catalan, Valencian
* "ceb": Cebuano
* "cs": Czech
* "cy": Welsh
* "da": Danish
* "de": German
* "el": Modern Greek
* "en": English
* "eo": Esperanto
* "es": Spanish, Castilian
* "et": Estonian
* "eu": Basque
* "fa": Persian
* "fi": Finnish
* "fo": Faroese
* "fr": French
* "fy": Western Frisian
* "gd": Scottish Gaelic, Gaelic
* "gl": Galician
* "gu": Gujarati
* "ha": Hausa
* "haw": Hawaiian
* "he": Hebrew
* "hi": Hindi
* "hr": Croatian
* "hu": Hungarian
* "hy": Armenian
* "id": Indonesian
* "is": Icelandic
* "it": Italian
* "ja": Japanese
* "ka": Georgian
* "kk": Kazakh
* "km": Central Khmer
* "kn": Kannada
* "ko": Korean
* "ku": Kurdish
* "ky": Kirghiz, Kyrgyz
* "la": Latin
* "lo": Lao
* "lt": Lithuanian
* "lv": Latvian
* "mg": Malagasy
* "mk": Macedonian
* "ml": Malayalam
* "mn": Mongolian
* "mr": Marathi
* "ms": Malay (macrolanguage)
* "nd": North Ndebele
* "ne": Nepali
* "nl": Dutch, Flemish
* "nn": Norwegian Nynorsk
* "no": Norwegian
* "nso": Pedi, Northern Sotho, Sepedi
* "or": Oriya
* "pa": Panjabi, Punjabi
* "pl": Polish
* "ps": Pushto, Pashto
* "pt": Portuguese
* "pt-BR": Portuguese (Brazil)
* "pt-PT": Portuguese (Portugal)
* "ro": Romanian, Moldavian, Moldovan
* "ru": Russian
* "sa": Sanskrit
* "sh": Serbo-Croatian
* "si": Sinhala, Sinhalese
* "sk": Slovak
* "sl": Slovenian, Slovene
* "so": Somali
* "sq": Albanian
* "sr": Serbian
* "sv": Swedish
* "sw": Swahili (macrolanguage)
* "ta": Tamil
* "te": Telugu
* "th": Thai
* "tl": Tagalog
* "tlh": Klingon, tlhIngan-Hol
* "tn": Tswana, Setswana
* "tr": Turkish
* "ts": Tsonga
* "tw": Twi
* "uk": Ukrainian
* "ur": Urdu
* "uz": Uzbek
* "ve": Venda
* "vi": Vietnamese
* "xh": Xhosa
* "zh": Chinese
* "zh-TW" Chinese (Taiwan)
* "zu": Zulu

#### Feedback ####

Please note this library is in the early stages of development. If you find any bugs or issues please file them on this project and I'll take a look.

Please also feel free to catch me on Twitter [@richtibbett](http://twitter.com/richtibbett/).
