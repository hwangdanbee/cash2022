// Quiz result options in a separate object for flexibility
var resultOptions = [
    {   title: '<img src="http://wecyd.com/nts/2022/cash/answer_list.png" style="width:100%;"><br/><br/>',
        desc: '<p><a href="javascript:;" class="reset"><img src="http://wecyd.com/nts/2022/cash/re_test_btn.png" style="width:60%;"></a></p>'
    },

//    {   title: '<img src="images/result-good-title.png">',
//       desc: '<p><input type="text" name="" id="M_NAME" placeholder="이름"/></p><p><input type="text" name="" id="M_HP" placeholder="연락처"/></p><p><label for="agree"><input type="checkbox" id="agree"/>개인정보 수집 및 이용에 동의합니다.</label></p><p><a><img src="images/btn-submit.png"></a></p>'
//    },
];

// global variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;

// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer');
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                answerScore = parseInt(value);
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = wasActive.attr('data-quizIndex'),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                totalScore -= oldScoreValue;
                totalScore += answerScore;
                calcResults(totalScore);
            } else {
                // handle visual active state
                $this.addClass('active');
                // handle score calculation
                totalScore += answerScore;
                calcResults(totalScore);
                // handle current step
                updateStep(currentStep);
            }
            $(".reset").click(function(){
                //$('#modal').iziModal('resetContent');
				history.go(0);
            });
            return true;

			//if ( $("#agree").is(':checked') == false ) {
			//	alert("개인정보 수집 및 이용동의하셔야 상담을 신청하실수 있습니다.");
			//	return false;
			//}
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if(currentStep.hasClass('current')){
       currentStep.removeClass('current');
       currentStep.next().addClass('current');
    }
}

// display scoring results
function calcResults(totalScore) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length){
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');

        // calc lowest possible score
        var lowestScoreArray = $('#quizzie .low-value').map(function() {
            return $(this).attr('data-quizIndex');
        });

        var minScore = 0;
        for (var i = 0; i < lowestScoreArray.length; i++) {
            minScore += lowestScoreArray[i] << 0;
        }
        // calculate highest possible score
        var highestScoreArray = $('#quizzie .high-value').map(function() {
            return $(this).attr('data-quizIndex');
        });
        var maxScore = 0;
        for (var i = 0; i < highestScoreArray.length; i++) {
            maxScore += highestScoreArray[i] << 0;
        }
        // calc range, number of possible results, and intervals between results
        var range = maxScore - minScore,
            numResults = resultOptions.length,
            interval = range / (numResults - 1),
            increment = '',
            n = 0; //increment index

        // while (n < 3) {
         //   increment = minScore + (interval * n);
            if (totalScore < 10) {
                resultsTitle.replaceWith("<h1>" + resultOptions[n].title + "</h1>");
                resultsDesc.replaceWith("<p class='desc'>" + resultOptions[n].desc + "</p>");
                return;
            } else {
                resultsTitle.replaceWith('<h1><img src="http://wecyd.com/nts/2022/cash/event_db_title.png"></h1>');
                resultsDesc.replaceWith('<p class="desc"><input type="text" name="name1" id="name1" onkeyup="onlyKorean(this);" maxlength="5" placeholder="이름"/></p><p class="tel-1"><input type="tel" name="tel1" id="tel1" class="tel-check" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" maxlength="11" placeholder="연락처"/></p><p class="select_displaynone2"><input name="radio2" id="radio2" type="radio" value="전자세금계산서_전자">전자세금계산서_전자</p><p class="select_displaynone2"><input name="radio2" id="radio2" type="radio" value="현금영수증_전자" checked="checked">현금영수증_전자</p><p class="check_01 check_01_top"><label for="agree"><input type="checkbox" id="agree1-1" name="agree1-1" checked="checked"/>개인정보 수집 및 이용에 동의합니다.<a style="cursor:pointer; color:#fff;" onclick="policy();"> [자세히보기]</a></label></p><p class="check_01"><label for="agree"><input type="checkbox" id="agree1-2" name="agree1-2" checked="checked"/>마케팅수신동의</label></p><p class="quiz_com_btn"><a onclick="input_db(1)"><img src="http://wecyd.com/nts/2022/cash/complete_btn.png"></a></p>');
                return;
            }
        //}
    }
}
