
import userFlow from "@/assets/user-flow-steps.png";
import userFlowEng from "@/assets/user-flow-steps-eng.png";

import { useLanguage } from "@/context/LanguageContext";

export default function FeaturesAndFlow() {
  const {t} = useLanguage();

  return (
    <section className=" bg-white" id="how-it-works">
<img src={t(userFlowEng, userFlow)}/>
      {/* <div className="max-w-4xl mx-auto">
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{t.featuresAndFlow.flowTitle}</h3>
              <p className="text-xs text-slate-500 font-medium">{t.featuresAndFlow.flowSubtitle}</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {t.featuresAndFlow.steps.map((stepItem) => (
              <div
                key={stepItem.step}
                className="flex items-start gap-4 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-extrabold text-sm flex items-center justify-center shrink-0 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {stepItem.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {stepItem.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed whitespace-pre-line">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}
