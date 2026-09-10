import React from "react";
import { Building2 } from "lucide-react";
import { getEntityLabel } from "./utils";

interface ComplaintCorrespondenceAddressProps {
  address: any;
  permanentAddress?: any;
  isSameAddress?: boolean;
  t: any;
}

export default function ComplaintCorrespondenceAddress({
  address,
  permanentAddress,
  isSameAddress,
  t,
}: ComplaintCorrespondenceAddressProps) {
  const permAddr = permanentAddress || {};
  const corrAddr = address || {};

  const effectiveCorrAddr = isSameAddress
    ? {
        ...permAddr,
        state: "Bihar",
      }
    : corrAddr;

  const hasCorrAddr = Boolean(
    effectiveCorrAddr?.addressLine ||
      effectiveCorrAddr?.state ||
      effectiveCorrAddr?.city ||
      effectiveCorrAddr?.district ||
      effectiveCorrAddr?.subdivision ||
      effectiveCorrAddr?.panchayat ||
      effectiveCorrAddr?.thana ||
      effectiveCorrAddr?.villageOrWard ||
      effectiveCorrAddr?.pincode ||
      effectiveCorrAddr?.pinCode,
  );

  if (!hasCorrAddr) return null;

  return (
    <div className="mt-4 pt-3 pb-4 border-b border-border">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-primary shrink-0" />
          {t("Correspondence Address", "पत्राचार का पता")}
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        {(effectiveCorrAddr.addressLine || effectiveCorrAddr.landmark) && (
          <div className="sm:col-span-2 md:col-span-3">
            <span className="text-xs text-muted-foreground block">
              {t("Address Line", "पता विवरण")}
            </span>
            <span className="font-medium text-foreground">
              {effectiveCorrAddr.addressLine || effectiveCorrAddr.landmark}
            </span>
          </div>
        )}
        {effectiveCorrAddr.state && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("State", "राज्य")}
            </span>
            <span className="font-medium text-foreground">
              {effectiveCorrAddr.state}
            </span>
          </div>
        )}
        {effectiveCorrAddr.city && effectiveCorrAddr.state !== "Bihar" && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("City", "शहर")}
            </span>
            <span className="font-medium text-foreground">
              {effectiveCorrAddr.city}
            </span>
          </div>
        )}
        {effectiveCorrAddr.district && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("District", "ज़िला")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(effectiveCorrAddr.district, t)}
            </span>
          </div>
        )}
        {effectiveCorrAddr.subdivision && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(effectiveCorrAddr.subdivision, t)}
            </span>
          </div>
        )}
        {effectiveCorrAddr.panchayat && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Panchayat", "पंचायत")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(effectiveCorrAddr.panchayat, t)}
            </span>
          </div>
        )}
        {effectiveCorrAddr.thana && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Thana", "थाना")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(effectiveCorrAddr.thana, t)}
            </span>
          </div>
        )}
        {effectiveCorrAddr.villageOrWard && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Village / Ward", "गाँव / वार्ड")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(effectiveCorrAddr.villageOrWard, t)}
            </span>
          </div>
        )}
        {(effectiveCorrAddr.pincode || effectiveCorrAddr.pinCode) && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Pin Code", "पिन कोड")}
            </span>
            <span className="font-medium text-foreground">
              {effectiveCorrAddr.pincode || effectiveCorrAddr.pinCode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
