StandingWaveJS
==============

StandingWaveJS is a native-feeling wrapper for the 
[StandingWave3](https://github.com/maxl0rd/standingwave3/wiki) audio
synthesis library for Flash Player 10. By native-feeling, we mean the *best
of both worlds* - you get the flexibility of declaratively specifying
sound sources in client-side Javascript, combined with the high-performance
cross-platform-today sound support of Flash.

StandingWaveJS is built on an Adobe library called 
[FABridge](http://livedocs.adobe.com/flex/3/html/ajaxbridge_3.html#194300),
which exposes proxies of ActionScript objects as plain old Javascript objects, 
with lazy serialization of their contents.
All the audio data stays in Flash, where it takes advantage of
the new Adobe Alchemy opcodes to give near-native data processing performance.
Meanwhile, your user interface and logic can live entirely in Javascript.

Here's a snippet from index.html that shows how simple this is. Note that
every line of Javascript operates in constant time, so your user interface
will remain responsive.

    $("#piano").click(function() {
      sw.whenInitialized(function() {
        var desc = sw.newAudioDescriptor();
        sw.loadSound("piano_Ab4.mp3", function(err, sound) {
          if (err) return console.error(err);
          var player = sw.newAudioPlayer();
          var s1 = sw.newSoundSource(sound);
          var s2 = sw.newResamplingFilter(s1, 1.5);
          var s3 = sw.newResamplingFilter(s2, 1.5);
          var s4 = sw.newResamplingFilter(s2, 5/3);
          var seq = sw.newListPerformance();
          seq.addSourceAt(0, s1);
          seq.addSourceAt(0.1, s2);
          seq.addSourceAt(0.2, s3);
          seq.addSourceAt(0.3, s4);
          var perf = sw.newAudioPerformer(seq, desc);
          var perf2 = perf.clone();
          player.play(perf);
        })
      })
    })

Compare this to an example from the StandingWave3 documentation itself,
and you can see that the spirit of the API is maintained perfectly
(just with a couple fewer spaces).

    // Create an ascending sequence of three sine tones: A3, E4, A4
    // whose start times are separated by exactly 1 second.
    var sequence:ListPerformance = new ListPerformance();
    sequence.addSourceAt(0, new SineSource(new AudioDescriptor(), 0.1, 440));
    sequence.addSourceAt(1, new SineSource(new AudioDescriptor(), 0.1, 660));
    sequence.addSourceAt(2, new SineSource(new AudioDescriptor(), 0.1, 880));
    // Play it back.
    var source:IAudioSource = new AudioPerformer(sequence);
    player.play(source);

# Running the Example

Due to local file sandboxing, you won't be able to just double-click on 
index.html. Instead, download Node.js, install the server dependencies with
`npm install`, and browse to `localhost:8000`.

# Using the Library

The `standingwavejs.swf` SWF should be embedded in the page, either using
SWFObject or some other method; FABridge has been patched to allow for this.

The `standingwavejs.js` script can be included in the page directly,
in which case it exposes `window.sw` as its namespace. You can inspect
this object in your browser console to see the API, but it largely follows
[the Flash API](http://maxl0rd.github.com/standingwave3/asdoc/index.html).

Alternately, StandingWaveJS will integrate with packages such as
[Browserify](https://github.com/substack/node-browserify),
which use the NPM package manager to bundle dependencies.
If such a bundler is used, and `module` is defined globally,
then `module.exports` will be set to the namespace, and `window.sw` will
not be touched. A wrapped version of FABridge is bundled with this script
so that the correct internal globals are registered; however, at the moment,
it will not play nicely with other FABridge-powered wrappers.

Some gotchas:

- Occasionally, Javascript errors will be eaten by the Flash ExternalInterface
mechanism, and Javascript callbacks will just return silently in the middle
of their execution. To make your debugging a bit saner, wrap your closures
in try/catch blocks that print the errors.

- If an error is printed with a numeric error number, just Google the number
and "flash error" to see what it means.

# Recompiling the Library

Change the first line of the Makefile to point to an installed Flex SDK,
and you should be able to `make all` to regenerate those two files.

# About

Original library by Max Lord and Joe Berkovitz.

Wrapper by Brenton Partridge, as a very small part of something that
will change the music game... but you're going to need to wait to learn
about that!

MIT license.
