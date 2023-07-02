function gallbladder_getText(selection) {
<<<<<<< HEAD
  var textDict = {
    "extremelyLow_extremelyLow-lessThan9": "No follow-up",
    "extremelyLow_extremelyLow-10to14": "Follow-up US at 6, 12, 24 months",
    "extremelyLow_extremelyLow-15orMore": "Surgical consult",
   
  }
  return textDict[selection] === undefined ? "" : textDict[selection];
}

function showGallbladderExtremelyLowSizeDiv(show) {
  document.getElementById("gallbladderExtremelyLowSizeDiv").style.display = show ? 'block' : 'none';
}

function gallbladder_check(val, name) {
  if (name === "gallbladderRisk" && val === "extremelyLow") {
    showGallbladderExtremelyLowSizeDiv(true);
  }
  
  var result = gallbladder_getAllVisibleInputs();
  var textToDisplay = gallbladder_getText(result);
  document.getElementById("gallbladder_answer").value = textToDisplay;

  gallbladder_showCopyTextButton(textToDisplay !== "")
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

function gallbladder_showCopyTextButton(show) {
  var answerEl = document.getElementById("gallbladder_answer");
  var copyTextEl = document.getElementById("gallbladder_copyTextId");
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

function gallbladder_clearInputs() {
  var elements = document.getElementsByClassName("gallbladder_radioButton");
  var elementsArray = [...elements];
  for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].checked = false;
  }

  document.getElementById("gallbladder_answer").value = "";
  gallbladder_showCopyTextButton(false);
  showGallbladderExtremelyLowSizeDiv(false);
}

function gallbladder_copyText() {
  var copyText = document.getElementById("gallbladder_answer");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);

  gallbladder_showTooltip();
}

function gallbladder_showTooltip() {
    const myTooltipEl = document.getElementById('gallbladder_copyTextId');
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    tooltip.show();
  }
  
function gallbladder_hideTooltip() {
    const myTooltipEl = document.getElementById('gallbladder_copyTextId');
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    tooltip.hide();
}

// ------------------

function getText(selection) {
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

// 'liverMassContainer', 'radioButton'
// (containerClassName, radioButtonClassName)
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
  var textToDisplay = getText(result);
  document.getElementById("answer").value = textToDisplay;

  showCopyTextButton1('answer', 'copyTextId', textToDisplay !== "");
  // showCopyTextButton(textToDisplay !== "")
}

// 'answer', 'copyTextId', 
function showCopyTextButton1(answerElementId, tooltipId, show) {
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

function showCopyTextButton(show) {
  var answerEl = document.getElementById("answer");
  var copyTextEl = document.getElementById("copyTextId");
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
  showCopyTextButton1('answer', 'copyTextId', false);
  // showCopyTextButton(false);

  showElement("imagingFeatures1to1point5Div", false);
  showElement("riskLevelLessThan1Div", false);
  showElement("riskLevel1to1point5Div", false);
  showElement("riskLevelGreaterThan1point5Div", false);
  showElement("imagingFeaturesGreaterThan1point5Div", false);
}

function copyText1(elementId, tooltipId) {
  var copyText = document.getElementById(`${elementId}`);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);

  const myTooltipEl = document.getElementById(`${tooltipId}`);
  const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
  tooltip.show();
}

// answer, copyTextId
// function copyText(elementId, tooltipId) {
function copyText() {
    var copyText = document.getElementById("answer");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    showTooltip();
}

function showTooltip() {
    const myTooltipEl = document.getElementById('copyTextId');
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    tooltip.show();
  }
  
function hideTooltip(tooltipId) {
    const myTooltipEl = document.getElementById(`${tooltipId}`);
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    tooltip.hide();
}

function hideTooltip() {
    const myTooltipEl = document.getElementById('copyTextId');
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
    tooltip.hide();
}

function debug(text) {
    document.getElementById("debug").innerHTML = "DEBUG: " + text;
}
=======
    var textDict = {
      "extremelyLow_extremelyLow-lessThan9": "No follow-up",
      "extremelyLow_extremelyLow-10to14": "Follow-up US at 6, 12, 24 months",
      "extremelyLow_extremelyLow-15orMore": "Surgical consult",
     
    }
    return textDict[selection] === undefined ? "" : textDict[selection];
  }
  
  function showGallbladderExtremelyLowSizeDiv(show) {
    document.getElementById("gallbladderExtremelyLowSizeDiv").style.display = show ? 'block' : 'none';
  }
  
  function gallbladder_check(val, name) {
    if (name === "gallbladderRisk" && val === "extremelyLow") {
      showGallbladderExtremelyLowSizeDiv(true);
    }
    
    var result = gallbladder_getAllVisibleInputs();
    var textToDisplay = gallbladder_getText(result);
    document.getElementById("gallbladder_answer").value = textToDisplay;
  
    gallbladder_showCopyTextButton(textToDisplay !== "")
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
  
  function gallbladder_showCopyTextButton(show) {
    var answerEl = document.getElementById("gallbladder_answer");
    var copyTextEl = document.getElementById("gallbladder_copyTextId");
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
  
  function gallbladder_clearInputs() {
    var elements = document.getElementsByClassName("gallbladder_radioButton");
    var elementsArray = [...elements];
    for (var i = 0; i < elementsArray.length; i++) {
        elementsArray[i].checked = false;
    }
  
    document.getElementById("gallbladder_answer").value = "";
    gallbladder_showCopyTextButton(false);
    showGallbladderExtremelyLowSizeDiv(false);
  }
  
  function gallbladder_copyText() {
    var copyText = document.getElementById("gallbladder_answer");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  
    gallbladder_showTooltip();
  }
  
  function gallbladder_showTooltip() {
      const myTooltipEl = document.getElementById('gallbladder_copyTextId');
      const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
      tooltip.show();
    }
    
  function gallbladder_hideTooltip() {
      const myTooltipEl = document.getElementById('gallbladder_copyTextId');
      const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
      tooltip.hide();
  }
  
  // ------------------
  
  function getText(selection) {
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
  function showRiskLevelLessThan1(show) {
    document.getElementById("riskLevelLessThan1Div").style.display = show ? 'block' : 'none';
  }
  function showImagingFeatures1to1point5(show) {
    document.getElementById("imagingFeatures1to1point5Div").style.display = show ? 'block' : 'none';
  }
  function showRiskLevel1to1point5(show) {
    document.getElementById("riskLevel1to1point5Div").style.display = show ? 'block' : 'none';
  }
  function showImagingFeaturesGreaterThan1point5(show) {
    document.getElementById("imagingFeaturesGreaterThan1point5Div").style.display = show ? 'block' : 'none';
  }
  function showRiskLevelGreaterThan1point5(show) {
    document.getElementById("riskLevelGreaterThan1point5Div").style.display = show ? 'block' : 'none';
  }
  function isVisible(elementId) {
      return document.getElementById(`${elementId}`).style.display === "" || 
      document.getElementById(`${elementId}`).style.display === "block";
  }
  function isSelected(elementId) {
      return document.getElementById(`${elementId}`).checked;
  }
  function getAllVisibleInputs() {
    var elements = document.getElementsByClassName("liverMassContainer");
    var elementsArray = [...elements];
    var visibleInputs = elementsArray.filter(e => e.style.display === "" || e.style.display === "block");
  
    var values = [];
    for (var i = 0; i < visibleInputs.length; i++) {
      var radioButtons = visibleInputs[i].getElementsByClassName("radioButton");
      for (var j = 0; j < radioButtons.length; j++) {
        if (radioButtons[j].checked) {
          values.push(radioButtons[j].value);
        }
      }
    }
  
    return values.join("_");
  }
  function check(val, name) {
    if (name === "liverMassSize" && val === "lessThan1") {
      showRiskLevelLessThan1(true);
      showImagingFeatures1to1point5(false);
      showRiskLevel1to1point5(false);
      showRiskLevelGreaterThan1point5(false);
      showImagingFeaturesGreaterThan1point5(false);
    }
  
    if (name === "liverMassSize" && val === "1to1point5") {
      showImagingFeatures1to1point5(true);
      showRiskLevelLessThan1(false);
  
      showRiskLevelGreaterThan1point5(false);
      showImagingFeaturesGreaterThan1point5(false);
  
      // if flash filling is selected, show. otherwise, hide
      var showRiskLevel1to1point5Group = isVisible("imagingFeatures1to1point5Div") && isSelected("imagingFeatures-1to1point5-flashFilling");
      showRiskLevel1to1point5(showRiskLevel1to1point5Group);
    }
  
    if (name === "liverMassSize" && val === "greaterThan1point5") {
      showImagingFeaturesGreaterThan1point5(true);
      showImagingFeatures1to1point5(false);
      showRiskLevelLessThan1(false);
      showRiskLevel1to1point5(false);
  
      // if sus OR flash filling is selected, show. otherwise, hide
      var showRiskLevelGreaterThan1point5Group = isVisible("imagingFeaturesGreaterThan1point5Div") && isSelected("imagingFeatures-greaterThan1point5-suspiciousOrFlashFilling");
      showRiskLevelGreaterThan1point5(showRiskLevelGreaterThan1point5Group);
    }
  
    if (name === "imagingFeatures-1to1point5" && val !== "flashFilling") {
      showRiskLevel1to1point5(false);
      showRiskLevelGreaterThan1point5(false);
      showImagingFeaturesGreaterThan1point5(false);
    }
  
    if (name === "imagingFeatures-1to1point5" && val === "flashFilling") {
      showRiskLevel1to1point5(true);
      showRiskLevelGreaterThan1point5(false);
      showImagingFeaturesGreaterThan1point5(false);
    }
  
    if (name === "imagingFeatures-greaterThan1point5" && val === "benign") {
      showRiskLevelGreaterThan1point5(false);
    }
  
    if (name === "imagingFeatures-greaterThan1point5" && val === "suspiciousOrFlashFilling") {
      showRiskLevelGreaterThan1point5(true);
    }
  
    var result = getAllVisibleInputs();
    var textToDisplay = getText(result);
    document.getElementById("answer").value = textToDisplay;
  
    showCopyTextButton(textToDisplay !== "")
  }
  function showCopyTextButton(show) {
    var answerEl = document.getElementById("answer");
    var copyTextEl = document.getElementById("copyTextId");
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
  
  function clearInputs() {
      var elements = document.getElementsByClassName("radioButton");
      var elementsArray = [...elements];
      for (var i = 0; i < elementsArray.length; i++) {
          elementsArray[i].checked = false;
      }
  
      document.getElementById("answer").value = "";
      showCopyTextButton(false);
  
      showImagingFeatures1to1point5(false);
      showRiskLevelLessThan1(false);
      showRiskLevel1to1point5(false);
      showRiskLevelGreaterThan1point5(false);
      showImagingFeaturesGreaterThan1point5(false);
  }
  
  function copyText() {
      var copyText = document.getElementById("answer");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
  
      showTooltip();
  }
  
  function showTooltip() {
      const myTooltipEl = document.getElementById('copyTextId');
      const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
      tooltip.show();
    }
    
  function hideTooltip() {
      const myTooltipEl = document.getElementById('copyTextId');
      const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
      tooltip.hide();
  }
  
  function debug(text) {
      document.getElementById("debug").innerHTML = "DEBUG: " + text;
  }
  
>>>>>>> master