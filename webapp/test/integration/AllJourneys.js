/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 master in the list
// * All 3 master have at least one master2

sap.ui.require([
	"sap/ui/test/Opa5",
	"employee/detail/Employee/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"employee/detail/Employee/test/integration/pages/App",
	"employee/detail/Employee/test/integration/pages/Browser",
	"employee/detail/Employee/test/integration/pages/Master",
	"employee/detail/Employee/test/integration/pages/Detail",
	"employee/detail/Employee/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "employee.detail.Employee.view."
	});

	sap.ui.require([
		"employee/detail/Employee/test/integration/MasterJourney",
		"employee/detail/Employee/test/integration/NavigationJourney",
		"employee/detail/Employee/test/integration/NotFoundJourney",
		"employee/detail/Employee/test/integration/BusyJourney",
		"employee/detail/Employee/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});