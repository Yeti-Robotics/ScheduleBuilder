var app;
app = angular.module('app', []);

app.controller("InfoPageController", function ($rootScope, $scope, $http) {
    $scope.templateBuild = {
        people: {
            "Admin McCoolPants": {
                skills: [0, 1]
            },
            "Cool Guy": {
                skills: [0]
            }
        },
        skills: {
			"0": "Awesomeness",
			"1": "Coolness"
		},
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
	
	$http.get("php/getScheduleNames.php").then(function (response) {
		$scope.schedules = response.data;
	}, function (response) {
		console.log("Error" + response.data);
	});
	
	$scope.getScheduleData = function (scheduleName) {
		$http.get("php/getSchedule.php", {
			params: {
				competition: scheduleName
			}
		}).then(function (response) {
			$scope.startBuilder(response.data);
		}, function (response) {
			console.log("Error: " + response.data);
		});
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
			$rootScope.build.skills[Object.getOwnPropertyNames($rootScope.build.skills).length] = $scope.new.skill;
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
	
	$scope.removeStem = function (removeType, item, array) {
		switch (removeType) {
			case "Person":
            	break;
			case "Skill":
				array.splice(array.indexOf(item), 1);
				break;
			case "MultiSkillRole":
				break;
			case "teamArchetype":
				break;
			case "Team":
				break;
		}
	}
	
	$scope.removeRoot = function (removeType, item, archetypeRole) {
		switch (removeType) {
			case "Person":
				delete $rootScope.build.people[item];
            	break;
			case "Skill":
				var skillIndex;
				for (var skillId in $rootScope.build.skills) {
					if ($rootScope.build.skills[skillId] == item) {
						skillIndex = parseInt(skillId);
					}
				}
				delete $rootScope.build.skills[skillIndex];
				for (var name in $rootScope.build.people) {
					if ($rootScope.build.people.hasOwnProperty(name)) {
						var obj = $rootScope.build.people[name];
						obj.skills.splice(obj.skills.indexOf(skillIndex), 1);
					}
				}
				for (var name in $rootScope.build.multiSkillRoles) {
					if ($rootScope.build.multiSkillRoles.hasOwnProperty(name)) {
						var obj = $rootScope.build.multiSkillRoles[name];
						obj.requires.splice(obj.requires.indexOf(skillIndex), 1);
					}
				}
				for (var name in $rootScope.build.teamArchetypes) {
					if ($rootScope.build.teamArchetypes.hasOwnProperty(name)) {
						var obj = $rootScope.build.teamArchetypes[name];
						for (var role in obj.roles) {
							if (obj.roles.hasOwnProperty(role)) {
								obj.roles[role].requires.splice(obj.roles[role].requires.indexOf(skillIndex), 1);
							}
						}
					}
				}
				break;
			case "MultiSkillRole":
				delete $rootScope.build.multiSkillRoles[item];
				break;
			case "teamArchetype":
				delete $rootScope.build.teamArchetypes[item];
				break;
			case "archetypeRole":
				delete $rootScope.build.teamArchetypes[item].roles[archetypeRole];
				break;
			case "Team":
				delete $rootScope.build.teams[item];
				break;
		}
	}

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
        });
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
        });

    };

    $scope.refreshMultiSkillRolesDraggability = function () {
        $(".draggable-multi-skill-role").draggable({
            helper: "clone"
        });
        $(".draggable-multi-skill-role").droppable({
            drop: function (event, ui) {
                var newSkillId = parseInt(ui.draggable[0].id);
                if ($.inArray(newSkillId, $rootScope.build.multiSkillRoles[event.target.id].requires) === -1) {
                    $rootScope.build.multiSkillRoles[event.target.id].requires.push(newSkillId);
                    $scope.$apply();
                } else {
                    console.log("That multi skill role already requires that skill!")
                }
            },
            accept: ".draggable-skill",
            addClasses: false,
            activeClass: "droppable"
        });
    };

    $scope.refreshTeamRoleDraggability = function () {
        $(".draggable-team-role").droppable({
            drop: function (event, ui) {
                var newSkillId = parseInt(ui.draggable[0].id);
                var role = event.target.id.split("|");
                if ($.inArray(newSkillId, $rootScope.build.teamArchetypes[role[0]].roles[role[1]].requires) === -1) {
                    $rootScope.build.teamArchetypes[role[0]].roles[role[1]].requires.push(newSkillId);
                    $scope.$apply();
                } else {
                    console.log("That role already requires that skill!")
                }
            },
            accept: ".draggable-skill",
            addClasses: false,
            activeClass: "droppable"
        });
    };

    $scope.refreshTeamMemberDraggability = function (role) {
        $(".draggable-team-member").droppable({
            drop: function (event, ui) {
                var memberName = ui.draggable[0].id;
                var role = event.target.id.split("|");
                console.log(memberName);
                console.log(role);
                $rootScope.build.teams[role[0]].members[role[1]] = memberName;
                $scope.$apply();
            },
            accept: function (dropped) {
				var children = $(dropped).children();
				var skills = {};
				for (var i = 0; i < children.length; i++) {
					if ($rootScope.build.skills.hasOwnProperty($(children[i]).attr("id"))) {
						skills[$(children[i]).attr("id")] = $rootScope.build.skills[$(children[i]).attr("id")];
					}
				}
				var requiredSkills = {};
				for (var i = 0; i < role.requires.length; i++) {
					if ($rootScope.build.skills.hasOwnProperty(role.requires[i])) {
						requiredSkills[role.requires[i]] = $rootScope.build.skills[role.requires[i]];
					}
				}
				
				for (var requiredSkill in requiredSkills) {
					if (!skills.hasOwnProperty("" + requiredSkill)) {
						return false;
					}
				}
				
				return true;
			},
            addClasses: false,
            activeClass: "droppable"
        });
    };

    $scope.bringForward = function (panel) {
        switch (panel) {
			case 'schedules':
				$(".panel").addClass("hidden");
				$(".tab").removeClass("active");
				$("#Intro").removeClass("hidden");
        		$("#Builder").addClass("hidden");
				break;
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
			case 'schedule-builder':
				$(".panel").addClass("hidden");
				$(".tab").removeClass("active");
				$("#schedule-builder").removeClass("hidden");
				$("#schedule-builder-tab").addClass("active");
				break;
        }
    };
});
