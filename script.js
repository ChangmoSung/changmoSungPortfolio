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
    const $projects = $('.project')
    const $playButton = $('.playButton');
    const $githubLink = $('.githubLink');
    const $liveLink = $('.liveLink');
    const $resumeLink = $('.resumeLink span');
    const $aboutPageContactLink = $('.aboutPageContactLink');
    const $contactSubmitButton = $('.contactSubmitButton');
    const $formInput = $('form input');
    const $formTextarea = $('form textarea');
    let videoPlaying = false;
    const $header = $('header');
    const $about = $('.about');
    const $contact = $('.contact');
    let selectedProject;
    let previouslySelectedProject;

    const currentTime = new Date();
    let second = currentTime.getSeconds();
    const minute = currentTime.getMinutes();
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    const month = currentTime.getMonth();
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = currentTime.getFullYear();
    
    $date.text(`${year}.${monthArray[month]}.${day}`);

    setInterval(() => {
        second++;

        if(second > 59) {
            second = 0;
        }

        $time.text(`${hour}.${minute < 10 ? `0${minute}` : `${minute}`}.${second < 10 ? `0${second}` : `${second}`}`)
    },1000)

    $welcomeDoor.addClass('doorOpened');
    $welcomeDoor.on('transitionend', function() {
        $(this).css('z-index', '-1');
    })

    $playButton.on('click', function () {
        const project = $(this).attr('data-project');
        const video = $(`video[data-project=${project}]`);
        const $button = $(this);

        if (videoPlaying) {
            video[0].pause();
            $button.html('<img src="assets/play.png" alt="play button"></img>');
        } else {
            video[0].play();
            $button.html('<img src="assets/pause.png" alt="pause button"></img>');
        }

        videoPlaying = !videoPlaying;
    });


    $mapOpener.on('click keypress', function(e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
            $cards.attr('tabindex', '0');
            $projects.attr('tabindex', '0');
            $resumeLink.attr('tabindex', '-1');
            $formInput.attr('tabindex', '-1');
            $formTextarea.attr('tabindex', '-1');

            // $aboutPageContactLink.attr('tabindex', '-1');
            // $contactSubmitButton.attr('tabindex', '-1');
            
            $mapOpener.removeClass('openerShown');

            
            if (selectedProject) {
                // --------- push it up first and then once it's not shown, push it down--------//
                previouslySelectedProject = selectedProject;
                previouslySelectedProject.removeClass('enlarged');

                $projectDoor.removeClass('projectDoorOpened');

                setTimeout(function() {
                    previouslySelectedProject.removeClass('selectedProject');
                }, 500)

                // // --------to prevent selectedProject from getting class again in the above code-------- //
                selectedProject = '';

                $playButton.attr('tabindex', '-1');

                // $liveLink.attr('tabindex', '-1');
                // $githubLink.attr('tabindex', '-1');
            }

            $me.removeClass('imageShown');
            $aboutContainer.removeClass('aboutContainerShown');
            $about.removeClass('aboutOpened');

            $contact.removeClass('contactOpened');
            $contactContainer.removeClass('contactShown');
        }
    })

    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //

    $cards.on('click keypress', function (e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
            $cards.attr('tabindex', '-1');
            $projects.attr('tabindex', '-1');
            $playButton.attr('tabindex', '-1');
            // $liveLink.attr('tabindex', '-1');
            // $githubLink.attr('tabindex', '-1');

            $mapOpener.addClass('openerShown');

            // ----------- non project list starts here -------------- //
            const selectedList = $(this).attr('data-selected');
            if (selectedList === '.about') {
                $resumeLink.attr('tabindex', '0');
                // $contactSubmitButton.attr('tabindex', '-1');
                // $aboutPageContactLink.attr('tabindex', '0');

                setTimeout(function () {
                    $about.addClass('aboutOpened');

                    setTimeout(function() {
                        $me.addClass('imageShown');
    
                        $aboutContainer.addClass('aboutContainerShown')
                    },200)
                }, 500);

            } else {
                $formInput.attr('tabindex', '0');
                $formTextarea.attr('tabindex', '0');
                // $contactSubmitButton.attr('tabindex', '0');
                // $aboutPageContactLink.attr('tabindex', '-1');

                $contact.addClass('contactOpened');
                $contactContainer.addClass('contactShown');
            }
        }
    })

    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click keypress', function(e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {
            

            $cards.attr('tabindex', '-1');
            $projects.attr('tabindex', '-1');
            $resumeLink.attr('tabindex', '-1');
            // $contactSubmitButton.attr('tabindex', '-1');
            // $aboutPageContactLink.attr('tabindex', '-1');

            $mapOpener.addClass('openerShown');

            // -------- current project selected here ------- //
            
            const project = $(this).attr('data-selected');
            selectedProject = $(project);

            selectedProject.addClass('selectedProject');

            setTimeout(function() {
                $projectDoor.addClass('projectDoorOpened');
                selectedProject.addClass('enlarged');
            }, 500)

            $playButton.attr('tabindex', '0');
            // $liveLink.children().attr('tabindex', '0');
            // $githubLink.children().attr('tabindex', '0');
        }
    })
}

$(function () {
    portfolio.init();
});