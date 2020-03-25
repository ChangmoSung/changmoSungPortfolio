const portfolio = {};

portfolio.init = function () {
    const $navOpener = $('.navOpener');
    const $nav = $('nav');
    const $navLists = $('nav li');
    let navOpened = true;
    const $me = $('.me');
    const $aboutContainer = $('.aboutContainer');
    const $info = $('li[data-category=info]');
    const $projects = $('li[data-category=project');
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
        } else {
            $navLists.attr('tabindex', '-1');
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

                previouslySelectedProject.children()[0].children[1].children[0].setAttribute('tabIndex', '-1');

                previouslySelectedProject.children()[1].children[3].children[0].children[0].setAttribute('tabIndex', '-1');
                previouslySelectedProject.children()[1].children[3].children[1].children[0].setAttribute('tabIndex', '-1');

                previouslySelectedProject.children().children()[1].children[0].pause();
                previouslySelectedProject.children().children()[1].children[0].currentTime = 0;
            }
    
            // -------- current project selected here ------- //
            
            const project = $(this).attr('data-selected');
            selectedProject = $(project);

            setTimeout(function() {
                selectedProject.addClass('selectedProject');
                selectedProject.children().addClass('selected');
    
                selectedProject.children()[0].children[1].children[0].setAttribute('tabIndex', '0');
                
                selectedProject.children()[1].children[3].children[0].children[0].setAttribute('tabIndex', '0');
                selectedProject.children()[1].children[3].children[1].children[0].setAttribute('tabIndex', '0');
            }, 250)

            // ----------current nav list item selected here----------- //
            list = $(this);
            list.css('pointer-events', 'none');
        }
    })


    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //
    $info.on('click keypress', function (e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {
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

                previouslySelectedProject.children()[0].children[1].children[0].setAttribute('tabIndex', '-1');

                previouslySelectedProject.children()[1].children[3].children[0].children[0].setAttribute('tabIndex', '-1');
                previouslySelectedProject.children()[1].children[3].children[1].children[0].setAttribute('tabIndex', '-1');

                previouslySelectedProject.children().children()[1].children[0].pause();
                previouslySelectedProject.children().children()[1].children[0].currentTime = 0;
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
    
            } else if (selectedList === '.about') {
                $header.fadeOut();
                $contact.fadeOut();

                $about.css('display', 'flex');

                setTimeout(function() {
                    $me.addClass('imageShown');

                    $aboutContainer.addClass('aboutContainerShown')
                },50);
    
            } else if(selectedList === '.contact'){
                $contact.css('display', 'flex')

                setTimeout(function() {
                    $contact.children()[0].classList.add('formShown')
                },300)

                $header.fadeOut();
    
                $about.fadeOut();
                $me.removeClass('imageShown');
                $aboutContainer.removeClass('aboutContainerShown');
            }
        }
    })
}

$(function () {
    portfolio.init();
});