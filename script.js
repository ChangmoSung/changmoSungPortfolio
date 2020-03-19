const portfolio = {};

portfolio.init = function() {
    const $info = $('.info');
    const $projects = $('.projects');
    const $header = $('header');
    const $skills = $('.skills');
    let selectedProject;
    let list;
    const $firstProject = $('.firstProject');
    const $seoncdProject = $('.secondProject');
    const $thirdProject = $('.thirdProject');
    const $fourthProject = $('.fourthProject');

    
    // ------------------------------- //
    // ------------project------------ //
    // ------------------------------- //
    $projects.on('click', 'li', function() {
        $header.fadeOut('slow');
        $skills.children().removeClass('selected');


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

            setTimeout(function () {
                selectedProject.children().addClass('selected');
            }, 400)
        })
        
        // ---------to show it after the previous project is completely gone------- //

        selectedProject.children().children()[1].children[0].play();

        // ----------current clickedList item selected here----------- //
        list = $(this);
        $(list).css('pointer-events', 'none');
    })


    // ---------------------------- //
    // ------------Info------------ //
    // ---------------------------- //
    $info.on('click', 'li', function() {
        if (selectedProject) {
            selectedProject.children().removeClass('selected');

            selectedProject.children().children()[1].children[0].pause();
            selectedProject.children().children()[1].children[0].currentTime = 0;

            $(list).css('pointer-events', 'auto');
        }

        const selectedList = $(this).attr('data-selected');

        if(selectedList === '.header') {
            setTimeout(() => {
                $header.fadeIn();
            }, 400)

            $skills.children().removeClass('selected');

        } else if(selectedList === '.skills') {
            setTimeout(function() {
                $skills.children().addClass('selected')
            }, 400)

            $header.fadeOut()
        }

    })
}

$(function() {
    portfolio.init();
});