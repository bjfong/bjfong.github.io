function gallbladder_getText(selection) {
  var textDict = {
    "extremelyLow_extremelyLow-lessThan9": "No follow-up",
    "extremelyLow_extremelyLow-10to14": "Follow-up US at 6, 12, 24 months",
    "extremelyLow_extremelyLow-15orMore": "Surgical consult",
    "low_low-lessThan6": "No follow-up",
    "low_low-7to9": "Follow-up US at 12 months",
    "low_low-10to14": "Follow-up US at 6, 12, 24, 36 months vs surgical consult",
    "low_low-15orMore": "Surgical consult",
    "indeterminate_indeterminate-lessThan6": "Follow-up US at 6, 12, 24, 36 months vs surgical consult",
    "indeterminate_indeterminate-7orMore": "Surgical consult"
  }
  return textDict[selection] === undefined ? "" : textDict[selection];
}

function gallbladder_check(val, name) {
  if (name === "gallbladderRisk" && val === "extremelyLow") {
    showElement("gallbladderExtremelyLowSizeDiv", true);
    
    showElement("gallbladderLowSizeDiv", false);
    showElement("gallbladderIndeterminateSizeDiv", false);
  }
  
  if (name === "gallbladderRisk" && val === "low") {
    showElement("gallbladderLowSizeDiv", true);
  
    showElement("gallbladderExtremelyLowSizeDiv", false);
    showElement("gallbladderIndeterminateSizeDiv", false);
  }
  
  if (name === "gallbladderRisk" && val === "indeterminate") {
    showElement("gallbladderIndeterminateSizeDiv", true);
    
    showElement("gallbladderExtremelyLowSizeDiv", false);
    showElement("gallbladderLowSizeDiv", false);
  }
  
  var result = gallbladder_getAllVisibleInputs();
  // debug(result);
  var textToDisplay = gallbladder_getText(result);
  document.getElementById("gallbladder_answer").value = textToDisplay;

  showCopyTextButton("gallbladder_answer", "gallbladder_copyTextId", textToDisplay !== "");
}

function gallbladder_getAllVisibleInputs() {
  var elements = document.getElementsByClassName("gallbladderContainer");
  var elementsArray = [...elements];
  var visibleInputs = elementsArray.filter(e => e.style.display === "" || e.style.display === "block");

  var values = [];
  for (var i = 0; i < visibleInputs.length; i++) {
    var radioButtons = visibleInputs[i].getElementsByClassName("gallbladder_radioButton");
    for (var j = 0; j < radioButtons.length; j++) {
      if (radioButtons[j].checked) {
        values.push(radioButtons[j].value);
      }
    }
  }

  return values.join("_");
}

function gallbladder_clearInputs() {
  var elements = document.getElementsByClassName("gallbladder_radioButton");
  var elementsArray = [...elements];
  for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].checked = false;
  }

  document.getElementById("gallbladder_answer").value = "";

  showCopyTextButton("gallbladder_answer", "gallbladder_copyTextId", false);
  showElement("gallbladderExtremelyLowSizeDiv", false);
  showElement("gallbladderLowSizeDiv", false);
  showElement("gallbladderIndeterminateSizeDiv", false);
}
  
function gallbladder_hideTooltip() {
    const myTooltipEl = document.getElementById('gallbladder_copyTextId');
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    tooltip.hide();
}

// ------------------

function liverMass_getText(selection) {
  var textDict = {
    "lessThan1_low": "Benign, no further follow-up",
    "lessThan1_high": "Follow-up MRI in 3-6 months",
    "1to1point5_benign": "Benign, no further follow-up",
    "1to1point5_suspicious": "Hepatic MRI now",
    "1to1point5_flashFilling_low": "Benign, no further follow-up",
    "1to1point5_flashFilling_high": "Hepatic MRI now",
    "greaterThan1point5_benign": "Benign, no further follow-up",
    "greaterThan1point5_suspiciousOrFlashFilling_low": "Hepatic MRI now",
    "greaterThan1point5_suspiciousOrFlashFilling_high": "Hepatic MRI now or biopsy",
  }
  return textDict[selection] === undefined ? "" : textDict[selection];
}

/**
 * Shows element by element ID and boolean `show`
 * @param {*} elementId 
 * @param {*} show 
 */
function showElement(elementId, show) {
  document.getElementById(`${elementId}`).style.display = show ? 'block' : 'none';
}

function isVisible(elementId) {
    return document.getElementById(`${elementId}`).style.display === "" || 
    document.getElementById(`${elementId}`).style.display === "block";
}
function isSelected(elementId) {
    return document.getElementById(`${elementId}`).checked;
}

function liverMass_getAllVisibleInputs(containerClassName, radioButtonClassName) {
  var elements = document.getElementsByClassName(`${containerClassName}`);
  var elementsArray = [...elements];
  var visibleInputs = elementsArray.filter(e => e.style.display === "" || e.style.display === "block");

  var values = [];
  for (var i = 0; i < visibleInputs.length; i++) {
    var radioButtons = visibleInputs[i].getElementsByClassName(`${radioButtonClassName}`);
    for (var j = 0; j < radioButtons.length; j++) {
      if (radioButtons[j].checked) {
        values.push(radioButtons[j].value);
      }
    }
  }

  return values.join("_");
}

function liverMass_check(val, name) {
  if (name === "liverMassSize" && val === "lessThan1") {
    showElement("riskLevelLessThan1Div", true);
    showElement("imagingFeatures1to1point5Div", false);
    showElement("riskLevel1to1point5Div", false);
    showElement("riskLevelGreaterThan1point5Div", false);
    showElement("imagingFeaturesGreaterThan1point5Div", false);
  }

  if (name === "liverMassSize" && val === "1to1point5") {
    showElement("imagingFeatures1to1point5Div", true);
    showElement("riskLevelLessThan1Div", false);
    showElement("riskLevelGreaterThan1point5Div", false);
    showElement("imagingFeaturesGreaterThan1point5Div", false);

    // if flash filling is selected, show. otherwise, hide
    var showRiskLevel1to1point5Group = isVisible("imagingFeatures1to1point5Div") && isSelected("imagingFeatures-1to1point5-flashFilling");
    showElement("riskLevel1to1point5Div", showRiskLevel1to1point5Group);
  }

  if (name === "liverMassSize" && val === "greaterThan1point5") {
    showElement("imagingFeaturesGreaterThan1point5Div", true);
    showElement("imagingFeatures1to1point5Div", false);
    showElement("riskLevelLessThan1Div", false);
    showElement("riskLevel1to1point5Div", false);

    // if sus OR flash filling is selected, show. otherwise, hide
    var showRiskLevelGreaterThan1point5Group = isVisible("imagingFeaturesGreaterThan1point5Div") && isSelected("imagingFeatures-greaterThan1point5-suspiciousOrFlashFilling");
    showElement("riskLevelGreaterThan1point5Div", showRiskLevelGreaterThan1point5Group);
  }

  if (name === "imagingFeatures-1to1point5" && val !== "flashFilling") {
    showElement("riskLevel1to1point5Div", false);
    showElement("riskLevelGreaterThan1point5Div", false);
    showElement("imagingFeaturesGreaterThan1point5Div", false);
  }

  if (name === "imagingFeatures-1to1point5" && val === "flashFilling") {
    showElement("riskLevel1to1point5Div", true);
    showElement("riskLevelGreaterThan1point5Div", false);
    showElement("imagingFeaturesGreaterThan1point5Div", false);
  }

  if (name === "imagingFeatures-greaterThan1point5" && val === "benign") {
    showElement("riskLevelGreaterThan1point5Div", false);
  }

  if (name === "imagingFeatures-greaterThan1point5" && val === "suspiciousOrFlashFilling") {
    showElement("riskLevelGreaterThan1point5Div", true);
  }

  var result = liverMass_getAllVisibleInputs('liverMassContainer', 'radioButton');
  var textToDisplay = liverMass_getText(result);
  document.getElementById("answer").value = textToDisplay;

  showCopyTextButton('answer', 'copyTextId', textToDisplay !== "");
}

// 'answer', 'copyTextId', 
function showCopyTextButton(answerElementId, tooltipId, show) {
  var answerEl = document.getElementById(`${answerElementId}`);
  var copyTextEl = document.getElementById(`${tooltipId}`);
  if (show) {
    answerEl.classList.remove("hidden");
    answerEl.classList.add("answerWithBorder");
    copyTextEl.classList.remove("hidden");
    copyTextEl.classList.add("visible");
  } else {
    answerEl.classList.remove("answerWithBorder");
    answerEl.classList.add("hidden");
    copyTextEl.classList.add("hidden");
    copyTextEl.classList.remove("visible");
  }
}

function liverMass_clearInputs() {
  var elements = document.getElementsByClassName("radioButton");
  var elementsArray = [...elements];
  for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].checked = false;
  }

  document.getElementById("answer").value = "";
  showCopyTextButton('answer', 'copyTextId', false);

  showElement("imagingFeatures1to1point5Div", false);
  showElement("riskLevelLessThan1Div", false);
  showElement("riskLevel1to1point5Div", false);
  showElement("riskLevelGreaterThan1point5Div", false);
  showElement("imagingFeaturesGreaterThan1point5Div", false);
}

function copyText(elementId, tooltipId) {
  var copyText = document.getElementById(`${elementId}`);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);

  const myTooltipEl = document.getElementById(`${tooltipId}`);
  const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
  tooltip.show();
}
  
function hideTooltip(tooltipId) {
    const myTooltipEl = document.getElementById(`${tooltipId}`);
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    tooltip.hide();
}

function debug(text) {
    document.getElementById("debug").innerHTML = "DEBUG: " + text;
}
