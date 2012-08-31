MXMLC = "/Developer/Applications/Adobe Flash Builder 4.6/sdks/4.6.0/bin/mxmlc"

STANDINGWAVE_ROOT = vendor/standingwave3
STANDINGWAVE_SRC = $(STANDINGWAVE_ROOT)/sw3/src

ALCDIR = $(STANDINGWAVE_ROOT)/alchemy
ALCLIB = $(ALCDIR)/awave.swc

FABRIDGE_SRC = vendor/fabridge/src
FABRIDGE_AS = $(FABRIDGE_SRC)/bridge/FABridge.as
FABRIDGE_JS = $(FABRIDGE_SRC)/bridge/FABridge.js

SWFOBJECT_JS = vendor/swfobject/swfobject.js

JS_SOURCES = src/prefix.js $(FABRIDGE_JS) $(SWFOBJECT_JS) src/main.js src/suffix.js

OUTNAME = standingwavejs

all: swf js

swf: $(OUTNAME).swf

$(OUTNAME).swf: src/StandingWaveJS.as $(ALCLIB) $(FABRIDGE_AS)
	$(MXMLC) -compiler.include-libraries $(ALCLIB) \
		-compiler.source-path $(FABRIDGE_SRC) $(STANDINGWAVE_SRC) \
		-static-link-runtime-shared-libraries \
		-compiler.warn-bad-bool-assignment=false \
		-verbose-stacktraces \
		-output $@ \
		$<

js: $(OUTNAME).js

$(OUTNAME).js: $(JS_SOURCES)
	cat $+ > $@

clean:
	rm -f $(OUTNAME).js
	rm -f $(OUTNAME).swf
