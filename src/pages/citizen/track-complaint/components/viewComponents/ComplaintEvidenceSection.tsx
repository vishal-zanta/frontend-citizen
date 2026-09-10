import React from "react";
import { IMG_BASE_URL } from "@/utils/constants";
import { getImageUrl } from "@/utils/helpers";

interface ComplaintEvidenceSectionProps {
  complaint: any;
  t: any;
}

export default function ComplaintEvidenceSection({
  complaint,
  t,
}: ComplaintEvidenceSectionProps) {
  const c = complaint || {};
  const description = c?.evidence?.details || c?.description;
  const attachments = c?.evidence?.attachments || [];
  const geotaggedImages =
    c?.geotaggedImages || c?.evidence?.geotaggedImages || [];

  return (
    <>
      {/* Brief Description */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="text-xs text-muted-foreground mb-1">
          {t("Brief Description", "संक्षिप्त विवरण")}
        </div>
        <p className="text-sm text-foreground">
          {description || "N/A"}
        </p>
      </div>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="mt-4">
          <div className="text-[10px] lg:text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
            {t("Uploaded document", "अपलोड किया गया दस्तावेज़")} (
            {attachments.length})
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {attachments.map((att: any, idx: number) => {
              const isImage =
                att.type === "IMAGE" ||
                att.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
              return (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-2 bg-card overflow-hidden"
                >
                  {isImage ? (
                    <a
                      href={getImageUrl(att.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={getImageUrl(att.url)}
                        alt={att.fileName || "Attachment"}
                        className="max-h-48 max-w-48 mx-auto w-full h-full object-contain rounded hover:scale-105 transition-transform"
                      />
                    </a>
                  ) : (
                    <div className="w-full h-24 bg-muted/50 rounded flex items-center justify-center flex-col p-1 text-center">
                      <span className="text-[10px] text-muted-foreground font-mono truncate w-full">
                        {att.fileName}
                      </span>
                      <a
                        href={IMG_BASE_URL + att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 font-semibold"
                      >
                        {t("Download", "डाउनलोड करें")}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Geotagged Images */}
      {geotaggedImages.length > 0 && (
        <div className="mt-4">
          <div className="text-[10px] lg:text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
            {t("Geo-Tagged Field Photos", "जियो-टैग की गई फील्ड तस्वीरें")} (
            {geotaggedImages.length})
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {geotaggedImages.map((img: any, idx: number) => {
              const url =
                typeof img === "string" ? img : img?.url || img?.path || "";
              const displayUrl = getImageUrl(url);
              const fileName =
                typeof img === "object"
                  ? img?.fileName || img?.name || `Field Photo ${idx + 1}`
                  : url.split("/").pop() || `Field Photo ${idx + 1}`;
              const isImage =
                (typeof img === "object" && img?.type === "IMAGE") ||
                !!url.match(/\.(jpg|jpeg|png|gif|webp)$/i);

              return (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-2 bg-card overflow-hidden"
                >
                  {isImage ? (
                    <a
                      href={displayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={displayUrl}
                        alt={fileName}
                        className="max-h-48 max-w-48 mx-auto w-full h-full object-contain rounded hover:scale-105 transition-transform"
                      />
                    </a>
                  ) : (
                    <div className="w-full h-24 bg-muted/50 rounded flex items-center justify-center flex-col p-1 text-center">
                      <span className="text-[10px] text-muted-foreground font-mono truncate w-full">
                        {fileName}
                      </span>
                      <a
                        href={displayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 font-semibold"
                      >
                        {t("Download", "डाउनलोड करें")}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
