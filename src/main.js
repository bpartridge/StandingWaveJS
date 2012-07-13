

// Main module; assume that FABridge is in scope.
(function() {
  var BRIDGE_NAME = "standingwavejs";

  var SWJS = {};
  SWJS.FABridge = FABridge;
  SWJS.create = function() {
    if (SWJS.bridge) return SWJS.bridge.create.apply(SWJS.bridge, arguments);
  }
  SWJS.saveFile = function(data, filename) {
    if (SWJS.bridge) return SWJS.bridge.saveFile(data, filename);
  }
  SWJS.writeSampleToWavFile = function(sample) {
    if (SWJS.bridge) return SWJS.bridge.writeSampleToWavFile(sample);
  }
  SWJS.readSampleFromWav = function(wav) {
    if (SWJS.bridge) return SWJS.bridge.readSampleFromWav(wav);
  }

  SWJS.whenInitialized = function(cb) {
    FABridge.addInitializationCallback(BRIDGE_NAME, function() {
      setTimeout(cb, 0);
    });
  };

  FABridge.addInitializationCallback(BRIDGE_NAME, function() {
    SWJS.bridge = FABridge[BRIDGE_NAME].root();
  });

  var classes = "AbstractFilter AbstractGenerator AbstractModulationData AbstractSource ADSREnvelopeGenerator AmpFilter AttackFilter AudioDescriptor AudioPerformer AudioPlayer AudioSampleHandler AudioUtils BendModulation BiquadFilter CacheFilter DecayFilter EchoFilter FadeEnvelopeGenerator FadeInFilter FadeOutFilter FilterCalculator GainFilter LineData ListPerformance LoopSource Mod ModulationKeyframe NoiseSource OverdriveFilter PanFilter PerformableAudioSource ResamplingFilter Sample SineSource SoundGenerator SoundSource SplineData StandardizeFilter ToneControlFilter ValueModulation VibratoModulation Sound URLRequest URLStream FileReference ByteArray";
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

  // Utility method to load a sound from a URL.
  // cb is passed (err, soundObject), with err null if there is no error.
  // The sound object is also returned so the caller can add other listeners.
  SWJS.loadSound = function(url, cb) {
    var sound = SWJS.newSound(SWJS.newURLRequest(url));
    if (cb) {
      sound.addEventListener("complete", function() {cb(null, sound);});
      sound.addEventListener("ioError", function() {cb("ioError");});
    }
    return sound;
  }

  if (typeof module !== 'undefined') module.exports = SWJS;
  else if (typeof window !== 'undefined') window.sw = SWJS;
})();

