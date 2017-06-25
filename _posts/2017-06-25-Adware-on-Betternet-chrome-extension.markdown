---
layout: post
title:  Adware on Betternet chrome extension
category: technical 
description: 
---

Sometime when clicking to any urls on internet, chrome redirects to ads sites like [http://eltrack.pro/azkzkyvodi](http://eltrack.pro/azkzkyvodi) or something like this. Also see `pornographic ads` on new tab

- Mac OS Sierra 10.12.5 (16F73)
- Chrome Version 59.0.3071.109 (Official Build) (64-bit)

> TL;DR: Remove Betternet out of chrome

![](/assets/img/betternet-adware-links.png)

<!--description-->

## Steps to debug and figure out adware
**Step 1.** Hold ads site on tab, don't close it because it's hard to find logs later

**Step 2.** Open **Chrome DevTools**, go to `console` tab

**Step 3.** I saw chrome has some unknown logs from `insertion.js:189`, comes from extension with ID = `gjknjjomckknofjidppipffbpoekiipm`

![](/assets/img/betternet-adware-logs.png)

**Step 4.** Goto [chrome://extensions/](chrome://extensions/) and find `gjknjjomckknofjidppipffbpoekiipm`, it's **betternet**

**Step 5.** Figure out more, google search with term "betternet extension adware", here is best write-up about this [https://restoreprivacy.com/betternet-review/](https://restoreprivacy.com/betternet-review/)

![](/assets/img/betternet-adware.png)

**Step 6.** Expand source of [http://eltrack.pro](http://eltrack.pro)
- My browser is redirected/injected to a fucking FB campaign, **Pixel ID** = `1666009176948198`

    ```html
    <!-- Facebook Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function()
    {n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}
    ;if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1666009176948198'); // Insert your pixel ID here.
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1666009176948198&ev=PageView&noscript=1"
    /></noscript>
    <!-- DO NOT MODIFY -->
    <!-- End Facebook Pixel Code -->
    ```

- This url `tintuc-vn.com` in source of ads site

    ```sql
    ❯❯ nslookup tintuc-vn.com
    Server:		8.8.8.8
    Address:	8.8.8.8#53

    Non-authoritative answer:
    Name:	tintuc-vn.com
    Address: 136.243.94.239
    ```

- whois this domain: [https://whois.icann.org/en/lookup?name=tintuc-vn.com](https://whois.icann.org/en/lookup?name=tintuc-vn.com)

- which ports are opened?

    ```sql
    ❯❯ sudo nmap 136.243.94.239
    Password:

    Starting Nmap 7.40 ( https://nmap.org ) at 2017-06-25 16:58 +07
    Nmap scan report for static.239.94.243.136.clients.your-server.de (136.243.94.239)
    Host is up (0.53s latency).
    Not shown: 987 closed ports
    PORT     STATE SERVICE
    21/tcp   open  ftp
    22/tcp   open  ssh
    25/tcp   open  smtp
    53/tcp   open  domain
    80/tcp   open  http
    106/tcp  open  pop3pw
    110/tcp  open  pop3
    143/tcp  open  imap
    443/tcp  open  https
    465/tcp  open  smtps
    993/tcp  open  imaps
    995/tcp  open  pop3s
    8443/tcp open  https-alt

    Nmap done: 1 IP address (1 host up) scanned in 60.24 seconds
    ```

## What should I do?
- Remove this Betternet chrome extension
- Report to google