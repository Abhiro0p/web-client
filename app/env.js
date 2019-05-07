(function (window) {
  window.__env = window.__env || {};

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;

  // API url
  window.__env.apiUrl = 'http://kommonitor.fbg-hsbo.de/management';
  // window.__env.apiUrl = 'http://localhost:8085/';
  // Base url
  window.__env.basePath = '';

  window.__env.targetUrlToProcessingEngine = 'http://kommonitor.fbg-hsbo.de/processing/';
  // window.__env.targetUrlToProcessingEngine = 'http://localhost:8086/processing/script-engine/customizableIndicatorComputation';
  window.__env.targetUrlToReachabilityService_ORS = 'http://kommonitor.fbg-hsbo.de/openrouteservice';
  // window.__env.targetUrlToReachabilityService_ORS = 'http://localhost:8090/openrouteservice-4.7.2';
  window.__env.targetUrlToReachabilityService_OTP = 'http://kommonitor.fbg-hsbo.de/opentripplanner';
// window.__env.targetUrlToReachabilityService_OTP = 'http://localhost:8090/opentripplanner';


  window.__env.simplifyGeometriesParameterName = "simplifyGeometries";
  window.__env.simplifyGeometriesOptions = [{"label": "nein", "value": "original"}, {"label": "schwach", "value": "weak"}, {"label": "mittel", "value": "medium"}, {"label": "stark", "value": "strong"}];
  window.__env.simplifyGeometries = "strong";

  window.__env.indicatorDatePrefix = "DATE_";

  window.__env.numberOfDecimals = 2;

  window.__env.initialLatitude = 51.4386432;
  window.__env.initialLongitude = 7.0115552;
  window.__env.initialZoomLevel = 12;
  window.__env.minZoomLevel = 1;
  window.__env.maxZoomLevel = 19;

  window.__env.initialIndicatorId = "d6f447c1-5432-4405-9041-7d5b05fd9ece";
  window.__env.initialSpatialUnitName = "Stadtteilebene";

  window.__env.defaultColorForOutliers_high = "#191919";
  window.__env.defaultBorderColorForOutliers_high = "black";
  window.__env.defaultFillOpacityForOutliers_high = "0.7";
  window.__env.defaultColorForOutliers_low = "#4f4f4f";
  window.__env.defaultBorderColorForOutliers_low = "black";
  window.__env.defaultFillOpacityForOutliers_low = "0.7";
  window.__env.defaultColorForHoveredFeatures = "#e01414";
  window.__env.defaultColorForClickedFeatures = "#42e5f4";
  window.__env.defaultColorForZeroValues = "#bababa";
  window.__env.defaultBorderColor = "black";
  window.__env.defaultColorForFilteredValues = "rgba(255,255,255,0)";
  window.__env.defaultBorderColorForFilteredValues = "black";
  window.__env.defaultFillOpacity = "0.7";
  window.__env.defaultFillOpacityForFilteredFeatures = "0.7";
  window.__env.defaultFillOpacityForZeroFeatures = "0.7";
  window.__env.defaultFillOpacityForHighlightedFeatures = "0.8";
  window.__env.useTransparencyOnIndicator = true;
  //allowesValues: equal_interval, quantile, jenks
  window.__env.defaultClassifyMethod = "equal_interval";

  window.__env.defaultColorBrewerPaletteForBalanceIncreasingValues = "Oranges";
  window.__env.defaultColorBrewerPaletteForBalanceDecreasingValues = "Blues";
  window.__env.defaultColorBrewerPaletteForGtMovValues = "Oranges";
  window.__env.defaultColorBrewerPaletteForLtMovValues = "Purples";

  window.__env.feedbackMailRecipient = "thomas.blasche@amt62.essen.de";



}(this));
