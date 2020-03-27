const portfolio = {};

portfolio.init = function () {
    const $welcomeDoor = $('.welcomeDoor');
    const $mapOpener = $('.mapOpener');
    const $me = $('.me');
    const $aboutContainer = $('.aboutContainer');
    const $contactContainer = $('.contactFlexContainer');
    const $cards = $('.card');
    const $projects = $('.project')
    const $playButton = $('.playButton');
    const $githubLink = $('.githubLink');
    const $liveLink = $('.liveLink');
    const $resumeLink = $('.resumeLink');
    const $aboutPageContactLink = $('.aboutPageContactLink');
    const $contactSubmitButton = $('.contactSubmitButton');
    let videoPlaying = false;
    const $header = $('header');
    const $about = $('.about');
    const $contact = $('.contact');
    let selectedProject;
    let previouslySelectedProject;
    let list;

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
            $button.html('<img src="assets/play.png" alt=""></img>');
        } else {
            video[0].play();
            $button.html('<img src="assets/pause.png" alt=""></img>');
        }

        videoPlaying = !videoPlaying;
    });


    $mapOpener.on('click keypress', function(e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
            // $cards.attr('tabindex', '0');
            // $projects.attr('tabindex', '0');

            if (selectedProject) {
                // --------- push it up first and then once it's not shown, push it down--------//
                previouslySelectedProject = selectedProject;

                previouslySelectedProject.children().addClass('notSelected');

                setTimeout(function () {
                    previouslySelectedProject.children().removeClass('selected');
                    previouslySelectedProject.children().removeClass('notSelected');
                    previouslySelectedProject.removeClass('selectedProject');

                    // // --------to prevent selectedProject from getting class again in the above code-------- //
                    selectedProject = '';

                    $header.removeClass('closed');
                }, 250);

                // $liveLink.attr('tabindex', '-1');
                // $githubLink.attr('tabindex', '-1');
                // $playButton.attr('tabindex', '-1');
                // $resumeLink.attr('tabindex', '-1');
                // $aboutPageContactLink.attr('tabindex', '-1');
                // $contactSubmitButton.attr('tabindex', '-1');

                $(list).css('pointer-events', 'auto');
            }

            setTimeout(function() {
                $header.removeClass('closed')
            }, 250)

            $me.removeClass('imageShown');
            $aboutContainer.removeClass('aboutContainerShown');
            $about.fadeOut();

            $contact.fadeOut();
            $contactContainer.removeClass('contactShown');
        }
    })

    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //

    $cards.on('click keypress', function (e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
            // $cards.attr('tabindex', '-1');
            // $projects.attr('tabindex', '-1');

            $header.addClass('closed');

            // ----------- non project list starts here -------------- //
            const selectedList = $(this).attr('data-selected');
            if (selectedList === '.about') {
                $about.css('display', 'flex');

                setTimeout(function () {
                    $me.addClass('imageShown');

                    $aboutContainer.addClass('aboutContainerShown')
                }, 50);

                $contact.fadeOut();
                $contactContainer.removeClass('contactShown');

            } else if (selectedList === '.contact') {
                $contact.css('display', 'flex').css('z-index', '2');

                setTimeout(function () {
                    $contactContainer.addClass('contactShown');
                }, 50)

                $about.fadeOut();
                $me.removeClass('imageShown');
                $aboutContainer.removeClass('aboutContainerShown');
            }
        }
    })

    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click keypress', function(e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {
            // $cards.attr('tabindex', '-1');
            // $projects.attr('tabindex', '-1');

            $header.addClass('closed');

            $about.fadeOut();
            $me.removeClass('imageShown');
            $aboutContainer.removeClass('aboutContainerShown');
    
            $contact.fadeOut();
            $contactContainer.removeClass('contactShown');
    
            // -------- current project selected here ------- //
            
            const project = $(this).attr('data-selected');
            selectedProject = $(project);

            setTimeout(function() {
                selectedProject.addClass('selectedProject');
                selectedProject.children().addClass('selected');
    
                // $liveLink.attr('tabindex', '0');
                // $githubLink.attr('tabindex', '0');
                // $playButton.attr('tabindex', '0');
                // $resumeLink.attr('tabindex', '0');
                // $aboutPageContactLink.attr('tabindex', '0');
                // $contactSubmitButton.attr('tabindex', '0');
            }, 200)

            // ----------current nav list item selected here----------- //
            list = $(this);
            list.css('pointer-events', 'none');
        }
    })
}

$(function () {
    portfolio.init();
});