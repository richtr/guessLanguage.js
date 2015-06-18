var assert = (typeof assert !== "undefined") ? assert : require('assert');
var guessLanguage = (typeof guessLanguage !== "undefined") ? guessLanguage : require('./../lib/guessLanguage');

var tests = [
  ["This is a test of the language checker.", "en"],
  ["Vérifions que le détecteur de langue fonctionne.", "fr"],
  ["Sprawdźmy, czy odgadywacz języków pracuje", "pl"],
  ["авай проверить  узнает ли наш угадатель русски язык", "ru"],
  ["La respuesta de los acreedores a la oferta argentina para salir " +
   "del default no ha sido muy positiv", "es"],
  ["Сайлау нәтижесінде дауыстардың басым бөлігін ел премьер " +
   "министрі Виктор Янукович пен оның қарсыласы, оппозиция " +
   "жетекшісі Виктор Ющенко алды.", "kk"],
  ["милиция ва уч солиқ идораси ходимлари яраланган. Шаҳарда " +
   "хавфсизлик чоралари кучайтирилган.", "uz"],
  ["көрбөгөндөй элдик толкундоо болуп, Кокон шаарынын көчөлөрүндө " +
   "бир нече миң киши нааразылык билдирди.", "ky"],
  ["yakın tarihin en çekişmeli başkanlık seçiminde oy verme işlemi " +
   "sürerken, katılımda rekor bekleniyor.", "tr"],
  ["Daxil olan xəbərlərdə deyilir ki, 6 nəfər Bağdadın mərkəzində " +
   "yerləşən Təhsil Nazirliyinin binası yaxınlığında baş vermiş " +
   "partlayış zamanı həlak olub.", "az"],
  [" ملايين الناخبين الأمريكيين يدلون بأصواتهم وسط إقبال قياسي على " +
   "انتخابات هي الأشد تنافسا منذ عقود", "ar"],
  ["Американське суспільство, поділене суперечностями, збирається " +
   "взяти активну участь у голосуванні", "uk"],
  ["Francouzský ministr financí zmírnil výhrady vůči nízkým " +
   "firemním daním v nových členských státech EU", "cs"],
  ["biće prilično izjednačena, sugerišu najnovije ankete. " +
   "Oba kandidata tvrde da su sposobni da dobiju rat protiv " +
   "terorizma", "hr"],
  [" е готов да даде гаранции, че няма да прави ядрено оръжие, " +
   "ако му се разреши мирна атомна програма", "bg"],
  ["на јавното мислење покажуваат дека трката е толку тесна, " +
   "што се очекува двајцата соперници да ја прекршат традицијата " +
   "и да се појават и на самиот изборен ден.", "mk"],
  ["în acest sens aparţinînd Adunării Generale a organizaţiei, " +
   "în ciuda faptului că mai multe dintre solicitările organizaţiei " +
   "privind organizarea scrutinului nu au fost soluţionate", "ro"],
  ["kaluan ditën e fundit të fushatës në shtetet kryesore " +
   "për të siguruar sa më shumë votues.", "sq"],
  ["αναμένεται να σπάσουν παράδοση δεκαετιών και να συνεχίσουν " +
   "την εκστρατεία τους ακόμη και τη μέρα των εκλογών", "el"],
  [" 美国各州选民今天开始正式投票。据信，", "zh"],
  [" Die kritiek was volgens hem bitter hard nodig, " +
   "omdat Nederland binnen een paar jaar in een soort Belfast zou " +
   "dreigen te veranderen", "nl"],
  ["På denne side bringer vi billeder fra de mange forskellige " +
   "forberedelser til arrangementet, efterhånden som vi får dem ",
   "da"],
  ["Vi säger att Frälsningen är en gåva till alla, fritt och för " +
   "intet.  Men som vi nämnt så finns det två villkor som måste",
   "sv"],
  ["Nominasjonskomiteen i Akershus KrF har skviset ut Einar Holstad " +
   "fra stortingslisten. Ytre Enebakk-mannen har plass p Stortinget " +
   "s lenge Valgerd Svarstad Haugland sitter i", "no"],
  ["on julkishallinnon verkkopalveluiden yhteinen osoite. " +
   "Kansalaisten arkielämää helpottavaa tietoa on koottu eri " +
   "aihealueisiin", "fi"],
  ["Ennetamaks reisil ebameeldivaid vahejuhtumeid vii end kurssi " +
   "reisidokumentide ja viisade reeglitega ning muu praktilise " +
   "informatsiooniga", "et"],
  ["Hiába jön létre az önkéntes magyar haderő, hiába nem lesz " +
   "többé bevonulás, változatlanul fennmarad a hadkötelezettség " +
   "intézménye", "hu"],
  ["հարաբերական", "hy"],
  ["Hai vấn đề khó chịu với màn hình thường gặp nhất khi bạn dùng " +
   "laptop là vết trầy xước và điểm chết. Sau đây là vài cách xử " +
   "lý chúng.", "vi"],
  ["トヨタ自動車、フィリピンの植林活動で第三者認証取得　" +
   "トヨタ自動車[株]（以下、トヨタ）は、2007年９月よりフィリピンのルソン" +
   "島北部に位置するカガヤン州ペニャブランカ町", "ja"],
  ["", "unknown"],
];

function IdTest(obj) {
  describe('Guess Language ID [' + obj[1] + ']', function() {
    it('Language is [' + obj[1] + ']', function(done) {
      guessLanguage.detect(obj[0], function(id) {
        assert.equal(obj[1], id);
        done();
      });
    });
  });
}

for(var ii = 0, l = tests.length; ii < l; ii++) {

  new IdTest(tests[ii]);

}

var text = "Vérifions que le détecteur de langue fonctionne."

describe('Guess Language Name', function() {

  it('Test Guess Language Name', function(done) {
    guessLanguage.name(text, function(name) {
      assert.equal("French", name);
      done();
    });
  });

});

describe('Guess Language Code', function() {

  it('Test Guess Language Code', function(done) {
    guessLanguage.code(text, function(code) {
      assert.equal(26150, code);
      done();
    });
  });

});

describe('Guess Language Info', function() {

  it('Test Guess Language Info', function(done) {
    guessLanguage.info(text, function(info) {
      assert.deepEqual(["fr", 26150, "French"], info);
      done();
    });
  });

});
