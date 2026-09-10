import React from "react";
import { MapPin } from "lucide-react";
import { getEntityLabel } from "./utils";

interface ComplaintPermanentAddressProps {
  address: any;
  t: any;
}

export default function ComplaintPermanentAddress({
  address,
  t,
}: ComplaintPermanentAddressProps) {
  const permAddr = address || {};
  const hasPermAddr = Boolean(
    permAddr?.addressLine ||
      permAddr?.district ||
      permAddr?.subdivision ||
      permAddr?.panchayat ||
      permAddr?.thana ||
      permAddr?.pincode,
  );

  if (!hasPermAddr) return null;

  return (
    <div className="mt-4 pt-3 pb-4 border-b border-border">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
        <MapPin className="w-4 h-4 text-primary shrink-0" />
        {t("Permanent Address", "स्थायी पता")}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        {permAddr.addressLine && (
          <div className="sm:col-span-2 md:col-span-3">
            <span className="text-xs text-muted-foreground block">
              {t("Address Line", "पता विवरण")}
            </span>
            <span className="font-medium text-foreground">
              {permAddr.addressLine}
            </span>
          </div>
        )}
        {permAddr.district && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("District", "ज़िला")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.district, t)}
            </span>
          </div>
        )}
        {permAddr.subdivision && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.subdivision, t)}
            </span>
          </div>
        )}
        {permAddr.panchayat && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Panchayat", "पंचायत")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.panchayat, t)}
            </span>
          </div>
        )}
        {permAddr.thana && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Thana", "थाना")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.thana, t)}
            </span>
          </div>
        )}
        {permAddr.pincode && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Pin Code", "पिन कोड")}
            </span>
            <span className="font-medium text-foreground">
              {permAddr.pincode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
