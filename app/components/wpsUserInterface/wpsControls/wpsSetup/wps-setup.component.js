angular
		.module('wpsSetup')
		.component(
				'wpsSetup',
				{
					templateUrl : "components/wpsUserInterface/wpsControls/wpsSetup/wps-setup.template.html",
					/*
					 * injected with a modules service method that manages
					 * enabled tabs
					 */
					controller : [
							'wpsPropertiesService', 'wpsFormControlService', '$scope', 'wpsMapService', '$http', '$scope',
							function WpsSetupController(wpsPropertiesService, wpsFormControlService, $scope, wpsMapService, $http, $scope) {
								/*
								 * references to wpsPropertiesService and wpsFormControl instances
								 */
								this.wpsPropertiesServiceInstance = wpsPropertiesService;
								this.wpsPropertiesServiceInstance.selectedServiceUrl = '';
								this.wpsMapServiceInstance = wpsMapService;
								this.wpsFormControlServiceInstance = wpsFormControlService;

								$scope.loadingData = false;

								this.selectedDate;

								$scope.filterGeoresourcesByTopic = function() {
								  return function( item ) {
										if (wpsPropertiesService.selectedTopic)
								    	return item.applicableTopics.includes(wpsPropertiesService.selectedTopic.topicName);

										return true;
								  };
								};

								$scope.filterIndicatorsByTopic = function() {
								  return function( item ) {
										if (wpsPropertiesService.selectedTopic)
								    	return item.applicableTopics.includes(wpsPropertiesService.selectedTopic.topicName);

										return true;
								  };
								};

								this.unsetTopic = function(){
									this.wpsPropertiesServiceInstance.selectedTopic = null;

									$scope.$apply();
								};

								this.onDateChange = function(){
									console.log(this.selectedDate);

									var date = new Date(this.selectedDate);

									this.selectedDate = date.getFullYear() + "-" +  date.getMonth()+1 + "-" + date.getDate();

									console.log(date);
									console.log(this.selectedDate);

									$scope.$apply();
								};

								var fetchedTopicsInitially = false;
								var fetchedSpatialUnitsInitially = false;
								var fetchedGeoresourcesInitially = false;
								var fetchedIndicatorsInitially = false;

								var callScopeApplyInitially = function(){
									if(fetchedTopicsInitially && fetchedIndicatorsInitially && fetchedGeoresourcesInitially && fetchedSpatialUnitsInitially)
										$scope.$apply();
								};

								$http({
									url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/spatial-units",
									method: "GET"
								}).then(function successCallback(response) {
										// this callback will be called asynchronously
										// when the response is available

										wpsPropertiesService.setSpatialUnits(response.data);
										fetchedSpatialUnitsInitially = true;
										callScopeApplyInitially();

									}, function errorCallback(response) {
										// called asynchronously if an error occurs
										// or server returns response with an error status.
										//$scope.error = response.statusText;
								});

								$http({
									url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/georesources",
									method: "GET"
								}).then(function successCallback(response) {
										// this callback will be called asynchronously
										// when the response is available

										wpsPropertiesService.setGeoresources(response.data);
										fetchedGeoresourcesInitially = true;
										callScopeApplyInitially();

									}, function errorCallback(response) {
										// called asynchronously if an error occurs
										// or server returns response with an error status.
										//$scope.error = response.statusText;
								});

								$http({
									url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/indicators",
									method: "GET"
								}).then(function successCallback(response) {
										// this callback will be called asynchronously
										// when the response is available

										wpsPropertiesService.setIndicators(response.data);
										fetchedIndicatorsInitially = true;
										callScopeApplyInitially();

									}, function errorCallback(response) {
										// called asynchronously if an error occurs
										// or server returns response with an error status.
										//$scope.error = response.statusText;
								});

								$http({
									url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/topics",
									method: "GET"
								}).then(function successCallback(response) {
										// this callback will be called asynchronously
										// when the response is available

										wpsPropertiesService.setTopics(response.data);
										fetchedTopicsInitially = true;
										callScopeApplyInitially();

									}, function errorCallback(response) {
										// called asynchronously if an error occurs
										// or server returns response with an error status.
										//$scope.error = response.statusText;
								});

								$http({
									url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/process-scripts",
									method: "GET"
								}).then(function successCallback(response) {
										// this callback will be called asynchronously
										// when the response is available

										wpsPropertiesService.setProcessScripts(response.data);

									}, function errorCallback(response) {
										// called asynchronously if an error occurs
										// or server returns response with an error status.
										//$scope.error = response.statusText;
								});

								this.applyMeasureOfValue = function(){

									$scope.loadingData = true;

									// call REST Service to add new customized SLD to GeosServer Layer that is currently selected
									var jahrParam = 'jahr=' + wpsPropertiesService.selectedIndicator.jahr;
									var measureOfValueParam = 'grenzwertVersorgungInProzent=' + wpsPropertiesService.measureOfValue;

									var url = 'http://localhost:8085/FusslErreichbarkeitBewertungsmodellierung?' + jahrParam + '&' + measureOfValueParam;

									console.log('created SLD URL: ' + url);

									$http({
										url: url,
										method: "POST",
										data: {}
									}).then(function successCallback(response) {
											// this callback will be called asynchronously
											// when the response is available
											var sldName = response.data.sldName;

											var dataset = wpsPropertiesService.selectedIndicator;

											var customLayerName = 'CUSTOM ' + dataset.name + '_bewertung_' + wpsPropertiesService.measureOfValue;

											// add current Layer again, but with customized name and customized SLD
											wpsMapService.addIndicatorLayer_withNameAndStyle(dataset, customLayerName, sldName);

											$scope.loadingData = false;

										}, function errorCallback(response) {
											// called asynchronously if an error occurs
											// or server returns response with an error status.
											$scope.error = response.statusText;
											$scope.loadingData = false;
									});



								}





								this.isRemoveButtonDisabled = true;

								$scope.loadingData = false;

								this.addSelectedSpatialUnitToMap = function() {
									$scope.loadingData = true;

									var metadata = wpsPropertiesService.selectedSpatialUnit;

									var id = metadata.spatialUnitId;

									var dateComps = this.selectedDate.split("-");

									var year = dateComps[0];
									var month = dateComps[1];
									var day = dateComps[2];

									$http({
										url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/spatial-units/" + id + "/" + year + "/" + month + "/" + day,
										method: "GET"
									}).then(function successCallback(response) {
											// this callback will be called asynchronously
											// when the response is available
											var geoJSON = response.data;

											wpsPropertiesService.selectedSpatialUnit.geoJSON = geoJSON;

											wpsMapService.addSpatialUnitGeoJSON(wpsPropertiesService.selectedSpatialUnit);
											$scope.loadingData = false;

										}, function errorCallback(response) {
											// called asynchronously if an error occurs
											// or server returns response with an error status.
											$scope.loadingData = false;
									});
								};

								this.addSelectedSpatialUnitToMapAsWFS = function() {
									$scope.loadingData = true;

									var metadata = wpsPropertiesService.selectedSpatialUnit;

									var name = metadata.spatialUnitLevel;

									var wfsUrl = metadata.wfsUrl;

									wpsMapService.addSpatialUnitWFS(name, wfsUrl);
									$scope.loadingData = false;

								};

								this.addSelectedGeoresourceToMap = function() {
									$scope.loadingData = true;

									var metadata = wpsPropertiesService.selectedGeoresource;

									var id = metadata.georesourceId;

									var dateComps = this.selectedDate.split("-");

									var year = dateComps[0];
									var month = dateComps[1];
									var day = dateComps[2];

									$http({
										url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/georesources/" + id + "/" + year + "/" + month + "/" + day,
										method: "GET"
									}).then(function successCallback(response) {
											// this callback will be called asynchronously
											// when the response is available
											var geoJSON = response.data;

											wpsPropertiesService.selectedGeoresource.geoJSON = geoJSON;

											wpsMapService.addGeoresourceGeoJSON(wpsPropertiesService.selectedGeoresource);
											$scope.loadingData = false;

										}, function errorCallback(response) {
											// called asynchronously if an error occurs
											// or server returns response with an error status.
											$scope.loadingData = false;
									});

								};

								this.addSelectedIndicatorToMap = function() {
									$scope.loadingData = true;

									var metadata = wpsPropertiesService.selectedIndicator;

									var id = metadata.indicatorId;

									var dateComps = this.selectedDate.split("-");

									var year = dateComps[0];
									var month = dateComps[1];
									var day = dateComps[2];

									$http({
										url: this.wpsPropertiesServiceInstance.baseUrlToKomMonitorDataAPI + "/indicators/" + id + "/" + wpsPropertiesService.selectedSpatialUnit.spatialUnitId,
										method: "GET"
									}).then(function successCallback(response) {
											// this callback will be called asynchronously
											// when the response is available
											var geoJSON = response.data;

											wpsPropertiesService.selectedIndicator.geoJSON = geoJSON;

											wpsMapService.addIndicatorGeoJSON(wpsPropertiesService.selectedIndicator);
											$scope.loadingData = false;

										}, function errorCallback(response) {
											// called asynchronously if an error occurs
											// or server returns response with an error status.
											$scope.loadingData = false;
									});

								};


							} ]
				});
