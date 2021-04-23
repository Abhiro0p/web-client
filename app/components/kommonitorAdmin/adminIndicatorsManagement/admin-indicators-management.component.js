angular.module('adminIndicatorsManagement').component('adminIndicatorsManagement', {
	templateUrl : "components/kommonitorAdmin/adminIndicatorsManagement/admin-indicators-management.template.html",
	controller : ['kommonitorDataExchangeService', '$scope', '$timeout', '$rootScope', '__env', '$http', 
	function IndicatorsManagementController(kommonitorDataExchangeService, $scope, $timeout, $rootScope, __env, $http) {

		this.kommonitorDataExchangeServiceInstance = kommonitorDataExchangeService;

		// initialize any adminLTE box widgets
	  $('.box').boxWidget();

		$scope.loadingData = true;

		$scope.availableIndicatorDatasets;
		$scope.selectIndicatorEntriesInput = false;

		$scope.sortableConfig = {
			onEnd: function (/**Event*/evt) {
				var updatedIndicatorMetadataEntries = evt.models;
				
				// for those models send API request to persist new sort order

				var patchBody = [];
				for (let index = 0; index < updatedIndicatorMetadataEntries.length; index++) {
					const indicatorMetadata = updatedIndicatorMetadataEntries[index];
					
					patchBody.push({
						"indicatorId": indicatorMetadata.indicatorId,
						"displayOrder": index
					});
				}

				$http({
					url: kommonitorDataExchangeService.baseUrlToKomMonitorDataAPI + "/indicators/display-order",
					method: "PATCH",
					data: patchBody
					// headers: {
					//    'Content-Type': undefined
					// }
				}).then(function successCallback(response) {

	
					}, function errorCallback(error) {
						// if(error.data){							
						// 	$scope.errorMessagePart = kommonitorDataExchangeService.syntaxHighlightJSON(error.data);
						// }
						// else{
						// 	$scope.errorMessagePart = kommonitorDataExchangeService.syntaxHighlightJSON(error);
						// }
	
						// $("#georesourceEditMetadataErrorAlert").show();

						kommonitorDataExchangeService.displayMapApplicationError(error);
				});

			}
		};

		$scope.$on("initialMetadataLoadingCompleted", function (event) {

			
			$timeout(function(){
				
				$scope.initializeOrRefreshOverviewTable();
			}, 250);

		});

		$scope.$on("initialMetadataLoadingFailed", function (event, errorArray) {

			$scope.loadingData = false;

		});

		$scope.initializeOrRefreshOverviewTable = function(){
			$scope.loadingData = true;
			$scope.availableIndicatorDatasets = JSON.parse(JSON.stringify(kommonitorDataExchangeService.availableIndicators));

			// initialize properties
			$scope.availableIndicatorDatasets.forEach(function(dataset){
				dataset.isSelected = false;
			});

			$scope.loadingData = false;
		};

		$scope.$on("refreshIndicatorOverviewTable", function (event) {
			$scope.loadingData = true;
			$scope.refreshIndicatorOverviewTable();
		});

		$scope.onChangeSelectIndicatorEntries = function(){
			if ($scope.selectIndicatorEntriesInput){
				$scope.availableIndicatorDatasets.forEach(function(dataset){
					dataset.isSelected = true;
						
				});
			}
			else{
				$scope.availableIndicatorDatasets.forEach(function(dataset){
					dataset.isSelected = false;
				});
			}
		};

		$scope.refreshIndicatorOverviewTable = function(){

			// refetch all metadata from spatial units to update table
			kommonitorDataExchangeService.fetchIndicatorsMetadata().then(function successCallback(response) {

						$scope.initializeOrRefreshOverviewTable();

						$scope.loadingData = false;

				}, function errorCallback(response) {

					$scope.loadingData = false;
			});

		};

		// $scope.onClickDeleteDatasets = function(){
		// 	$scope.loadingData = true;

		// 	var markedEntriesForDeletion = [];
		// 	$scope.availableIndicatorDatasets.forEach(function(dataset){
		// 		if(dataset.isSelected){
		// 			markedEntriesForDeletion.push(dataset);
		// 		}
		// 	});

		// 	// submit selected spatial units to modal controller
		// 	$rootScope.$broadcast("onDeleteIndicators", markedEntriesForDeletion);

		// 	$scope.loadingData = false;
		// };

		$scope.onClickEditMetadata = function(indicatorDataset){
			// submit selected spatial unit to modal controller
			$rootScope.$broadcast("onEditIndicatorMetadata", indicatorDataset);
		};

		$scope.onClickEditFeatures = function(indicatorDataset){
			// submit selected spatial unit to modal controller
			$rootScope.$broadcast("onEditIndicatorFeatures", indicatorDataset);
		};

		$scope.onClickEditIndicatorSpatialUnitRoles = function(indicatorDataset){
			$rootScope.$broadcast("onEditIndicatorSpatialUnitRoles", indicatorDataset);
		};


	}
]});
