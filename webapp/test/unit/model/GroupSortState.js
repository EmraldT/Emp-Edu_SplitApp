/*global QUnit*/

sap.ui.define([
	"employee/detail/Employee/model/GroupSortState",
	"sap/ui/model/json/JSONModel"
], function (GroupSortState, JSONModel) {
	"use strict";

	QUnit.module("GroupSortState - grouping and sorting", {
		beforeEach: function () {
			this.oModel = new JSONModel({});
			// System under test
			this.oGroupSortState = new GroupSortState(this.oModel, function() {});
		}
	});

	QUnit.test("Should always return a sorter when sorting", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.sort("SALARY").length, 1, "The sorting by SALARY returned a sorter");
		assert.strictEqual(this.oGroupSortState.sort("FNAME").length, 1, "The sorting by FNAME returned a sorter");
	});

	QUnit.test("Should return a grouper when grouping", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.group("SALARY").length, 1, "The group by SALARY returned a sorter");
		assert.strictEqual(this.oGroupSortState.group("None").length, 0, "The sorting by None returned no sorter");
	});


	QUnit.test("Should set the sorting to SALARY if the user groupes by SALARY", function (assert) {
		// Act + Assert
		this.oGroupSortState.group("SALARY");
		assert.strictEqual(this.oModel.getProperty("/sortBy"), "SALARY", "The sorting is the same as the grouping");
	});

	QUnit.test("Should set the grouping to None if the user sorts by FNAME and there was a grouping before", function (assert) {
		// Arrange
		this.oModel.setProperty("/groupBy", "SALARY");

		this.oGroupSortState.sort("FNAME");

		// Assert
		assert.strictEqual(this.oModel.getProperty("/groupBy"), "None", "The grouping got reset");
	});
});