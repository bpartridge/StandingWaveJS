StandingWaveJS
==============

Using the magic of FABridge, the API is kept nearly intact.
However, instead of using the `new` keyword to create objects, you can use
`SWJS.create(classname, arg0, arg1, arg2..)`, where `classname` is 
the non-prefixed class name as a string (as if you imported 
`com.noteflight.standingwave3.*.*`).

# AS3 Interface

Because non-serializable objects cannot be passed over the ExternalInterface,
most of the AS3 methods return handles
