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
  t,
}: ComplaintCorrespondenceAddressProps) {
  const corrAddr = address || {};

  const hasCorrAddr = Boolean(
    corrAddr?.addressLine ||
      corrAddr?.addressLine2 ||
      corrAddr?.state ||
      corrAddr?.city ||
      corrAddr?.district ||
      corrAddr?.urbanPanchayat ||
      corrAddr?.ward ||
      corrAddr?.block ||
      corrAddr?.panchayat ||
      corrAddr?.village ||
      corrAddr?.villageOrWard ||
      corrAddr?.thana ||
      corrAddr?.landmark ||
      corrAddr?.pincode ||
      corrAddr?.pinCode,
  );

  if (!hasCorrAddr) return null;

  return (
    <div className="mt-4 pt-3 pb-4 border-b border-border">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-primary shrink-0" />
          {t("Correspondence Address", "पत्राचार का पता")}
        </h4>
        {typeof corrAddr.isUrban === "boolean" && (
          <span className="border border-border/80 rounded-md px-2.5 py-0.5 text-xs font-medium text-foreground bg-muted/30">
            {corrAddr.isUrban ? t("Urban", "शहरी") : t("Rural", "ग्रामीण")}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        {corrAddr.addressLine && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <span className="text-xs text-muted-foreground block">
              {t("Address Line", "पता विवरण")}
            </span>
            <span className="font-medium text-foreground">
              {corrAddr.addressLine}
            </span>
          </div>
        )}
        {corrAddr.addressLine2 && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <span className="text-xs text-muted-foreground block">
              {t("Address Line 2", "पता विवरण 2")}
            </span>
            <span className="font-medium text-foreground">
              {corrAddr.addressLine2}
            </span>
          </div>
        )}
        {corrAddr.state && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("State", "राज्य")}
            </span>
            <span className="font-medium text-foreground">
              {corrAddr.state}
            </span>
          </div>
        )}
        {corrAddr.city && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("City", "शहर")}
            </span>
            <span className="font-medium text-foreground">
              {corrAddr.city}
            </span>
          </div>
        )}
        {corrAddr.district && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("District", "ज़िला")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.district, t)}
            </span>
          </div>
        )}
        {corrAddr.urbanPanchayat && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t(
                "Municipal Corporation / Council / Nagar Panchayat",
                "नगर निगम / नगर परिषद / नगर पंचायत",
              )}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.urbanPanchayat, t)}
            </span>
          </div>
        )}
        {corrAddr.ward && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Ward", "वार्ड")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.ward, t)}
            </span>
          </div>
        )}
        {corrAddr.block && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.block, t)}
            </span>
          </div>
        )}
        {corrAddr.panchayat && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Panchayat", "पंचायत")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.panchayat, t)}
            </span>
          </div>
        )}
        {corrAddr.village && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Village", "गाँव")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.village, t)}
            </span>
          </div>
        )}
        {corrAddr.villageOrWard && !corrAddr.village && !corrAddr.ward && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Village / Ward", "गाँव / वार्ड")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.villageOrWard, t)}
            </span>
          </div>
        )}
        {corrAddr.thana && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Thana", "थाना")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(corrAddr.thana, t)}
            </span>
          </div>
        )}
        {corrAddr.landmark && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Landmark", "लैंडमार्क")}
            </span>
            <span className="font-medium text-foreground">
              {corrAddr.landmark}
            </span>
          </div>
        )}
        {(corrAddr.pincode || corrAddr.pinCode) && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Pin Code", "पिन कोड")}
            </span>
            <span className="font-medium text-foreground">
              {corrAddr.pincode || corrAddr.pinCode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

