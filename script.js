function adnexal_getText(selection) {
  var textDict = {
    "premenopausal_5orLess": "No further imaging",
    "premenopausal_moreThan5_limited": "Ultrasound",
    "premenopausal_moreThan5_notLimited": "Ultrasound follow-up in 6-12 months",
    "premenopausal_moreThan5_fullyCharacterized": "If ≥ 7 cm, no further imaging. If < 7 cm, US follow-up in 6-12 months",
    "postmenopausal_3orLess": "No further imaging",
    "postmenopausal_moreThan3_limited": "Ultrasound",
    "postmenopausal_moreThan3_notLimited": "Ultrasound follow-up in 6-12 months",
    "postmenopausal_moreThan3_fullyCharacterized": "If ≤ 5 cm, no further imaging. If > 5 cm, US follow-up in 6-12 months",
  }
  return textDict[selection] === undefined ? "" : textDict[selection];
}

function adnexal_check(val, name) {
  if (name === "adnexalMenopause" && val === "premenopausal") {
    showElement("premenopausalSizeDiv", true);
    
    showElement("postmenopausalSizeDiv", false);
    showElement("postmenopausalSizeAssessmentDiv", false);
    showElement("premenopausalSizeAssessmentDiv", isSelected("premenopausalSize-moreThan5"));
  }
  
  if (name === "adnexalMenopause" && val === "postmenopausal") {
    showElement("postmenopausalSizeDiv", true);
  
    showElement("premenopausalSizeDiv", false);
    showElement("premenopausalSizeAssessmentDiv", false);
    showElement("postmenopausalSizeAssessmentDiv", isSelected("postmenopausalSize-moreThan3"));
  }
  
  if (name === "premenopausalSize" && val === "5orLess") {
    showElement("premenopausalSizeAssessmentDiv", false);
  }
  
  if (name === "premenopausalSize" && val === "moreThan5") {
    showElement("premenopausalSizeAssessmentDiv", true);
  }
  
  if (name === "postmenopausalSize" && val === "moreThan3") {
    showElement("postmenopausalSizeAssessmentDiv", true);
  }
  
  if (name === "postmenopausalSize" && val === "3orLess") {
    showElement("postmenopausalSizeAssessmentDiv", false);
  }
  
  var result = getAllVisibleInputs('adnexalContainer', 'adnexal_radioButton');  
  var textToDisplay = adnexal_getText(result);
  
  document.getElementById("adnexal_answer").value = textToDisplay;

  showCopyTextButton("adnexal_answer", "adnexal_copyTextId", textToDisplay !== "");
}

function adnexal_clearInputs() {
  var elements = document.getElementsByClassName("adnexal_radioButton");
  var elementsArray = [...elements];
  for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].checked = false;
  }

  document.getElementById("adnexal_answer").value = "";

  showCopyTextButton("adnexal_answer", "adnexal_copyTextId", false);
  showElement("premenopausalSizeDiv", false);
  showElement("premenopausalSizeAssessmentDiv", false);
  showElement("postmenopausalSizeDiv", false);
  showElement("postmenopausalSizeAssessmentDiv", false);
}

// ------------------

function adrenal_calculate() {
  var str_precontrast = document.getElementById("adrenalPrecontrast");
  var str_postcontrast = document.getElementById("adrenalPostcontrast");
  var str_delayed = document.getElementById("adrenalDelayed");
  var div_absoluteWashout = document.getElementById("absoluteWashoutResult");
  var input_absoluteWashout = document.getElementById("adrenalAbsoluteWashout");
  var div_relativeWashout = document.getElementById("relativeWashoutResult");
  var input_relativeWashout = document.getElementById("adrenalRelativeWashout");

  var float_precontrast = str_precontrast.value;
  var float_postcontrast = str_postcontrast.value;
  var float_delayed = str_delayed.value;

  // if none of the inputs are numbers (or are not populated) do not continue
  if (!isNumber(float_precontrast) || !isNumber(float_postcontrast) || !isNumber(float_delayed)) {
    div_absoluteWashout.classList.add("hidden");
    div_relativeWashout.classList.add("hidden");
    return;
  }
 
  var absoluteWashoutResult = ((float_postcontrast - float_delayed)/(float_postcontrast - float_precontrast)*100).toFixed(2);
  
  if (isNaN(absoluteWashoutResult)) {
    input_absoluteWashout.value = "";
    div_absoluteWashout.classList.add("hidden");
  }
  else {
    input_absoluteWashout.value = absoluteWashoutResult + "%";
    
    var exp_absoluteWashout = document.getElementById("absoluteWashoutExp");
    
    if (absoluteWashoutResult >= 60) {
      var str_output="Absolute washout of 60% or higher is consistent with an adenoma.";
      if (float_precontrast>43) {
          str_output=str_output + "  However, it has been reported that a non-calcified, non-hemorrhagic lesion with precontrast attenuation of more than 43 HU is suspicious for malignancy regardless of washout characteristics.";
      }
      if (float_postcontrast >= 120 && float_precontrast < 70) {
          str_output=str_output + "  Note that the marked enhancement raises the possibility of a pheochromocytoma.";
      }
      exp_absoluteWashout.innerHTML = str_output;
    } else {
      var str_output = "Absolute washout less than 60% is indeterminate.";
      if (float_precontrast < 10) {
          str_output = str_output + "  However, the low pre-contrast attenuation is suggestive of an adenoma.";
      }
      exp_absoluteWashout.innerHTML = str_output;
    }

    div_absoluteWashout.classList.remove("hidden");
  }
  
  var relativeWashoutResult = ((float_postcontrast - float_delayed) / float_postcontrast * 100).toFixed(2);
  
  if (isNaN(relativeWashoutResult)) {
    input_relativeWashout.value = "";
    div_relativeWashout.classList.add("hidden");
  }
  else {
    input_relativeWashout.value = relativeWashoutResult + "%";
    
    var exp_relativeWashout = document.getElementById("relativeWashoutExp");
    if (relativeWashoutResult >= 40) {
      var str_output = "Relative washout of 40% or higher is consistent with an adenoma.";
      if (float_precontrast > 43) {
          str_output = str_output + "  However, it has been reported that a non-calcified, non-hemorrhagic lesion with precontrast attenuation of more than 43 HU is suspicious for malignancy regardless of washout characteristics.";
      }
      if (float_postcontrast >= 120 && float_precontrast < 70) {
          str_output = str_output + "  Note that the marked enhancement raises the possibility of a pheochromocytoma.";
      }            
      exp_relativeWashout.innerHTML = str_output;
    } else {
      var str_output = "Relative washout less than 40% is indeterminate.";
      if (float_precontrast < 10) {
          str_output = str_output + "  However, the low pre-contrast attenuation is suggestive of an adenoma.";
      }
      exp_relativeWashout.innerHTML = str_output;
  }
    
    div_relativeWashout.classList.remove("hidden");
  }
}

function isNumber(str) {
    if (str === "") return false;
    const number = Number(str);
    const isInteger = Number.isInteger(number);
    const isPositiveOrZero = number >= 0;

    return isInteger && isPositiveOrZero;
}

function adrenal_clear() {
  var str_precontrast = document.getElementById("adrenalPrecontrast");
  var str_postcontrast = document.getElementById("adrenalPostcontrast");
  var str_delayed = document.getElementById("adrenalDelayed");
  var div_absoluteWashout = document.getElementById("absoluteWashoutResult");
  var input_absoluteWashout = document.getElementById("adrenalAbsoluteWashout");
  var div_relativeWashout = document.getElementById("relativeWashoutResult");
  var input_relativeWashout = document.getElementById("adrenalRelativeWashout");
  
  str_precontrast.value = "";
  str_postcontrast.value = "";
  str_delayed.value = "";
  div_absoluteWashout.classList.add("hidden");
  input_absoluteWashout.value = "";
  div_relativeWashout.classList.add("hidden");
  input_relativeWashout.value = "";
}

function showTooltip(tooltipId) {
  const myTooltipEl = document.getElementById(`${tooltipId}`);
  const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl);
  tooltip.show();
}

function liRads_getText(selection) {
  var textDict = {
    "hypo_lessThan20_0": "LR3",
    "hypo_lessThan20_1": "LR3",
    "hypo_lessThan20_2": "LR4",
    "hypo_lessThan20_3": "LR4",
    "hypo_20orMore_0": "LR3",
    "hypo_20orMore_1": "LR4",
    "hypo_20orMore_2": "LR4",
    "hypo_20orMore_3": "LR4",
    
    "nonRim_lessThan10_0": "LR3",
    "nonRim_lessThan10_1": "LR4",
    "nonRim_lessThan10_2": "LR4",
    "nonRim_lessThan10_3": "LR4",
    
    "nonRim_10to19_0": "LR3",
    "nonRim_10to19_nonPeripheral": "LR5",
    "nonRim_10to19_thresholdGrowth": "LR5",
    "nonRim_10to19_enhancingCapsule": "LR4",
    "nonRim_10to19_2": "LR5",
    "nonRim_10to19_3": "LR5",
    
    "nonRim_20orMore_0": "LR4",
    "nonRim_20orMore_1": "LR5",
    "nonRim_20orMore_2": "LR5",
    "nonRim_20orMore_3": "LR5",
  }
  return textDict[selection] === undefined ? "" : textDict[selection];
}

function liRads_getAllVisibleInputs(containerClassName, radioButtonClassName) {
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
  
  // is this when it's the ONLY thing selected? or if it's one of the selected?
  if (values.length === 3 && values.includes("nonRim") && values.includes("10to19") && values.includes("nonPeripheral")) {
    return "nonRim_10to19_nonPeripheral";
  }
  
  if (values.length === 3 && values.includes("nonRim") && values.includes("10to19") && values.includes("thresholdGrowth")) {
    return "nonRim_10to19_thresholdGrowth";
  }
  
  if (values.length === 3 && values.includes("nonRim") && values.includes("10to19") && values.includes("enhancingCapsule")) {
    return "nonRim_10to19_enhancingCapsule";
  }
  
  var numCharacteristicsSelected = values.length - 2;
  var arr = [values[0], values[1], numCharacteristicsSelected];
  return arr.join("_");
}
function liRads_check(val, name) {
  if (name === "liRadsArterialPhase" && val === "hypo") {
    showElement("liRadsHypoSizeDiv", true);
    
    showElement("liRadsNonRimSizeDiv", false);
    showElement("liRadsNonRimCharacteristicsDiv", false);
    
    // if this is clicked and size is selected, show characteristics
    var showHypoCharacteristics = isVisible("liRadsHypoSizeDiv") && (isSelected("liRadsHypoSize-lessThan20") || isSelected("liRadsHypoSize-20orMore"));
    showElement("liRadsHypoCharacteristicsDiv", showHypoCharacteristics);
  }
  
  if (name === "liRadsArterialPhase" && val === "nonRim") {
    showElement("liRadsNonRimSizeDiv", true);
    
    showElement("liRadsHypoSizeDiv", false);
    showElement("liRadsHypoCharacteristicsDiv", false);
    
    // if this is clicked and size is selected, show characteristics
    var showNonRimCharacteristics = isVisible("liRadsNonRimSizeDiv") && (isSelected("liRadsNonRimSize-lessThan10") || isSelected("liRadsNonRimSize-10to19") || isSelected("liRadsNonRimSize-20orMore"));
    showElement("liRadsNonRimCharacteristicsDiv", showNonRimCharacteristics);
  }
  
  if (name === "liRadsHypoSize") {
    showElement("liRadsHypoCharacteristicsDiv", true);
  }
  
  if (name === "liRadsNonRimSize") {
    showElement("liRadsNonRimCharacteristicsDiv", true);
  }
  
  var result = "";
  // if none was selected, it's always going to be one
  if (val === "none") {
    if (isVisible("liRadsHypoSizeDiv")) {
      if (isSelected("liRadsHypoSize-lessThan20")) {
        result = "hypo_lessThan20_0";
        clearMultiselect("hypoCharacteristics", "none");
      }
      else {
        result = "hypo_20orMore_0";
        clearMultiselect("hypoCharacteristics", "none");
      }
    }
    else {
      if (isSelected("liRadsNonRimSize-lessThan10")) {
        result = "nonRim_lessThan10_0";
        clearMultiselect("nonRimCharacteristics", "none");
      }
      else if (isSelected("liRadsNonRimSize-10to19")) {
        result = "nonRim_10to19_0";
        clearMultiselect("nonRimCharacteristics", "none");
      }
      else {
        result = "nonRim_20orMore_0";
        clearMultiselect("nonRimCharacteristics", "none");
      }
    }
  }
  else {
    // remove "none" from being selected
    if (isVisible("liRadsHypoSizeDiv")) {
      setSelected("liRadsHypoCharacteristics-none", false);
    } else {
      setSelected("liRadsNonRimCharacteristics-none", false);
    }
    
    // remove "none" from being selected
    if (isVisible("liRadsNonRimSizeDiv")) {
      setSelected("liRadsNonRimCharacteristics-none", false);
    } else {
      setSelected("liRadsNonRimCharacteristics-none", false);
    }
    
    result = liRads_getAllVisibleInputs('liRadsContainer', 'liRads_radioButton');  
  }
  
  var textToDisplay = liRads_getText(result);
  document.getElementById("liRads_answer").value = textToDisplay;

  showCopyTextButton("liRads_answer", "liRads_copyTextId", textToDisplay !== "");
}

function clearMultiselect(multiSelectClassName, valueToExclude) {
  var elements = document.getElementsByClassName(`${multiSelectClassName}`);
  var elementsArray = [...elements];
  for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].value === valueToExclude) {
      elementsArray[i].selected = true;
      elementsArray[i].checked = true;
    } else {
      elementsArray[i].selected = false;
      elementsArray[i].checked = false;
    }
  }
}

function liRads_clearInputs() {
  var elements = document.getElementsByClassName("liRads_radioButton");
  var elementsArray = [...elements];
  for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].checked = false;
  }

  document.getElementById("liRads_answer").value = "";

  showCopyTextButton("liRads_answer", "liRads_copyTextId", false);
  showElement("liRadsHypoSizeDiv", false);
  showElement("liRadsNonRimSizeDiv", false);
  showElement("liRadsHypoCharacteristicsDiv", false);
  showElement("liRadsNonRimCharacteristicsDiv", false);
}

// ------------------

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

function setSelected(elementId, isSelected) {
  document.getElementById(`${elementId}`).checked = isSelected;
  document.getElementById(`${elementId}`).selected = isSelected;
}

function isVisible(elementId) {
    return document.getElementById(`${elementId}`).style.display === "" || 
    document.getElementById(`${elementId}`).style.display === "block";
}
function isSelected(elementId) {
    return document.getElementById(`${elementId}`).checked;
}

function getAllVisibleInputs(containerClassName, radioButtonClassName) {
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

  var result = getAllVisibleInputs('liverMassContainer', 'radioButton');
  var textToDisplay = liverMass_getText(result);
  document.getElementById("answer").value = textToDisplay;

  showCopyTextButton('answer', 'copyTextId', textToDisplay !== "");
}

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
// adrenal
// incidental adnexal mass on CT
// pancreas and renal TBD
