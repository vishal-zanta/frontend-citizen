import { GrievanceFormValues } from "./schema";

export const getFormData = (data: GrievanceFormValues, attachments = []) => {
  const formData = new FormData();

  // Flatten nested fields to match Postman format
  if (data.citizenInfo.fullName)
    formData.append("citizenInfo[fullName]", data.citizenInfo.fullName);
  formData.append("citizenInfo[mobile]", data.citizenInfo.mobile);
  if (data.citizenInfo.alternateMobile)
    formData.append(
      "citizenInfo[alternateMobile]",
      data.citizenInfo.alternateMobile,
    );
  if (data.citizenInfo.email)
    formData.append("citizenInfo[email]", data.citizenInfo.email);
  // if (data.citizenInfo.preferredLanguage)
  //   formData.append(
  //     "citizenInfo[preferredLanguage]",
  //     data.citizenInfo.preferredLanguage,
  //   );

  const citizenAddr = (data.citizenInfo as any).address;
  if (citizenAddr) {
    formData.append(
      "citizenInfo[address][isUrban]",
      String(Boolean(citizenAddr.isUrban)),
    );
    if (citizenAddr.addressLine)
      formData.append(
        "citizenInfo[address][addressLine]",
        citizenAddr.addressLine,
      );
    if (citizenAddr.district)
      formData.append("citizenInfo[address][district]", citizenAddr.district);
    if (citizenAddr.urbanPanchayat)
      formData.append(
        "citizenInfo[address][urbanPanchayat]",
        citizenAddr.urbanPanchayat,
      );
    if (citizenAddr.ward)
      formData.append("citizenInfo[address][ward]", citizenAddr.ward);
    if (citizenAddr.block)
      formData.append("citizenInfo[address][block]", citizenAddr.block);
    if (citizenAddr.panchayat)
      formData.append("citizenInfo[address][panchayat]", citizenAddr.panchayat);
    if (citizenAddr.thana)
      formData.append("citizenInfo[address][thana]", citizenAddr.thana);
    if (citizenAddr.village)
      formData.append("citizenInfo[address][village]", citizenAddr.village);
    if (citizenAddr.landmark)
      formData.append("citizenInfo[address][landmark]", citizenAddr.landmark);
    if (citizenAddr.pincode)
      formData.append("citizenInfo[address][pincode]", citizenAddr.pincode);
  }

  // formData.append("classification[subService]", data.classification.subService);
  formData.append("classification[nature]", data.classification.nature);
  formData.append("classification[service]", data.classification.service);
  formData.append("classification[department]", data.classification.department);
  // if ((data.classification as any).subject)
  //   formData.append("classification[subject]", (data.classification as any).subject);

  if (data.evidence.details)
    formData.append("evidence[details]", data.evidence.details);
  // if ((data.evidence as any).occurrenceDate)
  //   formData.append("evidence[occurrenceDate]", (data.evidence as any).occurrenceDate);
  // if ((data.evidence as any).frequency)
  //   formData.append("evidence[frequency]", (data.evidence as any).frequency);

  formData.append(
    "impact[affectedBeneficiary]",
    data.impact.affectedBeneficiary,
  );
  formData.append(
    "impact[vulnerability][seniorCitizen]",
    String(data.impact.vulnerability.seniorCitizen ?? false),
  );
  formData.append(
    "impact[vulnerability][woman]",
    String(data.impact.vulnerability.woman ?? false),
  );
  formData.append(
    "impact[vulnerability][personWithDisability]",
    String(data.impact.vulnerability.personWithDisability ?? false),
  );
  formData.append(
    "impact[vulnerability][economicallyWeakerSection]",
    String(data.impact.vulnerability.economicallyWeakerSection ?? false),
  );
  formData.append(
    "impact[vulnerability][general]",
    String(data.impact.vulnerability.general ?? false),
  );

  // if (data.communication.preferredMode)
  //   formData.append("communication[preferredMode]", data.communication.preferredMode);
  formData.append(
    "communication[feedbackConsent]",
    String(data.communication.feedbackConsent ?? false),
  );

  const addr = data.address as any;
  if (addr) {
    formData.append("address[isUrban]", String(Boolean(addr.isUrban)));
    if (addr.addressLine)
      formData.append("address[addressLine]", addr.addressLine);
    if (addr.addressLine2)
      formData.append("address[addressLine2]", addr.addressLine2);
    if (addr.state) formData.append("address[state]", addr.state);
    if (addr.city) formData.append("address[city]", addr.city);
    if (addr.district) formData.append("address[district]", addr.district);
    if (addr.urbanPanchayat)
      formData.append("address[urbanPanchayat]", addr.urbanPanchayat);
    if (addr.ward) formData.append("address[ward]", addr.ward);
    if (addr.block) formData.append("address[block]", addr.block);
    if (addr.panchayat) formData.append("address[panchayat]", addr.panchayat);
    if (addr.thana) formData.append("address[thana]", addr.thana);
    if (addr.village) formData.append("address[village]", addr.village);
    if (addr.landmark) formData.append("address[landmark]", addr.landmark);
    if (addr.pincode) formData.append("address[pincode]", addr.pincode);
  }

  if (typeof (data as any).isCrpEqualPerAdd !== "undefined") {
    formData.append("isCrpEqualPerAdd", String((data as any).isCrpEqualPerAdd));
  }

  const loc = (data as any).location;
  if (loc) {
    formData.append("location[isUrban]", String(Boolean(loc.isUrban)));
    if (loc.addressLine)
      formData.append("location[addressLine]", loc.addressLine);
    if (loc.district) formData.append("location[district]", loc.district);
    if (loc.urbanPanchayat)
      formData.append("location[urbanPanchayat]", loc.urbanPanchayat);
    if (loc.ward) formData.append("location[ward]", loc.ward);
    if (loc.block) formData.append("location[block]", loc.block);
    if (loc.panchayat) formData.append("location[panchayat]", loc.panchayat);
    if (loc.thana) formData.append("location[thana]", loc.thana);
    if (loc.village) formData.append("location[village]", loc.village);
    if (loc.landmark)
      formData.append("location[landmark]", loc.landmark);
    if (loc.pincode) formData.append("location[pincode]", loc.pincode);
  }

  // formData.append("channel", "Website");

  attachments.forEach((file) => formData.append("attachments[]", file));

  return formData;
};
