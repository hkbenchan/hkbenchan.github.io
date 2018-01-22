$(document).ready(function () {

  var random = new Random();

  var chi = undefined;
  $("#status").text("Loading");

  $.getJSON({
    url: 'chi_hist.json',
    success: function (data, textStatus, jqXHR) {
      chi = data;
      if (checkFinalStatus()) {
        $("#status").text("Ready");
      }
    }
  });


  var checkFinalStatus = function () {
    if (!chi) {
      return false;
    }

    return true;
  }

  $("#generate-btn").click(function () {
    if (!checkFinalStatus()) {
      return ;
    }
    var gender = $("select[name='gender']").val();
    var alt = $("select[name='altitude']").val();
    var homework = $("select[name='homework']").val();
    var result = $("select[name='result']").val();

    const altArray = chi["alt"][alt], homeworkArray = chi["homework"][homework], resultArray = chi["result"][result];

    var sentenceArray = [];
    sentenceArray.push(altArray[random.integer(0, altArray.length - 1)]);
    sentenceArray.push(homeworkArray[random.integer(0, homeworkArray.length - 1)]);
    sentenceArray.push(resultArray[random.integer(0, resultArray.length - 1)]);

    var s = sentenceArray.join(" ");

    if (gender == 'male') {
      s = s.replace('/Her', '');
      s = s.replace('/She', '');
      s = s.replace('/she', '');
      s = s.replace('/her', '');
    } else {
      s = s.replace('His/', '');
      s = s.replace('He/', '');
      s = s.replace('he/', '');
      s = s.replace('his/', '');
    }
    var previous = $("#generated-sentence").text();
    $("#generated-sentence").text([s, "", previous].join('\n'));
  })

});
