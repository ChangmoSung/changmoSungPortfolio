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
    const $githubLink = $('.githubLink');
    const $liveLink = $('.liveLink');
    const $aboutPageContactLink = $('.aboutPageContactLink');
    const $contactSubmitButton = $('.contactSubmitButton');
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
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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

            // $aboutPageContactLink.attr('tabindex', '-1');
            // $contactSubmitButton.attr('tabindex', '-1');
            
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

                // $liveLink.attr('tabindex', '-1');
                // $githubLink.attr('tabindex', '-1');
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
            $cards.attr('tabindex', '-1');
            $projects.attr('tabindex', '-1');
            // $liveLink.attr('tabindex', '-1');
            // $githubLink.attr('tabindex', '-1');

            $mapOpener.addClass('openerShown');

            // ----------- non project list starts here -------------- //
            const selectedList = $(this).attr('data-selected');
            if (selectedList === '.about') {
                $resumeLink.attr('tabindex', '0');
                // $contactSubmitButton.attr('tabindex', '-1');
                // $aboutPageContactLink.attr('tabindex', '0');
                $about.addClass('aboutOpened');

                setTimeout(function () {
                    $projectDoor.addClass('projectDoorOpened');

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
                setTimeout(function() {
                    $contactContainer.addClass('contactShown');

                    $projectDoor.addClass('projectDoorOpened');
                }, 500)
            }
        }
    })

    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click keypress', function(e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {
            projectVideo = $(this).attr('data-project');
            video = $(`video[data-project=${projectVideo}]`);
            video[0].play();

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

            // $liveLink.children().attr('tabindex', '0');
            // $githubLink.children().attr('tabindex', '0');
        }
    })
}

$(function () {
    portfolio.init();
});