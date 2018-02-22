let IntervalId = "";
let count = 1;
function addRecord(time,cnt){
	const row =`<tr>
			<td><input type="text" name="place${cnt}" class="time" value="${cnt}" disabled></td>
			<td><input type="text" name="time${cnt}" class="time" value="${time}" disabled></td>
			<td><input type="text" name="bib${cnt}" class="bib focus"></td>
		</tr>`
	return row;
}
function renderClock(){
	let mil = 1;
    let sec = 0;
    let min = 0;
    let hour = 0;
    $('.clock').text(`${hour}:${min}:${sec}.${mil}`);
    
    IntervalId = setInterval(()=>{
        mil++;
        if (mil > 999){
        	mil = 0;
        	sec++;
        }
        if (sec > 59){
        	sec = 0;
        	min++;
        }
        if (min > 59){
        	min = 0;
        	hour++;
        }
        $('.clock').text(`${hour}:${pad(min,2)}:${pad(sec,2)}.${pad(mil,3)}`);
        
    },1);
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
// Start
$('#start').on('click',()=>{
	renderClock();
	$('#start').prop('disabled', true);
	$('#stop').prop('disabled', false);
	$('#report').prop('disabled', true);
});

$('#stop').on('click',()=>{
	clearInterval(IntervalId);
	$('#start').prop('disabled', false);
	$('#stop').prop('disabled', true);
	$('#report').prop('disabled', false);
});

$("#report").on('click',()=>{
	$(".time").prop('disabled',false);
});

$(window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    let time = $(".clock").html();
    $('.bib').removeClass("focus");
    $('.record').append(addRecord(time,count));
    $('.focus').focus();
    count++;
  }
})