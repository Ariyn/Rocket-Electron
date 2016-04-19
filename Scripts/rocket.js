// window

const gravity = 9.80665;
var engines = 0;

$(document).ready(function() {
	init()
	var sampleEngine = new Engine("Merlin 1D", 825, 756, 311, 282, 470)
	// consumption of sampleEngine = 72.98kg/s
	// calculation of isp to sfc   = 73.08kg/s

	var sampleTank = new FuelTank("Stage 1", 25600, "PR-1")
	sampleTank.setFuel(119100)
	sampleTank.setOxygen(276600)
	for(var i=0; i<9; i++) {
		sampleTank.addEngine(Object.assign(Engine, sampleEngine))
	}

	sampleTank.calc()

	// console.log(sampleEngine.getFuelComsum())

	$("#calculate").click(function() {

	})
})

function init() {
	$("#adNewEngine")
		.click(function() {
			data = '<div id="engineDiv"><form id="EngineForm" engineNumber='+engines+'><div class="form-group"><label for="engineID">Rocket ID</label><input id="engineID" placeholder="Merlin 1D" class="form-control" /></div><div class="form-group"><label for="dryWeight">dry Weight</label><input id="dryWeight" placeholder="470kg" class="form-control" /></div><div class="form-group col-xs-5 input-full-size"><label for="thrustVal">Maximum Thrust Val</label><input id="thrustVal" placeholder="825kN" class="form-control" /></div><div class="form-group col-xs-offset-2 col-xs-5 input-full-size"><label for="thrustSL">Maximum Thrust SL</label><input id="thrustSL" placeholder="756kN" class="form-control" /></div><div class="form-group col-xs-5 input-full-size"><label for="ISPVal">ISP Val</label><input id="ISPVal" placeholder="300s" class="form-control" /></div><div class="form-group col-xs-offset-2 col-xs-5 input-full-size"><label for="ISPSL">ISP SL</label><input id="ISPSL" placeholder="280s" class="form-control" /></div></form></div>';

			$("#Engines").append(data)

			engines += 1;
		})
}

function calculateRocket() {

}

function initRocket() {

}
function Rocket(_id) {

}

function FuelTank(_id, _dryMass, _fuleType) {
	const id = _id;
	const dryMass = _dryMass;

	var fuel = 0;
	const fuelType = _fuleType;
	var oxygen = 0;

	var children = [];
	var engines = [];

	function calcEngines() {
		var thrust = 0;
		var fc = 0;

		for(const i in engines) {
			const e = engines[i];

			thrust += e.getThrust("sl");
			fc += e.getFuelComsum("sl");
		}
		return {
			thrust : thrust,
			fuelConsume:fc
		}
	}

	return {
		id : id,
		dryMass:dryMass,
		addEngine : function(child) {
			engines.push(child)
		},
		getChildren:function() {
			return children;
		},
		addChild : function(child) {
			children.push(child)
		},
		popChild : function(index) {
			return children.splice(index, 1)[0];
		},
		getMass : function() {
			return dryMass+fuel+oxygen;
		},
		fuelType : fuelType,
		getOxygen : function () {
			return oxygen
		},
		setOxygen : function (val) {
			oxygen = val;
		},
		getFuel : function () {
			return fuel
		},
		setFuel : function (val) {
			fuel = val;
		},

		calc : function() {
			values = calcEngines();

			console.log(values)
		}
	}
}

function Engine(_id, vacThrust, slThrust, vacIsp, slIsp, _dryWeight) {
	var parent;
	const id = _id;
	const thrust = {
		"vac":vacThrust,
		"sl":slThrust,
		"present":0
	}

	const isp = {
		"vac":vacIsp,
		"sl":slIsp
	}

	const dryWeight = _dryWeight

	const calculateFuelConsumption = function(type) {
		return 10.1972 / getIsp(type) * getThrust(type);
	}

	const getIsp = function(type) {
		return isp[type];
	}

	const getThrust = function(type) {
		return thrust[type];
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
		setThrust : function(val) {
			thrust["present"] = val;
		},
		getthrust : function(val) {
			return thrust["present"]
		}
	}
}
