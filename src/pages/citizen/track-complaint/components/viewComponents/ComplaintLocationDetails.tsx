import React from "react";
import { Navigation } from "lucide-react";
import { getEntityLabel } from "./utils";

interface ComplaintLocationDetailsProps {
  location: any;
  t: any;
}

export default function ComplaintLocationDetails({
  location,
  t,
}: ComplaintLocationDetailsProps) {
  const loc = location || {};

  const hasLocation = Boolean(
    loc.addressLine ||
      loc.division ||
      loc.district ||
      loc.urbanPanchayat ||
      loc.ward ||
      loc.block ||
      loc.subdivision ||
      loc.panchayat ||
      loc.village ||
      loc.thana ||
      loc.landmark ||
      loc.pincode ||
      loc.pinCode,
  );

  if (!hasLocation) return null;

  return (
    <div className="mt-4 pt-3 pb-4 border-b border-border">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-primary shrink-0" />
          {t(
            "Location Details / Place of Occurrence",
            "स्थान का विवरण / घटना का स्थान",
          )}
        </h4>
        {typeof loc.isUrban === "boolean" && (
          <span className="border border-border/80 rounded-md px-2.5 py-0.5 text-xs font-medium text-foreground bg-muted/30">
            {loc.isUrban ? t("Urban", "शहरी") : t("Rural", "ग्रामीण")}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        {loc.addressLine && (
          <div className="sm:col-span-2 md:col-span-3">
            <span className="text-xs text-muted-foreground block">
              {t("Address Line", "पता विवरण")}
            </span>
            <span className="font-medium text-foreground">
              {loc.addressLine}
            </span>
          </div>
        )}
        {loc.division && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Division", "प्रमंडल")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.division, t)}
            </span>
          </div>
        )}
        {loc.district && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("District", "ज़िला")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.district, t)}
            </span>
          </div>
        )}
        {loc.urbanPanchayat && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t(
                "Municipal Corporation / Council / Nagar Panchayat",
                "नगर निगम / नगर परिषद / नगर पंचायत",
              )}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.urbanPanchayat, t)}
            </span>
          </div>
        )}
        {loc.ward && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Ward", "वार्ड")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.ward, t)}
            </span>
          </div>
        )}
        {(loc.block || loc.subdivision) && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.block || loc.subdivision, t)}
            </span>
          </div>
        )}
        {loc.panchayat && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Panchayat", "पंचायत")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.panchayat, t)}
            </span>
          </div>
        )}
        {loc.village && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Village", "गाँव")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.village, t)}
            </span>
          </div>
        )}
        {loc.thana && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Thana", "थाना")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.thana, t)}
            </span>
          </div>
        )}
        {loc.landmark && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Landmark", "लैंडमार्क")}
            </span>
            <span className="font-medium text-foreground">
              {loc.landmark}
            </span>
          </div>
        )}
        {(loc.pincode || loc.pinCode) && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Pin Code", "पिन कोड")}
            </span>
            <span className="font-medium text-foreground">
              {loc.pincode || loc.pinCode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

