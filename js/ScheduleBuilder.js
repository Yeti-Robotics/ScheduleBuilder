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
						requires: [0]
					}
				},
				newrole: ""
			}
		},
		teams: {
			"A-Team": {
				archetype: "Doing Stuff Team",
				members: {
					Leader: "Cool Guy"
				}
			}
		},
		days: [
			{
				roles: {
					multiSkillRoles: ["System Admin"],
					teamArchetypes: ["Doing Stuff Team"]
				},
				shifts: [
					{
						start: "12 : 00 PM",
						end: "1 : 00 PM",
						"System Admin": "Admin McCoolPants",
						"Doing Stuff Team": "A-Team"
					}
				]
			}
		]
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
	};

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

	$scope.refreshTeamMemberDraggability = function () {
		$(".draggable-team-member").droppable({
			drop: function (event, ui) {
				var memberName = ui.draggable[0].id;
				var role = event.target.id.split("|");
				console.log(memberName);
				console.log(role);
				$rootScope.build.teams[role[0]].members[role[1]] = memberName;
				$scope.$apply();
			},
			accept: ".draggable-person",
			addClasses: false,
			activeClass: "droppable"
		});
	};

	$scope.bringForward = function (sbpanel) {
		switch (sbpanel) {
		case 'people':
			$(".sb-panel").addClass("hidden");
			$(".tab").removeClass("active");
			$("#people").removeClass("hidden");
			$("#people-tab").addClass("active");
			$("#skills").removeClass("hidden");
			$("#skills-tab").addClass("active");
			break;
		case 'skills':
			$(".sb-panel").addClass("hidden");
			$(".tab").removeClass("active");
			$("#skills").removeClass("hidden");
			$("#skills-tab").addClass("active");
			break;
		case 'multi-skill-roles':
			$(".sb-panel").addClass("hidden");
			$(".tab").removeClass("active");
			$("#multi-skill-roles").removeClass("hidden");
			$("#multi-skill-roles-tab").addClass("active");
			$("#skills").removeClass("hidden");
			$("#skills-tab").addClass("active");
			break;
		case 'team-archetypes':
			$(".sb-panel").addClass("hidden");
			$(".tab").removeClass("active");
			$("#team-archetypes").removeClass("hidden");
			$("#team-archetypes-tab").addClass("active");
			$("#skills").removeClass("hidden");
			$("#skills-tab").addClass("active");
			break;
		case 'teams':
			$(".sb-panel").addClass("hidden");
			$(".tab").removeClass("active");
			$("#teams").removeClass("hidden");
			$("#teams-tab").addClass("active");
			$("#people").removeClass("hidden");
			$("#people-tab").addClass("active");
			break;
		case 'schedule':
			$(".sb-panel").addClass("hidden");
			$(".tab").removeClass("active");
			$("#schedule").removeClass("hidden");
			$("#schedule-tab").addClass("active");
			break;
		}
	};
});

app.controller("SchedulerController", function ($rootScope, $scope, $timeout) {
	$scope.currentDay = 0;

	$scope.isMultiSkillRole = function (elm) {
		var classList = elm.attr("class").split(" ");
		for (var i = 0; i < classList.length; i++) {
			if (classList[i] === "sched-draggable-multi-skill-role") {
				return true;
			}
		}
		return false;
	};

	$scope.isTeamArchetype = function (elm) {
		var classList = elm.attr("class").split(" ");
		for (var i = 0; i < classList.length; i++) {
			if (classList[i] === "sched-draggable-team-archetype") {
				return true;
			}
		}
		return false;
	};

	$(".sched-draggable-role").droppable({
		drop: function (event, ui) {
			if ($scope.isMultiSkillRole(ui.draggable)) {
				$rootScope.build.days[$scope.currentDay].roles.multiSkillRoles.push(ui.draggable[0].id);
			} else if ($scope.isTeamArchetype(ui.draggable)) {
				$rootScope.build.days[$scope.currentDay].roles.teamArchetypes.push(ui.draggable[0].id);
			}
			$scope.$apply();
		},
		accept: function (ui) {
			return ($scope.isMultiSkillRole(ui) || $scope.isTeamArchetype(ui));
		},
		addClasses: false
	});

	$scope.changeDay = function (index) {
		$scope.currentDay = index;
	};

	$scope.initTimePicker = function (id, start) {
		var time = start.split(" ");
		if (time[3] === "PM" && time[0] !== "12") {
			time[0] = (parseInt(time[0]) + 12).toString();
		}
		$timeout(function () {
			$("#" + id).wickedpicker({
				now: time[0] + ":" + time[2]
			});
		});
	};

	$scope.refreshSchedPeopleDraggability = function () {
		$timeout(function () {
			$(".sched-draggable-person").draggable({
				helper: "clone"
			});
		});
	};

	$scope.refreshSchedMultiSkillRolesDraggability = function () {
		$timeout(function () {
			$(".sched-draggable-multi-skill-role").draggable({
				helper: "clone"
			});
		});
	};

	$scope.refreshSchedTeamArchetypesDraggability = function () {
		$timeout(function () {
			$(".sched-draggable-team-archetype").draggable({
				helper: "clone"
			});
		});
	};

	$scope.refreshSchedTeamDraggability = function () {
		$timeout(function () {
			$(".sched-draggable-team").draggable({
				helper: "clone"
			});
		});
	};

	$scope.refreshSchedTeamRolesDraggability = function () {
		$(".sched-draggable-team-role").droppable({
			drop: function (event, ui) {
				var id = event.target.id.split("|");
				var index = 0;
				$rootScope.build.days[$scope.currentDay].shifts.forEach(function (e, i, arr) {
					if (e.start == id[0]) {
						index = i;
					}
				});
				$rootScope.build.days[$scope.currentDay].shifts[index][id[1]] = ui.draggable[0].id;
				$scope.$apply();
			},
			accept: ".sched-draggable-team",
			addClasses: false
		});
	};

	$scope.refreshSchedMultiSkillRolesDroppability = function () {
		$(".sched-droppable-multi-skill-role").droppable({
			drop: function (event, ui) {
				var id = event.target.id.split("|");
				var index = 0;
				$rootScope.build.days[$scope.currentDay].shifts.forEach(function (e, i, arr) {
					if (e.start == id[0]) {
						index = i;
					}
				});
				$rootScope.build.days[$scope.currentDay].shifts[index][id[1]] = ui.draggable[0].id;
				$scope.$apply();
			},
			accept: ".sched-draggable-person",
			addClasses: false
		});
	};

});
