var app;
app = angular.module('app', []);

app.controller("InfoPageController", function ($rootScope, $scope) {
    $scope.templateBuild = {
        people: {
            "Admin McCoolPants": {
                skills: [0, 1]
            },
            "Cool Guy": {
                skills: [0]
            }
        },
        skills: [
			"Awesomeness",
			"Coolness"
		],
        multiSkillRoles: {
            "System Admin": {
                requires: [0, 1]
            }
        },
        teamArchetypes: {
            "Doing Stuff Team": {
                roles: {
                    Leader: {
                        requires: [0, 1]
                    }
                },
                newrole: ""
            }
        },
        teams: {
            "A-Team": {
                archetype: "Doing Stuff Team",
                members: {
                    Leader: "Admin McCoolPants"
                }
            }
        }
    };

    $scope.startBuilder = function (build) {
        if (build) {
            $rootScope.build = build;
        } else {
            $rootScope.build = $scope.templateBuild;
        }
        $("#Intro").addClass("hidden");
        $("#Builder").removeClass("hidden");
    };
});

app.controller("ScheduleBuilderController", function ($rootScope, $scope) {
    $scope.new = {
        person: "",
        skill: "",
        multiSkillRole: "",
        teamArchetype: "",
        team: ""
    };

    $scope.add = function (addMode) {
        switch (addMode) {
        case "Person":
            $rootScope.build.people[$scope.new.person] = {
                skills: []
            };
            $scope.new.person = "";
            break;
        case "Skill":
            $rootScope.build.skills.push($scope.new.skill);
            $scope.new.skill = "";
            break;
        case "MultiSkillRole":
            $rootScope.build.multiSkillRoles[$scope.new.multiSkillRole] = {
                requires: []
            };
            $scope.new.multiSkillRole = "";
            break;
        case "teamArchetype":
            $rootScope.build.teamArchetypes[$scope.new.teamArchetype] = {
                roles: {}
            };
            $scope.new.teamArchetype = "";
            break;
        case "Team":
            $rootScope.build.teams[$scope.new.team] = {
                archetype: "",
                members: {}
            };
            $scope.new.team = "";
            break;
        }
    };

    $scope.addArchetypeRole = function (archetype) {
        $rootScope.build.teamArchetypes[archetype].roles[$rootScope.build.teamArchetypes[archetype].newrole] = {
            requires: []
        };
        $rootScope.build.teamArchetypes[archetype].newrole = "";
    };

    $scope.updateRoles = function (team) {
        $rootScope.build.teams[team].members = {};
        for (var role in $rootScope.build.teamArchetypes[$rootScope.build.teams[team].archetype].roles) {
            $rootScope.build.teams[team].members[role] = "";
        }
    }

    $scope.refreshSkillDraggability = function () {
        $(".draggable-skill").draggable({
            helper: "clone"
        });
    }

    $scope.refreshPeopleDraggability = function () {
        $(".draggable-person").draggable({
            helper: "clone"
        })
        $(".draggable-person").droppable({
            drop: function (event, ui) {
                var newSkillId = parseInt(ui.draggable[0].id);
                if ($.inArray(newSkillId, $rootScope.build.people[event.target.id].skills) === -1) {
                    $rootScope.build.people[event.target.id].skills.push(newSkillId);
                    $scope.$apply();
                } else {
                    console.log("That person already has that skill!")
                }
            },
            accept: ".draggable-skill",
            addClasses: false,
            activeClass: "droppable"
        })

    }

    $scope.bringForward = function (panel) {
        switch (panel) {
        case 'people':
            $(".panel").addClass("hidden");
            $(".tab").removeClass("active");
            $("#people").removeClass("hidden");
            $("#people-tab").addClass("active");
            $("#skills").removeClass("hidden");
            $("#skills-tab").addClass("active");
            break;
        case 'skills':
            $(".panel").addClass("hidden");
            $(".tab").removeClass("active");
            $("#skills").removeClass("hidden");
            $("#skills-tab").addClass("active");
            break;
        case 'multi-skill-roles':
            $(".panel").addClass("hidden");
            $(".tab").removeClass("active");
            $("#multi-skill-roles").removeClass("hidden");
            $("#multi-skill-roles-tab").addClass("active");
            $("#skills").removeClass("hidden");
            $("#skills-tab").addClass("active");
            break;
        case 'team-archetypes':
            $(".panel").addClass("hidden");
            $(".tab").removeClass("active");
            $("#team-archetypes").removeClass("hidden");
            $("#team-archetypes-tab").addClass("active");
            $("#skills").removeClass("hidden");
            $("#skills-tab").addClass("active");
            break;
        case 'teams':
            $(".panel").addClass("hidden");
            $(".tab").removeClass("active");
            $("#teams").removeClass("hidden");
            $("#teams-tab").addClass("active");
            $("#people").removeClass("hidden");
            $("#people-tab").addClass("active");
            break;
        case 'schedule':
            $(".panel").addClass("hidden");
            $(".tab").removeClass("active");
            $("#schedule").removeClass("hidden");
            $("#schedule-tab").addClass("active");
            break;
        }
    };
});
