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
    let selectedProject;
    let previouslySelectedProject;
    let list;


    setTimeout(() => {
        $title.children().first().addClass('notVisible');
    }, 2500)

    setInterval(() => {
        if (hiddenTitle) {
            hiddenTitle.removeClass('visible');
            hiddenTitle.removeClass('notVisible');
        }

        if (previouslyVisibleTitle) {
            previouslyVisibleTitle.addClass('notVisible');

            hiddenTitle = previouslyVisibleTitle;
        }

        titleIndex++;

        if (titleIndex > 2) {
            titleIndex = 0;
        }

        visibleTitle = $title.find(titleList[titleIndex]);

        visibleTitle.addClass('visible');

        previouslyVisibleTitle = $title.find(titleList[titleIndex]);
    }, 2500)



    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click', 'li', function () {
        $header.fadeOut();
        $about.fadeOut();

        setTimeout(function () {
            $me.removeClass('imageShown');

            setTimeout(function () {
                $description.removeClass('descriptionShown');
            }, 500);
        }, 1);

        // if(previouslySelectedProject) {
        //     console.log(previouslySelectedProject)
        //     setTimeout(function() {
        //         console.log(previouslySelectedProject)
        //         previouslySelectedProject.children().removeClass('notSelected');
        //     }, 400)
        // }

        // ---------- previously selected project ---------- //
        if (selectedProject) {
            previouslySelectedProject = selectedProject;

            selectedProject.children().addClass('notSelected');
            selectedProject.children().removeClass('selected');

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

        setTimeout(function () {
            $about.children().removeClass('notSelected');
            $about.children().removeClass('selected');
        }, 400);
        //------------ maybe i can write a code for it like if($about.children().hasClass('notSelected))----------------//

        selectedProject.children().children()[1].children[0].play();

        // ----------current nav list item selected here----------- //
        list = $(this);
        list.css('pointer-events', 'none');
    })


    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //
    $info.on('click', 'li', function () {
        if (selectedProject) {
            selectedProject.children().addClass('notSelected');

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

        } else if (selectedList === '.about') {
            $header.fadeOut();
            
            $about.css('display', 'flex');

            setTimeout(function() {
                $me.addClass('imageShown');

                setTimeout(function () {
                    $description.addClass('descriptionShown');
                }, 500);
            },100);
        }
    })
}

$(function () {
    portfolio.init();
});