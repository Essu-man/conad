"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { contactFormSchema, ContactFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Sparkles, AlertCircle, Send } from "lucide-react";

interface ContactFormProps {
  initialInquiryType?: "demo" | "custom_software" | "partnership" | "general";
}

export function ContactForm({ initialInquiryType = "demo" }: ContactFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
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
        setResponseMessage(resData.message || "Thank you! Your inquiry has been submitted successfully.");
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {submissionStatus === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-10 px-4 space-y-5"
          >
            {/* Animated Celebration Icon */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              {/* Pulsing glow background */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.15, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-emerald-400"
              />
              {/* Outer circular badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.08 }}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.18 }}
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Animated Confirmation Message */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Inquiry Submitted</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56] tracking-tight">
                Submitted!
              </h3>

              <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. We have received your request, and our engineering team will get back to you shortly.
              </p>
            </motion.div>

            {/* Action button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
              className="pt-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmissionStatus("idle")}
                className="rounded-xl border-slate-300 text-slate-700 hover:text-[#102A56] hover:bg-slate-50 font-semibold"
              >
                Send Another Message
              </Button>
            </motion.div>
          </motion.div>
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
              <Controller
                name="inquiryType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="inquiryType"
                      className={`w-full ${
                        errors.inquiryType ? "border-rose-300 bg-rose-50/20" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo">
                        Conad POS Demo & Terminal Setup
                      </SelectItem>
                      <SelectItem value="custom_software">
                        Conad Inventory & Warehouse Sync
                      </SelectItem>
                      <SelectItem value="partnership">
                        Retail Catalog & Data Migration
                      </SelectItem>
                      <SelectItem value="general">
                        General Business Inquiry
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.inquiryType && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.inquiryType.message}
                </p>
              )}
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
      </AnimatePresence>
    </div>
  );
}
