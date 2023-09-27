angular
	.module('kommonitorDataImport')
	.component(
		'kommonitorDataImport',
		{
			templateUrl: "components/kommonitorUserInterface/kommonitorControls/kommonitorDataImport/kommonitor-data-import.template.html",

			controller: [
				'kommonitorDataExchangeService', 'kommonitorMapService', '$scope', '$rootScope', '$http', '__env',
				'kommonitorToastHelperService', 'kommonitorFileHelperService',
				function kommonitorDataImportController(
					kommonitorDataExchangeService, kommonitorMapService, $scope, $rootScope, $http, __env,
					kommonitorToastHelperService, kommonitorFileHelperService) {
					/*
					 * reference to kommonitorDataExchangeService instances
					 */
					this.kommonitorDataExchangeServiceInstance = kommonitorDataExchangeService;
					this.kommonitorMapServiceInstance = kommonitorMapService;
					$scope.loadingData = false;
					$scope.date;

					$scope.fileLayerError;

					$scope.wmsNameFilter = undefined;

					$scope.customFileInputColor = `#00AABB`;

					$scope.tmpKommonitorGeoresource_table;
					$scope.tableProcessType;
					$scope.tableProcessTypes = [
						{
							displayName: "Latitude und Longitude Spalten",
							apiName: "latLon"
						},
						{
							displayName: "Adressen - Ort, PLZ, Strasse",
							apiName: "address_city_postcode_street"
						}
					]

					$('#customFileInputColorDiv').colorpicker();

					// initialize colorpicker after some time
					// wait to ensure that elements ar available on DOM
					setTimeout(function () {

						var colorPickerInputs = $('.input-group.colorpicker-component')
						colorPickerInputs.colorpicker();

						// $('.input-group.colorpicker-component').each(function (index, value){
						// 	$(this).colorpicker();
						// });
					}, 3000);


					// initialize any adminLTE box widgets
					$('.box').boxWidget();

					const DATE_PREFIX = __env.indicatorDatePrefix;

					var numberOfDecimals = __env.numberOfDecimals;

					$scope.addFileToMap = function (dataset) {
						console.log("Toggle File Layer: " + dataset.datasetName);

						

						$scope.toggleDataLayer(dataset);
					};

					$scope.toggleDataLayer = function (dataset) {
						if (dataset.isSelected) {
							//display on Map
							var opacity = 1 - dataset.transparency;
							kommonitorMapService.addFileLayerToMap(dataset, opacity);
						}
						else {
							//remove WMS layer from map
							kommonitorMapService.removeFileLayerFromMap(dataset);
						}
					}

					$scope.refreshDataLayer = function (dataset) {
						if (dataset.isSelected) {
							kommonitorMapService.removeFileLayerFromMap(dataset);
							//display on Map
							var opacity = 1 - dataset.transparency;
							kommonitorMapService.addFileLayerToMap(dataset, opacity);
						}
					}

					$scope.$on("GeoJSONFromFileFinished", function (event, tmpKommonitorGeoresource) {

						// init feature NAME and ID fields
						tmpKommonitorGeoresource = $scope.initSpecialFields(tmpKommonitorGeoresource);

						$scope.onChangeIdProperty(tmpKommonitorGeoresource);
						$scope.onChangeNameProperty(tmpKommonitorGeoresource);

						$scope.addFileToMap(tmpKommonitorGeoresource);
					});

					$scope.initSpecialFields = function(tmpKommonitorGeoresource){
						// init feature NAME and ID fields
						tmpKommonitorGeoresource.ID_ATTRIBUTE = tmpKommonitorGeoresource.featureSchema[0];
						tmpKommonitorGeoresource.NAME_ATTRIBUTE = tmpKommonitorGeoresource.featureSchema[0];
						tmpKommonitorGeoresource.LON_ATTRIBUTE = tmpKommonitorGeoresource.featureSchema[0];
						tmpKommonitorGeoresource.LAT_ATTRIBUTE = tmpKommonitorGeoresource.featureSchema[0];

						for (const property of tmpKommonitorGeoresource.featureSchema) {
							if(property.toLowerCase().includes("id")){
								tmpKommonitorGeoresource.ID_ATTRIBUTE = property;
							}
							if(property.toLowerCase().includes("name")){
								tmpKommonitorGeoresource.NAME_ATTRIBUTE = property;
							}
							if(property.toLowerCase().includes("lon") || property.toLowerCase().includes("rechts") || property.toLowerCase().includes("x")){
								tmpKommonitorGeoresource.LON_ATTRIBUTE = property;
							}
							if(property.toLowerCase().includes("lat") || property.toLowerCase().includes("hoch") || property.toLowerCase().includes("y")){
								tmpKommonitorGeoresource.LAT_ATTRIBUTE = property;
							}
						}

						return tmpKommonitorGeoresource;
					}

					$scope.$on("CSVFromFileFinished", function (event, tmpKommonitorGeoresource) {
						tmpKommonitorGeoresource = $scope.initSpecialFields(tmpKommonitorGeoresource)

						$scope.tmpKommonitorGeoresource_table = tmpKommonitorGeoresource;

						kommonitorToastHelperService.displayInfoToast_upperLeft("CSV-Datei erkannt", "Weitere Konfiguration erforderlich");

						$scope.$digest();
					});

					$scope.loadCSV_latLon = function () {
						try {
							let geoJSON = $scope.makeGeoJSONFromCSVRows($scope.tmpKommonitorGeoresource_table);

							$scope.tmpKommonitorGeoresource_table.geoJSON = geoJSON;

							$scope.onChangeIdProperty($scope.tmpKommonitorGeoresource_table);
							$scope.onChangeNameProperty($scope.tmpKommonitorGeoresource_table);

							$scope.addFileToMap($scope.tmpKommonitorGeoresource_table);	
						} catch (error) {
							console.error(error);
							kommonitorToastHelperService.displayErrorToast_upperLeft("Fehler beim Laden der CSV-Datei", error);
						}						
					}

					$scope.makeGeoJSONFromCSVRows = function (kommonitorGeoresource) {
						let geoJSON = {
							"type": "FeatureCollection",
							"features": []
						};

						for (const row of kommonitorGeoresource.dataRows) {
							if (row[kommonitorGeoresource.LON_ATTRIBUTE] && row[kommonitorGeoresource.LAT_ATTRIBUTE]) {
								let feature = {
									"type": "Feature",
									"geometry": {
										"type": "Point",
										"coordinates": [Number(row[kommonitorGeoresource.LON_ATTRIBUTE]), Number(row[kommonitorGeoresource.LAT_ATTRIBUTE])]
									},
									"properties": row
								};

								geoJSON.features.push(feature);
							}
						}

						return geoJSON;
					}

					$scope.dropHandler = function (ev) {
						$scope.fileLayerError = undefined;

						try {
							// Prevent default behavior (Prevent file from being opened)
							ev.preventDefault();

							if (ev.dataTransfer.items) {
								// Use DataTransferItemList interface to access the file(s)
								for (var i = 0; i < ev.dataTransfer.items.length; i++) {
									// If dropped items aren't files, reject them
									if (ev.dataTransfer.items[i].kind === 'file') {
										var file = ev.dataTransfer.items[i].getAsFile();
										kommonitorFileHelperService.transformFileToKomMonitorGeoressource(file, $scope.customFileInputColor);
									}
								}
							} else {
								// Use DataTransfer interface to access the file(s)
								for (var i = 0; i < ev.dataTransfer.files.length; i++) {
									var file = ev.dataTransfer.files[i];
									kommonitorFileHelperService.transformFileToKomMonitorGeoressource(file, $scope.customFileInputColor);
								}
							}
						} catch (e) {
							$scope.fileLayerError = e;
							console.error(e);
							kommonitorToastHelperService.displayErrorToast_upperLeft("Fehler in Dateiverarbeitung", $scope.fileLayerError);
						} finally {

						}

					};

					$scope.adjustFileLayerTransparency = function (dataset) {

						var opacity = 1 - dataset.transparency;

						kommonitorMapService.adjustOpacityForFileLayer(dataset, opacity);
					};

					$scope.adjustFileLayerColor = function (dataset) {

						var color = dataset.displayColor;

						kommonitorMapService.adjustColorForFileLayer(dataset, color);
					};

					$scope.$on("onDropFile", function (ev, dropEvent) {
						$scope.dropHandler(dropEvent);
					});

					// $scope.dragOverHandler = function(ev) {
					//   console.log('File(s) in drop zone');
					//
					//   // Prevent default behavior (Prevent file from being opened)
					//   ev.preventDefault();
					// };

					$scope.openFileDialog = function () {
						// $("#fileUploadInput").trigger("click");
						document.getElementById("fileUploadInput").click();
					};

					$(document).on('change', '#fileUploadInput', function () {

						// get the file
						var files = document.getElementById('fileUploadInput').files;

						for (var i = 0; i < files.length; i++) {
							var file = files[i];
							kommonitorFileHelperService.transformFileToKomMonitorGeoressource(file, $scope.customFileInputColor);
						}
					});

					$scope.$on("FileLayerError", function (event, errorMsg, dataset) {
						$scope.fileLayerError = errorMsg;
						kommonitorToastHelperService.displayErrorToast_upperLeft("Fehler in Dateiverarbeitung", $scope.fileLayerError);

						// remove element from fileDatasets
						for (var i = 0; i < kommonitorDataExchangeService.fileDatasets.length; i++) {
							if (kommonitorDataExchangeService.fileDatasets[i] === dataset) {
								kommonitorDataExchangeService.fileDatasets.splice(i, 1);
								break;
							}
						}
					});

					$scope.$on("FileLayerSuccess", function (event, dataset) {
						$scope.fileLayerError = undefined;						
						kommonitorDataExchangeService.fileDatasets.push(dataset);
						kommonitorDataExchangeService.displayableGeoresources.push(dataset);

						setTimeout(function () {
							$scope.$digest();

							setTimeout(function () {
								// initialize colorpicker
								$('.input-group.colorpicker-component').colorpicker();
							}, 350);
						}, 350);

						kommonitorToastHelperService.displaySuccessToast_upperLeft("Datei erfolgreich importiert", dataset.title);
					});					

					$scope.removeDataLayer = function (dataset) {

						if (dataset.isSelected) {
							kommonitorMapService.removeFileLayerFromMap(dataset);
						}

						for (let i = 0; i < kommonitorDataExchangeService.fileDatasets.length; i++) {
							if (kommonitorDataExchangeService.fileDatasets[i].datasetName == dataset.datasetName) {
								kommonitorDataExchangeService.fileDatasets.splice(i, 1);
							}
						}
						for (let i = 0; i < kommonitorDataExchangeService.displayableGeoresources.length; i++) {
							if (kommonitorDataExchangeService.displayableGeoresources[i].datasetName == dataset.datasetName) {
								kommonitorDataExchangeService.displayableGeoresources.splice(i, 1);
							}
						}
					}

					$scope.onChangeNameProperty = function (dataset) {
						// ensure it is a string
						for (const feature of dataset.geoJSON.features) {
							feature.properties[__env.FEATURE_NAME_PROPERTY_NAME] = "" + feature.properties[dataset.NAME_ATTRIBUTE]
						}

						// $scope.refreshDataLayer(dataset);
					}

					$scope.onChangeIdProperty = function (dataset) {
						// ensure it is a string
						for (const feature of dataset.geoJSON.features) {
							feature.properties[__env.FEATURE_ID_PROPERTY_NAME] = "" + feature.properties[dataset.ID_ATTRIBUTE]
						}

						// $scope.refreshDataLayer(dataset);
					}
				}]
		});
