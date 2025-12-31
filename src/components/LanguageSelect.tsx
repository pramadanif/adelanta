"use client";

import React from "react";

import { type Locale } from "@/i18n/translations";
import { useLocale } from "@/components/LocaleProvider";

export function LanguageSelect({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className={compact ? "flex items-center gap-2" : "flex items-center gap-2"}>
      <span className={compact ? "text-white/80 text-xs" : "text-white/80 text-sm"}>
        {t("lang.label")}
      </span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className={
          compact
            ? "bg-white/10 text-white text-xs rounded-md px-2 py-1 border border-white/20"
            : "bg-white/10 text-white text-sm rounded-md px-3 py-1.5 border border-white/20"
        }
      >
        <option value="es" className="text-navy">
          {t("lang.es")}
        </option>
        <option value="en" className="text-navy">
          {t("lang.en")}
        </option>
      </select>
    </label>
  );
}
