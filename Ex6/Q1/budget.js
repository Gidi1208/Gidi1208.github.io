$(document).ready(function(){
  function fmt(n){
    return 'Rs.' + Number(n).toFixed(2);
  }

  $('#evaluateBtn').on('click', function(e){
    e.preventDefault();
    var amount = parseFloat($('#amount').val());
    var rentP = parseFloat($('#rentPerc').val());
    var accP  = parseFloat($('#accPerc').val());
    var emP   = parseFloat($('#emPerc').val());
    var savP  = parseFloat($('#savPerc').val());

    if (!isFinite(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than zero.');
      return;
    }

    // ensure numbers
    rentP = isFinite(rentP) ? rentP : 0;
    accP  = isFinite(accP) ? accP : 0;
    emP   = isFinite(emP) ? emP : 0;
    savP  = isFinite(savP) ? savP : 0;

    var sum = rentP + accP + emP + savP;

    // Allow very small floating point tolerance
    if (Math.abs(sum - 100) > 0.0001) {
      alert('Please make sure the percentage values add up to 100%.\nCurrent sum: ' + sum + '%');
      return;
    }

    // compute parts
    var rentAmt = amount * rentP / 100;
    var accAmt  = amount * accP / 100;
    var emAmt   = amount * emP / 100;
    var savAmt  = amount * savP / 100;

    // show results
    $('#rentAmt').text(fmt(rentAmt));
    $('#accAmt').text(fmt(accAmt));
    $('#emAmt').text(fmt(emAmt));
    $('#savAmt').text(fmt(savAmt));

    // simple highlight animation
    $('.card').stop(true,true).css('opacity',0.6).animate({opacity:1},400);
  });
});
