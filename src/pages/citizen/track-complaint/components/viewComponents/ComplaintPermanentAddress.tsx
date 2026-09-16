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
      permAddr?.urbanPanchayat ||
      permAddr?.ward ||
      permAddr?.block ||
      permAddr?.panchayat ||
      permAddr?.village ||
      permAddr?.thana ||
      permAddr?.landmark ||
      permAddr?.pincode ||
      permAddr?.pinCode,
  );

  if (!hasPermAddr) return null;

  return (
    <div className="mt-4 pt-3 pb-4 border-b border-border">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          {t("Permanent Address", "स्थायी पता")}
        </h4>
        {typeof permAddr.isUrban === "boolean" && (
          <span className="border border-border/80 rounded-md px-2.5 py-0.5 text-xs font-medium text-foreground bg-muted/30">
            {permAddr.isUrban ? t("Urban", "शहरी") : t("Rural", "ग्रामीण")}
          </span>
        )}
      </div>
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
         {permAddr.block && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.block, t)}
            </span>
          </div>
        )}
        {permAddr.urbanPanchayat && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t(
                "Municipal Corporation / Council / Nagar Panchayat",
                "नगर निगम / नगर परिषद / नगर पंचायत",
              )}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.urbanPanchayat, t)}
            </span>
          </div>
        )}
        {permAddr.ward && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Ward", "वार्ड")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.ward, t)}
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
        {permAddr.village && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Village", "गाँव")}
            </span>
            <span className="font-medium text-foreground">
              {getEntityLabel(permAddr.village, t)}
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
        {permAddr.landmark && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Landmark", "लैंडमार्क")}
            </span>
            <span className="font-medium text-foreground">
              {permAddr.landmark}
            </span>
          </div>
        )}
        {(permAddr.pincode || permAddr.pinCode) && (
          <div>
            <span className="text-xs text-muted-foreground block">
              {t("Pin Code", "पिन कोड")}
            </span>
            <span className="font-medium text-foreground">
              {permAddr.pincode || permAddr.pinCode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

