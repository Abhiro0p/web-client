angular.module('scriptGeneric').component('scriptGeneric', {
	templateUrl: "components/kommonitorAdmin/adminScriptManagement/scriptAddModal/scriptDefinition/generic/script-generic.template.html",
	controller: ['kommonitorDataExchangeService', 'kommonitorScriptHelperService', '$scope', '$rootScope', '$http', '__env', '$timeout',
		function ScriptGenericController(kommonitorDataExchangeService, kommonitorScriptHelperService, $scope, $rootScope, $http, __env, $timeout) {

			this.kommonitorDataExchangeServiceInstance = kommonitorDataExchangeService;
			this.kommonitorScriptHelperServiceInstance = kommonitorScriptHelperService;

			/*	POST BODY
				{
						"scriptCodeBase64": "scriptCodeBase64",
						"requiredIndicatorIds": [
							"requiredIndicatorIds",
							"requiredIndicatorIds"
						],
						"variableProcessParameters": [
							{
							"minParameterValueForNumericInputs": 6.027456183070403,
							"maxParameterValueForNumericInputs": 0.8008281904610115,
							"defaultValue": "defaultValue",
							"dataType": "string",
							"name": "name",
							"description": "description"
							},
							{
							"minParameterValueForNumericInputs": 6.027456183070403,
							"maxParameterValueForNumericInputs": 0.8008281904610115,
							"defaultValue": "defaultValue",
							"dataType": "string",
							"name": "name",
							"description": "description"
							}
						],
						"associatedIndicatorId": "associatedIndicatorId",
						"name": "name",
						"description": "description",
						"requiredGeoresourceIds": [
							"requiredGeoresourceIds",
							"requiredGeoresourceIds"
						]
						}
			*/

			// initialize any adminLTE box widgets
			$('.box').boxWidget();

			$scope.tmpIndicatorSelection = undefined;
			$scope.tmpGeoresourceSelection = undefined;

			$scope.parameterName_tmp = undefined;
			$scope.parameterDescription_tmp = undefined;
			$scope.parameterDefaultValue_tmp = undefined;
			$scope.parameterNumericMinValue_tmp = 0;
			$scope.parameterNumericMaxValue_tmp = 1;

			$scope.scriptCode_readableString = undefined;

			$scope.onChangeDefaultValue = function (value) {
				$scope.parameterDefaultValue_tmp = value;
			};

			$scope.onChangeNumericMinValue = function (value) {
				$scope.parameterNumericMinValue_tmp = value;
			};

			$scope.onChangeNumericMaxValue = function (value) {
				$scope.parameterNumericMaxValue_tmp = value;
			};

			$scope.onAddScriptParameter = function () {
				kommonitorScriptHelperService.addScriptParameter($scope.parameterName_tmp, $scope.parameterDescription_tmp, $scope.parameterDataType_tmp, $scope.parameterDefaultValue_tmp, $scope.parameterNumericMinValue_tmp, $scope.parameterNumericMaxValue_tmp);

				$scope.resetScriptParameterForm();
			};

			$scope.resetScriptParameterForm = function () {
				$scope.parameterName_tmp = undefined;
				$scope.parameterDescription_tmp = undefined;
				$scope.parameterDefaultValue_tmp = undefined;
				$scope.parameterNumericMinValue_tmp = 0;
				$scope.parameterNumericMaxValue_tmp = 1;
			};

			$scope.onImportScriptCodeFile = function(){

				$scope.indicatorMetadataImportError = "";
	
				$("#scriptCodeImportFile").files = [];
	
				// trigger file chooser
				$("#scriptCodeImportFile").click();
	
			};
	
			$(document).on("change", "#scriptCodeImportFile" ,function(){
	
				console.log("Importing Indicator metadata for Add Indicator Form");
	
				// get the file
				var file = document.getElementById('scriptCodeImportFile').files[0];
				$scope.parseMetadataFromFile(file);
			});
	
			$scope.parseMetadataFromFile = function(file){
				var fileReader = new FileReader();
	
				fileReader.onload = function(event) {
	
					try{
						$scope.parseFromMetadataFile(event);
					}
					catch(error){
						console.error(error);
						console.error("Uploaded Metadata File cannot be parsed.");
						$scope.indicatorMetadataImportError = "Uploaded Metadata File cannot be parsed correctly";
						document.getElementById("indicatorsAddMetadataPre").innerHTML = $scope.indicatorMetadataStructure_pretty;
						$("#indicatorAddMetadataImportErrorAlert").show();
	
						$scope.$apply();
					}
	
				};
	
				// Read in the image file as a data URL.
				fileReader.readAsText(file);
			};
	
			$scope.parseFromMetadataFile = function(event){
				// $scope.geoJsonString = event.target.result;
				$scope.metadataImportSettings = JSON.parse(event.target.result);
	
				if(! $scope.metadataImportSettings.metadata){
					console.error("uploaded Metadata File cannot be parsed - wrong structure.");
					$scope.indicatorMetadataImportError = "Struktur der Datei stimmt nicht mit erwartetem Muster &uuml;berein.";
					document.getElementById("indicatorsAddMetadataPre").innerHTML = $scope.indicatorMetadataStructure_pretty;
					$("#indicatorAddMetadataImportErrorAlert").show();
	
					$scope.$apply();
				}
		
					$scope.$apply();
			};
	

		}
	]
});
