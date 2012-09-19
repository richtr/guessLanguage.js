/*   Guess the natural language of a text
 *   Copyright (c) 2012, Rich Tibbett
 *   http://github.com/richtr/guessLanguage.js/
 *
 *   Original Python package:
 *   Copyright (c) 2008, Kent S Johnson
 *   http://code.google.com/p/guess-language/
 *
 *   Original C++ version for KDE:
 *   Copyright (c) 2006 Jacob R Rideout <kde@jacobrideout.net>
 *   http://websvn.kde.org/branches/work/sonnet-refactoring/common/nlp/guesslanguage.cpp?view=markup
 *
 *   Original Language::Guess Perl module:
 *   Copyright (c) 2004-2006 Maciej Ceglowski
 *   http://web.archive.org/web/20090228163219/http://languid.cantbedone.org/
 *
 *   Note: Language::Guess is GPL-licensed. KDE developers received permission
 *   from the author to distribute their port under LGPL:
 *   http://lists.kde.org/?l=kde-sonnet&m=116910092228811&w=2
 *
 *   This program is free software: you can redistribute it and/or modify it
 *   under the terms of the GNU Lesser General Public License as published
 *   by the Free Software Foundation, either version 3 of the License,
 *   or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty
 *   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *   See the GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function(global, undefined) {

  var guessLanguage = function() {
    
      var models = global._languageData || {};

      if (typeof module === "object" && module.exports === global) {
        models = require('./_languageData') || {};
      }

      var MAX_LENGTH = 4096;
      var MIN_LENGTH = 20;
      var MAX_GRAMS = 300;

      var NAME_MAP = {
        "ab": "Abkhazian",
        "af": "Afrikaans",
        "ar": "Arabic",
        "az": "Azeri",
        "be": "Belarusian",
        "bg": "Bulgarian",
        "bn": "Bengali",
        "bo": "Tibetan",
        "br": "Breton",
        "ca": "Catalan",
        "ceb": "Cebuano",
        "cs": "Czech",
        "cy": "Welsh",
        "da": "Danish",
        "de": "German",
        "el": "Greek",
        "en": "English",
        "eo": "Esperanto",
        "es": "Spanish",
        "et": "Estonian",
        "eu": "Basque",
        "fa": "Farsi",
        "fi": "Finnish",
        "fo": "Faroese",
        "fr": "French",
        "fy": "Frisian",
        "gd": "Scots Gaelic",
        "gl": "Galician",
        "gu": "Gujarati",
        "ha": "Hausa",
        "haw": "Hawaiian",
        "he": "Hebrew",
        "hi": "Hindi",
        "hr": "Croatian",
        "hu": "Hungarian",
        "hy": "Armenian",
        "id": "Indonesian",
        "is": "Icelandic",
        "it": "Italian",
        "ja": "Japanese",
        "ka": "Georgian",
        "kk": "Kazakh",
        "km": "Cambodian",
        "ko": "Korean",
        "ku": "Kurdish",
        "ky": "Kyrgyz",
        "la": "Latin",
        "lt": "Lithuanian",
        "lv": "Latvian",
        "mg": "Malagasy",
        "mk": "Macedonian",
        "ml": "Malayalam",
        "mn": "Mongolian",
        "mr": "Marathi",
        "ms": "Malay",
        "nd": "Ndebele",
        "ne": "Nepali",
        "nl": "Dutch",
        "nn": "Nynorsk",
        "no": "Norwegian",
        "nso": "Sepedi",
        "pa": "Punjabi",
        "pl": "Polish",
        "ps": "Pashto",
        "pt": "Portuguese",
        "pt_PT": "Portuguese (Portugal)",
        "pt_BR": "Portuguese (Brazil)",
        "ro": "Romanian",
        "ru": "Russian",
        "sa": "Sanskrit",
        "sh": "Serbo-Croatian",
        "sk": "Slovak",
        "sl": "Slovene",
        "so": "Somali",
        "sq": "Albanian",
        "sr": "Serbian",
        "sv": "Swedish",
        "sw": "Swahili",
        "ta": "Tamil",
        "te": "Telugu",
        "th": "Thai",
        "tl": "Tagalog",
        "tlh": "Klingon",
        "tn": "Setswana",
        "tr": "Turkish",
        "ts": "Tsonga",
        "tw": "Twi",
        "uk": "Ukrainian",
        "ur": "Urdu",
        "uz": "Uzbek",
        "ve": "Venda",
        "vi": "Vietnamese",
        "xh": "Xhosa",
        "zh": "Chinese",
        "zh_TW": "Traditional Chinese (Taiwan)",
        "zu": "Zulu",
      };

      var IANA_MAP = {
        "ab": 12026,
        "af": 40,
        "ar": 26020,
        "az": 26030,
        "be": 11890,
        "bg": 26050,
        "bn": 26040,
        "bo": 26601,
        "br": 1361,
        "ca": 3,
        "ceb": 26060,
        "cs": 26080,
        "cy": 26560,
        "da": 26090,
        "de": 26160,
        "el": 26165,
        "en": 26110,
        "eo": 11933,
        "es": 26460,
        "et": 26120,
        "eu": 1232,
        "fa": 26130,
        "fi": 26140,
        "fo": 11817,
        "fr": 26150,
        "fy": 1353,
        "gd": 65555,
        "gl": 1252,
        "gu": 26599,
        "ha": 26170,
        "haw": 26180,
        "he": 26592,
        "hi": 26190,
        "hr": 26070,
        "hu": 26200,
        "hy": 26597,
        "id": 26220,
        "is": 26210,
        "it": 26230,
        "ja": 26235,
        "ka": 26600,
        "kk": 26240,
        "km": 1222,
        "ko": 26255,
        "ku": 11815,
        "ky": 26260,
        "la": 26280,
        "lt": 26300,
        "lv": 26290,
        "mg": 1362,
        "mk": 26310,
        "ml": 26598,
        "mn": 26320,
        "mr": 1201,
        "ms": 1147,
        "ne": 26330,
        "nl": 26100,
        "nn": 172,
        "no": 26340,
        "pa": 65550,
        "pl": 26380,
        "ps": 26350,
        "pt": 26390,
        "ro": 26400,
        "ru": 26410,
        "sa": 1500,
        "sh": 1399,
        "sk": 26430,
        "sl": 26440,
        "so": 26450,
        "sq": 26010,
        "sr": 26420,
        "sv": 26480,
        "sw": 26470,
        "ta": 26595,
        "te": 26596,
        "th": 26594,
        "tl": 26490,
        "tlh": 26250,
        "tn": 65578,
        "tr": 26500,
        "tw": 1499,
        "uk": 26520,
        "ur": 26530,
        "uz": 26540,
        "vi": 26550,
        "zh": 26065,
        "zh_TW": 22,
      };

      var SINGLETONS = [
        ["Armenian", "hy"],
        ["Hebrew", "he"],
        ["Bengali", "bn"],
        ["Gurmukhi", "pa"],
        ["Greek", "el"],
        ["Gujarati", "gu"],
        ["Oriya", "or"],
        ["Tamil", "ta"],
        ["Telugu", "te"],
        ["Kannada", "kn"],
        ["Malayalam", "ml"],
        ["Sinhala", "si"],
        ["Thai", "th"],
        ["Lao", "lo"],
        ["Tibetan", "bo"],
        ["Burmese", "my"],
        ["Georgian", "ka"],
        ["Mongolian", "mn"],
        ["Khmer", "km"]
      ];

      var UNKNOWN = 'unknown';

      var BASIC_LATIN = ["en", "ceb", "ha", "so", "tlh", "id", "haw", "la", "sw", "eu", "nr", "nso", "zu", "xh", "ss", "st", "tn", "ts"];
      var EXTENDED_LATIN = ["cs", "af", "pl", "hr", "ro", "sk", "sl", "tr", "hu", "az", "et", "sq", "ca", "es", "fr", "de", "nl", "it", "da", "is", "no", "sv", "fi", "lv", "pt", "ve", "lt", "tl", "cy", "vi"];
      var ALL_LATIN = BASIC_LATIN.concat(EXTENDED_LATIN);
      var CYRILLIC = ["ru", "uk", "kk", "uz", "mn", "sr", "mk", "bg", "ky"];
      var ARABIC = ["ar", "fa", "ps", "ur"];
      var DEVANAGARI = ["hi", "ne"];
      var PT = ["pt_BR", "pt_PT"];

      // Unicode char block ranges
      var unicodeBlockRanges = [
        ["0000-007F", "Basic Latin"],
        ["0080-00FF", "Latin-1 Supplement"],
        ["0100-017F", "Latin Extended-A"],
        ["0180-024F", "Latin Extended-B"],
        ["0250-02AF", "IPA Extensions"],
        ["02B0-02FF", "Spacing Modifier Letters"],
        ["0300-036F", "Combining Diacritical Marks"],
        ["0370-03FF", "Greek and Coptic"],
        ["0400-04FF", "Cyrillic"],
        ["0500-052F", "Cyrillic Supplement"],
        ["0530-058F", "Armenian"],
        ["0590-05FF", "Hebrew"],
        ["0600-06FF", "Arabic"],
        ["0700-074F", "Syriac"],
        ["0750-077F", "Arabic Supplement"],
        ["0780-07BF", "Thaana"],
        ["07C0-07FF", "NKo"],
        ["0900-097F", "Devanagari"],
        ["0980-09FF", "Bengali"],
        ["0A00-0A7F", "Gurmukhi"],
        ["0A80-0AFF", "Gujarati"],
        ["0B00-0B7F", "Oriya"],
        ["0B80-0BFF", "Tamil"],
        ["0C00-0C7F", "Telugu"],
        ["0C80-0CFF", "Kannada"],
        ["0D00-0D7F", "Malayalam"],
        ["0D80-0DFF", "Sinhala"],
        ["0E00-0E7F", "Thai"],
        ["0E80-0EFF", "Lao"],
        ["0F00-0FFF", "Tibetan"],
        ["1000-109F", "Myanmar"],
        ["10A0-10FF", "Georgian"],
        ["1100-11FF", "Hangul Jamo"],
        ["1200-137F", "Ethiopic"],
        ["1380-139F", "Ethiopic Supplement"],
        ["13A0-13FF", "Cherokee"],
        ["1400-167F", "Unified Canadian Aboriginal Syllabics"],
        ["1680-169F", "Ogham"],
        ["16A0-16FF", "Runic"],
        ["1700-171F", "Tagalog"],
        ["1720-173F", "Hanunoo"],
        ["1740-175F", "Buhid"],
        ["1760-177F", "Tagbanwa"],
        ["1780-17FF", "Khmer"],
        ["1800-18AF", "Mongolian"],
        ["1900-194F", "Limbu"],
        ["1950-197F", "Tai Le"],
        ["1980-19DF", "New Tai Lue"],
        ["19E0-19FF", "Khmer Symbols"],
        ["1A00-1A1F", "Buginese"],
        ["1B00-1B7F", "Balinese"],
        ["1D00-1D7F", "Phonetic Extensions"],
        ["1D80-1DBF", "Phonetic Extensions Supplement"],
        ["1DC0-1DFF", "Combining Diacritical Marks Supplement"],
        ["1E00-1EFF", "Latin Extended Additional"],
        ["1F00-1FFF", "Greek Extended"],
        ["2000-206F", "General Punctuation"],
        ["2070-209F", "Superscripts and Subscripts"],
        ["20A0-20CF", "Currency Symbols"],
        ["20D0-20FF", "Combining Diacritical Marks for Symbols"],
        ["2100-214F", "Letterlike Symbols"],
        ["2150-218F", "Number Forms"],
        ["2190-21FF", "Arrows"],
        ["2200-22FF", "Mathematical Operators"],
        ["2300-23FF", "Miscellaneous Technical"],
        ["2400-243F", "Control Pictures"],
        ["2440-245F", "Optical Character Recognition"],
        ["2460-24FF", "Enclosed Alphanumerics"],
        ["2500-257F", "Box Drawing"],
        ["2580-259F", "Block Elements"],
        ["25A0-25FF", "Geometric Shapes"],
        ["2600-26FF", "Miscellaneous Symbols"],
        ["2700-27BF", "Dingbats"],
        ["27C0-27EF", "Miscellaneous Mathematical Symbols-A"],
        ["27F0-27FF", "Supplemental Arrows-A"],
        ["2800-28FF", "Braille Patterns"],
        ["2900-297F", "Supplemental Arrows-B"],
        ["2980-29FF", "Miscellaneous Mathematical Symbols-B"],
        ["2A00-2AFF", "Supplemental Mathematical Operators"],
        ["2B00-2BFF", "Miscellaneous Symbols and Arrows"],
        ["2C00-2C5F", "Glagolitic"],
        ["2C60-2C7F", "Latin Extended-C"],
        ["2C80-2CFF", "Coptic"],
        ["2D00-2D2F", "Georgian Supplement"],
        ["2D30-2D7F", "Tifinagh"],
        ["2D80-2DDF", "Ethiopic Extended"],
        ["2E00-2E7F", "Supplemental Punctuation"],
        ["2E80-2EFF", "CJK Radicals Supplement"],
        ["2F00-2FDF", "KangXi Radicals"],
        ["2FF0-2FFF", "Ideographic Description Characters"],
        ["3000-303F", "CJK Symbols and Punctuation"],
        ["3040-309F", "Hiragana"],
        ["30A0-30FF", "Katakana"],
        ["3100-312F", "Bopomofo"],
        ["3130-318F", "Hangul Compatibility Jamo"],
        ["3190-319F", "Kanbun"],
        ["31A0-31BF", "Bopomofo Extended"],
        ["31C0-31EF", "CJK Strokes"],
        ["31F0-31FF", "Katakana Phonetic Extensions"],
        ["3200-32FF", "Enclosed CJK Letters and Months"],
        ["3300-33FF", "CJK Compatibility"],
        ["3400-4DBF", "CJK Unified Ideographs Extension A"],
        ["4DC0-4DFF", "Yijing Hexagram Symbols"],
        ["4E00-9FFF", "CJK Unified Ideographs"],
        ["A000-A48F", "Yi Syllables"],
        ["A490-A4CF", "Yi Radicals"],
        ["A700-A71F", "Modifier Tone Letters"],
        ["A720-A7FF", "Latin Extended-D"],
        ["A800-A82F", "Syloti Nagri"],
        ["A840-A87F", "Phags-pa"],
        ["AC00-D7AF", "Hangul Syllables"],
        ["D800-DB7F", "High Surrogates"],
        ["DB80-DBFF", "High Private Use Surrogates"],
        ["DC00-DFFF", "Low Surrogates"],
        ["E000-F8FF", "Private Use Area"],
        ["F900-FAFF", "CJK Compatibility Ideographs"],
        ["FB00-FB4F", "Alphabetic Presentation Forms"],
        ["FB50-FDFF", "Arabic Presentation Forms-A"],
        ["FE00-FE0F", "Variation Selectors"],
        ["FE10-FE1F", "Vertical Forms"],
        ["FE20-FE2F", "Combining Half Marks"],
        ["FE30-FE4F", "CJK Compatibility Forms"],
        ["FE50-FE6F", "Small Form Variants"],
        ["FE70-FEFF", "Arabic Presentation Forms-B"],
        ["FF00-FFEF", "Halfwidth and Fullwidth Forms"],
        ["FFF0-FFFF", "Specials"],
      /*["10000-1007F", "Linear B Syllabary"],
        ["10080-100FF", "Linear B Ideograms"],
        ["10100-1013F", "Aegean Numbers"],
        ["10140-1018F", "Ancient Greek Numbers"],
        ["10300-1032F", "Old Italic"],
        ["10330-1034F", "Gothic"],
        ["10380-1039F", "Ugaritic"],
        ["103A0-103DF", "Old Persian"],
        ["10400-1044F", "Deseret"],
        ["10450-1047F", "Shavian"],
        ["10480-104AF", "Osmanya"],
        ["10800-1083F", "Cypriot Syllabary"],
        ["10900-1091F", "Phoenician"],
        ["10A00-10A5F", "Kharoshthi"],
        ["12000-123FF", "Cuneiform"],
        ["12400-1247F", "Cuneiform Numbers and Punctuation"],
        ["1D000-1D0FF", "Byzantine Musical Symbols"],
        ["1D100-1D1FF", "Musical Symbols"],
        ["1D200-1D24F", "Ancient Greek Musical Notation"],
        ["1D300-1D35F", "Tai Xuan Jing Symbols"],
        ["1D360-1D37F", "Counting Rod Numerals"],
        ["1D400-1D7FF", "Mathematical Alphanumeric Symbols"],
        ["20000-2A6DF", "CJK Unified Ideographs Extension B"],
        ["2F800-2FA1F", "CJK Compatibility Ideographs Supplement"],
        ["E0000-E007F", "Tags"],
        ["E0100-E01EF", "Variation Selectors Supplement"],
        ["F0000-FFFFF", "Supplementary Private Use Area-A"],
        ["100000-10FFFF", "Supplementary Private Use Area-B"]*/
      ];
      
      // Unicode char greedy regex object matchers
      var unicodeBlockTests = compileUnicodeBlockTests();

      function compileUnicodeBlockTests() { 
        var obj = {};
        for (var i = 0, l = unicodeBlockRanges.length; i < l; i++) {
          var x = unicodeBlockRanges[i][0].split('-');
          x[0] = '\\u' + x[0];
          x[1] = '\\u' + x[1];
          obj[unicodeBlockRanges[i][1]] = new RegExp('[' + x[0] + '-' + x[1] + ']', 'g');
        }
        return obj;
      }

      function findRuns(text) {

        var relevant_runs = {};

        var unicodeBlockNames = Object.keys(unicodeBlockTests);

        for (var i = 0, l = unicodeBlockNames.length; i < l; i++) {

          // Count the number of characters in each character block.
          var charCount = text.match(unicodeBlockTests[unicodeBlockNames[i]]);

          // return run types that used for 40% or more of the string
          // always return basic latin if found more than 15%
          // and extended additional latin if over 10% (for Vietnamese)
          var pct = (charCount ? charCount.length : 0) / text.length;

          relevant_runs[unicodeBlockNames[i]] = pct;

        }

        return relevant_runs;
      }

      function identify(text, callback) {

        var scripts = findRuns(text);

        // Identify the language.
        if (scripts["Hangul Syllables"] + scripts["Hangul Jamo"] + scripts["Hangul Compatibility Jamo"] >= 0.4) {
          callback.apply(undefined, ["ko"]);
          return;
        }

        if (scripts["Greek and Coptic"] >= 0.4) {
          callback.apply(undefined, ["el"]);
          return;
        }

        if (scripts["Hiragana"] + scripts["Katakana"] + scripts["Katakana Phonetic Extensions"] >= 0.2) {
          callback.apply(undefined, ["ja"]);
          return;
        }

        if (scripts["CJK Unified Ideographs"] + scripts["Bopomofo"] + scripts["Bopomofo Extended"] + scripts["KangXi Radicals"] >= 0.4) {
          callback.apply(undefined, ["zh"]);
          return;
        }

        if (scripts["Cyrillic"] >= 0.4) {
          check(text, CYRILLIC, callback);
          return;
        }

        if (scripts["Arabic"] + scripts["Arabic Presentation Forms-A"] + scripts["Arabic Presentation Forms-B"] >= 0.4) {
          check(text, ARABIC, callback);
          return;
        }

        if (scripts["Devanagari"] >= 0.4) {
          check(text, DEVANAGARI, callback);
          return;
        }

        // Try languages with unique scripts
        for (var i = 0, l = SINGLETONS.length; i < l; i++) {
          if (scripts[SINGLETONS[i][0]] >= 0.4) {
            callback.apply(undefined, [SINGLETONS[i][1]]);
            return;
          }
        }

        // Extended Latin
        if (scripts["Latin-1 Supplement"] + scripts["Latin Extended-A"] + scripts["IPA Extensions"] >= 0.4) {
          check(text, EXTENDED_LATIN, function(latin_lang) {
            if (latin_lang == "pt") {
              check(text, PT, callback);
            } else {
              callback.apply(undefined, [latin_lang]);
            }
          });
          return;
        }

        if (scripts["Basic Latin"] >= 0.15) {
          check(text, ALL_LATIN, callback);
          return;
        }

        callback.apply(undefined, [UNKNOWN]);
        // return;
      }

      function check(sample, langs, callback) {

        if (sample.length < MIN_LENGTH) {
          callback.apply(undefined, [UNKNOWN]);
          return;
        }

        var scores = {};
        var model = createOrderedModel(sample)
        for (var i = 0, l = langs.length; i < l; i++) {

          var lkey = langs[i].toLowerCase();

          var known_model = models[lkey] || null;

          if (!known_model) {
            continue;
          }

          scores[lkey] = distance(model, known_model);

        }

        var scoresArr = [];
        for (var index in scores) {
          scoresArr.push([index, scores[index]]);
        }

        if (scoresArr.length == 0) {
          callback.apply(undefined, [UNKNOWN]);
          return;
        }

        // we want the lowest score, less distance = greater chance of match
        var sortedScores = scoresArr.sort(function(objA, objB) {
          return objA[1] - objB[1]; // sort low-to-high
        });

        // return the best match we've now calculated
        callback.apply(undefined, [sortedScores[0][0]]);
        //return;
      }

      function createOrderedModel(content) {
        // Create a list of trigrams in content sorted by frequency.
        var trigrams = {},
            sortedTrigrams = [];
        var content = content.toLowerCase();

        var contentArr = content.split("");
        for (var i = 0, l = contentArr.length - 2; i < l; i++) {
          var trigramKey = contentArr[i] + contentArr[i + 1] + contentArr[i + 2] + "";
          if (!trigrams[trigramKey]) {
            trigrams[trigramKey] = 1;
          } else {
            trigrams[trigramKey] += 1;
          }
        }

        // convert object to array
        for (var i in trigrams) {
          sortedTrigrams[sortedTrigrams.length] = [i, trigrams[i]];
        }

        // sort array results
        return sortedTrigrams.sort(function(objA, objB) {
          return objB[1] - objA[1]; // sort high-to-low
        });
      }

      function distance(model, known_model) {
        // Calculate the distance to the known model.
        var dist = 0;

        var keys = Object.keys(model);

        for (var i = 0, l = model.length; i < l; i++) {

          if (known_model[model[i][0]]) {

            dist += Math.abs(model[i][1] - known_model[model[i][0]]);

          } else {

            dist += MAX_GRAMS;

          }

        }

        return dist;
      }

      return {
        detect: function(text, callback) {
          // Return the ISO 639-2 language identifier, i.e. 'en'.

          if (!text) {
            callback.apply(undefined, [UNKNOWN]);
            return;
          }

          text = text.substr(0, MAX_LENGTH).replace(/[\u0021-\u0040]/g, '');

          identify(text, callback);

        },
        info: function(text, callback) {
          // Return language info tuple (id, code, name), i.e. ('en', 26110, 'English').

          this.detect(text, function(language) {

            if (language === UNKNOWN) {
                callback.apply(undefined, [[ UNKNOWN, UNKNOWN, UNKNOWN ]]);
                return;
            }

            callback.apply(undefined, [

              [ language, IANA_MAP[language], NAME_MAP[language] ]

            ]);;

          });

        },
        code: function(text, callback) {
          // Return the language IANA code, i.e. 26110.

          this.detect(text, function(language) {
              
            if (language === UNKNOWN) {
              callback.apply(undefined, [ -1 ]);;
              return;
            }

            callback.apply(undefined, [

              IANA_MAP[language]

            ]);

          });

        },
        name: function(text, callback) {
          // Return the full language name, i.e. 'English'.

          this.detect(text, function(language) {
              
            if (language === UNKNOWN) {
              callback.apply(undefined, [ UNKNOWN ]);;
              return;
            }

            callback.apply(undefined, [

              NAME_MAP[language]

            ]);

          });

        }
      };
  
  };

  global.guessLanguage = (global.module || {}).exports = new guessLanguage();

})(this);
