(function(){
  var DEFAULT_LOCATION = 'Singapore';
  var loggingEnabled = true;
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  function log(){
    if (loggingEnabled)
      console.log.apply(console, arguments);
  }

  function selectOption(selectEl, optionText){
    var options = selectEl.querySelectorAll('option'),
      l = options.length,
      option;

    log('finding location in options');

    while(l--){
      option = options[l];
      if (option.innerText === optionText){
        log('setting location');
        selectEl.value = option.value;
        return;
      }
    }

    log('location not found');
  }

  function checkSelectOption(selectEl, optionText){
    if (selectEl.value === "0")
      selectOption(selectEl, optionText);
  }

  function installExtension(location){
    var select = document.querySelector('#shift_location_id'),
      observer;

    log('select element:', select);
    if (select){
      // the list of options changes depending on selected project
      observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
          checkSelectOption(select, location);
        });
      });

      observer.observe(select, {childList: true});
      checkSelectOption(select, location);
    }
  }

  log('installing extension');
  installExtension(DEFAULT_LOCATION);
})();
