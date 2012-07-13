package {
  import bridge.*;
  import flash.external.ExternalInterface;
  import flash.display.Sprite;
  import com.noteflight.standingwave3.elements.*;
  import com.noteflight.standingwave3.filters.*;
  import com.noteflight.standingwave3.formats.*;
  import com.noteflight.standingwave3.generators.*;
  import com.noteflight.standingwave3.modulation.*;
  import com.noteflight.standingwave3.output.*;
  import com.noteflight.standingwave3.performance.*;
  import com.noteflight.standingwave3.sources.*;
  import com.noteflight.standingwave3.utils.*;

  [SWF(width='10', height='10')]
  public class StandingWaveJS extends Sprite {
    public var bridgeInstance:FABridge;

    public function StandingWaveJS() {
      this.bridgeInstance = new FABridge();
      this.bridgeInstance.initialized(this, null);
    }

    public function create(type:String, ...args):* {
      var cls:Class = null;
      switch (type) {
        case "AbstractFilter": cls = AbstractFilter; break;
        case "AbstractGenerator": cls = AbstractGenerator; break;
        case "AbstractModulationData": cls = AbstractModulationData; break;
        case "AbstractSource": cls = AbstractSource; break;
        case "ADSREnvelopeGenerator": cls = ADSREnvelopeGenerator; break;
        case "AmpFilter": cls = AmpFilter; break;
        case "AttackFilter": cls = AttackFilter; break;
        case "AudioDescriptor": cls = AudioDescriptor; break;
        case "AudioPerformer": cls = AudioPerformer; break;
        case "AudioPlayer": cls = AudioPlayer; break;
        case "AudioSampleHandler": cls = AudioSampleHandler; break;
        case "AudioUtils": cls = AudioUtils; break;
        case "BendModulation": cls = BendModulation; break;
        case "BiquadFilter": cls = BiquadFilter; break;
        case "CacheFilter": cls = CacheFilter; break;
        case "DecayFilter": cls = DecayFilter; break;
        case "EchoFilter": cls = EchoFilter; break;
        case "FadeEnvelopeGenerator": cls = FadeEnvelopeGenerator; break;
        case "FadeInFilter": cls = FadeInFilter; break;
        case "FadeOutFilter": cls = FadeOutFilter; break;
        case "FilterCalculator": cls = FilterCalculator; break;
        case "GainFilter": cls = GainFilter; break;
        case "LineData": cls = LineData; break;
        case "ListPerformance": cls = ListPerformance; break;
        case "LoopSource": cls = LoopSource; break;
        case "Mod": cls = Mod; break;
        case "ModulationKeyframe": cls = ModulationKeyframe; break;
        case "NoiseSource": cls = NoiseSource; break;
        case "OverdriveFilter": cls = OverdriveFilter; break;
        case "PanFilter": cls = PanFilter; break;
        case "PerformableAudioSource": cls = PerformableAudioSource; break;
        case "ResamplingFilter": cls = ResamplingFilter; break;
        case "Sample": cls = Sample; break;
        case "SineSource": cls = SineSource; break;
        case "SoundGenerator": cls = SoundGenerator; break;
        case "SoundSource": cls = SoundSource; break;
        case "SplineData": cls = SplineData; break;
        case "StandardizeFilter": cls = StandardizeFilter; break;
        case "ToneControlFilter": cls = ToneControlFilter; break;
        case "ValueModulation": cls = ValueModulation; break;
        case "VibratoModulation": cls = VibratoModulation; break;
        case "WaveFile": cls = WaveFile; break;
      }
      if (!cls) return null;
      switch (args.length) {
        case 0: return new cls();
        case 1: return new cls(args[0]);
        case 2: return new cls(args[0], args[1]);
        case 3: return new cls(args[0], args[1], args[2]);
        case 4: return new cls(args[0], args[1], args[2], args[3]);
        case 5: return new cls(args[0], args[1], args[2], args[3], args[5]);
      }
      return null;
    }
  }
}
