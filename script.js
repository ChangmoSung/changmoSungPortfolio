const portfolio = {};

portfolio.init = function() {
    const $title = $('.title')
    const titleList = ['Developer', 'Athlete', 'Food lover'];
    let titleIndex = 1;

    const $info = $('.info');
    const $projects = $('.projects');
    const $header = $('header');
    const $skills = $('.skills');
    let selectedProject;
    let list;

    setInterval(() => {
        $title.css('top', '10rem');

        $title.text(titleList[titleIndex])

        titleIndex++

        if(titleIndex > 2) {
            titleIndex = 0;
        }
    },3000)

    
    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click', 'li', function() {
        $header.fadeOut();
        if($skills.children().hasClass('selected')) {
            $skills.children().addClass('notSelected');
        }

        // -------previously selected project ---------- //
        if(selectedProject) {
            selectedProject.children().addClass('notSelected');

            selectedProject.children().children()[1].children[0].pause();
            selectedProject.children().children()[1].children[0].currentTime = 0;

            $(list).css('pointer-events', 'auto');
        }


        // --------current project selected here------- //
        const project = $(this).attr('data-selected');
        
        selectedProject = $(project);
        selectedProject.fadeIn(function() {
            selectedProject.children().removeClass('notSelected');
            selectedProject.children().removeClass('selected');

             // ---------to show it after the previous project is completely gone------- //
            setTimeout(function () {
                selectedProject.children().addClass('selected');
            }, 250)

            setTimeout(function() {
                $skills.children().removeClass('notSelected');
                $skills.children().removeClass('selected');
            },400)
        })

        selectedProject.children().children()[1].children[0].play();

        // ----------current nav list item selected here----------- //
        list = $(this);
        list.css('pointer-events', 'none');
    })


    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //
    $info.on('click', 'li', function() {
        if (selectedProject) {
            selectedProject.children().addClass('notSelected');

            selectedProject.children().children()[1].children[0].pause();
            selectedProject.children().children()[1].children[0].currentTime = 0;

            $(list).css('pointer-events', 'auto');
        }

        const selectedList = $(this).attr('data-selected');

        if(selectedList === '.header') {
            setTimeout(() => {
                $header.fadeIn();

                $skills.children().removeClass('notSelected');
                $skills.children().removeClass('selected');
            }, 400)

            $skills.children().addClass('notSelected');


        } else if(selectedList === '.skills') {
            setTimeout(function() {
                $skills.children().addClass('selected')
            }, 250)

            $header.fadeOut()
        }

    })
}

$(function() {
    portfolio.init();
});