const portfolio = {};

portfolio.init = function () {
    const $navOpener = $('.navOpener');
    const $nav = $('nav');
    const $navLists = $('nav li');
    let navOpened = true;
    const $me = $('.me');
    const $aboutContainer = $('.aboutContainer');
    const $contactContainer = $('.contactFlexContainer');
    const $info = $('li[data-category=info]');
    const $projects = $('li[data-category=project');
    const $playButton = $('.playButton');
    const $githubLink = $('.githubLink');
    const $liveLink = $('.liveLink');
    const $resumeLink = $('.resumeLink');
    const $contactPageLink = $('.contactpageLink');
    const $contactSubmitButton = $('.contactSubmitButton');
    let videoPlaying = false;
    const $header = $('header');
    const $about = $('.about');
    const $contact = $('.contact');
    let selectedProject;
    let previouslySelectedProject;
    let list;

    $nav.css('top', '0');

    if(navOpened) {
        $navLists.attr('tabindex', '0');
    } else {
        $navLists.attr('tabindex', '-1');
    }

    $navOpener.on('click', function() {
        $nav.toggleClass('navOpened');
        $navOpener.toggleClass('navClosed');

        navOpened = !navOpened;
        if (navOpened) {
            $navLists.attr('tabindex', '0');
            $navOpener.text('hide');
        } else {
            $navLists.attr('tabindex', '-1');
            $navOpener.text('show');
        }
    })

    $playButton.on('click', function() {
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
    })

    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //
    $info.on('click keypress', function (e) {
        if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
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
                }, 250);

                $liveLink.attr('tabindex', '-1');
                $githubLink.attr('tabindex', '-1');
                $playButton.attr('tabindex', '-1');
                $resumeLink.attr('tabindex', '-1');
                $contactPageLink.attr('tabindex', '-1');
                $contactSubmitButton.attr('tabindex', '-1');

                // previouslySelectedProject.children().children()[1].children[0].pause();
                // previouslySelectedProject.children().children()[1].children[0].currentTime = 0;
                $(list).css('pointer-events', 'auto');
            }

            // ----------- non project list starts here -------------- //
            const selectedList = $(this).attr('data-selected');
            if (selectedList === '.header') {
                $header.fadeIn();

                $me.removeClass('imageShown');
                $aboutContainer.removeClass('aboutContainerShown');
                $about.fadeOut();

                $contact.fadeOut();
                $contactContainer.removeClass('contactShown');


            } else if (selectedList === '.about') {
                $header.fadeOut();

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

                $header.fadeOut();

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
            $header.fadeOut();
    
            $about.fadeOut();
            $me.removeClass('imageShown');
            $aboutContainer.removeClass('aboutContainerShown');
    
            $contact.fadeOut();
            $contactContainer.removeClass('contactShown');
    
            // ---------- previously selected project ---------- //
            if (selectedProject) {
                previouslySelectedProject = selectedProject;

                previouslySelectedProject.children().addClass('notSelected');

                setTimeout(function () {
                    previouslySelectedProject.children().removeClass('selected');
                    previouslySelectedProject.children().removeClass('notSelected');
                    previouslySelectedProject.removeClass('selectedProject');
                }, 250);

                $(list).css('pointer-events', 'auto');

                // previouslySelectedProject.children()[0].children[1].children[0].setAttribute('tabIndex', '-1');

                // previouslySelectedProject.children()[1].children[3].children[0].children[0].setAttribute('tabIndex', '-1');
                // previouslySelectedProject.children()[1].children[3].children[1].children[0].setAttribute('tabIndex', '-1');

                // previouslySelectedProject.children().children()[1].children[0].pause();
                // previouslySelectedProject.children().children()[1].children[0].currentTime = 0;
            }
    
            // -------- current project selected here ------- //
            
            const project = $(this).attr('data-selected');
            selectedProject = $(project);
            setTimeout(function() {
                selectedProject.addClass('selectedProject');
                selectedProject.children().addClass('selected');
    
                $liveLink.attr('tabindex', '0');
                $githubLink.attr('tabindex', '0');
                $playButton.attr('tabindex', '0');
                $resumeLink.attr('tabindex', '0');
                $contactPageLink.attr('tabindex', '0');
                $contactSubmitButton.attr('tabindex', '0');
            }, 250)

            // ----------current nav list item selected here----------- //
            list = $(this);
            list.css('pointer-events', 'none');
        }
    })
}

$(function () {
    portfolio.init();
});