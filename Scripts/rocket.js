
var Rocket = {
	"engines":[]
}

// window
$(document).ready(function() {
	$("#calculate").click(function() {

	})
})

function calculateRocket() {

}

function initRocket() {

}

function Engine(_id, _vacThrust, _slThrust, _vacIsp, _slIsp, dryWeight) {
	var parent;
	const id = _id;
	const thrust = {
		"vac":_vacThrust,
		"sl":_slThrust
	}

	const isp = {
		"vac":_vacIsp,
		"SL":_slIsp
	}

	const dryWeight = dryWeight

	const calculateFuelConsumption = function() {
		return 101972 / getIsp(parent) * getThrust(parent);
	}

	const getIsp = function() {
		return isp["sl"];
	}

	const getThrust = function() {
		return thrust["sl"];
	}

	return {
		parent : parent,
		id : id,
		getThrust : getThrust,
		vacThrust : thrust["vac"],
		slThrust : thrust["sl"],
		getIsp : getIsp,
		vacIsp : isp["vac"],
		slIsp : isp["sl"],
		weight: dryWeight,

		getFuelComsum : calculateFuelConsumption,
	}
}
