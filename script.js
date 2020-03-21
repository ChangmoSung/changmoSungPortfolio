const portfolio = {};

portfolio.init = function () {
    const $me = $('.me');
    const $description = $('.description');
    const $title = $('.title')
    const titleList = ['.developer', '.athlete', '.foodLover'];
    let titleIndex = 0;
    let visibleTitle;
    let previouslyVisibleTitle;
    let hiddenTitle;
    const $info = $('.info');
    const $projects = $('.projects');
    const $header = $('header');
    const $about = $('.about');
    const $contact = $('.contact');
    let selectedProject;
    let previouslySelectedProject;
    let list;

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
    $projects.on('click keypress', 'li', function(e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {

            $header.fadeOut();
    
            $about.fadeOut();
            $me.removeClass('imageShown');
            $description.removeClass('descriptionShown');
    
            $contact.fadeOut();
    
    
            // ---------- previously selected project ---------- //
            if (selectedProject) {
                previouslySelectedProject = selectedProject;
    
                selectedProject.children().addClass('notSelected');
                selectedProject.children().removeClass('selected');
    
    //--------- push it up first and then once it's not shown, push it down--------//
                setTimeout(function() {
                    previouslySelectedProject.children().removeClass('notSelected');
                }, 400)
    
                selectedProject.children().children()[1].children[0].pause();
                selectedProject.children().children()[1].children[0].currentTime = 0;
    
                $(list).css('pointer-events', 'auto');
            }
    
    
            // -------- current project selected here ------- //
            const project = $(this).attr('data-selected');
            selectedProject = $(project);
    
            selectedProject.children().addClass('selected');
    
            selectedProject.children().children()[1].children[0].play();
    
            // ----------current nav list item selected here----------- //
            list = $(this);
            list.css('pointer-events', 'none');
        }
    })


    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //
    $info.on('click keypress', 'li', function (e) {
        if(e.keyCode === 13 || typeof e.keyCode !== 'number') {

            if (selectedProject) {
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
    
            const selectedList = $(this).attr('data-selected');
    
            if (selectedList === '.header') {
                
                $me.removeClass('imageShown');
    
                $description.removeClass('descriptionShown');
                
                $about.fadeOut(function() {
                    $header.fadeIn('slow');
                });
    
                $contact.fadeOut();
    
            } else if (selectedList === '.about') {
                $header.fadeOut();
                
                $about.css('display', 'flex');
    
                setTimeout(function() {
                    $me.addClass('imageShown');
    
                    setTimeout(function () {
                        $description.addClass('descriptionShown');
                    }, 500);
                },300);
    
                $contact.fadeOut();
    
            } else if(selectedList === '.contact'){
                $header.fadeOut();
    
                $about.fadeOut();
                $me.removeClass('imageShown');
                $description.removeClass('descriptionShown');
              
                $contact.fadeIn();
            }
        }
    })
}

$(function () {
    portfolio.init();
});