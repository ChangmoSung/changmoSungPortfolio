const portfolio = {};

portfolio.init = function () {
    const $date = $('.date');
    const $time = $('.time');
    const $welcomeDoor = $('.welcomeDoor');
    const $mapOpener = $('.mapOpener');
    const $map = $('.treasureMap');
    const $me = $('.me');
    const $cards = $('.card');
    const $projects = $('.project');
    const $about = $('.about');
    const $contact = $('.contact');
    const form = $('form');
    const input = $('input');
    const textarea = $('textarea');
    let selectedProject;
    let previouslySelectedProject;
    let projectVideo;
    let video;

// ////////////////////////////////////// //
// --------- current time start --------- //
// ////////////////////////////////////// //
    const currentTime = new Date();
    let second = currentTime.getSeconds();
    const minute = currentTime.getMinutes();
    const hour = currentTime.getHours();
    const day = currentTime.getDate();
    const month = currentTime.getMonth();
    const monthArray = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const year = currentTime.getFullYear();
    
    $date.text(`${year}.${monthArray[month]}.${day}`);

    setInterval(() => {
        second++;

        if(second > 59) {
            second = 0;
        }

        $time.text(`${hour}:${minute < 10 ? `0${minute}` : `${minute}`}:${second < 10 ? `0${second}` : `${second}`}`)
    },1000)
// ////////////////////////////////////// //
// --------- current time end ----------- //
// ////////////////////////////////////// //

    $welcomeDoor.addClass('doorOpened');
    setTimeout(function() {
        $welcomeDoor.css('z-index', '-1').removeClass('doorOpened').addClass('doorHidden');
    }, 500)

    $mapOpener.on('click keypress', function(e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') { 
            $welcomeDoor.removeClass('doorOpened');
            setTimeout(function () {
                $welcomeDoor.addClass('doorHidden');
                $map.css('opacity', '1');

                setTimeout(function () {
                    $welcomeDoor.css('z-index', '-1');
                }, 500)
            }, 600)

            $about.removeClass('aboutOpened');
            $contact.removeClass('contactOpened');
            $me.removeClass('imageShown');

            $mapOpener.removeClass('openerShown');

            
            if (selectedProject) {
                video[0].pause();

                previouslySelectedProject = selectedProject;
                previouslySelectedProject.removeClass('selectedProject');

                // // --------to prevent selectedProject from getting class again in the above code-------- //
                selectedProject = '';
            }
        }
    })

    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //

    $cards.on('click keypress', function (e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
            $welcomeDoor.removeClass('doorHidden').css('z-index', '2');
            $map.css('opacity', '0');

            // ----------- non project list starts here -------------- //
            const selectedList = $(this).attr('data-selected');
            if (selectedList === '.about') {
                setTimeout(function () {
                    $about.addClass('aboutOpened');
                    $welcomeDoor.addClass('doorOpened');

                    setTimeout(function() {
                        $me.addClass('imageShown');
                    },250)
                }, 600);

            } else {
                form.on('submit', function (e) {
                    e.preventDefault();

                    input.val('');
                    textarea.val('');
                });

                setTimeout(function() {
                    $contact.addClass('contactOpened');

                    $welcomeDoor.addClass('doorOpened');
                }, 600)
            }
            $mapOpener.addClass('openerShown');
        }
    })

    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click keypress', function(e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {
            // -------- current project selected here ------- //
            const project = $(this).attr('data-selected');
            selectedProject = $(project);

            projectVideo = $(this).attr('data-project');
            video = $(`video[data-project=${projectVideo}]`);

            $welcomeDoor.removeClass('doorHidden').css('z-index', '2');
            setTimeout(function () {
                $welcomeDoor.addClass('doorOpened');

                selectedProject.addClass('selectedProject');

                video[0].play();
            }, 600)

            $mapOpener.addClass('openerShown');

            $map.css('opacity', '0');
        }
    })
}

$(function () {
    portfolio.init();
});