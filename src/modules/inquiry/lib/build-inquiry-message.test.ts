import { describe, expect, it } from "vitest";
import { buildInquiryMessage, buildWhatsAppUrl } from "./build-inquiry-message";

describe("buildInquiryMessage", () => {
  it("creates a specific message with no unverified availability", () => {
    const result = buildInquiryMessage({
      productId: "carrier", startDate: "2026-11-03", rentalDays: 3,
    });
    expect(result).toContain("Carrier 65 L");
    expect(result).toContain("3 November 2026");
    expect(result).toContain("3 hari");
    expect(result).toContain("tanya ketersediaan");
  });

  it("rejects impossible dates and durations", () => {
    expect(() => buildInquiryMessage({
      productId: "tent", startDate: "2026-02-30", rentalDays: 2,
    })).toThrow("Tanggal mulai tidak valid");
    expect(() => buildInquiryMessage({
      productId: "tent", startDate: "2026-11-03", rentalDays: 0,
    })).toThrow("Lama sewa");
  });
});

describe("buildWhatsAppUrl", () => {
  it("validates the configured phone and encodes the message", () => {
    expect(buildWhatsAppUrl("+62 812 3456 7890", "Halo Allegro"))
      .toBe("https://wa.me/6281234567890?text=Halo%20Allegro");
    expect(buildWhatsAppUrl("", "Hello")).toBeNull();
    expect(buildWhatsAppUrl("javascript:alert(1)", "Hello")).toBeNull();
  });
});
