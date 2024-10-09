function skillsMember(){
    return {
        restrict: 'E',
        templateUrl: 'modules/members/skills.html',
        controller: 'SkillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}