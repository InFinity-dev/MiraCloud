/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

/*충북대학교 소프트웨어학과 2019 Capstone Design Smart Mirror Project
 * Team MiraCloud
 *     Team Leader : 2013041039 이민섭
 *     Team Member : 2013041010 김기훈, 2015041002 권오동
 */

var config = {
    address: "localhost", // Address to listen on, can be:
    // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
    // - another specific IPv4/6 to listen on a specific interface
    // - "", "0.0.0.0", "::" to listen on any interface
    // Default, when address config is left out, is "localhost"
    port: 8080,
    ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
    // or add a specific IPv4 of 192.168.1.5 :
    // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
    // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
    // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

    language: "en",
    timeFormat: 24,
    units: "metric",
    //Module Configs : 동일 position 일 경우 먼저 온 모듈부터 위쪽에 위치
    modules: [
        // https://github.com/MichMich/MagicMirror : MagicMirror github Repo 업데이트 알림.
        //	{
        //	    module: "updatenotification",
        //		position: "top_bar",
        //	},
        //******************Facial Recongition Modules Start Here******************
        // Face-Rcognition Mk2 : Dlib OpenCV 기반 딥러닝 모델 pickle 사용. 클래스 자체 할당, 인식속도 개선 버전.
        {
            module: 'MMM-Facial-Recognition',
            config: {
                defaultClass: "default",
                kihunClass: "kihun",
                minsubClass: "minsub",
                odongClass: "odong"
            }
        },
        // OpenCV 4.1 DNN Face Recognition : Mk1 버전 Base Config. No longer in use.
        // {
        //     module: 'MMM-Face-Reco-DNN',
        //     config: {
        //         // Logout 15 seconds after user was not detecte anymore, if they will be detected between this 15 Seconds, they delay will start again
        //         logoutDelay: 15000,
        //         // How many time the recognition starts, with a RasPi 3+ it would be good every 2 seconds
        //         checkInterval: 2000,
        //         // Module set used for strangers and if no user is detected
        //         defaultClass: 'default',
        //         // Set of modules which should be shown for every user
        //         everyoneClass: 'everyone',
        //         // XML to recognize with haarcascae
        //         cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
        //         // Pre encoded pickle with the faces
        //         encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
        //         // You wanna use pi camera or usb / builtin (1 = raspi camera, 0 = other camera)
        //         usePiCamera: 0,
        //         // Method of face detection (dnn = deep neural network, haar = haarcascade)
        //         method: 'dnn',
        //         // Which face detection model to use. "hog" is less accurate but faster on CPUs. "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated (if available).
        //         detectionMethod: 'hog',
        //         // How fast in ms should the modules hide and show (face effect)
        //         animationSpeed: 0,
        //         // Path to Python to run the face recognition (null / '' means default path)
        //         pythonPath: null,
        //         // Should shown welcome message over alert module from MagicMirror
        //         welcomeMessage: true
        //     },
        // },
        // Facial Recongition Modules : OpenCV LBPH기반 HOG 알고리즘 사용하는 얼굴인식 로그인. No longer in use.
        // {
        //     module: 'MMM-Facial-Recognition',
        //     config: {
        //         // 1=LBPH | 2=Fisher | 3=Eigen
        //         recognitionAlgorithm: 1,
        //         // Threshold for the confidence of a recognized face before it's considered a
        //         // positive match.  Confidence values below this threshold will be considered
        //         // a positive match because the lower the confidence value, or distance, the
        //         // more confident the algorithm is that the face was correctly detected.
        //         lbphThreshold: 50,
        //         fisherThreshold: 250,
        //         eigenThreshold: 3000,
        //         // force the use of a usb webcam on raspberry pi (on other platforms this is always true automatically)
        //         useUSBCam: true,
        //         // Path to your training xml
        //         trainingFile: 'modules/MMM-Facial-Recognition-Tools/training.xml',
        //         // recognition intervall in seconds (smaller number = faster but CPU intens!)
        //         interval: 2,
        //         // Logout delay after last recognition so that a user does not get instantly logged out if he turns away from the mirror for a few seconds
        //         logoutDelay: 5, //15
        //         // Array with usernames (copy and paste from training script)
        //         users: ['test', 'kim', 'lms'],
        //         //Module set used for strangers and if no user is detected
        //         defaultClass: "default",
        //         //Set of modules which should be shown for every user
        //         everyoneClass: "everyone",
        //         // Boolean to toggle welcomeMessage
        //         welcomeMessage: true
        //     }
        // },
        // ******************Facial Recongition Modules End Here******************
        // Alert 모듈 : 상단 Top-Down Animation 알림 팝업창. 얼굴인식 로그인 알림. 
        {
            module: "alert",
            classes: "default",
        },
        // ScreenCast 모듈 : 동일 네트워크상 모바일 기기 유투브 미러링 기능.
        {
            module: 'MMM-Screencast',
            position: 'bottom_right', // This position is for a hidden <div /> and not the screencast window
            config: {
                position: 'center',
                height: 540,
                width: 960,
            }
        },
        // 뉴스 RSS 피드
        {
            module: "newsfeed",
            position: "bottom_bar",
            config: {
                feeds: [{
                    title: "구글 주요 뉴스",
                    url: "https://news.google.com/news/feeds?cf=all&ned=kr"
                    // url: "https://news.google.com/news/feeds?cf=all&ned=kr&hl=ko&output=rss"
                }],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            },
            classes: "minsub"
        },
        {
            module: "newsfeed",
            position: "bottom_bar",
            config: {
                feeds: [{
                    title: "구글 일본 뉴스",
                    url: "https://news.google.com/news/feeds?cf=all&ned=jp"
                }],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            },
            classes: "odong"
        },
        //******************Google Assistant Modules Start Here******************
        //NotificationTrigger 릴레이 모듈 : Hotword Detection - Google 음성인식 동작 넘겨주고받는 모듈. No longer needed. Assistant 모듈에 integrate 함.
        // {
        //     module: "MMM-NotificationTrigger",
        //     config: {
        //         triggers: [{
        //             trigger: "HOTWORD_DETECTED",
        //             fires: [{
        //                 fire: "HOTWORD_PAUSE",
        //             }, {
        //                 fire: "ASSISTANT_ACTIVATE",
        //                 delay: 200,
        //                 payload: function (payload) {
        //                     return {
        //                         "profile": payload.hotword
        //                     }
        //                 }
        //             }, ]
        //         }, {
        //             trigger: "ASSISTANT_DEACTIVATED",
        //             fires: [{
        //                 fire: "HOTWORD_RESUME"
        //             }]
        //         }, ]
        //     },
        //     classes: "default minsub kihun odong"
        // },
        // Hotword v1 : Hotword Detection v1 모듈. No longer in use.
        //        {
        //            module: "MMM-Hotword",
        //            config: {
        //                record: {
        //                    recordProgram: "arecord",
        //                    device: "plughw:1,0",
        //                },
        //                autostart: true,
        //                onDetected: {
        //                    notification: function (payload) {
        //                        return "ASSISTANT_ACTIVATE"
        //                    },
        //                    payload: function (payload) {
        //                        return {
        //                            profile: payload.hotword
        //                        }
        //                    }
        //                },
        //            },
        //            classes: "default minsub kihun odong"
        //        },
        // Google Assistant Default Profile : dummyid4dev@gmail.com - 이민섭
        {
            module: "MMM-AssistantMk2",
            position: "bottom_bar",
            config: {
                record: {
                    recordProgram: "arecord",
                    device: "plughw:1,0",
                },
                notifications: {
                    ASSISTANT_ACTIVATED: "HOTWORD_PAUSE",
                    ASSISTANT_DEACTIVATED: "HOTWORD_RESUME",
                },
                deviceLocation: {
                    coordinates: { // set the latitude and longitude of the device to get localized information like weather or time. (ref. mygeoposition.com)
                        latitude: 36.6290447, // -90.0 - +90.0
                        longitude: 127.4541504, // -180.0 - +180.0
                        //위도 경도 36.6290447, 127.4541504 : 충북대학교 GPS 좌표
                    },
                },
                profiles: {
                    "default": {
                        profileFile: "default.json",
                        lang: "ko-KR"
                    },
                },
                //optional function
                responseScreen: true,
                screenZoom: "80%", // Adjust responseScreen to your mirror size.
                screenDuration: 3000,
                youtubeAutoplay: true, //If set as true, found Youtube video will be played automatically.
                ignoreNoVoiceError: true,
                pauseOnYoutube: true, //If set as true, You cannot activate Assistant during youtube playing. Recommended for the performance (Because permanent hotword detecting might make performance lower)
                youtubePlayerVars: { // You can set youtube playerVars for your purpose, but should be careful.
                    "controls": 0,
                    "loop": 1,
                    "rel": 0,
                },
                youtubePlayQuality: "medium", //small, medium, large, hd720, hd1080, highres or default
                //useWelcomeMessage: "오늘 어때",
            },
            classes: "default minsub kihun odong",
        },
        // Hotword v2 : Hotword v1 개선 버전. mirror.pmdl "거울아" 학습시킨 호출모델 사용.
        {
            module: "MMM-Hotword",
            //position: "top_right",
            config: {
                chimeOnFinish: null,
                mic: {
                    recordProgram: "arecord",
                    device: "plughw:1,0",
                },
                models: [{
                    hotwords: "mirror",
                    file: "mirror.pmdl",
                    sensitivity: "0.42", //호출 민감도 : Higer is more sensitive.
                }, ],
                defaultCommand: {
                    notificationExec: {
                        notification: "ASSISTANT_ACTIVATE",
                        payload: (detected, afterRecord) => {
                            return {
                                profile: "default"
                            }
                        }
                    },
                    afterRecordLimit: 0,
                    restart: false,
                },
            },
            classes: "default minsub kihun odong",
        },
        // Google Assistant Minsub Profile : hypercube0702@gmail.com - 이민섭
        // {
        //     module: "MMM-AssistantMk2",
        //     position: "bottom_bar",
        //     config: {
        //         record: {
        //             recordProgram: "arecord",
        //             device: "plughw:1,0",
        //         },
        //         notifications: {
        //             ASSISTANT_ACTIVATED: "HOTWORD_PAUSE",
        //             ASSISTANT_DEACTIVATED: "HOTWORD_RESUME",
        //         },
        //         deviceLocation: {
        //             coordinates: { // set the latitude and longitude of the device to get localized information like weather or time. (ref. mygeoposition.com)
        //                 latitude: 36.6290447, // -90.0 - +90.0
        //                 longitude: 127.4541504, // -180.0 - +180.0
        //                 //위도 경도 36.6290447, 127.4541504 : 충북대학교 GPS 좌표
        //             },
        //         },
        //         profiles: {
        //             "minsub": {
        //                 profileFile: "minsub.json",
        //                 lang: "ko-KR"
        //             },
        //         },
        //         //optional function
        //         responseScreen: true,
        //         screenZoom: "80%", // Adjust responseScreen to your mirror size.
        //         screenDuration: 3000,
        //         youtubeAutoplay: true, //If set as true, found Youtube video will be played automatically.
        //         ignoreNoVoiceError: true,
        //         pauseOnYoutube: true, //If set as true, You cannot activate Assistant during youtube playing. Recommended for the performance (Because permanent hotword detecting might make performance lower)
        //         youtubePlayerVars: { // You can set youtube playerVars for your purpose, but should be careful.
        //             "controls": 0,
        //             "loop": 1,
        //             "rel": 0,
        //         },
        //         youtubePlayQuality: "medium", //small, medium, large, hd720, hd1080, highres or default
        //         useWelcomeMessage: "오늘 어때",
        //     },
        //     classes: "minsub",
        // },
        // Google Assistant Kihun Profile : kmkhn5@gmail.com - 김기훈
        // {
        //     module: "MMM-AssistantMk2",
        //     position: "bottom_bar",
        //     config: {
        //         record: {
        //             recordProgram: "arecord",
        //             device: "plughw:1,0",
        //         },
        //         notifications: {
        //             ASSISTANT_ACTIVATED: "HOTWORD_PAUSE",
        //             ASSISTANT_DEACTIVATED: "HOTWORD_RESUME",
        //         },
        //         deviceLocation: {
        //             coordinates: { // set the latitude and longitude of the device to get localized information like weather or time. (ref. mygeoposition.com)
        //                 latitude: 36.6290447, // -90.0 - +90.0
        //                 longitude: 127.4541504, // -180.0 - +180.0
        //                 //위도 경도 36.6290447, 127.4541504 : 충북대학교 GPS 좌표
        //             },
        //         },
        //         profiles: {
        //             "kihun": {
        //                 profileFile: "kihun.json",
        //                 lang: "ko-KR"
        //             },
        //         },
        //         //optional function
        //         responseScreen: true,
        //         screenZoom: "80%", // Adjust responseScreen to your mirror size.
        //         screenDuration: 3000,
        //         youtubeAutoplay: true, //If set as true, found Youtube video will be played automatically.
        //         ignoreNoVoiceError: true,
        //         pauseOnYoutube: true, //If set as true, You cannot activate Assistant during youtube playing. Recommended for the performance (Because permanent hotword detecting might make performance lower)
        //         youtubePlayerVars: { // You can set youtube playerVars for your purpose, but should be careful.
        //             "controls": 0,
        //             "loop": 1,
        //             "rel": 0,
        //         },
        //         youtubePlayQuality: "medium", //small, medium, large, hd720, hd1080, highres or default
        //         useWelcomeMessage: "오늘 어때",
        //     },
        //     classes: "kihun",
        // },
        // Google Assistant odong Profile : kod378@gmail.com - 권오동
        // {
        //     module: "MMM-AssistantMk2",
        //     position: "bottom_bar",
        //     config: {
        //         record: {
        //             recordProgram: "arecord",
        //             device: "plughw:1,0",
        //         },
        //         notifications: {
        //             ASSISTANT_ACTIVATED: "HOTWORD_PAUSE",
        //             ASSISTANT_DEACTIVATED: "HOTWORD_RESUME",
        //         },
        //         deviceLocation: {
        //             coordinates: { // set the latitude and longitude of the device to get localized information like weather or time. (ref. mygeoposition.com)
        //                 latitude: 36.6290447, // -90.0 - +90.0
        //                 longitude: 127.4541504, // -180.0 - +180.0
        //                 //위도 경도 36.6290447, 127.4541504 : 충북대학교 GPS 좌표
        //             },
        //         },
        //         profiles: {
        //             "odong": {
        //                 profileFile: "odong.json",
        //                 lang: "ko-KR"
        //             },
        //         },
        //         //optional function
        //         responseScreen: true,
        //         screenZoom: "80%", // Adjust responseScreen to your mirror size.
        //         screenDuration: 3000,
        //         youtubeAutoplay: true, //If set as true, found Youtube video will be played automatically.
        //         ignoreNoVoiceError: true,
        //         pauseOnYoutube: true, //If set as true, You cannot activate Assistant during youtube playing. Recommended for the performance (Because permanent hotword detecting might make performance lower)
        //         youtubePlayerVars: { // You can set youtube playerVars for your purpose, but should be careful.
        //             "controls": 0,
        //             "loop": 1,
        //             "rel": 0,
        //         },
        //         youtubePlayQuality: "medium", //small, medium, large, hd720, hd1080, highres or default
        //         useWelcomeMessage: "오늘 어때",
        //     },
        //     classes: "odong",
        // },
        //******************Google Assistant Modules End Here******************
        // Google Fit 연동 : hypercube0702@gmail.com
        {
            module: "MMM-GoogleFit",
            position: "bottom_right",
            config: {
                stepGoal: 5000,
                stepCountLabel: true,
                useIcons: true,
            },
            classes: "minsub"
        },
        // USB-Music Player : 기술적 문제로 기능 삭제. No longer in user due to technical issue.
        // {
        //     module: "MMM-MP3Player",
        //     position: "bottom_left",
        //     classes: "default minsub"
        // },
        // Wifi-Signal icon : Wifi 신호 강도 아이콘
        {
            module: "MMM-network-signal",
            showMessage: false,
            position: "top_center",
            classes: "default minsub kihun odong"
        },
        //Temp and Humidity DHT 22 : 온습도 센서 DHT-22 GPIO, 시스템 mem 접근위해 root 권한으로 실행해야 access 가능. sudo npm start
        {
            module: "MMM-DHT-Sensor",
            position: "top_right",
            config: {
                sensorType: 22,
                sensorPIN: 22,
                animationSpeed: 10,
                titleText: "Room Temp | Humidity",
            },
            classes: "default minsub kihun odong"
        },
        // GIF, Image 로고 : 프레임 저하 문제로 Suspend 상태.
        {
            module: "MMM-EyeCandy",
            position: "middle_center",
            config: {
                maxWidth: "100%", // Sizes the images. Retains aspect ratio.
                //style: '1',            // Style number or use ownImagePath to override style
                ownImagePath: '/modules/MMM-EyeCandy/pix/faceid_standby.gif', // ex: 'modules/MMM-EyeCandy/pix/YOUR_PICTURE_NAME.jpg', or internet url to image
            },
            classes: "default"
        },
        // 시계 모듈
        {
            module: "clock",
            position: "top_left",
            classes: "default minsub kihun odong"
        },
        //Google Task : 얼굴인식 모듈과 함께 사용 불가.
        // {
        //     module: 'MMM-GoogleTasks',
        //     header: "Google Tasks",
        //     position: "top_left",
        //     config: {
        //         listID: "Google Task List 아이디",
        //     },
        //     // profile: "minsub",
        // },
        // 사용자 프로필 모듈 : 환영인사, 오늘 날씨에 따라 스크립트 문구 표시.
        // 이민섭
        {
            module: "MMM-Profile",
            position: "top_left",
            config: {
                // Transparency of the picture.
                opacity: 1.0,
                // Maximum width of the picture.
                maxWidth: "160px",
                // Maximum height of the picture.
                maxHeight: "160px",
                // Border-Radius of the picture.
                borderRadius: "50%",
                // The URL to the picture.
                // "./pictures/프로필사진.png"
                url: './pictures/minsub.png',
                // Add a profile name.
                yourName: "안녕하세요! 이민섭님.",
                // Add some random text to show.
                randomText: "\n\n\"거울아\" 라고 불러서\n음성비서를 호출 할 수 있습니다.\n\n",
                // Compliments
                compliments: {
                    day_sunny: [
                        "오늘 밖에 날씨가 좋네요.\n나들이 어때요?"
                    ],
                    snow: [
                        "오늘 눈이 올 것 같아요.\n따뜻하게 입고 나가세요."
                    ],
                    cloudy: [
                        "오늘은 날씨가 흐리네요ㅠㅠ"
                    ],
                    day_cloudy: [
                        "오늘은 날씨가 흐리네요ㅠㅠ"
                    ],
                    cloudy_windy: [
                        "밖에 바람이 많이 불어요.\n따듯하게 입고 나가세요. 감기조심!!"
                    ],
                    showers: [
                        "오늘 소나기가 올 것 같아요.\n우산을 챙기세요!"
                    ],
                    rain: [
                        "오늘 비가 올 것 같아요.\n우산을 챙기세요!"
                    ],
                    thunderstorm: [
                        "폭풍이 오고 있어요."
                    ],
                    night_cloudy: [
                        "오늘 밤에는 흐릴 것 같아요."
                    ],
                    night_clear: [
                        "밤하늘이 맑이요.\n별을 보기 좋은 날이에요."
                    ],
                    night_showers: [
                        "밤에 외출하실때 우산을 챙겨가세요.\n소나기가 올지도 몰라요!"
                    ],
                    night_rain: [
                        "밤에 외출하실때 우산을 챙겨가세요.\n비가 올지도 몰라요!"
                    ],
                    night_thunderstorm: [
                        "오늘 밤에는 천둥번개가 칠거에요.\n우르릉 쾅쾅!!"
                    ],
                    night_snow: [
                        "밤사이 눈이 내릴 것 같아요."
                    ],
                    night_alt_cloudy_windy: [
                        "날씨가 혼란스럽네요!!"
                    ],
                    fog: [
                        "안개가 짙어요.\n운전 할 때 조심하세요!!"
                    ]
                }
            },
            classes: "minsub"
        },
        // 김기훈
        {
            module: "MMM-Profile",
            position: "top_left",
            config: {
                // Transparency of the picture.
                opacity: 1.0,
                // Maximum width of the picture.
                maxWidth: "160px",
                // Maximum height of the picture.
                maxHeight: "160px",
                // Border-Radius of the picture.
                borderRadius: "50%",
                // The URL to the picture.
                // "./pictures/프로필사진.png"
                url: './pictures/kihun.png',
                // Add a profile name.
                yourName: "안녕하세요! 김기훈님.",
                // Add some random text to show.
                randomText: "\n\n\"거울아\" 라고 불러서\n음성비서를 호출 할 수 있습니다.\n\n",
                // Compliments
                compliments: {
                    day_sunny: [
                        "오늘 밖에 날씨가 좋네요.\n나들이 어때요?"
                    ],
                    snow: [
                        "오늘 눈이 올 것 같아요.\n따뜻하게 입고 나가세요."
                    ],
                    cloudy: [
                        "오늘은 날씨가 흐리네요ㅠㅠ"
                    ],
                    day_cloudy: [
                        "오늘은 날씨가 흐리네요ㅠㅠ"
                    ],
                    cloudy_windy: [
                        "밖에 바람이 많이 불어요.\n따듯하게 입고 나가세요. 감기조심!!"
                    ],
                    showers: [
                        "오늘 소나기가 올 것 같아요.\n우산을 챙기세요!"
                    ],
                    rain: [
                        "오늘 비가 올 것 같아요.\n우산을 챙기세요!"
                    ],
                    thunderstorm: [
                        "폭풍이 오고 있어요."
                    ],
                    night_cloudy: [
                        "오늘 밤에는 흐릴 것 같아요."
                    ],
                    night_clear: [
                        "밤하늘이 맑이요.\n별을 보기 좋은 날이에요."
                    ],
                    night_showers: [
                        "밤에 외출하실때 우산을 챙겨가세요.\n소나기가 올지도 몰라요!"
                    ],
                    night_rain: [
                        "밤에 외출하실때 우산을 챙겨가세요.\n비가 올지도 몰라요!"
                    ],
                    night_thunderstorm: [
                        "오늘 밤에는 천둥번개가 칠거에요.\n우르릉 쾅쾅!!"
                    ],
                    night_snow: [
                        "밤사이 눈이 내릴 것 같아요."
                    ],
                    night_alt_cloudy_windy: [
                        "날씨가 혼란스럽네요!!"
                    ],
                    fog: [
                        "안개가 짙어요.\n운전 할 때 조심하세요!!"
                    ]
                }
            },
            classes: "kihun"
        },
        // 권오동
        {
            module: "MMM-Profile",
            position: "top_left",
            config: {
                // Transparency of the picture.
                opacity: 1.0,
                // Maximum width of the picture.
                maxWidth: "160px",
                // Maximum height of the picture.
                maxHeight: "160px",
                // Border-Radius of the picture.
                borderRadius: "50%",
                // The URL to the picture.
                // "./pictures/프로필사진.png"
                url: './pictures/odong.png',
                // Add a profile name.
                yourName: "안녕하세요! 권오동님.",
                // Add some random text to show.
                randomText: "\n\n\"거울아\" 라고 불러서\n음성비서를 호출 할 수 있습니다.\n\n",
                // Compliments
                compliments: {
                    day_sunny: [
                        "오늘 밖에 날씨가 좋네요.\n나들이 어때요?"
                    ],
                    snow: [
                        "오늘 눈이 올 것 같아요.\n따뜻하게 입고 나가세요."
                    ],
                    cloudy: [
                        "오늘은 날씨가 흐리네요ㅠㅠ"
                    ],
                    day_cloudy: [
                        "오늘은 날씨가 흐리네요ㅠㅠ"
                    ],
                    cloudy_windy: [
                        "밖에 바람이 많이 불어요.\n따듯하게 입고 나가세요. 감기조심!!"
                    ],
                    showers: [
                        "오늘 소나기가 올 것 같아요.\n우산을 챙기세요!"
                    ],
                    rain: [
                        "오늘 비가 올 것 같아요.\n우산을 챙기세요!"
                    ],
                    thunderstorm: [
                        "폭풍이 오고 있어요."
                    ],
                    night_cloudy: [
                        "오늘 밤에는 흐릴 것 같아요."
                    ],
                    night_clear: [
                        "밤하늘이 맑이요.\n별을 보기 좋은 날이에요."
                    ],
                    night_showers: [
                        "밤에 외출하실때 우산을 챙겨가세요.\n소나기가 올지도 몰라요!"
                    ],
                    night_rain: [
                        "밤에 외출하실때 우산을 챙겨가세요.\n비가 올지도 몰라요!"
                    ],
                    night_thunderstorm: [
                        "오늘 밤에는 천둥번개가 칠거에요.\n우르릉 쾅쾅!!"
                    ],
                    night_snow: [
                        "밤사이 눈이 내릴 것 같아요."
                    ],
                    night_alt_cloudy_windy: [
                        "날씨가 혼란스럽네요!!"
                    ],
                    fog: [
                        "안개가 짙어요.\n운전 할 때 조심하세요!!"
                    ]
                }
            },
            classes: "odong"
        },
        // 달력
        {
            module: 'calendar_monthly',
            position: 'top_left',
            config: {
                // The config property is optional
                // Without a config, a default month view is shown
                // Please see the 'Configuration Options' section for more information
            },
            classes: "default minsub kihun odong",
        },
        // 공휴일 공개 캘린더
        {
            module: "calendar",
            header: "공휴일",
            position: "top_left",
            config: {
                maximumNumberOfDays: 60,
                calendars: [{
                    symbol: "calendar-check",
                    url: "https://p03-calendars.icloud.com/holidays/kr_ko.ics"
                }]
            },
            classes: "default minsub kihun odong"
        },
        // 미러 중앙 문구 표시 : CBNU MiraCloud Project
        {
            module: "compliments",
            position: "lower_third",
            classes: "default"
        },
        // 날씨 모듈 Openweather API Key
        {
            module: "currentweather",
            position: "top_right",
            config: {
                location: "Cheongju",
                locationID: "1845604", //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
                appid: "Open weather 날씨 API"
            },
            classes: "default minsub kihun odong"
        },
        {
            module: "weatherforecast",
            position: "top_right",
            header: "Weather Forecast",
            config: {
                location: "Cheongju",
                locationID: "1845604", //ID from https://openweathermap.org/city
                appid: "Open weather 날씨 API"
            },
            classes: "default minsub kihun odong"
        },
        {
            module: "MMM-MyScoreboard",
            position: "top_right",
            header: "경기 일정",
            config: {
                showLeagueSeparators: true,
                colored: true,
                viewStyle: "mediumLogos",
                sports: [{
                        league: "NBA",
                        teams: ["LAL","LAC","MIL","MIA","OKC","HOU"]
                        // Teams
                        // ---------------
                        // ATL   Atlanta Hawks
                        // BKN   Brooklyn Nets
                        // BOS   Boston Celtics
                        // CHA   Charlotte Hornets
                        // CHI   Chicago Bulls
                        // CLE   Cleveland Cavaliers
                        // DAL   Dallas Mavericks
                        // DEN   Denver Nuggets
                        // DET   Detroit Pistons
                        // GS    Golden State Warriors
                        // HOU   Houston Rockets
                        // IND   Indiana Pacers
                        // LAC   Los Angeles Clippers
                        // LAL   Los Angeles Lakers
                        // MEM   Memphis Grizzlies
                        // MIA   Miami Heat
                        // MIL   Milwaukee Bucks
                        // MIN   Minnesota Timberwolves
                        // NO    New Orleans Pelicans
                        // NY    New York Knicks
                        // OKC   Oklahoma City Thunder
                        // ORL   Orlando Magic
                        // PHI   Philadelphia 76ers
                        // PHX   Phoenix Suns
                        // POR   Portland Trail Blazers
                        // SAC   Sacramento Kings
                        // SA    San Antonio Spurs
                        // TOR   Toronto Raptors
                        // UTAH  Utah Jazz
                        // WSH   Washington Wizards
                        // Groups
                        // ---------------
                        // Atlantic
                        // Central
                        // Southeast
                        // Northwest
                        // Pacific
                        // Southwest
                        // East
                        // West
                    },
                    {
                        league: "ENG_PREMIERE_LEAGUE",
                        label: "영국 프리미어 리그"
                    }
                ]
            },
            classes: "kihun",
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
    module.exports = config;
}
