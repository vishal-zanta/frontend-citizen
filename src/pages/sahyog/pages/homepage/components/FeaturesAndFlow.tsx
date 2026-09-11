import React from "react";
import { Layers, Workflow, ShieldCheck } from "lucide-react";
import { useSahyogTranslation } from "../../../translations";

export default function FeaturesAndFlow() {
  const { t } = useSahyogTranslation();

  return (
    <section className="py-16 px-4 sm:px-8 bg-white" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Key Features */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {t.featuresAndFlow.featuresTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.featuresAndFlow.featuresSubtitle}
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {t.featuresAndFlow.featuresList.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white transition-colors group"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2 shrink-0 group-hover:scale-125 transition-transform shadow-xs"></span>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.featuresAndFlow.secureBadge}</span>
              </span>
            </div>
          </div>

          {/* Right Column: How It Works (Workflow Steps) */}
          <div
            className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            id="how-it-works"
          >
            <div>
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {t.featuresAndFlow.flowTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.featuresAndFlow.flowSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {t.featuresAndFlow.steps.map((stepItem) => (
                  <div
                    key={stepItem.step}
                    className="flex items-start gap-4 p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-xs transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-extrabold text-sm flex items-center justify-center shrink-0 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {stepItem.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {stepItem.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {stepItem.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">{t.featuresAndFlow.slaNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
