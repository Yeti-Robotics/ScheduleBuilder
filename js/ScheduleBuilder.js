var app;
app = angular.module('app', []);

app.controller("InfoPageController", function ($rootScope, $scope) {
	$scope.templateBuild = {
		students: [
			{
				name: "Admin McCoolPants",
				skills: [0, 1]
		}
	],
		skills: [{
			name: "Awesomeness"
	}, {
			name: "Coolness"
	}],
		multiSkillRoles: [{
			name: "System Admin",
			requires: [0, 1]
	}],
		teamArchetypes: [{
			name: "Doing Stuff Team",
			roles: [{
				name: "Leader",
				requires: [0, 1]
		}]
	}],
		teams: [{
			name: "A-Team",
			archetype: [0],
			members: {
				Leader: 0
			}
	}]
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
	$scope.bringForward = function (panel) {
		switch (panel) {
		case 'people':
			break;
		case 'skills':
			break;
		case 'multi-skill-roles':
			break;
		case 'team-archetypes':
			break;
		case 'teams':
			break;
		case 'schedule':
			break;
		}
	}
});
