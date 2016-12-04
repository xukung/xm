(function(root, undefined) {
    if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
            var T, A, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined")
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function")
            }
            if (thisArg) {
                T = thisArg
            }
            A = new Array(len);
            k = 0;
            while (k < len) {
                var kValue, mappedValue;
                if (k in O) {
                    kValue = O[k];
                    mappedValue = callback.call(T, kValue, k, O);
                    A[k] = mappedValue
                }
                k++
            }
            return A
        }
    }
    var detect = root.detect = function() {
        var _this = function() {};
        var regexes = {
            browser_parsers: [{
                regex: "^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii",
                family_replacement: "Wii",
                manufacturer: "Nintendo"
            },
            {
                regex: "(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Camino",
                other: true
            },
            {
                regex: "(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Pale Moon (Firefox Variant)",
                other: true
            },
            {
                regex: "(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                family_replacement: "Firefox Mobile"
            },
            {
                regex: "(Fennec)/(\\d+)\\.(\\d+)(pre)",
                family_replacment: "Firefox Mobile"
            },
            {
                regex: "(Fennec)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            },
            {
                regex: "Mobile.*(Firefox)/(\\d+)\\.(\\d+)",
                family_replacement: "Firefox Mobile"
            },
            {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)",
                family_replacement: "Firefox ($1)"
            },
            {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            },
            {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            },
            {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                family_replacement: "Firefox Alpha"
            },
            {
                regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                family_replacement: "Firefox Beta"
            },
            {
                regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?",
                family_replacement: "Firefox ($1)"
            },
            {
                regex: "(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "MicroB",
                tablet: true
            },
            {
                regex: "(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"
            },
            {
                regex: "(Flock)/(\\d+)\\.(\\d+)(b\\d+?)",
                family_replacement: "Flock",
                other: true
            },
            {
                regex: "(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Rockmelt",
                other: true
            },
            {
                regex: "(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            },
            {
                regex: "(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)",
                family_replacement: "Netscape"
            },
            {
                regex: "(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Netscape"
            },
            {
                regex: "(MyIBrow)/(\\d+)\\.(\\d+)",
                family_replacement: "My Internet Browser",
                other: true
            },
            {
                regex: "(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera Tablet",
                tablet: true
            },
            {
                regex: "(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mobile"
            },
            {
                regex: "Opera Mobi",
                family_replacement: "Opera Mobile"
            },
            {
                regex: "(Opera Mini)/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            },
            {
                regex: "(Opera Mini)/att/(\\d+)\\.(\\d+)",
                family_replacement: "Opera Mini"
            },
            {
                regex: "(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                family_replacement: "Opera"
            },
            {
                regex: "(webOSBrowser)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            },
            {
                regex: "(webOS)/(\\d+)\\.(\\d+)",
                family_replacement: "webOS"
            },
            {
                regex: "(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)",
                family_replacement: "webOS TouchPad"
            },
            {
                regex: "(luakit)",
                family_replacement: "LuaKit",
                other: true
            },
            {
                regex: "(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)",
                family_replacement: "Lightning",
                other: true
            },
            {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            },
            {
                regex: "(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)",
                family_replacement: "Swiftfox",
                other: true
            },
            {
                regex: "rekonq",
                family_replacement: "Rekonq",
                other: true
            },
            {
                regex: "(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                family_replacement: "Conkeror",
                other: true
            },
            {
                regex: "(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Konqueror",
                other: true
            },
            {
                regex: "(WeTab)-Browser",
                family_replacement: "WeTab",
                other: true
            },
            {
                regex: "(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Comodo Dragon",
                other: true
            },
            {
                regex: "(YottaaMonitor)",
                family_replacement: "Yottaa Monitor",
                other: true
            },
            {
                regex: "(Kindle)/(\\d+)\\.(\\d+)",
                family_replacement: "Kindle"
            },
            {
                regex: "(Symphony) (\\d+).(\\d+)",
                family_replacement: "Symphony",
                other: true
            },
            {
                regex: "Minimo",
                family_replacement: "Minimo",
                other: true
            },
            {
                regex: "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile"
            },
            {
                regex: "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Mobile iOS"
            },
            {
                regex: "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile",
                family_replacement: "Chrome Mobile"
            },
            {
                regex: "(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Chrome Frame"
            },
            {
                regex: "(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "UC Browser",
                other: true
            },
            {
                regex: "(SLP Browser)/(\\d+)\\.(\\d+)",
                family_replacement: "Tizen Browser",
                other: true
            },
            {
                regex: "(Epiphany)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "Epiphany",
                other: true
            },
            {
                regex: "(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)",
                family_replacement: "Sogou Explorer",
                other: true
            },
            {
                regex: "(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)",
                family_replacement: "PingdomBot",
                other: true
            },
            {
                regex: "(facebookexternalhit)/(\\d+)\\.(\\d+)",
                family_replacement: "FacebookBot"
            },
            {
                regex: "(Twitterbot)/(\\d+)\\.(\\d+)",
                family_replacement: "TwitterBot"
            },
            {
                regex: "(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)"
            },
            {
                regex: "(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)"
            },
            {
                regex: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
            },
            {
                regex: "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?"
            },
            {
                regex: "(Android) Donut",
                v2_replacement: "2",
                v1_replacement: "1"
            },
            {
                regex: "(Android) Eclair",
                v2_replacement: "1",
                v1_replacement: "2"
            },
            {
                regex: "(Android) Froyo",
                v2_replacement: "2",
                v1_replacement: "2"
            },
            {
                regex: "(Android) Gingerbread",
                v2_replacement: "3",
                v1_replacement: "2"
            },
            {
                regex: "(Android) Honeycomb",
                v1_replacement: "3"
            },
            {
                regex: "(IEMobile)[ /](\\d+)\\.(\\d+)",
                family_replacement: "IE Mobile"
            },
            {
                regex: "(MSIE) (\\d+)\\.(\\d+).*XBLWP7",
                family_replacement: "IE Large Screen"
            },
            {
                regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
            },
            {
                regex: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
            },
            {
                regex: "(Obigo)InternetBrowser",
                other: true
            },
            {
                regex: "(Obigo)\\-Browser",
                other: true
            },
            {
                regex: "(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?",
                other: true
            },
            {
                regex: "(MAXTHON|Maxthon) (\\d+)\\.(\\d+)",
                family_replacement: "Maxthon",
                other: true
            },
            {
                regex: "(Maxthon|MyIE2|Uzbl|Shiira)",
                v1_replacement: "0",
                other: true
            },
            {
                regex: "(PLAYSTATION) (\\d+)",
                family_replacement: "PlayStation",
                manufacturer: "Sony"
            },
            {
                regex: "(PlayStation Portable)[^\\d]+(\\d+).(\\d+)",
                manufacturer: "Sony"
            },
            {
                regex: "(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(POLARIS)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            },
            {
                regex: "(Embider)/(\\d+)\\.(\\d+)",
                family_replacement: "Polaris",
                other: true
            },
            {
                regex: "(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Bon Echo",
                other: true
            },
            {
                regex: "(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            },
            {
                regex: "(iPod).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            },
            {
                regex: "(iPod)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            },
            {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            },
            {
                regex: "(iPhone).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            },
            {
                regex: "(iPhone)",
                family_replacement: "Mobile Safari",
                manufacturer: "Apple"
            },
            {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            },
            {
                regex: "(iPad).*Version/(\\d+)\\.(\\d+)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            },
            {
                regex: "(iPad)",
                family_replacement: "Mobile Safari",
                tablet: true,
                manufacturer: "Apple"
            },
            {
                regex: "(AvantGo) (\\d+).(\\d+)",
                other: true
            },
            {
                regex: "(Avant)",
                v1_replacement: "1",
                other: true
            },
            {
                regex: "^(Nokia)",
                family_replacement: "Nokia Services (WAP) Browser",
                manufacturer: "Nokia"
            },
            {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            },
            {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)",
                manufacturer: "Nokia"
            },
            {
                regex: "(NokiaBrowser)/(\\d+)\\.(\\d+)",
                manufacturer: "Nokia"
            },
            {
                regex: "(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            },
            {
                regex: "(Series60)/5\\.0",
                v2_replacement: "0",
                v1_replacement: "7",
                family_replacement: "NokiaBrowser",
                manufacturer: "Nokia"
            },
            {
                regex: "(Series60)/(\\d+)\\.(\\d+)",
                family_replacement: "Nokia OSS Browser",
                manufacturer: "Nokia"
            },
            {
                regex: "(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Nokia Series 40 Ovi Browser",
                manufacturer: "Nokia"
            },
            {
                regex: "(Nokia)[EN]?(\\d+)",
                manufacturer: "Nokia"
            },
            {
                regex: "(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                tablet: true,
                manufacturer: "Nokia"
            },
            {
                regex: "(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                family_replacement: "Blackberry WebKit",
                manufacturer: "RIM"
            },
            {
                regex: "(Black[bB]erry)\\s?(\\d+)",
                family_replacement: "Blackberry",
                manufacturer: "RIM"
            },
            {
                regex: "(OmniWeb)/v(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(Blazer)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Blazer",
                manufacturer: "Palm"
            },
            {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                family_replacement: "Palm Pre",
                manufacturer: "Palm"
            },
            {
                regex: "(Links) \\((\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(QtWeb) Internet Browser/(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                other: true,
                tablet: true
            },
            {
                regex: "(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Version/\\d+\\.\\d+.\\d+ Safari/",
                family_replacement: "WebKit Nightly"
            },
            {
                regex: "(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/",
                family_replacement: "Safari"
            },
            {
                regex: "(Safari)/\\d+"
            },
            {
                regex: "(OLPC)/Update(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(OLPC)/Update()\\.(\\d+)",
                v1_replacement: "0",
                other: true
            },
            {
                regex: "(SEMC\\-Browser)/(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(Teleca)",
                family_replacement: "Teleca Browser",
                other: true
            },
            {
                regex: "Trident(.*)rv.(\\d+)\\.(\\d+)",
                family_replacement: "IE"
            },
            {
                regex: "(MSIE) (\\d+)\\.(\\d+)",
                family_replacement: "IE"
            }],
            os_parsers: [{
                regex: "(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            },
            {
                regex: "(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
            },
            {
                regex: "(Android) Donut",
                os_v2_replacement: "2",
                os_v1_replacement: "1"
            },
            {
                regex: "(Android) Eclair",
                os_v2_replacement: "1",
                os_v1_replacement: "2"
            },
            {
                regex: "(Android) Froyo",
                os_v2_replacement: "2",
                os_v1_replacement: "2"
            },
            {
                regex: "(Android) Gingerbread",
                os_v2_replacement: "3",
                os_v1_replacement: "2"
            },
            {
                regex: "(Android) Honeycomb",
                os_v1_replacement: "3"
            },
            {
                regex: "(Silk-Accelerated=[a-z]{4,5})",
                os_replacement: "Android"
            },
            {
                regex: "(Windows Phone 6\\.5)"
            },
            {
                regex: "(Windows (?:NT 5\\.2|NT 5\\.1))",
                os_replacement: "Windows XP"
            },
            {
                regex: "(XBLWP7)",
                os_replacement: "Windows Phone OS"
            },
            {
                regex: "(Windows NT 6\\.1)",
                os_replacement: "Windows 7"
            },
            {
                regex: "(Windows NT 6\\.0)",
                os_replacement: "Windows Vista"
            },
            {
                regex: "(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)"
            },
            {
                regex: "(Windows NT 6\\.2)",
                os_replacement: "Windows 8"
            },
            {
                regex: "(Windows Phone 8)",
                os_replacement: "Windows Phone 8"
            },
            {
                regex: "(Windows NT 5\\.0)",
                os_replacement: "Windows 2000"
            },
            {
                regex: "(Windows Phone OS) (\\d+)\\.(\\d+)"
            },
            {
                regex: "(Windows ?Mobile)",
                os_replacement: "Windows Mobile"
            },
            {
                regex: "(WinNT4.0)",
                os_replacement: "Windows NT 4.0"
            },
            {
                regex: "(Win98)",
                os_replacement: "Windows 98"
            },
            {
                regex: "(Tizen)/(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?",
                manufacturer: "Apple"
            },
            {
                regex: "(?:PPC|Intel) (Mac OS X)",
                manufacturer: "Apple"
            },
            {
                regex: "(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?",
                os_replacement: "iOS",
                manufacturer: "Apple"
            },
            {
                regex: "(iPhone|iPad|iPod); Opera",
                os_replacement: "iOS",
                manufacturer: "Apple"
            },
            {
                regex: "(iPad); Opera",
                tablet: true,
                manufacturer: "Apple"
            },
            {
                regex: "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)",
                os_replacement: "iOS",
                manufacturer: "Apple"
            },
            {
                regex: "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "Chrome OS"
            },
            {
                regex: "(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            },
            {
                regex: "(Linux Mint)(?:/(\\d+))?",
                other: true
            },
            {
                regex: "(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                other: true
            },
            {
                regex: "(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)",
                os_replacement: "Symbian OS"
            },
            {
                regex: "(Symbian/3).+NokiaBrowser/7\\.3",
                os_replacement: "Symbian^3 Anna"
            },
            {
                regex: "(Symbian/3).+NokiaBrowser/7\\.4",
                os_replacement: "Symbian^3 Belle"
            },
            {
                regex: "(Symbian/3)",
                os_replacement: "Symbian^3"
            },
            {
                regex: "(Series 60|SymbOS|S60)",
                os_replacement: "Symbian OS"
            },
            {
                regex: "(MeeGo)",
                other: true
            },
            {
                regex: "Symbian [Oo][Ss]",
                os_replacement: "Symbian OS"
            },
            {
                regex: "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            },
            {
                regex: "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "BlackBerry OS",
                manufacturer: "RIM"
            },
            {
                regex: "(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            },
            {
                regex: "(Play[Bb]ook)",
                os_replacement: "BlackBerry Tablet OS",
                tablet: true,
                manufacturer: "RIM"
            },
            {
                regex: "(Black[Bb]erry)",
                os_replacement: "Blackberry OS",
                manufacturer: "RIM"
            },
            {
                regex: "(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                os_replacement: "webOS"
            },
            {
                regex: "(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)",
                other: true
            },
            {
                regex: "(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)"
            },
            {
                regex: "(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)"
            },
            {
                regex: "(Linux|BSD)",
                other: true
            }],
            mobile_os_families: ["Windows Phone 6.5", "Windows CE", "Symbian OS"],
            device_parsers: [{
                regex: "HTC ([A-Z][a-z0-9]+) Build",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            },
            {
                regex: "HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            },
            {
                regex: "HTC_Touch_([A-Za-z0-9]+)",
                device_replacement: "HTC Touch ($1)",
                manufacturer: "HTC"
            },
            {
                regex: "USCCHTC(\\d+)",
                device_replacement: "HTC $1 (US Cellular)",
                manufacturer: "HTC"
            },
            {
                regex: "Sprint APA(9292)",
                device_replacement: "HTC $1 (Sprint)",
                manufacturer: "HTC"
            },
            {
                regex: "HTC ([A-Za-z0-9]+ [A-Z])",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            },
            {
                regex: "HTC-([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            },
            {
                regex: "HTC_([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            },
            {
                regex: "HTC ([A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            },
            {
                regex: "(ADR[A-Za-z0-9]+)",
                device_replacement: "HTC $1",
                manufacturer: "HTC"
            },
            {
                regex: "(HTC)",
                manufacturer: "HTC"
            },
            {
                regex: "SonyEricsson([A-Za-z0-9]+)/",
                device_replacement: "Ericsson $1",
                other: true,
                manufacturer: "Sony"
            },
            {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build"
            },
            {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            },
            {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            },
            {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
            },
            {
                regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build"
            },
            {
                regex: "NokiaN([0-9]+)",
                device_replacement: "Nokia N$1",
                manufacturer: "Nokia"
            },
            {
                regex: "Nokia([A-Za-z0-9\\v-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            },
            {
                regex: "NOKIA ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            },
            {
                regex: "Nokia ([A-Za-z0-9\\-]+)",
                device_replacement: "Nokia $1",
                manufacturer: "Nokia"
            },
            {
                regex: "Lumia ([A-Za-z0-9\\-]+)",
                device_replacement: "Lumia $1",
                manufacturer: "Nokia"
            },
            {
                regex: "Symbian",
                device_replacement: "Nokia",
                manufacturer: "Nokia"
            },
            {
                regex: "(PlayBook).+RIM Tablet OS",
                device_replacement: "Blackberry Playbook",
                tablet: true,
                manufacturer: "RIM"
            },
            {
                regex: "(Black[Bb]erry [0-9]+);",
                manufacturer: "RIM"
            },
            {
                regex: "Black[Bb]erry([0-9]+)",
                device_replacement: "BlackBerry $1",
                manufacturer: "RIM"
            },
            {
                regex: "(Pre)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pre",
                manufacturer: "Palm"
            },
            {
                regex: "(Pixi)/(\\d+)\\.(\\d+)",
                device_replacement: "Palm Pixi",
                manufacturer: "Palm"
            },
            {
                regex: "(Touchpad)/(\\d+)\\.(\\d+)",
                device_replacement: "HP Touchpad",
                manufacturer: "HP"
            },
            {
                regex: "HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)",
                device_replacement: "HP iPAQ $1",
                manufacturer: "HP"
            },
            {
                regex: "Palm([A-Za-z0-9]+)",
                device_replacement: "Palm $1",
                manufacturer: "Palm"
            },
            {
                regex: "Treo([A-Za-z0-9]+)",
                device_replacement: "Palm Treo $1",
                manufacturer: "Palm"
            },
            {
                regex: "webOS.*(P160UNA)/(\\d+).(\\d+)",
                device_replacement: "HP Veer",
                manufacturer: "HP"
            },
            {
                regex: "(Kindle Fire)",
                manufacturer: "Amazon"
            },
            {
                regex: "(Kindle)",
                manufacturer: "Amazon"
            },
            {
                regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                device_replacement: "Kindle Fire",
                tablet: true,
                manufacturer: "Amazon"
            },
            {
                regex: "(iPad) Simulator;",
                manufacturer: "Apple"
            },
            {
                regex: "(iPad);",
                manufacturer: "Apple"
            },
            {
                regex: "(iPod);",
                manufacturer: "Apple"
            },
            {
                regex: "(iPhone) Simulator;",
                manufacturer: "Apple"
            },
            {
                regex: "(iPhone);",
                manufacturer: "Apple"
            },
            {
                regex: "Nexus\\ ([A-Za-z0-9\\-]+)",
                device_replacement: "Nexus $1"
            },
            {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            },
            {
                regex: "acer_([A-Za-z0-9]+)_",
                device_replacement: "Acer $1",
                manufacturer: "Acer"
            },
            {
                regex: "Amoi\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            },
            {
                regex: "AMOI\\-([A-Za-z0-9]+)",
                device_replacement: "Amoi $1",
                other: true,
                manufacturer: "Amoi"
            },
            {
                regex: "Asus\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            },
            {
                regex: "ASUS\\-([A-Za-z0-9]+)",
                device_replacement: "Asus $1",
                manufacturer: "Asus"
            },
            {
                regex: "BIRD\\-([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            },
            {
                regex: "BIRD\\.([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            },
            {
                regex: "BIRD ([A-Za-z0-9]+)",
                device_replacement: "Bird $1",
                other: true
            },
            {
                regex: "Dell ([A-Za-z0-9]+)",
                device_replacement: "Dell $1",
                manufacturer: "Dell"
            },
            {
                regex: "DoCoMo/2\\.0 ([A-Za-z0-9]+)",
                device_replacement: "DoCoMo $1",
                other: true
            },
            {
                regex: "([A-Za-z0-9]+)\\_W\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            },
            {
                regex: "([A-Za-z0-9]+)\\;FOMA",
                device_replacement: "DoCoMo $1",
                other: true
            },
            {
                regex: "vodafone([A-Za-z0-9]+)",
                device_replacement: "Huawei Vodafone $1",
                other: true
            },
            {
                regex: "i\\-mate ([A-Za-z0-9]+)",
                device_replacement: "i-mate $1",
                other: true
            },
            {
                regex: "Kyocera\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            },
            {
                regex: "KWC\\-([A-Za-z0-9]+)",
                device_replacement: "Kyocera $1",
                other: true
            },
            {
                regex: "Lenovo\\-([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Lenovo"
            },
            {
                regex: "Lenovo\\_([A-Za-z0-9]+)",
                device_replacement: "Lenovo $1",
                manufacturer: "Levovo"
            },
            {
                regex: "LG/([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LG-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LGE-LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LGE VX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LG ([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LGE LG\\-AX([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LG\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LGE\\-([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "LG([A-Za-z0-9]+)",
                device_replacement: "LG $1",
                manufacturer: "LG"
            },
            {
                regex: "(KIN)\\.One (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            },
            {
                regex: "(KIN)\\.Two (\\d+)\\.(\\d+)",
                device_replacement: "Microsoft $1"
            },
            {
                regex: "(Motorola)\\-([A-Za-z0-9]+)",
                manufacturer: "Motorola"
            },
            {
                regex: "MOTO\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            },
            {
                regex: "MOT\\-([A-Za-z0-9]+)",
                device_replacement: "Motorola $1",
                manufacturer: "Motorola"
            },
            {
                regex: "Philips([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            },
            {
                regex: "Philips ([A-Za-z0-9]+)",
                device_replacement: "Philips $1",
                manufacturer: "Philips"
            },
            {
                regex: "SAMSUNG-([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            },
            {
                regex: "SAMSUNG\\; ([A-Za-z0-9\\-]+)",
                device_replacement: "Samsung $1",
                manufacturer: "Samsung"
            },
            {
                regex: "Softbank/1\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            },
            {
                regex: "Softbank/2\\.0/([A-Za-z0-9]+)",
                device_replacement: "Softbank $1",
                other: true
            },
            {
                regex: "(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)",
                device_replacement: "Generic Smartphone"
            },
            {
                regex: "^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly\\_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)",
                device_replacement: "Generic Feature Phone"
            },
            {
                regex: "^(htcp|htcs|htct|htc\\_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)",
                device_replacement: "Generic Feature Phone"
            },
            {
                regex: "^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)",
                device_replacement: "Generic Feature Phone"
            },
            {
                regex: "^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda\\_)",
                device_replacement: "Generic Feature Phone"
            },
            {
                regex: "(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)",
                device_replacement: "Spider"
            }],
            mobile_browser_families: ["Firefox Mobile", "Opera Mobile", "Opera Mini", "Mobile Safari", "webOS", "IE Mobile", "Playstation Portable", "Nokia", "Blackberry", "Palm", "Silk", "Android", "Maemo", "Obigo", "Netfront", "AvantGo", "Teleca", "SEMC-Browser", "Bolt", "Iris", "UP.Browser", "Symphony", "Minimo", "Bunjaloo", "Jasmine", "Dolfin", "Polaris", "BREW", "Chrome Mobile", "Chrome Mobile iOS", "UC Browser", "Tizen Browser"]
        };
        _this.parsers = ["device_parsers", "browser_parsers", "os_parsers", "mobile_os_families", "mobile_browser_families"];
        _this.types = ["browser", "os", "device"];
        _this.regexes = regexes ||
        function() {
            var results = {};
            _this.parsers.map(function(parser) {
                results[parser] = []
            });
            return results
        } ();
        _this.families = function() {
            var results = {};
            _this.types.map(function(type) {
                results[type] = []
            });
            return results
        } ();
        var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype,
        nativeForEach = ArrayProto.forEach,
        nativeIndexOf = ArrayProto.indexOf;
        var find = function(ua, obj) {
            var ret = {};
            for (var i = 0; i < obj.length; i++) {
                ret = obj[i](ua);
                if (ret) {
                    break
                }
            }
            return ret
        };
        var remove = function(arr, props) {
            each(arr,
            function(obj) {
                each(props,
                function(prop) {
                    delete obj[prop]
                })
            })
        };
        var contains = function(obj, target) {
            var found = false;
            if (obj == null) return found;
            if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
            found = any(obj,
            function(value) {
                return value === target
            });
            return found
        };
        var each = forEach = function(obj, iterator, context) {
            if (obj == null) return;
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context)
            } else if (obj.length === +obj.length) {
                for (var i = 0,
                l = obj.length; i < l; i++) {
                    iterator.call(context, obj[i], i, obj)
                }
            } else {
                for (var key in obj) {
                    if (_.has(obj, key)) {
                        iterator.call(context, obj[key], key, obj)
                    }
                }
            }
        };
        var extend = function(obj) {
            each(slice.call(arguments, 1),
            function(source) {
                for (var prop in source) {
                    obj[prop] = source[prop]
                }
            });
            return obj
        };
        var check = function(str) {
            return !! (str && typeof str != "undefined" && str != null)
        };
        var toVersionString = function(obj) {
            var output = "";
            obj = obj || {};
            if (check(obj)) {
                if (check(obj.major)) {
                    output += obj.major;
                    if (check(obj.minor)) {
                        output += "." + obj.minor;
                        if (check(obj.patch)) {
                            output += "." + obj.patch
                        }
                    }
                }
            }
            return output
        };
        var toString = function(obj) {
            obj = obj || {};
            var suffix = toVersionString(obj);
            if (suffix) suffix = " " + suffix;
            return obj && check(obj.family) ? obj.family + suffix: ""
        };
        _this.parse = function(ua) {
            var parsers = function(type) {
                return _this.regexes[type + "_parsers"].map(function(obj) {
                    var regexp = new RegExp(obj.regex),
                    rep = obj[(type === "browser" ? "family": type) + "_replacement"],
                    major_rep = obj.major_version_replacement;
                    function parser(ua) {
                        var m = ua.match(regexp);
                        if (!m) return null;
                        var ret = {};
                        ret.family = (rep ? rep.replace("$1", m[1]) : m[1]) || "other";
                        ret.major = parseInt(major_rep ? major_rep: m[2]) || null;
                        ret.minor = m[3] ? parseInt(m[3]) : null;
                        ret.patch = m[4] ? parseInt(m[4]) : null;
                        ret.tablet = obj.tablet;
                        ret.man = obj.manufacturer || null;
                        return ret
                    }
                    return parser
                })
            };
            var UserAgent = function() {};
            var browser_parsers = parsers("browser");
            var os_parsers = parsers("os");
            var device_parsers = parsers("device");
            var a = new UserAgent;
            a.source = ua;
            a.browser = find(ua, browser_parsers);
            if (check(a.browser)) {
                a.browser.name = toString(a.browser);
                a.browser.version = toVersionString(a.browser)
            } else {
                a.browser = {}
            }
            a.os = find(ua, os_parsers);
            if (check(a.os)) {
                a.os.name = toString(a.os);
                a.os.version = toVersionString(a.os)
            } else {
                a.os = {}
            }
            a.device = find(ua, device_parsers);
            if (check(a.device)) {
                a.device.name = toString(a.device);
                a.device.version = toVersionString(a.device)
            } else {
                a.device = {
                    tablet: false,
                    family: "Other"
                }
            }
            var mobile_agents = {};
            var mobile_browser_families = _this.regexes.mobile_browser_families.map(function(str) {
                mobile_agents[str] = true
            });
            var mobile_os_families = _this.regexes.mobile_os_families.map(function(str) {
                mobile_agents[str] = true
            });
            if (a.browser.family === "Spider") {
                a.device.type = "Spider"
            } else if (a.browser.tablet || a.os.tablet || a.device.tablet) {
                a.device.type = "Tablet"
            } else if (mobile_agents.hasOwnProperty(a.browser.family)) {
                a.device.type = "Mobile"
            } else {
                a.device.type = "Desktop"
            }
            a.device.manufacturer = a.browser.man || a.os.man || a.device.man || null;
            remove([a.browser, a.os, a.device], ["tablet", "man"]);
            return a
        };
        return _this
    } ();
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = detect
        }
        exports.detect = detect
    } else {
        root["detect"] = detect
    }
    if (typeof define === "function" && define.amd) {
        define(function(require) {
            return detect
        })
    }
})(window);
var browserdetect = function() {
    "use strict";
    var platform = "unknown";
    var deviceType = "unknown";
    var subdeviceType = "computer";
    var ua = detect.parse(navigator.userAgent);
    var hasIpad = navigator.userAgent.match(/ipad/gi);
    ua.os.family = ua.os.family || "unknown";
    if (ua.os.family == "iOS" && ua.device.type == "Mobile" && !hasIpad) {
        platform = "iphone";
        deviceType = "smart";
        subdeviceType = "phone"
    } else if (ua.os.family === "iPhone" || ua.os.family === "iPod" && !hasIpad) {
        platform = "iphone";
        deviceType = "smart";
        subdeviceType = "phone"
    } else if (hasIpad || ua.os.family === "iOS" || ua.device.type === "Tablet") {
        platform = "ipad";
        deviceType = "smart";
        subdeviceType = "tablet"
    } else if (ua.os.family === "iPad") {
        platform = "ipad";
        deviceType = "smart";
        subdeviceType = "tablet"
    } else if (ua.os.family === "Android" && ua.device.type == "Mobile") {
        platform = "android_mobile";
        deviceType = "smart";
        subdeviceType = "phone"
    } else if (ua.os.family === "Android") {
        platform = "android_tablet";
        deviceType = "smart";
        subdeviceType = "tablet"
    } else if (ua.os.family.match(/Windows/i) && ua.device.type == "Desktop") {
        platform = "windows";
        deviceType = "desktop";
        subdeviceType = "computer"
    } else if (ua.os.family.match(/Mac OS X/i)) {
        platform = "mac";
        deviceType = "desktop";
        subdeviceType = "computer"
    }
    return {
        isPhone: subdeviceType === "phone",
        isTablet: subdeviceType === "tablet",
        isComputer: subdeviceType === "computer",
        isWindows: platform === "windows",
        isAndroid: platform === "android_mobile" || platform === "android_tablet",
        isIOS: platform === "iphone" || platform === "ipad",
        neverJava: deviceType === "smart",
        platform: platform,
        deviceType: deviceType,
        ua: ua
    }
} (); (function(GLOB) {
    "use strict";
    function triggerModal(selector, status) {
        modal(".modal", {
            close: true
        });
        if (status === "show") {
            modal(selector, {
                block: true
            })
        }
    }
    function ActivateModel(setup) {
        this.browser = browserdetect;
        this.progressTimer = null;
        this.notStartedTimer = null;
        this.applet = null;
        this.manualIpAddress = ko.observable();
        this.selectedIpAddress = ko.observable();
        this.authUser = ko.observable("admin");
        this.authPass = ko.observable();
        this.limitationsId = ko.observable();
        this.limitationsError = ko.observable(false);
        this.limitationsTitle = ko.observable();
        this.limitationsAccepted = "NO";
        this.codecs = ko.observableArray([]);
        this.selectedCodec = ko.observable();
        this.progress = ko.observable("width:0");
        this.errorText = ko.observable();
        this.stateText = ko.observable();
        this.step = ko.observable("load");
        this.stepText = ko.computed(function() {
            switch (this.step()) {
            case "ready":
                clearInterval(this.progressTimer);
                return "Scan the network to find your video system";
            case "scanning":
                clearInterval(this.progressTimer);
                return "Scan the network to find your video system";
            case "scanned":
                clearInterval(this.progressTimer);
                return "Click on your video system to activate it";
            case "activating":
                return "Attaching subscription to system";
            case "success":
                clearInterval(this.progressTimer);
                return "Video system activated";
            case "failed":
            case "error":
                clearInterval(this.progressTimer);
                return "Failed to activate system";
            case "load":
            default:
                clearInterval(this.progressTimer);
                return "Loading application..."
            }
        },
        this);
        if (!this.browser.neverJava) {
            this.notStartedTimer = setTimeout(function() {
                triggerModal("#dlg-java-unavailable", "show")
            },
            2 * 60 * 1e3)
        }
    }
    ko.utils.extend(ActivateModel.prototype, {
        progressAnimStop: function(duration) {
            clearInterval(this.progressTimer);
            this.progress("width:0%")
        },
        progressAnimStart: function(duration) {
            var pcnt = 0;
            this.progressAnimStop();
            this.progressTimer = setInterval(function() {
                pcnt++;
                this.progress("width:" + (pcnt > 100 ? 100 : pcnt) + "%")
            }.bind(this), 1e3 * duration / 100)
        },
        activateCodec: function(ip) {
            debug("activateCodec", ip);
            this.progressAnimStart(60 * 2);
            this.stateText("Attaching subscription to IP " + ip);
            this.step("activating");
            this.selectedIpAddress(ip);
            this.applet.js_provisionCodec(ip, this.limitationsAccepted)
        },
        startScan: function() {
            debug("startScan");
            this.stateText("Preparing Scan");
            this.step("scanning");
            this.applet.js_startScan()
        },
        restart: function() {
            debug("restart");
            window.location.href = window.location.href
        },
        manualIpActivate: function() {
            debug("manualIpActivate", this);
            this.activateCodec(this.manualIpAddress());
            triggerModal()
        },
        manualIpModal: function() {
            debug("manualIpModal");
            triggerModal("#dlg-placeholder-manual", "show")
        },
        limitationsAccept: function() {
            debug("limitationsAccept");
            this.limitationsAccepted = "LIMITS_OK";
            this.activateCodec(this.selectedIpAddress());
            triggerModal()
        },
        onAppletReady: function(applet) {
            debug("onAppletReady");
            clearTimeout(this.notStartedTimer);
            this.applet = applet;
            this.step("ready")
        },
        onCodecFound: function(codec) {
            debug("onCodecFound", codec);
            codec.activate = function() {
                this.activateCodec(codec.ip)
            }.bind(this);
            this.codecs.push(codec)
        },
        onScanProgress: function(pst) {
            debug("onScanProgress", pst);
            this.stateText("Scanning");
            this.progress("width:" + pst + "%")
        },
        onScanFinished: function() {
            debug("onScanFinished");
            this.step("scanned");
            this.stateText(null)
        },
        onAuthFailed: function() {
            debug("onAuthFailed");
            this.progressAnimStop();
            triggerModal("#dlg-auth", "show")
        },
        onHasLimitations: function(limits, ip) {
            debug("onHasLimitations", limits, ip);
            this.progressAnimStop();
            this.limitationsError(limits.indexOf("ERR_") != -1);
            this.limitationsId(limits.split(" ")[1]);
            triggerModal("#dlg-codec-limits", "show")
        },
        onNoNetwork: function() {
            debug("onNoNetwork");
            this.progressAnimStop();
            triggerModal("#dlg-activate-nonetwork", "show")
        },
        onInCall: function() {
            debug("onInCall");
            this.progressAnimStop();
            triggerModal("#dlg-activate-incall", "show")
        },
        onProvisionProgress: function(status) {
            debug("onProvisionProgress", status);
            this.stateText(status)
        },
        onProvisionSuccess: function() {
            debug("onProvisionSuccess");
            this.step("success")
        },
        onProvisionError: function(msg) {
            debug("onProvisionError", msg);
            this.step("error");
            this.errorText(msg);
            this.stateText(msg);
            triggerModal("#dlg-activate-fail", "show")
        },
        onProvisionFailed: function(msg) {
            debug("onProvisionFailed", msg);
            this.progressAnimStop();
            this.errorText(msg);
            triggerModal("#dlg-activate-rs", "show")
        },
        codecDisconnectCall: function() {
            debug("codecDisconnectCall");
            this.applet.js_provisionCodecAndDisconnect(this.selectedIpAddress());
            this.progressAnimStart(60 * 2);
            triggerModal()
        },
        codecBoot: function() {
            debug("codecBoot");
            this.applet.js_bootCodec(this.selectedIpAddress());
            this.progressAnimStart(60 * 10);
            triggerModal()
        },
        codecAuthenticate: function() {
            debug("codecAuthenticate");
            this.applet.js_setUsernamePasswd(this.authUser(), this.authPass());
            this.activateCodec(this.selectedIpAddress());
            triggerModal()
        }
    });
    function ActivateAppletProxy(model) {
        this.model = model;
        this.appletReady = function() {
            setTimeout(function() {
                var applet = $("#admin-applet").find("applet").get(0);
                this.model.onAppletReady(applet)
            }.bind(this), 50)
        }.bind(this);
        this.foundCodecAt = function(ip, name, swVersion, manufacturer) {
            this.model.onCodecFound({
                manufacturer: manufacturer,
                ip: ip,
                name: name || "<i>No name configured</i>",
                swVersion: swVersion
            })
        }.bind(this);
        this.provisionedCodec = function(status, ip, msg) {
            debug("provisionedCodec", status, ip, msg);
            switch (status.toLowerCase()) {
            case "ok":
                this.model.onProvisionSuccess();
                break;
            case "error":
                this.model.onProvisionError(msg);
                break;
            default:
                this.model.onProvisionFailed(msg);
                break
            }
        }.bind(this);
        this.inCall = this.model.onInCall.bind(this.model);
        this.noNetwork = this.model.onNoNetwork.bind(this.model);
        this.authFailed = this.model.onAuthFailed.bind(this.model);
        this.hasLimits = this.model.onHasLimitations.bind(this.model);
        this.updateScanPst = this.model.onScanProgress.bind(this.model);
        this.provisionProgress = this.model.onProvisionProgress.bind(this.model);
        this.finishedScan = this.model.onScanFinished.bind(this.model);
        this.ERROR = this.model.onProvisionError.bind(this.model);
        var iframe, ready;
        function poster(name) {
            return function() {
                var args = [];
                for (var arg in arguments) args.push(arguments[arg]);
                var msg = JSON.stringify({
                    msg: name,
                    args: args
                });
                iframe.postMessage(msg, window.ACTIVATE_SETTINGS.origin)
            }
        }
        window.addEventListener("message",
        function(event) {
            if (event.origin === window.ACTIVATE_SETTINGS.origin) {
                var data = JSON.parse(event.data);
                if (data.msg === "appletReady") {
                    if (ready) return;
                    ready = true;
                    this.model.onAppletReady({
                        js_provisionCodec: poster("js_provisionCodec"),
                        js_startScan: poster("js_startScan"),
                        js_provisionCodecAndDisconnect: poster("js_provisionCodecAndDisconnect"),
                        js_bootCodec: poster("js_bootCodec"),
                        js_setUsernamePasswd: poster("js_setUsernamePasswd")
                    })
                } else {
                    var args = [];
                    for (var arg in data.args) args.push(data.args[arg]);
                    this[data.msg].apply(this, args)
                }
            }
        }.bind(this), true);
        $("#applet-iframe").attr("src", $("#applet-iframe").attr("data-src"));
        $("#applet-iframe").load(function() {
            iframe = $("#applet-iframe").get(0).contentWindow;
            poster("appletReadyRequest")()
        })
    }
    function ActivateAppletSimulator(model) {
        this.model = model;
        this.codecs = {
            "127.0.0.1": {
                manufacturer: "TANDBERG",
                name: "Will work",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onProvisionProgress("Step2")
                },
                function() {
                    model.onProvisionProgress("Step3")
                },
                function() {
                    model.onProvisionProgress("Step4")
                },
                function() {
                    model.onProvisionSuccess()
                }]
            },
            "127.0.0.2": {
                manufacturer: "TANDBERG",
                name: "Will Fail",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onProvisionProgress("Step2")
                },
                function() {
                    model.onProvisionProgress("Step3")
                },
                function() {
                    model.onProvisionProgress("Step4")
                },
                function() {
                    model.onProvisionFailed("Failed man!")
                }]
            },
            "128.0.0.2": {
                manufacturer: "TANDBERG",
                name: "Will Error - Has long name",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onProvisionProgress("Step2")
                },
                function() {
                    model.onProvisionProgress("Step3")
                },
                function() {
                    model.onProvisionProgress("Step4")
                },
                function() {
                    model.onProvisionError("Error man!")
                }]
            },
            "127.0.0.3": {
                manufacturer: "TANDBERG",
                name: "In call",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onInCall("Step2")
                }]
            },
            "127.0.0.4": {
                manufacturer: "TANDBERG",
                name: "No network",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onNoNetwork("Step2")
                }]
            },
            "127.0.0.5": {
                manufacturer: "TANDBERG",
                name: "Needs authentication",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onAuthFailed()
                }]
            },
            "127.0.0.6": {
                manufacturer: "TANDBERG",
                name: "Has limitiations error",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onHasLimitations(" ERR_CISCO_NO_ENCR_SW", "127.0.0.1")
                }]
            },
            "127.0.0.7": {
                manufacturer: "TANDBERG",
                name: "Has limitiations warn",
                swVersion: "TC6.0",
                steps: [function() {
                    model.onProvisionProgress("Step1")
                },
                function() {
                    model.onHasLimitations(" WARN_CISCO_OLD_SOFTWARE", "127.0.0.1")
                }]
            }
        };
        setTimeout(function() {
            model.onAppletReady({
                js_provisionCodec: this.js_provisionCodec.bind(this),
                js_startScan: this.js_startScan.bind(this),
                js_provisionCodecAndDisconnect: this.js_provisionCodecAndDisconnect.bind(this),
                js_bootCodec: this.js_bootCodec.bind(this),
                js_setUsernamePasswd: this.js_setUsernamePasswd.bind(this)
            })
        }.bind(this), 250)
    }
    ko.utils.extend(ActivateAppletSimulator.prototype, {
        js_provisionCodec: function(ip, limitationsAccepted) {
            debug("js_provisionCodec()", ip, limitationsAccepted);
            this.model.onProvisionProgress("Starting provisioning");
            if (!this.codecs[ip]) {
                return setTimeout(function() {
                    this.model.onProvisionError("Unable to contact system")
                }.bind(this), 300)
            }
            var i = 0;
            var model = this.model;
            var codec = this.codecs[ip];
            function doStep() {
                codec.steps[i]();
                if (++i < codec.steps.length) setTimeout(doStep, 300)
            }
            setTimeout(doStep, 300)
        },
        js_startScan: function() {
            debug("js_startScan()");
            this.model.onScanProgress(0);
            var progress = 0;
            var i = 0;
            var codecs = Object.keys(this.codecs);
            var foundIt = function() {
                var codec = this.codecs[codecs[i]];
                this.model.onScanProgress(100 * (i / codecs.length));
                this.model.onCodecFound({
                    manufacturer: codec.manufacturer,
                    ip: codecs[i],
                    name: codec.name,
                    swVersion: codec.swVersion
                });
                if (++i < codecs.length) setTimeout(foundIt, 500);
                else this.model.onScanFinished()
            }.bind(this);
            setTimeout(foundIt, 500)
        },
        js_provisionCodecAndDisconnect: function(ip) {
            debug("js_provisionCodecAndDisconnect()", ip)
        },
        js_bootCodec: function(ip) {
            debug("js_bootCodec()", ip)
        },
        js_setUsernamePasswd: function(user, passwd) {
            debug("js_setUsernamePasswd()", user, passwd)
        }
    });
   /* window.ACTIVATE_SETTINGS = {
    	    simulate: false,
    	    origin: "https://my.videxio.com"
    	  };
    */
    var model = new ActivateModel(window.ACTIVATE_SETTINGS);
    if (!model.browser.neverJava) {
        var proxy;
        if (!window.ACTIVATE_SETTINGS.simulate) proxy = new ActivateAppletProxy(model);
        else proxy = new ActivateAppletSimulator(model)
    }
    $(document).ready(function() {
        ko.applyBindings(model)
    })
})(this);