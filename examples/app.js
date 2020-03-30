function configureLogging() {
    function log(level, messages) {
        const text = messages
            .map(message => {
                if (typeof message === 'object') {
                    return JSON.stringify(message, null, 2);
                } else {
                    return message;
                }
            })
            .join(' ');
        $('#logs').append($(`<div class="${level.toLowerCase()}">`).text(`[${new Date().toISOString()}] [${level}] ${text}\n`));
    }

    console._error = console.error;
    console.error = function(...rest) {
        log('ERROR', Array.prototype.slice.call(rest));
        console._error.apply(this, rest);
    };

    console._warn = console.warn;
    console.warn = function(...rest) {
        log('WARN', Array.prototype.slice.call(rest));
        console._warn.apply(this, rest);
    };

    console._log = console.log;
    console.log = function(...rest) {
        log('INFO', Array.prototype.slice.call(rest));
        console._log.apply(this, rest);
    };
}

function getRandomClientId() {
    return Math.random()
        .toString(36)
        .substring(2)
        .toUpperCase();
}

function getFormValues() {
    return {
        // region: $('#region').val(),
        channelName: $('#channelName').val(),
        // clientId: $('#clientId').val() || getRandomClientId(),
        // sendVideo: $('#sendVideo').is(':checked'),
        // sendAudio: $('#sendAudio').is(':checked'),
        // openDataChannel: $('#openDataChannel').is(':checked'),
        // widescreen: $('#widescreen').is(':checked'),
        // fullscreen: $('#fullscreen').is(':checked'),
        // useTrickleICE: $('#useTrickleICE').is(':checked'),
        // natTraversalDisabled: $('#natTraversalDisabled').is(':checked'),
        // forceTURN: $('#forceTURN').is(':checked'),
        // accessKeyId: $('#accessKeyId').val(),
        // endpoint: $('#endpoint').val() || null,
        // secretAccessKey: $('#secretAccessKey').val(),
        // sessionToken: $('#sessionToken').val() || null,
        region: "us-east-1",
        channelName: $('#channelName').val() || 1, //REPLACE WITH YOUR OWN AWS
        clientId: $('#clientId').val() || getRandomClientId(),
        sendVideo: true,
        sendAudio: true,
        openDataChannel: true,
        widescreen: false,
        fullscreen: true,
        useTrickleICE: true,
        natTraversalDisabled: false,
        forceTURN: false,
        accessKeyId: "", //REPLACE WITH YOUR OWN AWS
        //endpoint: $('#endpoint').val() || null,
        endpoint: null,
        secretAccessKey: "", //REPLACE WITH YOUR OWN AWS
        // sessionToken: $('#sessionToken').val() || null,
        sessionToken: "", //REPLACE WITH YOUR OWN AWS
    };
}

function toggleDataChannelElements() {
    if (getFormValues().openDataChannel) {
        $('.datachannel').removeClass('d-none');
    } else {
        $('.datachannel').addClass('d-none');
    }
}

function onStatsReport(report) {
    // TODO: Publish stats
}

// initialize the item div with message
$('#dynamic-div').html('<h5 style="text-align: center;">What do you guys want to do today?</h5>');

let gifs = [
    '<img src="./stretches/arms-hips.gif" style="height: 200px">',
    // '<img src="./stretches/quads.gif" style="height: 200px">',
    '<img src="./stretches/skipping.gif" style="height: 200px">',
    '<img src="./exercises/jumping_jacks.gif" style="height: 200px">',
    '<img src="./exercises/overhead.gif" style="height: 200px">',
    '<img src="./exercises/pushup.gif" style="height: 200px">',
    '<img src="./exercises/abs.gif" style="height: 200px">',
]
let size = gifs.length;
let nums = [0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5];
let count = 0;
function changeImage() {
    $('#dynamic-div').html(gifs[nums[count]]);
    count++;
}

let videos = [
    '<iframe width="420" height="315"src="https://www.youtube.com/embed/U6etLKswjq8?autoplay=1"></iframe>',
    '<iframe width="420" height="315"src="https://www.youtube.com/embed/CIxNJbit9BA?autoplay=1"></iframe>',
    '<iframe width="420" height="315"src="https://www.youtube.com/embed/pYu9fl7sUuI?autoplay=1"></iframe>',
    '<iframe width="420" height="315"src="https://www.youtube.com/embed/3V5KTB_y1ic?autoplay=1"></iframe>',
    '<iframe width="420" height="315"src="https://www.youtube.com/embed/3V5KTB_y1ic?autoplay=1"></iframe>',
    '<iframe width="420" height="315"src="https://www.youtube.com/embed/6coSK5__cTE?autoplay=1"></iframe>',
]
let vsize = videos.length;
let vnums = [0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5];
let vcount = 0;
function changeVideo() {
    $('#dynamic-div').html(videos[vnums[vcount]]);
    vcount++;
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    if (t<0) { return false; }
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
}
function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    function updateClock() {
      var t = getTimeRemaining(endtime);
      if (t) {
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      } else {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

let challenges = [
    '<h5>Plank</h5>',
    '<h5>Sit against the wall</h5>',
    '<h5>Handstand</h5>',
    '<h5>Superman pose</h5>',
    '<h5>One leg stand</h5>',
]
let csize = challenges.length;
let cnums = [0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5];
let ccount = 0;
function changeChallenge() {
    $('#dynamic-div').html(challenges[cnums[ccount]] +
        '<div class="container">' +
            '<div class="well">' +
                '<div class="counter" id="clockdiv">' +
                '<div class="sq">' +
                    '<span class="days bord">0</span> <span class="smalltext">Days</span>' +
                '</div>' +
                '<div class="sq">' +
                    '<span class="hours bord">0</span> <span class="smalltext">Hours</span>' +
                '</div>' +
                '<div class="sq">' +
                    '<span class="minutes bord">2</span> <span class="smalltext">Mins</span>' +
                '</div>' +
                '<div class="sq">' +
                    '<span class="seconds bord">00</span> <span class="smalltext">Secs</span>' +
                '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
    ccount++;
}

window.addEventListener('error', function(event) {
    console.error(event.message);
    event.preventDefault();
});

window.addEventListener('unhandledrejection', function(event) {
    console.error(event.reason.toString());
    event.preventDefault();
});

configureLogging();

$('#next-workout').click(async () => {
    changeImage();
    $('html, body').animate({
        scrollTop: $("#dynamic-div").offset().top
      }, 500);
});

$('#next-video').click(async () => {
    changeVideo();
    $('html, body').animate({
        scrollTop: $("#dynamic-div").offset().top
      }, 500);
});

$('#next-challenge').click(async () => {
    changeChallenge();
    var deadline = new Date(); //right now
    deadline.setMinutes(deadline.getMinutes() + 2); //Countdown of 2 mins
    initializeClock('clockdiv', deadline);
    $('html, body').animate({
        scrollTop: $("#dynamic-div").offset().top
      }, 500);
});

$('#master-button').click(async () => {
    $('#form').addClass('d-none');
    $('#instr').removeClass('d-none');
    $('#master').removeClass('d-none');
    $('#log').removeClass('d-none');

    const localView = $('#master .local-view')[0];
    const remoteView = $('#master .remote-view')[0];
    const localMessage = $('#master .local-message')[0];
    const remoteMessage = $('#master .remote-message')[0];
    const formValues = getFormValues();

    $(remoteMessage).empty();
    localMessage.value = '';
    toggleDataChannelElements();

    startMaster(localView, remoteView, formValues, onStatsReport, event => {
        remoteMessage.append(`${event.data}\n`);
    });
});

$('#stop-master-button').click(async () => {
    stopMaster();

    $('#form').removeClass('d-none');
    $('#instr').addClass('d-none');
    $('#master').addClass('d-none');
    $('#log').addClass('d-none');
});

$('#viewer-button').click(async () => {
    $('#form').addClass('d-none');
    $('#viewer').removeClass('d-none');
    $('#instr').removeClass('d-none');

    const localView = $('#viewer .local-view')[0];
    const remoteView = $('#viewer .remote-view')[0];
    const localMessage = $('#viewer .local-message')[0];
    const remoteMessage = $('#viewer .remote-message')[0];
    const formValues = getFormValues();

    $(remoteMessage).empty();
    localMessage.value = '';
    toggleDataChannelElements();

    startViewer(localView, remoteView, formValues, onStatsReport, event => {
        remoteMessage.append(`${event.data}\n`);
    });
});

$('#stop-viewer-button').click(async () => {
    stopViewer();

    $('#form').removeClass('d-none');
    $('#viewer').addClass('d-none');
    $('#instr').addClass('d-none');
});

$('#create-channel-button').click(async () => {
    const formValues = getFormValues();

    createSignalingChannel(formValues);
});

$('#master .send-message').click(async () => {
    const masterLocalMessage = $('#master .local-message')[0];
    sendMasterMessage(masterLocalMessage.value);
});

$('#viewer .send-message').click(async () => {
    const viewerLocalMessage = $('#viewer .local-message')[0];
    sendViewerMessage(viewerLocalMessage.value);
});

// Read/Write all of the fields to/from localStorage so that fields are not lost on refresh.
const urlParams = new URLSearchParams(window.location.search);
const fields = [
    { field: 'channelName', type: 'text' },
    { field: 'clientId', type: 'text' },
    { field: 'region', type: 'text' },
    { field: 'accessKeyId', type: 'text' },
    { field: 'secretAccessKey', type: 'text' },
    { field: 'sessionToken', type: 'text' },
    { field: 'endpoint', type: 'text' },
    { field: 'sendVideo', type: 'checkbox' },
    { field: 'sendAudio', type: 'checkbox' },
    { field: 'widescreen', type: 'radio', name: 'resolution' },
    { field: 'fullscreen', type: 'radio', name: 'resolution' },
    { field: 'openDataChannel', type: 'checkbox' },
    { field: 'useTrickleICE', type: 'checkbox' },
    { field: 'natTraversalEnabled', type: 'radio', name: 'natTraversal' },
    { field: 'forceTURN', type: 'radio', name: 'natTraversal' },
    { field: 'natTraversalDisabled', type: 'radio', name: 'natTraversal' },
];
fields.forEach(({ field, type, name }) => {
    const id = '#' + field;

    // Read field from localStorage
    try {
        const localStorageValue = localStorage.getItem(field);
        if (localStorageValue) {
            if (type === 'checkbox' || type === 'radio') {
                $(id).prop('checked', localStorageValue === 'true');
            } else {
                $(id).val(localStorageValue);
            }
            $(id).trigger('change');
        }
    } catch (e) {
        /* Don't use localStorage */
    }

    // Read field from query string
    if (urlParams.has(field)) {
        paramValue = urlParams.get(field);
        if (type === 'checkbox' || type === 'radio') {
            $(id).prop('checked', paramValue === 'true');
        } else {
            $(id).val(paramValue);
        }
    }

    // Write field to localstorage on change event
    $(id).change(function() {
        try {
            if (type === 'checkbox') {
                localStorage.setItem(field, $(id).is(':checked'));
            } else if (type === 'radio') {
                fields
                    .filter(fieldItem => fieldItem.name === name)
                    .forEach(fieldItem => {
                        localStorage.setItem(fieldItem.field, fieldItem.field === field);
                    });
            } else {
                localStorage.setItem(field, $(id).val());
            }
        } catch (e) {
            /* Don't use localStorage */
        }
    });
});

// The page is all setup. Hide the loading spinner and show the page content.
$('.loader').addClass('d-none');
$('#main').removeClass('d-none');
console.log('Page loaded');
