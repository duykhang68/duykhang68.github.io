---
layout: post
title: Struggling and auditing myself in 2019
category:
- mindset
description: Common failures and wrong thinking mindsets lead to fucked up
---

**Before you read**: 
- I write this post only for myself in devops & infrastructure context, not everyone's else issues. 
- And the whole thing could be very discrete, not closely related to each other.

## **FACTS**

1. I'm obsessed with keeping infrastructure up and finding better ways for commitments everyday. My mental health turns bad because of seeing fucking services/ops that **were built & done carelessly** without any sufficiently exhausting efforts, not only from others engineers, but also **from myself**.

2. In Devops/SRE scope, trying to adapt incoming tasks, solve problems by providing commonplace solution is...easy, it's get-shit-done inattentively, something is workaround, temporary. It's **EASY THINGS**, come with useless, low impact also very breakable. But **good things take time and efforts**. And the hard things make big impact.
  > As a good rule of thumb, proprietary technology must be at least 10 times better than its closest substitute in some important dimension to lead to a real monopolistic advantage. - Zero to One – Peter Thiel

<div style="max-width: 700px; vertical-align: middle; display: block; margin: auto;"><svg class="bar-chart"></svg></div>
<script src="https://cdn.jsdelivr.net/npm/chart.xkcd@1/dist/chart.xkcd.min.js"></script>
<script>
  const svg = document.querySelector('.bar-chart')

  new chartXkcd.Bar(svg, {
    title: 'RELATIVE BETWEEN VALUE & DOING THINGS',
    xLabel: 'THINGS',
    yLabel: 'TIME + EFFORTS + VALUES',
    data: {
      labels: ['EASY', 'NORMAL', 'HARD'],
      datasets: [{
        data: [10, 30, 100],
      }],
    },
    options: {
      yTickCount: 6,
      dataColors: ['gray', '#bbccdd', '#ff851b']
    },
  });
</script>


Well... at some points in my work-life, I realize that issues are not from the context, not from others. <a style="color:red;">**Mostly issues are from me**</a>, from my bad habits, bad thingking, bad mindsets. It makes me feel **shutting down**, **dumb**, **fucked-up** also with **getting lost**. I went down the wrong path many times, also got many bad results in 2019.

So...
- <a style="color:red;">**AM I UNRELIABLE?**</a>
- what's common failures that I was facing? Lesson learn?
- how can I make myself **not to go down the wrong path**?
- and how can I avoid stumbling blocks and feel better?


Clickable key points: [[rtfm]({% post_url 2019-12-20-Struggling-and-auditing-myself-in-2019 %}#1-read-the-fucking-manual-rtfm),
          [asking-why]({% post_url 2019-12-20-Struggling-and-auditing-myself-in-2019 %}#2-no-rushing),
          [fancy-title]({% post_url 2019-12-20-Struggling-and-auditing-myself-in-2019 %}#3-focus-on-fancy-job-titles),
          [stick-in-the-mud]({% post_url 2019-12-20-Struggling-and-auditing-myself-in-2019 %}#4-stick-in-the-mud),
          [fearfulness]({% post_url 2019-12-20-Struggling-and-auditing-myself-in-2019 %}#5-fearfulness)]

<!--description-->

## 1. **READ THE FUCKING MANUAL RTFM**
Cases:
  - cannot solve issues, cannot understand what's going on at this infra component
  - stuck with ambiguous logs, cannot finding rootcause, only do dirty workarounds... 

Stuck & feel tired **because having nothing to do next**. The common sense is when arriving at home, out of business hours, I still spend my time to continue investigating. **Kind of pointless works**. It's hard to say how can I survive, but I can confirm that mostly it's because of not spending time for reading documents. Instead of continue working & step towards the unknown, I re-audit myself and found some important things:  
  - **Docs are not written for fun**. It's all about knowledge & guidelines. 
  - Lack of knowledge and information will lead to nowhere.
  - Spend time for **reading docs attentively** is a must, for understanding all things clearly. 
  - Don't wait for collecting knowledge until facing issues. 

A strong knowledge base for making decisions is always better than unreasonable assumption.

## 2. **NO RUSHING** 

The case is after spending one working week entirely for a task with high sense of concentration, assume that my commitments will be good, mostly finish before the fucking deadline, ready for deploying & delivering to end-user, then... **everything after that is nonreliable**, unexpected, breakable and not important anymore. **Outcome = Zero**. Why? Why the fuck changes & happens? No, everything is fine, everything is normal and on track with persistency requirements. Issue here is **not clearly knowing goal** from the outset, because of **jumping to working immediately without any WHY**, without any concerns:
  - without any self-researching and wonder why do I need it? 
  - Why do I need to build it in that way, do I have any better ways?
  - Do I know exactly what they really want? (product owner, customers, end-user)
  - Does my solution fit with end-user problem?
  - Does my solution speed $$ less than the budget or overestimating?

Sometimes **just do it** is common sense, it's not wrong, because somehow I cannot spend time for understanding before doing. But not everything needs to be done immediately, no rushing. More multi-dimensional perspective could make a positive impact and lead to the right implementation, it seems to be better. 

## 3. **FOCUS ON FANCY JOB TITLES**

I was impressed by engineers with **fancy** title, something like: waooo, he's too young but having senior levels, how can I **do like this**? Looking at senior teammates, this kind of question always stuck in my mind for suck a long time, how can I reach to principal level, How can I write and share technical docs/blog-posts that having extremely deep & intense knowledge, How can I have such reputations on stackoverflow as his own, in many times, I consoled myself that because of senior/principal titles.

The truth is: concern, wonder and set goal to reach to higher levels is suck. Consoling is suck too. **If nothing changes, nothing changes**. Thinking too much is mostly a waste of time. By start working on solving hard problems that I scared before, by taking effort to solve unanswered questions or providing better answers on SO, I feel more energetic and well... at least I did something instead of always asking. It all begins with that first stepping up.

![img](/assets/img/so-reputation.png "Stackoverflow Reputation")

From the other side, otherwise, collecting a ton of metrics on worloads from engineer is **good for management board**. It supports us to have a clear and fair making decision on separating levels of Devops/SRE engineer, for adapting and building structures of benefit also with responsibility. Increasing level means **increasing salary/benefit** based on logged metrics & achievements are totally make sense. It's fine. I do not disagree 100% about evaluation, because recently by having a chance to work on Devops/SRE evaluation report, I found it really useful to determine the situation, to know what I really need to achieve higher level. But so far, it's only a checklist, a reference after all. 

## 4. **STICK-IN-THE-MUD**
My real cases:
  - stick with handling AWS on web console clicking, using only EC2 `t2.xxxx` type **for years**
  - solve perf issues on linux with **fixed viewpoint**, follow up with templated steps. Feel great when receiving outputs **as expected**. Kind of **micro skilled works**, thanks for practicing & developing during a long time.
  - bring experiences on old environment/company, **apply for new place**.
  - apply **learned techniques**:
    - on `BAREMETAL-base` for `VM-based`
    - on `VM-based` for `CONTAINER-based`
  - determine that there is **nothing to do** with this infrastructure this week, because **don't know what to do next**, or already did anything.
  - ... and so on.

I'm the guy who did all cases as above, **sometimes I feel proud of myself**, not because of any success I’ve achieved, but because I can **see myself growing up**, learn, practice and then apply. OK. Nothing wrong. 

> "The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn." -- Alvin Toffler

The truth is feeling good on micro skilled works is suck. There is always something needs to do, **there is always a better way of doing things**, for enhancing, improving. [Like Nokia](https://www.linkedin.com/pulse/nokia-ceo-ended-his-speech-saying-we-didnt-do-anything-rahul-gupta/): "we didn’t do anything wrong, but somehow, we lost". Live today in the same state as yesterday does not mean the same, it means lagging behind others. Because **nothing can take the place of persistence**. Any good thing can be wrong in different situations, not suitable anymore. 

The hard thing right here is not about learning, it's about how to detect & know **what can be unlearned**, what can be re-thinking, **rework**. Cannot unlearn, struggle with change, difficult to adapt will lead to fucked up. The world is descending into chaos. 

**Solutions (hard-to-do)**:
- when having a chance to add more steps on the old deployment that was built for 6 months ago ==> work on adding new steps first ==> **audit entire flow** ==> then adding some **refactoring instead of leaving it**.
- when operating an existing infra, the goal is not only cover the uptime of this but also **cover & collect feedback/disadvantage to make it evolve**.
- ... and so on.

==> **Utilizing** every chance, every opportunity for **seeking new challenges**.

## 5. **FEARFULNESS**
I know reading docs is good for myself, expand my knowledge base. I know that seeking challenges will help me grow up. I know that doing hard things will achieving high output & have big impact, but somehow I still refuse to do. **I know, but I don't do.**

There is always a reason behind everything:
  - Not everything is necessary [tentatively accept]
    * Out of scope, just don't care, stop putting efforts, ask talents when needed.
    * Closely related, but priority & situation define what & when I will spend time reading & learning.
  - Laziness, idleness from myself. FML. I have no solution at this time. [tentatively accept]
  - <a style="color:red;">**Fucking fearfulness**</a>
    * fear of doing hard things, afraid of hard stuff, fear because that technical point is too hard to learn
    * fear because it's edge case, fear & [struggle with changes]({% post_url 2019-12-20-Struggling-and-auditing-myself-in-2019 %}#4-stick-in-the-mud)
    * fear when working with legacy/unknow things, fear of doing it wrong, making mistakes, fear of receiving bad feedbacks from others
    * feel scared of being not good enough for new challenges, new upcoming things
    * ...

To be honest, fear is my close friend. Sometimes, I surprise myself that I fear more things than I think.
So how can I survive?
  - Until **there is nobody for delegating** anymore. It's becoming a **must thing** to do. **No one can help me** do this anymore, I need to do this by myself.
  - Until I found <a style="color:red;">**myself unable to accept fucking myself**</a> anymore. I feel sad because I missed many good opportunities to make it happens. Set goals 3 months ago, but have done nothing. Because I **realize that I cannot wait**, cannot ignore hard things anymore.
  - Until I'm in the zone. [In the zone](https://www.urbandictionary.com/define.php?term=In%20The%20Zone) means implies increased focus and attention which allow for higher levels of performance, your potential becomes more than what it is and anything around you becomes phased out seemingly a place where you can't be stopped or touched. [Work more when you’re in the zone]({% post_url 2017-03-12-habit-time-management %}). Relax when you’re not. By utilizing in the zone, <a style="color:green;">**"eager" is something more than "fear"**</a>.
 

## **CONCLUSION**

There’s nothing new under the sun. 

But I still wanna audit & write for myself, not about nothing new, it's about I wanna come to the end of the road of myself to see what it is.

## **REFERENCES & READ MORE**
- [Chín thói quen tệ hại cần loại bỏ](http://www.hvaonline.net/hvaonline/posts/list/0/42715.hva)
- [Dễ hoặc đúng](https://vnhacker.blogspot.com/2012/02/de-hoac-ung.html)
- [Tháp thành công](https://vnhacker.blogspot.com/2017/04/thap-thanh-cong.html)
- Some mindsets on [Làm an toàn thông tin thì học gì](https://vnhacker.blogspot.com/2012/05/lam-toan-thong-tin-thi-hoc-gi.html)


