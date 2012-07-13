

// Main module; assume that FABridge is in scope.
(function() {
  var BRIDGE_NAME = "standingwavejs";

  var SWJS = {};
  SWJS.FABridge = FABridge;
  SWJS.create = function() {
    if (SWJS.bridge) {return SWJS.bridge.create.apply(SWJS.bridge, arguments);}
    else {return undefined;};
  }

  SWJS.whenInitialized = function(cb) {
    if (SWJS.bridge) setTimeout(cb, 0);
    else FABridge.addInitializationCallback(BRIDGE_NAME, cb);
  };

  FABridge.addInitializationCallback(BRIDGE_NAME, function() {
    SWJS.bridge = FABridge[BRIDGE_NAME].root();
  });

  if (typeof module !== 'undefined') module.exports = SWJS;
  else if (typeof window !== 'undefined') window.SWJS = SWJS;
})();

