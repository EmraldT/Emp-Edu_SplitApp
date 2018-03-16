sap.ui.define([
	"employee/detail/Employee/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
	],function(BaseController, History, JSONModel, MessageBox, MessageToast){
	"use strict";
	
	BaseController.extend("employee.detail.Employee.controller.AddDetail",{
		onInit : function(){
			var oViewModel = new JSONModel({
				busy : false,
				delay : 0
			});

			this.getRouter().getRoute("addDetail").attachPatternMatched(this._onObjectMatched.bind(this));

			this.setModel(oViewModel, "addDetailView");
		},
		
		_onObjectMatched : function(oEvent){
			var oModel = this.getModel(),
				oViewModel = this.getModel("addDetailView"),
				iLastItemId = oEvent.getParameter("arguments").ID;
			oViewModel.setProperty("/nextId", iLastItemId);
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));          
		},
		
		_onMetadataLoaded : function(oEvent){
			var iNextId = this.getModel("addDetailView").getProperty("/nextId"),
				oProperties = {
					ID : ""+iNextId
				},
				oModel = this.getModel();
		
			this._oContext = oModel.createEntry("/translation", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});
				
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		
		_onCreateSuccess: function (oEducation) {

			// navigate to the new product's object view
			var sId = oEducation.ID;
			this.getRouter().navTo("object", {
				objectId : sId
			}, true);
	
			// unbind the view to not show this object again
			this.getView().unbindObject();
			
			// show success messge
			var sMessage = this.getResourceBundle().getText("newDetailObjectCreated", [oEducation.EDUCATION]);
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