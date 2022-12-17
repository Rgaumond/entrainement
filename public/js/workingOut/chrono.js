let chronoInterval;
let chronoMaximized = true;
let chronoIsActive = false;
let chronoIsProgress = false;
function chronoStart(restTime) {
	clearInterval(chronoInterval);
	maximizeChrono();
	$(".chrono").css({ "display": "flex" });
	$(".chronotime").html(restTime);
	chronoInterval =setInterval(function () {
		$(".chronotime").html(restTime-1);
		restTime = restTime-1;
		if (restTime < 0) {
			chronoCompleted();
        }
	}, 1000);
	chronoIsActive = true;
}

function chronoReset() {
	$(".chrono").hide();
	clearInterval(chronoInterval);
	chronoIsActive = false;
}

function chronoCompleted() {
	$(".chrono").hide();
	clearInterval(chronoInterval);
	focusSelectedSerie(showNumPad);
	chronoIsActive = false;
}

function minimizeChrono() {
	$(".chrono").css({
		"width": "50px",
		"height": "50px",		
		"background-size": "0 0"
	});
	$(".chrono__inner").css({
		"width": "50px",
		"height": "50px",
		"font-size": "1em",
	});
	$(".chronotime").css({
		"font-size": "1em",
	});
	$(".chrono__button").hide();
	let top = $("#series").position().top;
	if ($(".serie-value-selected").position())
		top = $(".serie-value-selected").position().top;
	$(".chrono").css({
		"top": top});
	chronoMaximized = false;
}

function maximizeChrono() {
    if (!chronoMaximized) {
		$(".chrono").css({
			"width": "100vw",
			"height": "calc(100vh - var(--focussedSerieHeight))",
			"top":"var(--focussedSerieHeight)"
		});
		$(".chrono__inner").css({
			"width": "100vw",
			"height": "400px",
			"font-size": "9em"
		});
		$(".chrono__button").show();
		chronoMaximized = true;
	}
	hideNumPad();
	focusSelectedSerie();
}
