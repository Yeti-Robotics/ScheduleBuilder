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
