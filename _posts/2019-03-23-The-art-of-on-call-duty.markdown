---
layout: post
title: The art of on-call duty
category: mindset, technical
description: responsibility for angthing we did, how to solve and improve after incidents
---

Being on-call means working/fixing live issues under high pressure and almost during midnight and/or weekend.
* **Taking strong responsibility** for what we work, for what we did, for what we build
* Uptime is an important metric, also critical to the success of our production.
* If our product is down, **we acutely feel our customer’s pain**
* Being on-call duty means we can **learn a lot from it**, for both technical knowledge & growing mindset. 
* Must get high paid for each on-call duty shift, because of stressful.

<iframe src="https://giphy.com/embed/NTur7XlVDUdqM" width="660" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
<!--description-->

## THE ART OF ON-CALL DUTY

Important points:
* Keep production services reliable and available
* Must have one of many dedicated teams of SREs that always take responsibility for the performance and reliability, also must have a **strong background** of system/infra/network and software development (because maybe need to inspect each line of code)
* **When you know you might get woken up in the middle of the night if there is a problem, you become more careful building infra, implementing components and testing.**
* Troubleshooting the system forces you to get a good understanding of **how it all works**
* Being on-call means we always facing with these internal issues like:
    - troubleshooting tools aren’t as good as they should be
    - false alarms, unreliable alarms
    - logs without useful information
    - have no way to backup/restore

=> **Improve our mindset** for making alerting/monitoring/logging system better during live issues, driving improvements

* Standard flow for on-call duty life cycle:

    0. **Build**: init monitoring & logging system that help us detect live failures before most customers notice a problem, set up a reliable alerting system (pagerduty) to make sure we can receive alerts immediately 
    1. **Prepare**: rotating SRE team member by shift to make sure we always have one person at least to take care production anytime, also covered with always ready machine/LTE/phone
    2. **Triage**: acknowledge (ack) on alerts whenever you can, determine the urgency of the problem
    3. **Fix**: take whatever actions are necessary in order to resolve the issue immediately and get production back to normal, including implement hotfix or even rollback to the last version. 
    4. **Report**: after fixing incident, need to file ticket/report for logging which issues, what we did for solving, file a JIRA ticket to keep a track and push more and more details into this, writing a postmortem (incident postmortem is an excellent framework for learning from incidents and turning problems into progress)
    5. **Follow-up & Improvement**: fixed issues & logged into specific tickets do not mean we're done with that, not yet. We must **take action to follow-up after incident**, how to **prevent these issues in the future**, improve sense of alerting, how can we backup/restore/rollback, how to make alarm more **precise, responsive, and sensitive**. At every step of follow-up/improvement, must write them down to central documentation.

## ROOT CAUSE

* If we only fix the symptoms (what we see on the surface), the problem will almost certainly return, and need fixing over, and over again
* So the Root cause means: 
    - What has caused the incident?
    - What’s the reason the system failed the way it did?
    - What's initiating cause that led to an outage or degradation in performance
    - If we know and identify the root cause, action can be taken to fix issues permanently
* In a technical way, root cause live issues can be covered into 3 groups
    - **Changes in the last deployment**: changes in codebase, changes in configurations, but not be tested carefully or not aware of hidden failures
    - **Exist at scale**: during high traffic, during unexpected traffic, bottle-neck or facing limitations of some important components
    - **3rd party issue**: hardware failure, provider/ISP failure, network down, 3rd API issues,...

## REFERENCE
1. https://henrikwarne.com/2018/12/03/developer-on-call/
2. https://www.intercom.com/blog/rapid-response-how-we-developed-an-on-call-team-at-intercom/
3. https://response.pagerduty.com/oncall/being_oncall/
4. https://landing.google.com/sre/sre-book/chapters/being-on-call/
5. https://www.atlassian.com/blog/statuspage/incident-postmortem-writing-tips
