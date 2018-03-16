/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"employee/detail/Employee/test/integration/NavigationJourneyPhone",
		"employee/detail/Employee/test/integration/NotFoundJourneyPhone",
		"employee/detail/Employee/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});