import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { CERT_TRACKS, certLessonIds, getCertTrack } from "@/lib/cert-tracks";
import { certTracksVi, certTracksEn } from "@/lib/i18n/dictionaries/sections/cert-tracks";

const dataDir = path.join(process.cwd(), "lib/lessons-data");
const lessonIds = new Set(
  fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8")).id as number)
);

describe("lib/cert-tracks", () => {
  it.each(CERT_TRACKS.map((c) => [c.id, c] as const))("%s: tỉ trọng các miền cộng lại đúng 100", (_id, cert) => {
    expect(cert.domains.reduce((sum, d) => sum + d.weight, 0)).toBe(100);
  });

  it("mọi id bài học đều có thật", () => {
    const missing = CERT_TRACKS.flatMap((c) => certLessonIds(c).filter((id) => !lessonIds.has(id)).map((id) => `${c.id}:${id}`));
    expect(missing).toEqual([]);
  });

  it("không miền nào rỗng, không bài nào lặp trong cùng một miền", () => {
    for (const cert of CERT_TRACKS) {
      for (const d of cert.domains) {
        expect(d.lessonIds.length).toBeGreaterThan(0);
        expect(new Set(d.lessonIds).size).toBe(d.lessonIds.length);
      }
    }
  });

  it("mọi chứng chỉ và mọi miền có chữ ở cả hai ngôn ngữ", () => {
    for (const cert of CERT_TRACKS) {
      expect(certTracksVi.certTracks.certs[cert.id]).toBeDefined();
      expect(certTracksEn.certTracks.certs[cert.id]).toBeDefined();
      for (const d of cert.domains) {
        expect(certTracksVi.certTracks.domains).toHaveProperty(d.id);
        expect(certTracksEn.certTracks.domains).toHaveProperty(d.id);
      }
    }
  });

  it("getCertTrack trả undefined cho id lạ", () => {
    expect(getCertTrack("khong-ton-tai")).toBeUndefined();
    expect(getCertTrack("aws-cloud-practitioner")?.examCode).toBe("CLF-C02");
  });
});
