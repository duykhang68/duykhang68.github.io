---
layout: post
title:  Debian on android shell
category: technical
description: fully debian stretch 9 on android with root permission and busybox utilities via twrp and debootstrap
---

**Goal**: I had one old Android phone, with broken touching/gesture layer. One day, I found it on a dirty old place.
* I wonder how can I make it better with more usability. 
* How can I make it work exactly as I needed.
* How can I transform this old phone to a super tiny linux machine with interactive shell?

```
Device: xiaomi Mi4W LTE, android 6.0.1 MMB29M
Specs: Qualcomm MSM8974PRO-AC Quad-core max 2.5GHz, 3.00 GB memory, 16GB disk
Kernel: 3.4.0-gf4b741d-00690-gc8911e
Arch: armv7l
```

![](/assets/img/android-shell.webp)

<!--description-->

## A. Knowledge base

For accessing default android shell, we need `adb` tools. For booting operation with custom image, we use `fastboot` or `adb reboot recovery`.
After accessing, with `twrp` and `supersu` we can grant `root` privileges because we need root permission for doing `mount` filesystem and totally control the whole system.

We also need `busybox` for expanding utilities like editing files by `vi`, checking network connection, ...
It's done for controlling android via `adb shell`, but currently, linux os on android is designed for mobile, apk applications, everyday carry and easy to use for all kinds of users, also it's not using any kind of package management like `apt` or `yum`, I nearly can do nothing on current system.

From devops/sre point of view, all I want is pushing/booting a fully `linux` os to my android, that's I can do more things on this, instead of limited android os.
I decided to use `debian stretch` with `debootrap` for extract custom image and init debian filesystem via `chroot` to current android `sdcard` directory.

## B. Hacking / Practicing zone

### 1. Install adb and fastboot tools on mac
```
mac❯❯ brew cask install android-platform-tools

mac❯❯ adb --version
Android Debug Bridge version 1.0.40
Version 4797878
Installed as /usr/local/bin/adb

mac❯❯ fastboot --version
fastboot version 28.0.0-4797878
Installed as /usr/local/bin/fastboot

# Connect android to mac via usb 
# Verify device

mac❯❯ adb devices -l
List of devices attached
1f703708  device usb:336592896X product:cancro_wc_lte model:MI_4W device:cancro transport_id:13
```

### 2. Download then install twrp & supersu on fastboot
```
mac❯❯ wget internet.com/SR5-SuperSU-v2.82-SR5-20171001224502.zip ./
mac❯❯ wget internet.com/twrp-3.1.0-0-cancro.img ./
mac❯❯ adb push ./SR5-SuperSU-v2.82-SR5-20171001224502.zip /storage/self/primary/
SR5-SuperSU-v2.82-SR5-20171001224502.zip: 1 file pushed. 5.8 MB/s (6882992 bytes in 1.127s)

mac❯❯ adb reboot bootloader

mac❯❯ fastboot devices
1f703708	fastboot

mac❯❯ fastboot flash recovery ./twrp-3.1.0-0-cancro.img
Sending 'recovery' (13682 KB)                      OKAY [  0.464s]
Writing 'recovery'                                 OKAY [  0.305s]
Finished. Total time: 0.772s

mac❯❯ fastboot boot ./twrp-3.1.0-0-cancro.img
Downloading 'boot.img'                             OKAY [  0.432s]
booting                                            OKAY [  0.119s]
Finished. Total time: 0.560s

# After booted into TWRP
# Install SR5-SuperSU-v2.82-SR5-20171001224502.zip from TWRP
# Do it on touch screen, or via twrp commandline

mac❯❯ adb shell 
android❯❯ twrp install /storage/self/primary/SR5-SuperSU-v2.82-SR5-20171001224502.zip
android❯❯ twrp wipe cache
android❯❯ reboot

# Verify root on device

mac❯❯ adb shell
shell@cancro:/ $ su -
root@cancro:/ # whoami
root
```

### 3. Expand utilities with busybox
```
mac❯❯ wget https://busybox.net/downloads/binaries/1.28.1-defconfig-multiarch/busybox-armv7l
mac❯❯ adb push busybox-armv7l /data/local/tmp
busybox-armv7l: 1 file pushed. 3.8 MB/s (1079156 bytes in 0.270s)

mac❯❯ adb shell
shell@cancro:/ $ su -
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

### 4. Config / fix env variables and configuations
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

### 5. Extract debian.img from available debian system (not BSD os like Mac)

Install debootstrap then bootstrapping debian stretch image for armv7l arch
```
debian❯❯ apt install -y debootstrap debian-archive-keyring debian-ports-archive-keyring
debian❯❯ mkdir debian-armhf
debian❯❯ cd debian-armhf/
debian❯❯ dd if=/dev/zero of=debian.img bs=1MiB count=2000
debian❯❯ mke2fs -F debian.img
debian❯❯ mkdir debian
debian❯❯ mount -o loop debian.img debian
debian❯❯ debootstrap --arch armhf --foreign --verbose stretch debian http://ftp.us.debian.org/debian
debian❯❯ umount debian
```

![large-img](/assets/img/debootstrap.webp "Extract debian filesystem via Debootstrap")

rsync file debian.img from debian system to mac system, then push this img to android
```
mac❯❯ adb push debian.img /sdcard/
```

### 6. Debootstrapping debian into android os
```
mac❯❯ adb shell

shell@cancro:/ $ su -
root@cancro:/ # mkdir /sdcard/debian-stretch9
root@cancro:/ # losetup /dev/block/loop99 /sdcard/debian.img
root@cancro:/ # mount /dev/block/loop99 /sdcard/debian-stretch9
root@cancro:/ # chroot /sdcard/debian-stretch9 /bin/bash

export PATH=/usr/bin:/usr/sbin:/bin:$PATH
export TERM=linux
export HOME=/root
export USER=root
/debootstrap/debootstrap --second-stage

echo "nameserver 8.8.8.8" >> /etc/resolv.conf
echo "127.0.0.1 localhost" > /etc/hosts
exit

mac❯❯ adb shell
shell@cancro:/ $ su -
root@cancro:/ # chroot /sdcard/debian-stretch9 /bin/su - root
root@localhost:~# whoami #should be root
root@localhost:~# cat /etc/debian_version #9.5
```

### 7. Complete debian os with apt and networking
From the first time, I cannot use `ping` or `apt`, because Android uses a special Kernel patch that's activated with `CONFIG_ANDROID_PARANOID_NETWORK`. 
For adding specific groups, this patch allows network access to system users that belong to certain special groups with hardcoded IDs.
```
mac❯❯ adb shell
shell@cancro:/ $ su -
root@cancro:/ # chroot /sdcard/debian-stretch9/ /bin/su - root

root@localhost:~# groupadd -g 3001 aid_bt
root@localhost:~# groupadd -g 3002 aid_bt_net
root@localhost:~# groupadd -g 3003 aid_inet
root@localhost:~# groupadd -g 3004 aid_net_raw
root@localhost:~# groupadd -g 3005 aid_admin
root@localhost:~# usermod -a -G aid_bt,aid_bt_net,aid_inet,aid_net_raw,aid_admin root
exit - relogin

root@localhost:~# grep -E "_apt" /etc/passwd
_apt:x:104:65534::/nonexistent:/bin/false

root@localhost:~# usermod -g 3003 _apt
root@localhost:~# grep -E "_apt" /etc/passwd
_apt:x:104:3003::/nonexistent:/bin/false

root@localhost:~# apt update
Ign:1 http://ftp.de.debian.org/pub/debian stable InRelease
Get:2 http://ftp.de.debian.org/pub/debian stable Release [118 kB]
...
Fetched 12.7 MB in 36s (351 kB/s)
Reading package lists... Done
Building dependency tree... Done
All packages are up to date.
```

### 8. Performance benchmarking  
...to be continue

## C. Reference
1. [TWRP fastboot](https://www.wikitechy.com/technology/how-to-root-and-install-twrp-recovery-on-xiaomi-mi4/)
2. [ADB shell environment](https://android.stackexchange.com/questions/53389/can-i-update-the-adb-shells-environment-variables)
3. [Mount /system RR](https://android.stackexchange.com/questions/110927/how-to-mount-system-rewritable-or-read-only-rw-ro)
4. [Busybox FAQ](https://busybox.net/FAQ.html)
5. [Debian on android](https://cryptojedi.org/misc/nexuss-debian.shtml)
6. [Chroot on android](https://stackoverflow.com/questions/36451444/what-can-cause-a-socket-permission-denied-error)
