import React from "react";
import { useFormContext } from "react-hook-form";
import RhfInput from "@/components/rhfinputs/RhfInput";
import RhfSelect from "@/components/rhfinputs/RhfSelect";
import FormSection from "./FormSection";

interface AddressSectionProps {
  t: any;
  allDemography?: any;
  demographyLoading?: boolean;
}

function District_SubDivision({
  t,
  allDemography,
  demographyLoading,
}: {
  t: any;
  allDemography: any;
  demographyLoading?: boolean;
}) {
  const { watch, setValue } = useFormContext();
  const district = watch("address.district");

  React.useEffect(() => {
    // Reset subdivision value when district changes
    setValue("address.subdivision", "");
  }, [district, setValue]);

  return (
    <>
      <RhfSelect
        name="address.district"
        label={t("District", "ज़िला")}
        placeholder={t("Select District", "जिला चुनें")}
        options={allDemography}
        isLoading={demographyLoading}
        required
      />
      <RhfInput
        name="address.subdivision"
        label={t("Subdivision", "उपखंड")}
        placeholder={t("e.g. Danapur", "जैसे दानापुर")}
        required
      />
    </>
  );
}

export default function AddressSection({ t, allDemography, demographyLoading }: AddressSectionProps) {
  return (
    <FormSection title={t("Address", "पता")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RhfInput
          name="address.state"
          label={t("State", "राज्य")}
          placeholder={t("e.g. Bihar", "जैसे बिहार")}
          disabled
          required
        />
        <District_SubDivision
          t={t}
          allDemography={allDemography}
          demographyLoading={demographyLoading}
        />
        <RhfInput
          name="address.villageOrWard"
          label={t("Village / Ward", "गाँव / वार्ड")}
          placeholder={t("Village or ward name", "गाँव या वार्ड का नाम")}
          required
        />
        <RhfInput
          name="address.pinCode"
          label={t("Pin Code", "पिन कोड")}
          placeholder="e.g. 800001"
          inputClassName="tracking-widest"
          required
          isNumsOnly
          maxLength={6}
        />
        <RhfInput
          name="address.landmark"
          label={t("Landmark", "प्रमुख चिह्न")}
          placeholder={t("Near...", "पास में...")}
        />
      </div>
    </FormSection>
  );
}
