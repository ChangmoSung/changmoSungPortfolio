const portfolio = {};

portfolio.init = function () {
    const $greeting = $('.greeting');
    const $navOpener = $('.navOpener');
    const $nav = $('nav');
    const $navLists = $('nav li');
    let navOpened = false;
    const $me = $('.me');
    const $aboutContainer = $('.aboutContainer');
    const $title = $('.title');
    const titleList = ['.developer', '.athlete', '.foodLover'];
    let titleIndex = 0;
    let visibleTitle;
    let previouslyVisibleTitle;
    let hiddenTitle;
    const $info = $('li[data-category=info]');
    const $projects = $('li[data-category=project');
    const $header = $('header');
    const $about = $('.about');
    const $contact = $('.contact');
    let selectedProject;
    let previouslySelectedProject;
    let list;

    setTimeout(function() {
        $greeting.fadeOut(function() {
            navOpened = !navOpened;
            $header.css('opacity', '1');
            $nav.css('top', '0');
            if(navOpened) {
                $navLists.attr('tabindex', '0');
            } else {
                $navLists.attr('tabindex', '-1');
            }
        })
    })

    $navOpener.on('click', function() {
        navOpened = !navOpened;
        
        $nav.toggleClass('navOpened');
        $navOpener.toggleClass('navClosed');

        if (navOpened) {
            $navLists.attr('tabindex', '0');
        } else {
            $navLists.attr('tabindex', '-1');
        }
    })

// ---------the title shown on load (because the interval runs after 2.5 seconds)---------- //
    setTimeout(() => {
        $title.children().first().addClass('notVisible');
    }, 2500)

    setInterval(() => {
// -----------third title shown----------- //
        if (hiddenTitle) {
            hiddenTitle.removeClass('visible');
            hiddenTitle.removeClass('notVisible');
        }

// ----------second title shown-------------- //
        if (previouslyVisibleTitle) {
            previouslyVisibleTitle.addClass('notVisible');

            hiddenTitle = previouslyVisibleTitle;
        }

        titleIndex++;

        if (titleIndex > 2) {
            titleIndex = 0;
        }
// --------first title shown----------- //
        visibleTitle = $title.find(titleList[titleIndex]);

        visibleTitle.addClass('visible');

        previouslyVisibleTitle = $title.find(titleList[titleIndex]);
    }, 2500)


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
                selectedProject.children()[0].children[1].children[0].setAttribute('tabIndex', '-1');

                selectedProject.children()[1].children[3].children[0].children[0].setAttribute('tabIndex', '-1');
                selectedProject.children()[1].children[3].children[1].children[0].setAttribute('tabIndex', '-1');
                
                selectedProject.removeClass('selectedProject');
                selectedProject.children().removeClass('selected');
                selectedProject.children().addClass('notSelected');
    
    //--------- push it up first and then once it's not shown, push it down--------//
                previouslySelectedProject = selectedProject;
                setTimeout(function() {
                    previouslySelectedProject.children().removeClass('notSelected');
                }, 400)
    
                selectedProject.children().children()[1].children[0].pause();
                selectedProject.children().children()[1].children[0].currentTime = 0;
    
                $(list).css('pointer-events', 'auto');
            }
    
            // -------- current project selected here ------- //
            const project = $(this).attr('data-selected');
            selectedProject = $(project).addClass('selectedProject');
            selectedProject.children()[0].children[1].children[0].setAttribute('tabIndex', '0');
            
            selectedProject.children()[1].children[3].children[0].children[0].setAttribute('tabIndex', '0');
            selectedProject.children()[1].children[3].children[1].children[0].setAttribute('tabIndex', '0');

            selectedProject.children().addClass('selected');

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
                selectedProject.removeClass('selectedProject');
                selectedProject.children().addClass('notSelected');

    
    //--------- push it up first and then once it's not shown, push it down--------//
                previouslySelectedProject = selectedProject;
                setTimeout(function() {
                    previouslySelectedProject.children().removeClass('selected');
                    previouslySelectedProject.children().removeClass('notSelected');
    
    // --------to prevent selectedProject from getting class again in the above code-------- //
                    selectedProject = '';
                }, 400)
    
                selectedProject.children().children()[1].children[0].pause();
                selectedProject.children().children()[1].children[0].currentTime = 0;
    
                $(list).css('pointer-events', 'auto');
            }
    
// ----------- non project list starts here -------------- //
            const selectedList = $(this).attr('data-selected');
    
            if (selectedList === '.header') {
                $me.removeClass('imageShown');
                $aboutContainer.removeClass('aboutContainerShown');

                $about.fadeOut(function() {
                    $header.fadeIn('slow');
                });
    
                $contact.fadeOut();
    
            } else if (selectedList === '.about') {
                $header.fadeOut();
                $contact.fadeOut();

                $about.css('display', 'flex');

                setTimeout(function() {
                    $me.addClass('imageShown');

                    setTimeout(function() {
                        $aboutContainer.addClass('aboutContainerShown')
                    },600)
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