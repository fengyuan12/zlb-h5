(function() {
    var initFontSize = 14
    var iPhone6Width = 375
    var clientWidth = window.document.documentElement.clientWidth || iPhone6Width
    var newFontSize = initFontSize * (clientWidth / iPhone6Width)
    document.documentElement.style.fontSize = newFontSize + 'px'
  })()
  