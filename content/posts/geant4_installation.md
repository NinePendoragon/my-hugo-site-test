+++
title = "通过源码安装Geant4"
tags = ["Geant4"]
date = "2025-06-21"
+++

今天拿我师兄的Geant4模拟在mac运行又运行不了了，折腾后发现似乎要重装Geant4。虽然Geant4我不会用，但是安装Geant4我还是蛮有经验的！我在ubuntu、arch、mac上都多次安装过Geant4，所以趁这个机会，就把安装Geant4作为我的第一篇帖子吧。

## 官方教程
我是计算机小白，如果有想将这篇帖子作为教程来安装Geant4的话还是有很大的风险的，所以还是以官方教程为准，这里说点题外话，我在折腾arch的时候，每次遇到问题去问师兄A，他会让我去查arch的wiki，去问师兄B，他会让我去问ai，我现在每次想问他们问题的时候，都会选择直接去问ai还有查wiki了，所以大家也要养成自己查wiki的好习惯！有很多问题其实仔细查阅wiki都能自己解决的。现在的ai很强大了，就算wiki上查不到，去问ai也是可以解决大部分问题的，当然这些都是我根据个人经验来看是这样的。不过上面提到的两个师兄人其实是非常好的，只能说他们让我体会到什么叫作”授人以鱼不如授人以渔“。

打开Geant4官网[https://geant4.web.cern.ch/](https://geant4.web.cern.ch/)，选择Docs项，![Geant4主页](/geant4/geant4.jpg "Geant4主页")

然后选择[Installation Guide](https://geant4-userdoc.web.cern.ch/UsersGuides/InstallationGuide/html/index.html)，![docs](/geant4/docs.png "docs")

这里就是如何安装Geant4的官方教程。![installation](/geant4/installationGuide.png "installation")

## MacOS
### 踩坑
先在官网下载源码和所有DATA文件，mac上面我下载下来的文件名字是"Darwin-clang17.0.0-Sequoia.tar.gz"，根据官方教程第一步是解压这个文件到想要的位置。先在主目录下新建一个文件夹，然后解压，在终端中输入下面的命令。
```zsh
cd 
mkdir Geant4
cd Geant4
tar -xzf ~/Downloads/Darwin-clang17.0.0-Sequoia.tar.gz
```
第二步是新建一个build文件夹并且进入，然后运行cmake，我顺便再新建一下install文件夹，接着上面的命令继续输入，不要退出终端。
```zsh
mkdir G4_install G4_build
cd G4_build
cmake -DCMAKE_INSTALL_PREFIX=~/Geant4/G4_install ~/Geant4/Geant4-11.3.2-Darwin
```
报错如下。
```zsh
CMake Warning:
  Ignoring extra path from command line:

   "/Users/ninependoragon/Geant4/Geant4-11.3.2-Darwin"


CMake Error: The source directory "/Users/ninependoragon/Geant4/Geant4-11.3.2-Darwin" does not appear to contain CMakeLists.txt.
Specify --help for usage, or press the help button on the CMake GUI.
ninependoragon@Nines-MacBook-Pro G4_build % 
```
复制下来去问ai，结果发现是我下错源码了，我下载错成Binary releases了。。。
OK，下载好源码之后重新跑一遍上面的代码。
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % cd ..  
ninependoragon@Nines-MacBook-Pro Geant4 % ls
G4_build		G4_install		Geant4-11.3.2-Darwin
ninependoragon@Nines-MacBook-Pro Geant4 % rm -rf Geant4-11.3.2-Darwin 
ninependoragon@Nines-MacBook-Pro Geant4 % cd G4_build 
ninependoragon@Nines-MacBook-Pro G4_build % tar ~/Downloads/geant4-v11.3.2.tar 
Usage:
  List:    tar -tf <archive-filename>
  Extract: tar -xf <archive-filename>
  Create:  tar -cf <archive-filename> [filenames...]
  Help:    tar --help
```
似乎是tar没加-xf，但是上面为什么是接-xzf，直接问ai。z是gzip，因为上面解压的文件有后缀.gz，但是如果有后缀.gz，不用-xzf就不能解压吗？
我回头试了一下```tar -xf ~/Downloads/Darwin-clang17.0.0-Sequoia.tar.gz```，然而还是可以解压。ChatGPT告诉我我的tar是智能版，可以自动调用gzip解压，不知道有没有在骗我。回到正题。
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % cd ..
ninependoragon@Nines-MacBook-Pro Geant4 % ls
G4_build	G4_install
```
Geant4-11.3.2-Darwin我已经删除，这里我用ls检查一下有没有删掉。
```zsh
ninependoragon@Nines-MacBook-Pro Geant4 % tar -xf ~/Downloads/geant4-v11.3.2.tar
ninependoragon@Nines-MacBook-Pro Geant4 % ls
G4_build	G4_install	geant4-v11.3.2
ninependoragon@Nines-MacBook-Pro Geant4 % cd G4_build 
ninependoragon@Nines-MacBook-Pro G4_build % cmake -DCMAKE_INSTALL_PREFIX=~/Geant4/G4_install ~/Geant4/geant4-v11.3.2
-- The C compiler identification is AppleClang 15.0.0.15000309
-- The CXX compiler identification is AppleClang 15.0.0.15000309
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Checking C++ feature CXXSTDLIB_FILESYSTEM_NATIVE - Success
-- Performing Test HAVE_TLS
-- Performing Test HAVE_TLS - Success
-- Found EXPAT: /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX14.5.sdk/usr/lib/libexpat.tbd (found version "2.5.0")
-- Pre-configuring dataset G4NDL (4.7.1)
-- Pre-configuring dataset G4EMLOW (8.6.1)
-- Pre-configuring dataset PhotonEvaporation (6.1)
-- Pre-configuring dataset RadioactiveDecay (6.1.2)
-- Pre-configuring dataset G4PARTICLEXS (4.1)
-- Pre-configuring dataset G4PII (1.3)
-- Pre-configuring dataset RealSurface (2.2)
-- Pre-configuring dataset G4SAIDDATA (2.0)
-- Pre-configuring dataset G4ABLA (3.3)
-- Pre-configuring dataset G4INCL (1.2)
-- Pre-configuring dataset G4ENSDFSTATE (3.0)
-- Pre-configuring dataset G4CHANNELING (1.0)
  *WARNING*
    Geant4 has been pre-configured to look for datasets
    in the directory:
 
    /Users/ninependoragon/Geant4/G4_install/share/Geant4/data
 
    but the following datasets are NOT present on disk at
    that location:
 
    G4NDL (4.7.1)
    G4EMLOW (8.6.1)
    PhotonEvaporation (6.1)
    RadioactiveDecay (6.1.2)
    G4PARTICLEXS (4.1)
    G4PII (1.3)
    RealSurface (2.2)
    G4SAIDDATA (2.0)
    G4ABLA (3.3)
    G4INCL (1.2)
    G4ENSDFSTATE (3.0)
    G4CHANNELING (1.0)
 
 -  If you have access to cvmfs, you can use standard datasets
    by reconfiguring with:
      cmake -DGEANT4_INSTALL_DATADIR=/cvmfs/geant4.cern.ch/share/data <...>
    The variable can also be set in ccmake or cmake-gui.
 -  If you want to have these datasets installed by Geant4,
    simply re-run cmake with GEANT4_INSTALL_DATA=ON. This will
    configure the build to download and install these datasets for you.
    For example, use:
      cmake -DGEANT4_INSTALL_DATA=ON <otherargs>
 
    If you're running on a Windows system, this is the best
    solution as CMake will unpack the datasets for you
    without any further software being required
 
 -  Alternatively, you can install these datasets manually
    now or after you have installed Geant4. To do this,
    download the following files:
 
    https://cern.ch/geant4-data/datasets/G4NDL.4.7.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4EMLOW.8.6.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4PhotonEvaporation.6.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4RadioactiveDecay.6.1.2.tar.gz
    https://cern.ch/geant4-data/datasets/G4PARTICLEXS.4.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4PII.1.3.tar.gz
    https://cern.ch/geant4-data/datasets/G4RealSurface.2.2.tar.gz
    https://cern.ch/geant4-data/datasets/G4SAIDDATA.2.0.tar.gz
    https://cern.ch/geant4-data/datasets/G4ABLA.3.3.tar.gz
    https://cern.ch/geant4-data/datasets/G4INCL.1.2.tar.gz
    https://cern.ch/geant4-data/datasets/G4ENSDFSTATE.3.0.tar.gz
    https://cern.ch/geant4-data/datasets/G4CHANNELING.1.0.tar.gz
 
    and unpack them under the directory:
 
    /Users/ninependoragon/Geant4/G4_install/share/Geant4/data
 
    As we supply the datasets packed in gzipped tar files,
    you will need the 'tar' utility to unpack them.
 
    Nota bene: Missing datasets will not affect or break
               compilation and installation of the Geant4
               libraries.
 
-- Looking for sys/types.h
-- Looking for sys/types.h - found
-- Looking for stdint.h
-- Looking for stdint.h - found
-- Looking for stddef.h
-- Looking for stddef.h - found
-- Check size of off64_t
-- Check size of off64_t - failed
-- Looking for fseeko
-- Looking for fseeko - found
-- Looking for unistd.h
-- Looking for unistd.h - found
-- Performing Test G4ZLIB_NEEDS_DNP
-- Performing Test G4ZLIB_NEEDS_DNP - Success
-- Building PTL with option BUILD_STATIC_LIBS - OFF
-- Building PTL with option BUILD_SHARED_LIBS - ON
-- Building PTL with option BUILD_OBJECT_LIBS - 
-- Building PTL with CMAKE_CXX_STANDARD - 17
-- Building PTL with option PTL_USE_COVERAGE - 
-- Building PTL with option PTL_USE_SANITIZER - 
-- Building PTL with option PTL_USE_CLANG_TIDY - 
-- Building PTL with option PTL_USE_TBB - OFF
-- Building PTL with option PTL_USE_LOCKS - OFF
-- Building PTL with option PTL_INSTALL_HEADERS - ON
-- Building PTL with option PTL_INSTALL_CONFIG - ON
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
-- Found Threads: TRUE
-- The following Geant4 features are enabled:
CMAKE_CXX_STANDARD: Compiling against C++ Standard '17'
GEANT4_BUILD_MULTITHREADED: Build multithread enabled libraries
GEANT4_BUILD_TLS_MODEL: Building with TLS model 'initial-exec'
GEANT4_USE_SYSTEM_EXPAT: Using system EXPAT library

-- Configuring done (2.6s)
-- Generating done (0.5s)
-- Build files have been written to: /Users/ninependoragon/Geant4/G4_build
```
这个报错和官方教程提到的一模一样，应该就是DATA文件缺失，DATA文件也是在官网的[Download](https://geant4.web.cern.ch/download/11.3.2.html)界面下载，我前面已经下载过了，按照教程，应该是需要解压到/Users/ninependoragon/Geant4/G4_install/share/Geant4/data文件夹下，/Users/ninependoragon路径中ninependoragon是我的用户名，如果真的有萌新跟着这篇帖子来安装Geant4的话，请注意把这个改成自己的用户名。不过我记得是得先make完之后再添加data文件。教程下一步是在cmake中激活Geant4的一些功能。
```zsh
cmake -DGEANT4_INSTALL_DATA=ON
```
这个功能是自动下载DATA文件，很久以前我第一次安装Geant4的时候好像有人告诉过我这个一般就选off关掉，当然默认是关掉。所以我没有运行上面的命令。
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % cmake -DGEANT4_INSTALL_DATA=OFF -DGEANT4_USE_GDML=ON -GEANT4_BUILD_MULTITHREADED=ON
CMake Error: Could not create named generator EANT4_BUILD_MULTITHREADED=ON

Generators
* Unix Makefiles               = Generates standard UNIX makefiles.
  Ninja                        = Generates build.ninja files.
  Ninja Multi-Config           = Generates build-<Config>.ninja files.
  Watcom WMake                 = Generates Watcom WMake makefiles.
  Xcode                        = Generate Xcode project files.
  CodeBlocks - Ninja           = Generates CodeBlocks project files
                                 (deprecated).
  CodeBlocks - Unix Makefiles  = Generates CodeBlocks project files
                                 (deprecated).
  CodeLite - Ninja             = Generates CodeLite project files
                                 (deprecated).
  CodeLite - Unix Makefiles    = Generates CodeLite project files
                                 (deprecated).
  Eclipse CDT4 - Ninja         = Generates Eclipse CDT 4.0 project files
                                 (deprecated).
  Eclipse CDT4 - Unix Makefiles= Generates Eclipse CDT 4.0 project files
                                 (deprecated).
  Kate - Ninja                 = Generates Kate project files (deprecated).
  Kate - Ninja Multi-Config    = Generates Kate project files (deprecated).
  Kate - Unix Makefiles        = Generates Kate project files (deprecated).
  Sublime Text 2 - Ninja       = Generates Sublime Text 2 project files
                                 (deprecated).
  Sublime Text 2 - Unix Makefiles
                               = Generates Sublime Text 2 project files
                                 (deprecated).

CMake Warning:
  No source or binary directory provided.  Both will be assumed to be the
  same as the current working directory, but note that this warning will
  become a fatal error in future CMake releases.
```
似乎没有cmake成功，删掉这个build文件夹重来试试。
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % cd ..
ninependoragon@Nines-MacBook-Pro Geant4 % rm -rf G4_build 
ninependoragon@Nines-MacBook-Pro Geant4 % mkdir G4_build
ninependoragon@Nines-MacBook-Pro Geant4 % cd G4_build 
```
不过删除之后我发现好像是刚刚命令行输错了，-GEANT4_BUILD_MULTITHREADED=ON少了个D。。。，上面的操作应该是没有问题的，想加什么功能就重新cmake -D 就好了

```zsh
ninependoragon@Nines-MacBook-Pro G4_build % cmake -DCMAKE_INSTALL_PREFIX=~/Geant4/G4_install -DGEANT4_INSTALL_DATA=OFF -DGEANT4_USE_GDML=ON -DGEANT4_BUILD_MULTITHREADED=ON ~/Geant4/geant4-v11.3.2
-- The C compiler identification is AppleClang 15.0.0.15000309
-- The CXX compiler identification is AppleClang 15.0.0.15000309
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Checking C++ feature CXXSTDLIB_FILESYSTEM_NATIVE - Success
-- Performing Test HAVE_TLS
-- Performing Test HAVE_TLS - Success
-- Found EXPAT: /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX14.5.sdk/usr/lib/libexpat.tbd (found version "2.5.0")
CMake Error at /opt/homebrew/Cellar/cmake/3.29.3/share/cmake/Modules/FindPackageHandleStandardArgs.cmake:230 (message):
  Failed to find XercesC (missing: XercesC_LIBRARY XercesC_INCLUDE_DIR
  XercesC_VERSION)
Call Stack (most recent call first):
  /opt/homebrew/Cellar/cmake/3.29.3/share/cmake/Modules/FindPackageHandleStandardArgs.cmake:600 (_FPHSA_FAILURE_MESSAGE)
  /opt/homebrew/Cellar/cmake/3.29.3/share/cmake/Modules/FindXercesC.cmake:112 (FIND_PACKAGE_HANDLE_STANDARD_ARGS)
  cmake/Modules/G4OptionalComponents.cmake:165 (find_package)
  cmake/Modules/G4CMakeMain.cmake:59 (include)
  CMakeLists.txt:49 (include)


-- Configuring incomplete, errors occurred!
```
其实我就是为了DGEANT4_USE_GDML才重新安装Geant4的，上次安装Geant4已经是两年前，源码那个时候不太懂所以应该是删掉了，不然重新cmake一下应该就行了。不过这里出现错误了，先复制给ai看看。“这是因为你开启了 -DGEANT4_USE_GDML=ON，Geant4 需要使用 Xerces-C++ 这个库来处理 GDML，但你本机没装这个库，或者 CMake 找不到它。”，那么就安装一个xerces-c吧。
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % brew install xerces-c
==> Downloading https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api/formul
==> Downloading https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api/cask.j
==> Fetching xerces-c
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/xerces-c-3.3.0.arm6
######################################################################### 100.0%
==> Pouring xerces-c-3.3.0.arm64_sonoma.bottle.tar.gz
🍺  /opt/homebrew/Cellar/xerces-c/3.3.0: 1,715 files, 39.0MB
==> Running `brew cleanup xerces-c`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
ninependoragon@Nines-MacBook-Pro G4_build % cmake -DCMAKE_INSTALL_PREFIX=~/Geant4/G4_install -DGEANT4_INSTALL_DATA=OFF -DGEANT4_USE_GDML=ON -DGEANT4_BUILD_MULTITHREADED=ON ~/Geant4/geant4-v11.3.2
-- Checking C++ feature CXXSTDLIB_FILESYSTEM_NATIVE - Success
-- Found XercesC: /opt/homebrew/lib/libxerces-c.dylib (found version "3.3.0")
-- Pre-configuring dataset G4NDL (4.7.1)
-- Pre-configuring dataset G4EMLOW (8.6.1)
-- Pre-configuring dataset PhotonEvaporation (6.1)
-- Pre-configuring dataset RadioactiveDecay (6.1.2)
-- Pre-configuring dataset G4PARTICLEXS (4.1)
-- Pre-configuring dataset G4PII (1.3)
-- Pre-configuring dataset RealSurface (2.2)
-- Pre-configuring dataset G4SAIDDATA (2.0)
-- Pre-configuring dataset G4ABLA (3.3)
-- Pre-configuring dataset G4INCL (1.2)
-- Pre-configuring dataset G4ENSDFSTATE (3.0)
-- Pre-configuring dataset G4CHANNELING (1.0)
  *WARNING*
    Geant4 has been pre-configured to look for datasets
    in the directory:
 
    /Users/ninependoragon/Geant4/G4_install/share/Geant4/data
 
    but the following datasets are NOT present on disk at
    that location:
 
    G4NDL (4.7.1)
    G4EMLOW (8.6.1)
    PhotonEvaporation (6.1)
    RadioactiveDecay (6.1.2)
    G4PARTICLEXS (4.1)
    G4PII (1.3)
    RealSurface (2.2)
    G4SAIDDATA (2.0)
    G4ABLA (3.3)
    G4INCL (1.2)
    G4ENSDFSTATE (3.0)
    G4CHANNELING (1.0)
 
 -  If you have access to cvmfs, you can use standard datasets
    by reconfiguring with:
      cmake -DGEANT4_INSTALL_DATADIR=/cvmfs/geant4.cern.ch/share/data <...>
    The variable can also be set in ccmake or cmake-gui.
 -  If you want to have these datasets installed by Geant4,
    simply re-run cmake with GEANT4_INSTALL_DATA=ON. This will
    configure the build to download and install these datasets for you.
    For example, use:
      cmake -DGEANT4_INSTALL_DATA=ON <otherargs>
 
    If you're running on a Windows system, this is the best
    solution as CMake will unpack the datasets for you
    without any further software being required
 
 -  Alternatively, you can install these datasets manually
    now or after you have installed Geant4. To do this,
    download the following files:
 
    https://cern.ch/geant4-data/datasets/G4NDL.4.7.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4EMLOW.8.6.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4PhotonEvaporation.6.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4RadioactiveDecay.6.1.2.tar.gz
    https://cern.ch/geant4-data/datasets/G4PARTICLEXS.4.1.tar.gz
    https://cern.ch/geant4-data/datasets/G4PII.1.3.tar.gz
    https://cern.ch/geant4-data/datasets/G4RealSurface.2.2.tar.gz
    https://cern.ch/geant4-data/datasets/G4SAIDDATA.2.0.tar.gz
    https://cern.ch/geant4-data/datasets/G4ABLA.3.3.tar.gz
    https://cern.ch/geant4-data/datasets/G4INCL.1.2.tar.gz
    https://cern.ch/geant4-data/datasets/G4ENSDFSTATE.3.0.tar.gz
    https://cern.ch/geant4-data/datasets/G4CHANNELING.1.0.tar.gz
 
    and unpack them under the directory:
 
    /Users/ninependoragon/Geant4/G4_install/share/Geant4/data
 
    As we supply the datasets packed in gzipped tar files,
    you will need the 'tar' utility to unpack them.
 
    Nota bene: Missing datasets will not affect or break
               compilation and installation of the Geant4
               libraries.
 
-- Looking for sys/types.h
-- Looking for sys/types.h - found
-- Looking for stdint.h
-- Looking for stdint.h - found
-- Looking for stddef.h
-- Looking for stddef.h - found
-- Check size of off64_t
-- Check size of off64_t - failed
-- Looking for fseeko
-- Looking for fseeko - found
-- Looking for unistd.h
-- Looking for unistd.h - found
-- Performing Test G4ZLIB_NEEDS_DNP
-- Performing Test G4ZLIB_NEEDS_DNP - Success
-- Building PTL with option BUILD_STATIC_LIBS - OFF
-- Building PTL with option BUILD_SHARED_LIBS - ON
-- Building PTL with option BUILD_OBJECT_LIBS - 
-- Building PTL with CMAKE_CXX_STANDARD - 17
-- Building PTL with option PTL_USE_COVERAGE - 
-- Building PTL with option PTL_USE_SANITIZER - 
-- Building PTL with option PTL_USE_CLANG_TIDY - 
-- Building PTL with option PTL_USE_TBB - OFF
-- Building PTL with option PTL_USE_LOCKS - OFF
-- Building PTL with option PTL_INSTALL_HEADERS - ON
-- Building PTL with option PTL_INSTALL_CONFIG - ON
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
-- Found Threads: TRUE
-- The following Geant4 features are enabled:
CMAKE_CXX_STANDARD: Compiling against C++ Standard '17'
GEANT4_BUILD_MULTITHREADED: Build multithread enabled libraries
GEANT4_BUILD_TLS_MODEL: Building with TLS model 'initial-exec'
GEANT4_USE_SYSTEM_EXPAT: Using system EXPAT library
GEANT4_USE_GDML: Building Geant4 with GDML support

-- Configuring done (1.9s)
-- Generating done (0.5s)
-- Build files have been written to: /Users/ninependoragon/Geant4/G4_build
```
和之前差不多同样的输出。教程下一步是make。
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % make
```
然后就是等待。
```zsh
...
[ 88%] Building CXX object source/CMakeFiles/G4mctruth.dir/persistency/mctruth/src/G4VPHitsCollectionIO.cc.o
[ 88%] Linking CXX shared library ../BuildProducts/lib/libG4mctruth.dylib
ld: warning: search path '/opt/homebrew/Cellar/qt@5/5.15.13_1/lib:' not found
...
```
make过程中的报错，似乎是忘记安装qt5了。总之先继续下去吧，看能不能打开example B1。
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % make install
```
继续等待。完成安装后
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % cd ../G4_install/share/Geant4/
ninependoragon@Nines-MacBook-Pro Geant4 % mkidr data
ninependoragon@Nines-MacBook-Pro Geant4 % cp ~/Downloads/G4DATA/* ~/Geant4/G4_install/share/Geant4/data
cp: /Users/ninependoragon/Downloads/G4DATA/G4ABLA3.3 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4CHANNELING1.0 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4EMLOW8.6.1 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4ENSDFSTATE3.0 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4INCL1.2 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4NDL4.7.1 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4NUDEXLIB1.0 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4PARTICLEXS4.1 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4PII1.3 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4SAIDDATA2.0 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4TENDL1.4 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/G4URRPT1.1 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/PhotonEvaporation6.1 is a directory (not copied).
cp: /Users/ninependoragon/Downloads/G4DATA/RadioactiveDecay6.1.2 is a directory (not copied).
ninependoragon@Nines-MacBook-Pro Geant4 % cd data 
ninependoragon@Nines-MacBook-Pro data % ls
G4ABLA.3.3.tar.gz		G4PII.1.3.tar.gz
G4CHANNELING.1.0.tar.gz		G4PhotonEvaporation.6.1.tar.gz
G4EMLOW.8.6.1.tar.gz		G4RadioactiveDecay.6.1.2.tar.gz
G4ENSDFSTATE.3.0.tar.gz		G4RealSurface.2.2.tar(1).gz
G4INCL.1.2.tar.gz		G4SAIDDATA.2.0.tar.gz
G4NDL.4.7.1.tar.gz		G4TENDL.1.4.tar.gz
G4NUDEXLIB.1.0.tar.gz		G4URRPT.1.1.tar.gz
G4PARTICLEXS.4.1.tar.gz
ninependoragon@Nines-MacBook-Pro data % cd ~/Downloads/G4DATA 
ninependoragon@Nines-MacBook-Pro G4DATA % ls
G4ABLA.3.3.tar.gz		G4PII.1.3.tar.gz
G4CHANNELING.1.0.tar.gz		G4PhotonEvaporation.6.1.tar.gz
G4EMLOW.8.6.1.tar.gz		G4RadioactiveDecay.6.1.2.tar.gz
G4ENSDFSTATE.3.0.tar.gz		G4RealSurface.2.2.tar(1).gz
G4INCL.1.2.tar.gz		G4SAIDDATA.2.0.tar.gz
G4NDL.4.7.1.tar.gz		G4TENDL.1.4.tar.gz
G4NUDEXLIB.1.0.tar.gz		G4URRPT.1.1.tar.gz
G4PARTICLEXS.4.1.tar.gz
ninependoragon@Nines-MacBook-Pro G4DATA % tar -xf *.tar.gz ~/Geant4/G4_install 
tar: G4CHANNELING.1.0.tar.gz: Not found in archive
tar: G4EMLOW.8.6.1.tar.gz: Not found in archive
tar: G4ENSDFSTATE.3.0.tar.gz: Not found in archive
tar: G4INCL.1.2.tar.gz: Not found in archive
tar: G4NDL.4.7.1.tar.gz: Not found in archive
tar: G4NUDEXLIB.1.0.tar.gz: Not found in archive
tar: G4PARTICLEXS.4.1.tar.gz: Not found in archive
tar: G4PII.1.3.tar.gz: Not found in archive
tar: G4PhotonEvaporation.6.1.tar.gz: Not found in archive
tar: G4RadioactiveDecay.6.1.2.tar.gz: Not found in archive
tar: G4SAIDDATA.2.0.tar.gz: Not found in archive
tar: G4TENDL.1.4.tar.gz: Not found in archive
tar: G4URRPT.1.1.tar.gz: Not found in archive
tar: /Users/ninependoragon/Geant4/G4_install: Not found in archive
tar: Error exit delayed from previous errors.
```
我把下载的DATA文件全放在一个文件夹G4DATA中，本来以为可以tar一次性解压，但似乎不能用tar -xf *.tar.gz，在网上搜索之后发现可以用```for tar in *.tar.gz;  do tar xvf $tar; done```一次性解压多个tar.gz文件。
```zsh
ninependoragon@Nines-MacBook-Pro G4DATA % for tar in *.tar.gz;  do tar xvf $tar; done
```
运行完成之后，
```zsh
ninependoragon@Nines-MacBook-Pro G4DATA % ls
G4ABLA.3.3.tar.gz		G4PARTICLEXS4.1
G4ABLA3.3			G4PII.1.3.tar.gz
G4CHANNELING.1.0.tar.gz		G4PII1.3
G4CHANNELING1.0			G4PhotonEvaporation.6.1.tar.gz
G4EMLOW.8.6.1.tar.gz		G4RadioactiveDecay.6.1.2.tar.gz
G4EMLOW8.6.1			G4RealSurface.2.2.tar(1).gz
G4ENSDFSTATE.3.0.tar.gz		G4SAIDDATA.2.0.tar.gz
G4ENSDFSTATE3.0			G4SAIDDATA2.0
G4INCL.1.2.tar.gz		G4TENDL.1.4.tar.gz
G4INCL1.2			G4TENDL1.4
G4NDL.4.7.1.tar.gz		G4URRPT.1.1.tar.gz
G4NDL4.7.1			G4URRPT1.1
G4NUDEXLIB.1.0.tar.gz		PhotonEvaporation6.1
G4NUDEXLIB1.0			RadioactiveDecay6.1.2
G4PARTICLEXS.4.1.tar.gz
```
其实应该在Geant4的data目录下解压，
```zsh
ninependoragon@Nines-MacBook-Pro G4_build % cd ~/Geant4/G4_install/share/Geant4/data/
ninependoragon@Nines-MacBook-Pro data % for tar in *.tar.gz;  do tar xvf $tar; done
ninependoragon@Nines-MacBook-Pro data % rm *.tar.gz
ninependoragon@Nines-MacBook-Pro data % ls
G4ABLA3.3			G4PII1.3
G4CHANNELING1.0			G4RealSurface.2.2.tar(1).gz
G4EMLOW8.6.1			G4SAIDDATA2.0
G4ENSDFSTATE3.0			G4TENDL1.4
G4INCL1.2			G4URRPT1.1
G4NDL4.7.1			PhotonEvaporation6.1
G4NUDEXLIB1.0			RadioactiveDecay6.1.2
G4PARTICLEXS4.1
```
这样data数据应该就准备好了。现在看看example B1能不能运行。
```zsh
ninependoragon@Nines-MacBook-Pro data % cd ..
ninependoragon@Nines-MacBook-Pro Geant4 % ls
data		examples	fonts		geant4make	tools.license
ninependoragon@Nines-MacBook-Pro Geant4 % cd examples/basic/B1 
ninependoragon@Nines-MacBook-Pro B1 % mkdir build
ninependoragon@Nines-MacBook-Pro B1 % cd build 
ninependoragon@Nines-MacBook-Pro build % cmake ..
-- The C compiler identification is AppleClang 15.0.0.15000309
-- The CXX compiler identification is AppleClang 15.0.0.15000309
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Found EXPAT: /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX14.5.sdk/usr/lib/libexpat.tbd (found suitable version "2.5.0", minimum required is "2.5.0")
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
-- Found Threads: TRUE
-- Found OpenGL: /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX14.5.sdk/System/Library/Frameworks/OpenGL.framework
-- Found Geant4: /Users/ninependoragon/Documents/Geant4/install/lib/cmake/Geant4/Geant4Config.cmake (found version "11.1.2")
-- Configuring done (1.4s)
-- Generating done (0.0s)
-- Build files have been written to: /Users/ninependoragon/Geant4/G4_install/share/Geant4/examples/basic/B1/build
ninependoragon@Nines-MacBook-Pro build % make 
[ 12%] Building CXX object CMakeFiles/exampleB1.dir/exampleB1.cc.o
/Users/ninependoragon/Geant4/G4_install/share/Geant4/examples/basic/B1/exampleB1.cc:79:25: error: no matching constructor for initialization of 'G4VisExecutive'
  auto visManager = new G4VisExecutive(argc, argv);
                        ^              ~~~~~~~~~~
/Users/ninependoragon/Documents/Geant4/install/include/Geant4/G4VisExecutive.icc:126:17: note: candidate constructor not viable: allows at most single argument 'verbosityString', but 2 arguments were provided
G4VisExecutive::G4VisExecutive (const G4String& verbosityString):
                ^
/Users/ninependoragon/Documents/Geant4/install/include/Geant4/G4VisExecutive.hh:119:7: note: candidate constructor (the implicit copy constructor) not viable: requires 1 argument, but 2 were provided
class G4VisExecutive: public G4VisManager {
      ^
1 error generated.
make[2]: *** [CMakeFiles/exampleB1.dir/exampleB1.cc.o] Error 1
make[1]: *** [CMakeFiles/exampleB1.dir/all] Error 2
make: *** [all] Error 2
```
报错与可视化有关，可能是因为没安装qt5，但是我在思考，为什么我的旧的Geant4可以运行。也有可能是环境变量的问题，先设置一下变量再看看。
```zsh
ninependoragon@Nines-MacBook-Pro ~ % nano .zshrc 
```
看一眼zshrc的配置文件
```go {linenos=inline}
export PATH=/opt/homebrew/opt/qt@5/bin:$PATH
export LDFLAGS="-L/opt/homebrew/Cellar/qt@5/5.15.13_1/lib":$LDFLAGS
export CPPFLAGS="-I/opt/homebrew/Cellar/qt@5/5.15.13_1/include":$CPPFLAGS
export PKG_CONFIG_PATH=/opt/homebrew/Cellar/qt/6.7.0_1/lib/pkgconfig:$PKG_CONFI$


source ~/Documents/Geant4/install/bin/geant4.sh

alias g4camke='cmake -DGant4_DIR=~/Documents/Geant4/install/lib/cmake/Geant4/'
```
可以看见是有qt5的，可是Geant4的环境变量没有修改。先修改环境变量试试。
```go {linenos=inline}
export PATH=/opt/homebrew/opt/qt@5/bin:$PATH
export LDFLAGS="-L/opt/homebrew/Cellar/qt@5/5.15.13_1/lib":$LDFLAGS
export CPPFLAGS="-I/opt/homebrew/Cellar/qt@5/5.15.13_1/include":$CPPFLAGS
export PKG_CONFIG_PATH=/opt/homebrew/Cellar/qt/6.7.0_1/lib/pkgconfig:$PKG_CONFI$


source ~//Geant4/G4_install/bin/geant4.sh

alias g4camke='cmake -DGant4_DIR=~/Geant4/G4_install/lib/cmake/Geant4/'
```
control x 退出，y 回车两次保存。
```zsh
ninependoragon@Nines-MacBook-Pro B1 % mkdir build2
ninependoragon@Nines-MacBook-Pro B1 % cd build2
ninependoragon@Nines-MacBook-Pro build2 % cmake ../
ninependoragon@Nines-MacBook-Pro build2 % make
[ 12%] Building CXX object CMakeFiles/exampleB1.dir/exampleB1.cc.o
/Users/ninependoragon/Geant4/G4_install/share/Geant4/examples/basic/B1/exampleB1.cc:79:25: error: no matching constructor for initialization of 'G4VisExecutive'
  auto visManager = new G4VisExecutive(argc, argv);
                        ^              ~~~~~~~~~~
/Users/ninependoragon/Documents/Geant4/install/include/Geant4/G4VisExecutive.icc:126:17: note: candidate constructor not viable: allows at most single argument 'verbosityString', but 2 arguments were provided
G4VisExecutive::G4VisExecutive (const G4String& verbosityString):
                ^
/Users/ninependoragon/Documents/Geant4/install/include/Geant4/G4VisExecutive.hh:119:7: note: candidate constructor (the implicit copy constructor) not viable: requires 1 argument, but 2 were provided
class G4VisExecutive: public G4VisManager {
      ^
1 error generated.
make[2]: *** [CMakeFiles/exampleB1.dir/exampleB1.cc.o] Error 1
make[1]: *** [CMakeFiles/exampleB1.dir/all] Error 2
make: *** [all] Error 2
```
还是报错，回头发现配置文件写错了，多写了个/。
```zsh
ninependoragon@Nines-MacBook-Pro B1 % mkdir build3
ninependoragon@Nines-MacBook-Pro B1 % cd build3 
ninependoragon@Nines-MacBook-Pro build3 % source ~/Geant4/G4_install/bin/geant4.sh 
ninependoragon@Nines-MacBook-Pro build3 % cmake ..
ninependoragon@Nines-MacBook-Pro build3 % make 
[ 12%] Building CXX object CMakeFiles/exampleB1.dir/exampleB1.cc.o
[ 25%] Building CXX object CMakeFiles/exampleB1.dir/src/ActionInitialization.cc.o
[ 37%] Building CXX object CMakeFiles/exampleB1.dir/src/DetectorConstruction.cc.o
[ 50%] Building CXX object CMakeFiles/exampleB1.dir/src/EventAction.cc.o
[ 62%] Building CXX object CMakeFiles/exampleB1.dir/src/PrimaryGeneratorAction.cc.o
[ 75%] Building CXX object CMakeFiles/exampleB1.dir/src/RunAction.cc.o
[ 87%] Building CXX object CMakeFiles/exampleB1.dir/src/SteppingAction.cc.o
[100%] Linking CXX executable exampleB1
ld: warning: search path '/opt/homebrew/Cellar/qt@5/5.15.13_1/lib:' not found
[100%] Built target exampleB1
ninependoragon@Nines-MacBook-Pro build3 % ./exampleB1 
```
并没有出现可视化窗口，然后才注意到刚刚的报错，还是没找到qt5，但是我这台电脑应该是有qt5的，
```zsh
ninependoragon@Nines-MacBook-Pro build3 % ls /opt/homebrew/Cellar/qt@5/5.15.13_1/
Frameworks			doc
INSTALL_RECEIPT.json		include
LICENSE.FDL			lib
LICENSE.GPL3-EXCEPT		libexec
LICENSE.GPLv2			mkspecs
LICENSE.GPLv3			phrasebooks
LICENSE.LGPLv21			plugins
LICENSE.LGPLv3			qml
LICENSE.QT-LICENSE-AGREEMENT	share
README				translations
bin
```
发现是有这个目录的，但是打不开，还是环境变量问题。听ai的修改成：
```go {linenos=inline}
#export PATH=/opt/homebrew/opt/qt@5/bin:$PATH
#export LDFLAGS="-L/opt/homebrew/Cellar/qt@5/5.15.13_1/lib":$LDFLAGS
#export CPPFLAGS="-I/opt/homebrew/Cellar/qt@5/5.15.13_1/include":$CPPFLAGS
#export PKG_CONFIG_PATH=/opt/homebrew/Cellar/qt/6.7.0_1/lib/pkgconfig:$PKG_CONF$

export PATH=/opt/homebrew/opt/qt@5/bin:$PATH
export LDFLAGS="-L/opt/homebrew/opt/qt@5/lib $LDFLAGS"
export CPPFLAGS="-I/opt/homebrew/opt/qt@5/include $CPPFLAGS"
export PKG_CONFIG_PATH=/opt/homebrew/opt/qt@5/lib/pkgconfig:$PKG_CONFIG_PATH


source ~/Geant4/G4_install/bin/geant4.sh

alias g4camke='cmake -DGant4_DIR=~/Geant4/G4_install/lib/cmake/Geant4/'
```
然后
```zsh 
source ~/.zshrc
```
再次make example B1结果还是不行。

搜到一篇帖子说G4不支持在zsh中执行，只能bash中执行，我先看看我的.bashrc。
```go {linenos=inline}
export PATH=/opt/homebrew/Cellar/qt/6.5.1_2/bin:$PATH
export LDFLAGS="-L/opt/homebrew/Cellar/qt/6.5.1_2/lib":$LDFLAGS
export CPPFLAGS="-I/opt/homebrew/Cellar/qt/6.5.1_2/include":$CPPFLAGS
export PKG_CONFIG_PATH=/opt/homebrew/Cellar/qt/6.5.1_2/lib/pkgconfig:$PKG_CONFI$

export CMAKE_PREFIX_PATH=/opt/homebrew/Cellar/qt@5/5.15.10/

source /Users/ninependoragon/Documents/Geant4/install/bin/geant4.sh
```
修改一下，
```go {linenos=inline}
export PATH=/opt/homebrew/Cellar/qt/6.5.1_2/bin:$PATH
export LDFLAGS="-L/opt/homebrew/Cellar/qt/6.5.1_2/lib":$LDFLAGS
export CPPFLAGS="-I/opt/homebrew/Cellar/qt/6.5.1_2/include":$CPPFLAGS
export PKG_CONFIG_PATH=/opt/homebrew/Cellar/qt/6.5.1_2/lib/pkgconfig:$PKG_CONFI$

export CMAKE_PREFIX_PATH=/opt/homebrew/Cellar/qt@5/5.15.10/

source /Users/ninependoragon/Geant4/G4_install/bin/geant4.sh
```
修改之后运行还是不对，而且我记得两年前我用zsh运行过example B1。



明天再写吧 累了 踩坑写完后给个总结我会放在最前面