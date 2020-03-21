const portfolio = {};

portfolio.init = function () {
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
        if ($about.children().hasClass('selected')) {
            $about.children().addClass('notSelected');
        }

        // -------previously selected project ---------- //
        if (selectedProject) {
            selectedProject.children().addClass('notSelected');

            selectedProject.children().children()[1].children[0].pause();
            selectedProject.children().children()[1].children[0].currentTime = 0;

            $(list).css('pointer-events', 'auto');
        }


        // --------current project selected here------- //
        const project = $(this).attr('data-selected');

        selectedProject = $(project);
        selectedProject.fadeIn(function () {
            selectedProject.children().removeClass('notSelected');
            selectedProject.children().removeClass('selected');

            // ---------to show it after the previous project is completely gone------- //
            setTimeout(function () {
                selectedProject.children().addClass('selected');
            }, 250)

            setTimeout(function () {
                $about.children().removeClass('notSelected');
                $about.children().removeClass('selected');
            }, 400)
        })

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
            $header.fadeIn();


        } else if (selectedList === '.about') {
            $header.fadeOut(function() {
                $('.me').addClass('imageShown')

            })
        }
    })
}

$(function () {
    portfolio.init();
});