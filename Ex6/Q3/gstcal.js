$(function(){
 
  var $amount = $('#amount');
  var $gst = $('#gst');
  var $actual = $('#actual');
  var $gstAmount = $('#gstAmount');
  var $total = $('#total');

  function calculate(){
    var amt = parseFloat($amount.val());
    if (!isFinite(amt) || amt < 0) amt = 0;
    var pct = parseFloat($gst.val());
    if (!isFinite(pct)) pct = 0;

    var gstVal = (amt * pct) / 100;
    var tot = amt + gstVal;

    $actual.text(amt.toFixed(2));
    $gstAmount.text(gstVal.toFixed(2));
    $total.text(tot.toFixed(2));
  }

  $amount.on('input change paste keyup', calculate);
  $gst.on('change', calculate);

  $amount.on('focus', function(){ $(this).addClass('focused'); });
  $amount.on('blur', function(){ $(this).removeClass('focused'); });

  $amount.on('keypress', function(e){
    if (e.which === 13) { // Enter
      e.preventDefault();
      calculate();
      $(this).blur();
    }
  });

  $('#resetBtn').on('click', function(){
    $amount.val('');
    $gst.val('3');
    calculate();
    $amount.focus();
  });

  calculate();
});
