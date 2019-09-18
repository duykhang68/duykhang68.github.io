---
layout: post
title: Jenkinsfuck
category: whatthefuck
description: at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.runTask(EatWhatYouKill.java:333)
---

![img](/assets/img/jenkins-oops.webp "EatWhatYouKill")

<!--description-->

```
Mar 01, 2019 11:19:14 AM org.eclipse.jetty.server.handler.ContextHandler$Context log
WARNING: Error while serving https://ci.tools.xxxxxx.io/job/live-xxxxxx/27/logText/progressiveHtml
java.lang.reflect.InvocationTargetException
    at org.kohsuke.stapler.Function$MethodFunction.invoke(Function.java:347)
    ...
    ...
    at org.eclipse.jetty.io.ChannelEndPoint$2.run(ChannelEndPoint.java:118)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.runTask(EatWhatYouKill.java:333)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.doProduce(EatWhatYouKill.java:310)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.tryProduce(EatWhatYouKill.java:168)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.run(EatWhatYouKill.java:126)
    at org.eclipse.jetty.util.thread.ReservedThreadExecutor$ReservedThread.run(ReservedThreadExecutor.java:366)
    ...
    ...
Caused by: java.lang.NegativeArraySizeException
    at hudson.console.ConsoleNote.readFrom(ConsoleNote.java:241)
    at hudson.console.ConsoleAnnotationOutputStream.eol(ConsoleAnnotationOutputStream.java:109)
    at hudson.console.LineTransformationOutputStream.eol(LineTransformationOutputStream.java:60)
```

## Root cause

Details of log: [jenkins-NegativeArraySizeException-error.log](/assets/raw/jenkins-NegativeArraySizeException-error.log) 
```java
public class NegativeArraySizeException
extends RuntimeException
```

Thrown if an application tries to create an array with negative size.

Output of this running job is: too big and spawn too fast **`rarely`** that reach `NegativeArraySize` during entire log workflow from
- ConsoleNote > ConsoleAnnotationOutputStream > FileLogStorage > ProxyOutputStream
- to doProgressText and until doProgressiveHtml

## Solution

EatWhatYouKill 

Don't panic, just wait, let them come then let them go. Wait until this fucking job DONE. Then issuse will....gone
