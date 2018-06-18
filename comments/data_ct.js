$(document).ready(function () {

  var random = new Random();

  var ct = undefined;

  var allCodes = [], filteredCodes = [];
  $("#status").text("Loading");

  $.getJSON({
    url: 'classteacher.json',
    success: function (data, textStatus, jqXHR) {
      ct = data;
      if (checkFinalStatus()) {

        prepareSelectors(ct.count);
        prepareFilteringList(ct.s);

        $("#status").text("Ready");
      }
    }
  });


  var checkFinalStatus = function () {
    if (!ct) {
      return false;
    }

    return true;
  }

  const prepareSelectors = function (words) {

    const selectableKeys = Object.keys(words);
    selectableKeys.sort();

    selectableKeys.map(key => {
      const html = [
        `<div class="checkbox-inline">`,
          `<label><input type="checkbox" value="${key}">${key} (${words[key].count})</label>`,
        `</div>`
      ].join('');
      $("#selectors").append(html);
    });

    $("#selectors input").change(function () {
      const key = $(this).val();
      console.log(key);

      // update filter code (union)
      computeFilterBox(key);
    });
  }

  const prepareFilteringList = function (sentences) {
    const keys = Object.keys(sentences);
    allCodes = allCodes.concat(keys);
    filteredCodes = filteredCodes.concat(keys);
  }

  $(".clear-button").click(function () {
    $("#selectors input").removeAttr('checked');
    // reset
    filteredCodes = [];
    filteredCodes = filteredCodes.concat(allCodes);
    $("#generated-sentence").text('Pending select');
  });

  const computeFilterBox = (key) => {
    const gender = $("select[name='gender']").val();

    // update filter code (union)
    const res = ct.count[key].s.filter(sentenceCode => {
      return filteredCodes.indexOf(sentenceCode) > -1;
    })
    filteredCodes = res;
    console.log(res);
    // update the result box
    const sentences = filteredCodes.map(k => {
      return ct.s[k];
    }).map(s => {
      if (gender == 'male') {
        s = s.replace(/\/Her/g, '');
        s = s.replace(/\/She/g, '');
        s = s.replace(/\/she/g, '');
        s = s.replace(/\/her/g, '');
      } else {
        s = s.replace(/His\//g, '');
        s = s.replace(/He\//g, '');
        s = s.replace(/he\//g, '');
        s = s.replace(/his\//g, '');
      }
      return s;
    });
    if (sentences.length > 0) {
      $("#generated-sentence").text(sentences.join('\n'));
    } else {
      $("#generated-sentence").text('No result');
    }
  }
  //
  // $("#generate-btn").click(function () {
  //   if (!checkFinalStatus()) {
  //     return ;
  //   }
  //   var gender = $("select[name='gender']").val();
  //   var alt = $("select[name='altitude']").val();
  //   var homework = $("select[name='homework']").val();
  //   var result = $("select[name='result']").val();
  //
  //   const altArray = chi["alt"][alt], homeworkArray = chi["homework"][homework], resultArray = chi["result"][result];
  //
  //   var sentenceArray = [];
  //   sentenceArray.push(altArray[random.integer(0, altArray.length - 1)]);
  //   sentenceArray.push(homeworkArray[random.integer(0, homeworkArray.length - 1)]);
  //   sentenceArray.push(resultArray[random.integer(0, resultArray.length - 1)]);
  //
  //   var s = sentenceArray.join(" ");
  //
  //   if (gender == 'male') {
  //     s = s.replace(/\/Her/g, '');
  //     s = s.replace(/\/She/g, '');
  //     s = s.replace(/\/she/g, '');
  //     s = s.replace(/\/her/g, '');
  //   } else {
  //     s = s.replace(/His\//g, '');
  //     s = s.replace(/He\//g, '');
  //     s = s.replace(/he\//g, '');
  //     s = s.replace(/his\//g, '');
  //   }
  //   var previous = $("#generated-sentence").text();
  //   $("#generated-sentence").text([s, "", previous].join('\n'));
  // })

});
