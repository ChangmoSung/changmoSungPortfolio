const portfolio = {};

portfolio.init = function () {
    const $date = $('.date');
    const $time = $('.time');
    const $welcomeDoor = $('.welcomeDoor');
    const $projectDoor = $('.projectDoor');
    const $mapOpener = $('.mapOpener');
    const $me = $('.me');
    const $aboutContainer = $('.aboutContainer');
    const $contactContainer = $('.contactFlexContainer');
    const $cards = $('.card');
    const $projects = $('.project');
    let projectVideo;
    let video;
    const $resumeLink = $('.resumeLink span');
    const $formInput = $('form input');
    const $formTextarea = $('form textarea');
    const $about = $('.about');
    const $contact = $('.contact');
    let selectedProject;
    let previouslySelectedProject;

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
    $welcomeDoor.on('transitionend', function() {
        $(this).css('z-index', '-1');
    })

    $mapOpener.on('click keypress', function(e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
            $cards.attr('tabindex', '0');
            $projects.attr('tabindex', '0');
            $resumeLink.attr('tabindex', '-1');
            $formInput.attr('tabindex', '-1');
            $formTextarea.attr('tabindex', '-1');
            
            $mapOpener.removeClass('openerShown');
            
            $projectDoor.removeClass('projectDoorOpened');

            if (selectedProject) {
                // --------- push it up first and then once it's not shown, push it down--------//
                video[0].pause();

                previouslySelectedProject = selectedProject;
                previouslySelectedProject.removeClass('enlarged');


                setTimeout(function() {
                    previouslySelectedProject.removeClass('selectedProject');
                }, 500)

                // // --------to prevent selectedProject from getting class again in the above code-------- //
                selectedProject = '';
            }

            setTimeout(function() {
                $about.removeClass('aboutOpened');
                $contact.removeClass('contactOpened');
            },500)

            $me.removeClass('imageShown');
            $aboutContainer.removeClass('aboutContainerShown');

            $contactContainer.removeClass('contactShown');
        }
    })

    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //

    $cards.on('click keypress', function (e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
            const cardCoords = this.getBoundingClientRect();
            const coords = {
                top: cardCoords.top,
                left: cardCoords.left,
            }

            // ----------- non project list starts here -------------- //
            const selectedList = $(this).attr('data-selected');
            if (selectedList === '.about') {
                $about.addClass('aboutOpened');
                $about.css('transform-origin', `${coords.left}px ${coords.top}px`);

                setTimeout(function () {
                    $projectDoor.addClass('projectDoorOpened');

                    setTimeout(function() {
                        $me.addClass('imageShown');
    
                        $aboutContainer.addClass('aboutContainerShown')
                    },200)
                }, 500);

            } else {
                $contact.addClass('contactOpened');
                $contact.css('transform-origin', `${coords.left}px ${coords.top}px`);
                setTimeout(function() {
                    $contactContainer.addClass('contactShown');

                    $projectDoor.addClass('projectDoorOpened');
                }, 500)
            }

            $mapOpener.addClass('openerShown');
        }
    })

    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click keypress', function(e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {
            const videoCoords = this.getBoundingClientRect();

            const coords = {
                top: videoCoords.top,
                left: videoCoords.left,
            }

            // -------- current project selected here ------- //
            const project = $(this).attr('data-selected');
            selectedProject = $(project);

            selectedProject.css('transform-origin', `${coords.left}px ${coords.top}px`);
            selectedProject.addClass('selectedProject');

            setTimeout(function () {
                $projectDoor.addClass('projectDoorOpened');
                selectedProject.addClass('enlarged');
            }, 500)

            projectVideo = $(this).attr('data-project');
            video = $(`video[data-project=${projectVideo}]`);
            video[0].play();

            $mapOpener.addClass('openerShown');
        }
    })
}

$(function () {
    portfolio.init();
});