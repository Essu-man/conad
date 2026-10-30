"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

interface ContactFormProps {
  initialInquiryType?: "demo" | "custom_software" | "partnership" | "general";
}

export function ContactForm({ initialInquiryType = "demo" }: ContactFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [deliveryNote, setDeliveryNote] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      inquiryType: initialInquiryType,
      message: "",
      botTrap: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmissionStatus("loading");
    setResponseMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmissionStatus("success");
        setResponseMessage(resData.message);
        if (resData.details?.deliveryStatus) {
          setDeliveryNote(resData.details.deliveryStatus);
        }
        reset();
      } else {
        setSubmissionStatus("error");
        setResponseMessage(resData.message || "Something went wrong. Please check your entries.");
      }
    } catch {
      setSubmissionStatus("error");
      setResponseMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {submissionStatus === "success" ? (
        <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="font-heading text-2xl font-bold text-[#102A56]">
            Inquiry Received
          </h3>

          <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            {responseMessage}
          </p>

          {deliveryNote && (
            <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-mono text-slate-600">
              Status: {deliveryNote}
            </div>
          )}

          <div className="pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmissionStatus("idle")}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {submissionStatus === "error" && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{responseMessage}</span>
            </div>
          )}

          {/* Honeypot hidden input */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="botTrap">Do not fill this field</label>
            <input
              type="text"
              id="botTrap"
              tabIndex={-1}
              autoComplete="off"
              {...register("botTrap")}
            />
          </div>

          {/* Name & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-1.5"
              >
                Full Name <span className="text-[#FF6B2C]">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border transition-colors focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none ${
                  errors.name ? "border-rose-300 bg-rose-50/20" : "border-slate-300 text-slate-800"
                }`}
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-1.5"
              >
                Company / Organization
              </label>
              <input
                id="company"
                type="text"
                placeholder="Acme Retail Ltd"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border border-slate-300 text-slate-800 transition-colors focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none"
                {...register("company")}
              />
            </div>
          </div>

          {/* Email & Inquiry Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-1.5"
              >
                Work Email <span className="text-[#FF6B2C]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="jane@company.com"
                className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border transition-colors focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none ${
                  errors.email ? "border-rose-300 bg-rose-50/20" : "border-slate-300 text-slate-800"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="inquiryType"
                className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-1.5"
              >
                Inquiry Type <span className="text-[#FF6B2C]">*</span>
              </label>
              <select
                id="inquiryType"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border border-slate-300 text-slate-800 transition-colors focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none"
                {...register("inquiryType")}
              >
                <option value="demo">Conad POS Demo & Terminal Setup</option>
                <option value="custom_software">Conad Inventory & Warehouse Sync</option>
                <option value="partnership">Retail Catalog & Data Migration</option>
                <option value="general">General Business Inquiry</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-[#102A56] mb-1.5"
            >
              Project Scope or Message <span className="text-[#FF6B2C]">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your business setup, active store count, hardware requirements, or development goals..."
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border transition-colors focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none resize-y ${
                errors.message ? "border-rose-300 bg-rose-50/20" : "border-slate-300 text-slate-800"
              }`}
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-rose-600">{errors.message.message}</p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={submissionStatus === "loading"}
              icon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-md shadow-[#FF6B2C]/20"
            >
              Submit Business Inquiry
            </Button>
            <p className="mt-2 text-[11px] text-[#64748B]">
              Your submission is encrypted and handled in accordance with professional confidentiality.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
