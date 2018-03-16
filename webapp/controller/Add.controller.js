sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
	],function(Controller, JSONModel, History, MessageToast){
	"use strict";
	
	return Controller.extend("employee.detail.Employee.controller.Add",{
		
		getAddViewModel: function(){
			return new JSONModel({
				busy : false,
				delay : 0
			});
		}
	});
});