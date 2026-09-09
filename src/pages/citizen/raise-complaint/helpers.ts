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
    if (citizenAddr.addressLine)
      formData.append(
        "citizenInfo[address][addressLine]",
        citizenAddr.addressLine,
      );
    if (citizenAddr.district)
      formData.append("citizenInfo[address][district]", citizenAddr.district);
    if (citizenAddr.subdivision)
      formData.append(
        "citizenInfo[address][subdivision]",
        citizenAddr.subdivision,
      );
    if (citizenAddr.panchayat)
      formData.append("citizenInfo[address][panchayat]", citizenAddr.panchayat);
    if (citizenAddr.thana)
      formData.append("citizenInfo[address][thana]", citizenAddr.thana);
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

  // if (data.communication.preferredMode)
  //   formData.append("communication[preferredMode]", data.communication.preferredMode);
  formData.append(
    "communication[feedbackConsent]",
    String(data.communication.feedbackConsent ?? false),
  );

  const addr = data.address as any;
  if (addr) {
    if (addr.addressLine)
      formData.append("address[addressLine]", addr.addressLine);
    if (addr.state)
      formData.append("address[state]", addr.state);
    if (addr.city)
      formData.append("address[city]", addr.city);
    if (addr.district) formData.append("address[district]", addr.district);
    if (addr.subdivision)
      formData.append("address[subdivision]", addr.subdivision);
    if (addr.panchayat) formData.append("address[panchayat]", addr.panchayat);
    if (addr.thana) formData.append("address[thana]", addr.thana);
    if (addr.pincode) formData.append("address[pincode]", addr.pincode);
  }

  if (typeof (data as any).isCrpEqualPerAdd !== "undefined") {
    formData.append("isCrpEqualPerAdd", String((data as any).isCrpEqualPerAdd));
  }

  const loc = (data as any).location;
  if (loc) {
    if (loc.division) formData.append("location[division]", loc.division);
    if (loc.district) formData.append("location[district]", loc.district);
    if (loc.subdivision)
      formData.append("location[subdivision]", loc.subdivision);
    if (loc.block) formData.append("location[block]", loc.block);
    if (loc.panchayat) formData.append("location[panchayat]", loc.panchayat);
    if (loc.pincode) formData.append("location[pincode]", loc.pincode);
  }

  // formData.append("channel", "Website");

  attachments.forEach((file) => formData.append("attachments[]", file));

  return formData;
};
