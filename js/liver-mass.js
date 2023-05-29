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
  var elements = document.getElementsByClassName("divContainer");
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
}

function debug(text) {
    document.getElementById("debug").innerHTML = "DEBUG: " + text;
}