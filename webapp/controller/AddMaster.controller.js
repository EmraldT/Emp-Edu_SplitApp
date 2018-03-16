sap.ui.define([
		"employee/detail/Employee/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"employee/detail/Employee/model/formatter",
		"sap/m/MessageToast",
		'sap/m/MessageBox'
], function (BaseController, JSONModel, History, formatter, MessageToast, MessageBox) {
	"use strict";
		
	return BaseController.extend("employee.detail.Employee.controller.AddMaster",{
		
		formatter: formatter,
			
		onInit: function(){
			var oViewModel = new JSONModel({
								busy : false,
								delay : 0
							});

			this.getRouter().getRoute("addMaster").attachPatternMatched(this._onObjectMatched.bind(this));

			this.setModel(oViewModel, "addMasterView");
			
			//this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},

		_onObjectMatched: function(oEvent){
			var oModel = this.getModel(),
				oViewModel = this.getModel("addMasterView"),
				iLastItemId = oEvent.getParameter("arguments").ID;
			oViewModel.setProperty("/nextId", iLastItemId);
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		
		_onMetadataLoaded : function () {
			
			var iNextId = this.getModel("addMasterView").getProperty("/nextId"),
				oProperties = {
					ID : ""+iNextId
				},
				oModel = this.getModel();
		
			this._oContext = oModel.createEntry("/master", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});
				
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
			
			// var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
			// 	oViewModel = this.getModel("addMasterView");
				
			// oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},
		
		_onCreateSuccess: function (oEmployee) {

			// navigate to the new product's object view
			var sId = oEmployee.ID;
			this.getRouter().navTo("object", {
				objectId : sId
			}, true);
	
			// unbind the view to not show this object again
			this.getView().unbindObject();
			
			// show success messge
			var sMessage = this.getResourceBundle().getText("newMasterObjectCreated", [oEmployee.FNAME]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation : false
			});
		},
		
		onCancel: function() {
			this.onNavBack();
		},

		onSave: function() {
			var aEmptyFields = [],
				oElements = this.getView().byId('formGroup').getFormElements();
			jQuery.each(oElements,function(iElemIndex, oItem){
				var oField = oItem.getElements()[0];
				if(oField.getProperty('mandatory')){
					if(oField.getProperty('value') === "" || oField.getProperty('value') === null){
						//this.getModel().deleteCreatedEntry(this._oContext);
						aEmptyFields.push(oField);
					}
				}
			});
			
			if(aEmptyFields.length !== 0){
				for(var k=0;k<aEmptyFields.length;k++){
					aEmptyFields[k].setValueState(sap.ui.core.ValueState.Error);
				}
				MessageBox.error("Please fill in the mandatory fields (indicated by *)");
			}else{
				this.getModel().submitChanges();	
			}
		},
		
		onNavBack : function() {
			
			// discard new product from model.
			this.getModel().deleteCreatedEntry(this._oContext);

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("object", {objectId : "1"}, bReplace);
			}
		}
		
	});
});