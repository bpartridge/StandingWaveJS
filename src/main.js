

// Main module; assume that FABridge is in scope.
(function() {
  var BRIDGE_NAME = "standingwavejs";

  var SWJS = {};
  SWJS.FABridge = FABridge;
  SWJS.create = function() {
    if (SWJS.bridge) {return SWJS.bridge.create.apply(SWJS.bridge, arguments);}
    else {return undefined;}
  }

  SWJS.whenInitialized = function(cb) {
    if (SWJS.bridge) setTimeout(cb, 0);
    else FABridge.addInitializationCallback(BRIDGE_NAME, cb);
  };

  FABridge.addInitializationCallback(BRIDGE_NAME, function() {
    SWJS.bridge = FABridge[BRIDGE_NAME].root();
  });

  var classes = "AbstractFilter AbstractGenerator AbstractModulationData AbstractSource ADSREnvelopeGenerator AmpFilter AttackFilter AudioDescriptor AudioPerformer AudioPlayer AudioSampleHandler AudioUtils BendModulation BiquadFilter CacheFilter DecayFilter EchoFilter FadeEnvelopeGenerator FadeInFilter FadeOutFilter FilterCalculator GainFilter LineData ListPerformance LoopSource Mod ModulationKeyframe NoiseSource OverdriveFilter PanFilter PerformableAudioSource ResamplingFilter Sample SineSource SoundGenerator SoundSource SplineData StandardizeFilter ToneControlFilter ValueModulation VibratoModulation WaveFile";
  classes = classes.split(' ');
  for (var i = 0; i < classes.length; ++i) {
    (function(c) {
      SWJS["new"+c] = function() {
        var args = [c];
        for (var j = 0; j < arguments.length; ++j)
          args[j+1] = arguments[j];
        return SWJS.create.apply(null, args);
      }
    })(classes[i]);
  }

  if (typeof module !== 'undefined') module.exports = SWJS;
  else if (typeof window !== 'undefined') window.SWJS = SWJS;
})();

