var app = angular.module('quizApp', []);

app.directive('quiz', function(quizService) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'quiz.html',
		link: function(scope, elem, attrs) {

			// start the quiz set the properties and get the first question
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			// reset the answers in the quiz
			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

            //
			scope.getQuestion = function() {
				var q = quizService.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.nextQuestion = function() {
			   if(!$('input[name=answer]:checked').length){
					alert("Please choose your answer first!");
					return;
				};

				// get the values from the checkboxes
				var allVals = [];
				$('input[name=answer]:checked').each(function() {
                   allVals.push($(this).val());
                });

                // built here the arrays with answers
                var arrayAnswers = [];
                for(var i = 0; i < scope.answer.length; i++){
                	arrayAnswers.push(scope.options[scope.answer[i]])
                }

                // compare the arrays to see if the answers were correct
                if($(allVals).not(arrayAnswers).length === 0 && $(arrayAnswers).not(allVals).length == 0){
					scope.score++;
				}

				scope.answerMode = false;

				// go to next question
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

// service to store the questions and the correct answers
app.factory('quizService', function() {

	// info which can be retrieved from a backend database
	var questions = [
		{
			question: "Which two countries were in the Axis during World War 2?",
			options: ["United Kingdom", "USA", "Italy", "URSS", "Romania"],
			answer: [2,4]
		},
		{
			question: "When did World War II begin?",
			options: ["28 June 1914", "11 November 1918", "3 September 1939", "1 June 1941"],
			answer: [2]
		},
		{
			question: "Choose two countries United States were in war with during World War 2?",
			options: ["France", "Italy", "URSS", "Canada", "Japan"],
			answer: [1,4]
		},
		{
			question: "When did Germany attack USSR?",
			options: ["22 June 1941", "14 November 1940", "3 December 1939", "4 July 1940"],
			answer: [0]
		},
		{
			question: "When did Japan attack Pearl Harbor?",
			options: ["24 May 1942", "17 October 1938", "7 December 1941", "1 March 1943"],
			answer: [2]
		},
		{
			question: "Who said: I have nothing to offer but blood, toil, tears and sweat.?",
			options: ["Adolf Hitler", "Benito Mussolini", "Franklin Roosevelt", "Winston Churchill"],
			answer: [3]
		},
		{
			question: "Which German leader landed in Britain on 10 May 1941 and was arrested?",
			options: ["Hermann Goring", "Rudolf Hess", "Benjamin Grossman", "Heinrich Himmler"],
			answer: [1]
		},
		{
			question: "Choose two leaders from the Axis?",
			options: ["Miklós Horthy", "Winston Churchill", "Benito Mussolini", "Franklin Roosevelt", "Iosif Stalin"],
			answer: [0,2]
		},
		{
			question: "When did Japan surrender?",
			options: ["10 August 1945", "30 June 1948", "15 June 1943", "20 October 1942"],
			answer: [0]
		},
		{
			question: "When was atomic bomb dropped on Hiroshima?",
			options: ["5 June 1944", "3 April 1945", "6 August 1945", "15 September 1945"],
			answer: [2]
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});
