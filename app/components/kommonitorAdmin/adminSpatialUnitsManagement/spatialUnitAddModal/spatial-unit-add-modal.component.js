angular.module('spatialUnitAddModal').component('spatialUnitAddModal', {
	templateUrl : "components/kommonitorAdmin/adminSpatialUnitsManagement/spatialUnitAddModal/spatial-unit-add-modal.template.html",
	controller : ['kommonitorDataExchangeService', '$scope', '$rootScope', '$http', function SpatialUnitAddModalController(kommonitorDataExchangeService, $scope, $rootScope, $http) {

		this.kommonitorDataExchangeServiceInstance = kommonitorDataExchangeService;

		/*	POST BODY
				{
				  "geoJsonString": "geoJsonString",
				  "metadata": {
				    "note": "note",
				    "literature": "literature",
				    "updateInterval": "ARBITRARY",
				    "sridEPSG": 0.8008281904610115,
				    "datasource": "datasource",
				    "contact": "contact",
				    "lastUpdate": "2000-01-23",
				    "description": "description",
				    "databasis": "databasis"
				  },
				  "jsonSchema": "jsonSchema",
				  "nextLowerHierarchyLevel": "nextLowerHierarchyLevel",
				  "spatialUnitLevel": "spatialUnitLevel",
				  "periodOfValidity": {
				    "endDate": "2000-01-23",
				    "startDate": "2000-01-23"
				  },
				  "nextUpperHierarchyLevel": "nextUpperHierarchyLevel"
				}
		*/

		//Date picker
    $('#spatialUnitAddDatepickerStart').datepicker({
      autoclose: true,
			language: 'de',
			format: 'yyyy-mm-dd'
    });
		$('#spatialUnitAddDatepickerEnd').datepicker({
      autoclose: true,
			language: 'de',
			format: 'yyyy-mm-dd'
    });

		$scope.spatialUnitLevel = undefined;

		$scope.metadata = {};
		$scope.metadata.note = undefined;
		$scope.metadata.literature = undefined;
		$scope.metadata.updateInterval = undefined;
		$scope.metadata.sridEPSG = undefined;
		$scope.metadata.datasource = undefined;
		$scope.metadata.databasis = undefined;
		$scope.metadata.contact = undefined;
		$scope.metadata.lastUpdate = undefined;
		$scope.metadata.description = undefined;

		$scope.nextLowerHierarchySpatialUnit = undefined;
		$scope.nextUpperHierarchySpatialUnit = undefined;

		$scope.periodOfValidity = {};
		$scope.periodOfValidity.startDate = undefined;
		$scope.periodOfValidity.endDate = undefined;

		$scope.geoJsonString = undefined;

		$scope.spatialResourceConfigured = false;
		$scope.geodataSourceFormat = undefined;
		$scope.spatialUnitDataSourceIdProperty = undefined;
		$scope.spatialUnitDataSourceNameProperty = undefined;

		$scope.successMessagePart = undefined;
		$scope.errorMessagePart = undefined;


		$scope.resetSpatialUnitAddForm = function(){
			$scope.spatialUnitLevel = undefined;

			$scope.metadata = {};
			$scope.metadata.note = undefined;
			$scope.metadata.literature = undefined;
			$scope.metadata.updateInterval = undefined;
			$scope.metadata.sridEPSG = undefined;
			$scope.metadata.datasource = undefined;
			$scope.metadata.databasis = undefined;
			$scope.metadata.contact = undefined;
			$scope.metadata.lastUpdate = undefined;
			$scope.metadata.description = undefined;

			$scope.nextLowerHierarchySpatialUnit = undefined;
			$scope.nextUpperHierarchySpatialUnit = undefined;

			$scope.periodOfValidity = {};
			$scope.periodOfValidity.startDate = undefined;
			$scope.periodOfValidity.endDate = undefined;

			$scope.geoJsonString = undefined;

			$scope.spatialResourceConfigured = false;
			$scope.geodataSourceFormat = undefined;
		};

		$scope.addSpatialUnit = function(){
			var postBody =
			{
				"geoJsonString": $scope.geoJsonString,
				"metadata": {
					"note": $scope.metadata.note,
					"literature": $scope.metadata.literature,
					"updateInterval": $scope.metadata.updateInterval.apiName,
					"sridEPSG": $scope.metadata.sridEPSG,
					"datasource": $scope.metadata.datasource,
					"contact": $scope.metadata.contact,
					"lastUpdate": $scope.metadata.lastUpdate,
					"description": $scope.metadata.description,
					"databasis": $scope.metadata.databasis
				},
				"jsonSchema": null,
				"nextLowerHierarchyLevel": $scope.nextLowerHierarchySpatialUnit.spatialUnitLevel,
				"spatialUnitLevel": $scope.spatialUnitLevel.spatialUnitLevel,
				"periodOfValidity": {
					"endDate": $scope.periodOfValidity.endDate,
					"startDate": $scope.periodOfValidity.startDate
				},
				"nextUpperHierarchyLevel": $scope.nextUpperHierarchySpatialUnit
			};

			// TODO verify input

			// TODO Create and perform POST Request with loading screen

			// on success add entry to data overview table and show success alert

			// on error show error alert with error message

			// $http({
			// 	url: kommonitorDataExchangeService.baseUrlToKomMonitorDataAPI + "/spatial-units",
			// 	method: "POST",
			// 	data: postBody
			// 	// headers: {
			// 	//    'Content-Type': undefined
			// 	// }
			// }).then(function successCallback(response) {
			// 		// this callback will be called asynchronously
			// 		// when the response is available
			//
			// 		$scope.successMessagePart = $scope.spatialUnitLevel;
			//
			// 		$("#spatialUnitAddSucessAlert").show();
			//
			// 		setTimeout(function() {
			// 				$("#spatialUnitAddSucessAlert").hide();
			// 		}, 3000);
			//
			// 		$scope.resetSpatialUnitAddForm();
			//
			// 	}, function errorCallback(response) {
			// 		$scope.errorMessagePart = response;
			//
			// 		$("#spatialUnitAddErrorAlert").show();
			//
			// 		// setTimeout(function() {
			// 		// 		$("#spatialUnitAddSucessAlert").hide();
			// 		// }, 3000);
			// });

		};

		$(document).on("change", "#spatialUnitDataSourceInput" ,function(){
				// TODO validate file input and
				console.log("Input resource set");

				$scope.spatialResourceConfigured = true;
		});


			$scope.hideSuccessAlert = function(){
				$("#spatialUnitAddSucessAlert").hide();
			};

			$scope.hideErrorAlert = function(){
				$("#spatialUnitAddErrorAlert").hide();
			};

	}
]});
