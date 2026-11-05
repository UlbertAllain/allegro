"use client";

import type { ReactNode } from "react";
import type { ProductId } from "@/modules/catalog/data/products";
import { useInquiry } from "./inquiry-provider";

interface InquiryTriggerProps {
  children: ReactNode;
  className?: string;
  productId?: ProductId;
  "aria-label"?: string;
}

export function InquiryTrigger({ children, className, productId, "aria-label": ariaLabel }: InquiryTriggerProps) {
  const { openInquiry } = useInquiry();
  return <button type="button" className={className} onClick={() => openInquiry(productId)} aria-label={ariaLabel}>{children}</button>;
}
