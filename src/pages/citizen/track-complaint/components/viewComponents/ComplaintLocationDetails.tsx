import React from "react";
import { Building2 } from "lucide-react";
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
    loc.division ||
      loc.district ||
      loc.subdivision ||
      loc.block ||
      loc.panchayat ||
      loc.pincode ||
      loc.pinCode,
  );

  if (!hasLocation) return null;

  return (
    <div className="mt-4 pt-3 pb-4 border-b border-border">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
        <Building2 className="w-4 h-4 text-primary shrink-0" />
        {t(
          "Location Details/Place of occurence",
          "स्थान का विवरण/घटना का स्थान",
        )}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
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
        {loc.subdivision && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Subdivision", "अनुमंडल")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.subdivision, t)}
            </span>
          </div>
        )}
        {loc.block && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Block", "प्रखंड")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(loc.block, t)}
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
