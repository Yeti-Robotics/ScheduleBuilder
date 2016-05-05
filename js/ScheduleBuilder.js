var templateBuild = {
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

var students = {};
var skills = {};
var multiSkillRoles = {};
var teamArchetypes = {};
var teams = {};

function startBuilder(build) {
	if (!build) {
		build = templateBuild;
	}
	$("#Intro").addClass("hidden");
	$("#Builder").removeClass("hidden");
	students = build.students;
	skills = build.skills;
	multiSkillRoles = build.multiSkillRoles;
	teamArchetypes = build.teamArchetypes;
	teams = build.teams;

}

function bringForward(panel) {
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
$(document).ready(function () {

});
