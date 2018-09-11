---
layout: post
title:  Android shell
category: technical
description: shell on android with root and busybox
---

**Goal**: init and config my old android phone to super tiny linux machine with interactive shell.
```
Device: xiaomi Mi4W LTE, android 6.0.1 MMB29M
Specs: Quad-core max 2.5GHz, 3.00 GB memory, 16GB disk
Kernel: 3.4.0-gf4b741d-00690-gc8911e
Arch: armv7l
```

![](/assets/img/android-shell.png)

<!--description-->

## 1. Root device

Install **adb** and **fastboot** tools on mac
```
❯❯ brew cask install android-platform-tools

❯❯ adb --version
Android Debug Bridge version 1.0.40
Version 4797878
Installed as /usr/local/bin/adb

❯❯ fastboot --version
fastboot version 28.0.0-4797878
Installed as /usr/local/bin/fastboot

# Connect android to mac via usb 
# Verify device

❯❯ adb devices -l
List of devices attached
1f703708  device usb:336592896X product:cancro_wc_lte model:MI_4W device:cancro transport_id:13
```

Download then install **twrp** & **supersu** on **fastboot**
```
❯❯ wget internet.com/SR5-SuperSU-v2.82-SR5-20171001224502.zip ./
❯❯ wget internet.com/twrp-3.1.0-0-cancro.img ./

❯❯ adb push ./SR5-SuperSU-v2.82-SR5-20171001224502.zip /storage/self/primary/
SR5-SuperSU-v2.82-SR5-20171001224502.zip: 1 file pushed. 5.8 MB/s (6882992 bytes in 1.127s)

❯❯ adb reboot bootloader

❯❯ fastboot devices
1f703708	fastboot

❯❯ fastboot flash recovery ./twrp-3.1.0-0-cancro.img
Sending 'recovery' (13682 KB)                      OKAY [  0.464s]
Writing 'recovery'                                 OKAY [  0.305s]
Finished. Total time: 0.772s

❯❯ fastboot boot ./twrp-3.1.0-0-cancro.img
Downloading 'boot.img'                             OKAY [  0.432s]
booting                                            OKAY [  0.119s]
Finished. Total time: 0.560s

# Install SR5-SuperSU-v2.82-SR5-20171001224502.zip from TWRP
# Then reboot android
# Verify root on device

❯❯ adb shell
shell@cancro:/ $ su
root@cancro:/ #
```

## 2. Super user as root

Expand utilities with **busybox**

```
# Download & install busybox

❯❯ wget https://busybox.net/downloads/binaries/1.28.1-defconfig-multiarch/busybox-armv7l
❯❯ adb push busybox-armv7l /data/local/tmp
busybox-armv7l: 1 file pushed. 3.8 MB/s (1079156 bytes in 0.270s)

❯❯ adb shell
shell@cancro:/ $ su
root@cancro:/ # mkdir /data/busybox
root@cancro:/ # move /data/local/tmp/busybox-armv7l /data/busybox
root@cancro:/ # cd /data/busybox
root@cancro:/data/busybox # ls -l
-rwxrwxrwx shell    shell     1079156 2018-02-15 20:47 busybox-armv7l
root@cancro:/data/busybox # ./busybox-armv7l --install ./

# Use ls of busybox 
# instead of current ls on android

root@cancro:/ # which ls
/system/bin/ls

root@cancro:/ # export PATH=/data/busybox:$PATH
root@cancro:/ # which ls
/data/busybox/ls
root@cancro:/ # which vi
/data/busybox/vi
```

Config environment variables
```
# Choose one: (for security mount /system back to RO when finished)
# Mount system RW: mount -o rw,remount /system
# Mount system RO: mount -o ro,remount /system

root@cancro:/ # mount -o rw,remount /system
root@cancro:/ # vi /system/etc/mkshrc
...
export PATH=/data/busybox:$PATH
...
```

when facing with su command like this, we need reconfigure su
```
# Issue with su command

shell@cancro:/ $ su
su: must be suid to work properly

# Resolve

root@cancro:/ # cp /su/bin/su /data/busybox/su
root@cancro:/ # ls -lh /su/bin/su
-rwxr-xr-x    1 0        0          73.6K Sep 11 13:49 /su/bin/su
root@cancro:/ # ls -lh /data/busybox/su
-rwx------    1 0        0          73.6K Sep 11 15:58 /data/busybox/su
```



## Reference
1. [TWRP fastboot](https://www.wikitechy.com/technology/how-to-root-and-install-twrp-recovery-on-xiaomi-mi4/)
2. [ADB shell environment](https://android.stackexchange.com/questions/53389/can-i-update-the-adb-shells-environment-variables)
3. [Mount /system RR](https://android.stackexchange.com/questions/110927/how-to-mount-system-rewritable-or-read-only-rw-ro)
4. [Busybox FAQ](https://busybox.net/FAQ.html)
