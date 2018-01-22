$(document).ready(function () {

  var random = new Random();

  var chi = undefined;
  $("#status").text("Loading");

  $.getJSON({
    url: 'chi.json',
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

    var alt = $("select[name='altitude']").val();
    var homework = $("select[name='homework']").val();
    var result = $("select[name='result']").val();

    const altArray = chi["alt"][alt], homeworkArray = chi["homework"][homework], resultArray = chi["result"][result];

    var sentenceArray = [];
    sentenceArray.push(altArray[random.integer(0, altArray.length - 1)]);
    sentenceArray.push(homeworkArray[random.integer(0, homeworkArray.length - 1)]);
    sentenceArray.push(resultArray[random.integer(0, resultArray.length - 1)]);

    $("#generated-sentence").text(sentenceArray.join(" "));
  })

});
