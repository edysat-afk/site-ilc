import { company, leaders, mastermind, services } from "@/lib/site-content";
import { getOrSetJson } from "@/lib/redis";

const SITE_CONTENT_TTL = 60 * 10;

export async function getCachedHomeSnapshot() {
  return getOrSetJson("public:home", SITE_CONTENT_TTL, async () => ({
    company,
    mastermind,
    services,
  }));
}

export async function getCachedCompanySnapshot() {
  return getOrSetJson("public:company", SITE_CONTENT_TTL, async () => ({
    company,
    leaders,
  }));
}

export async function getCachedServicesSnapshot() {
  return getOrSetJson("public:services", SITE_CONTENT_TTL, async () => ({
    services,
  }));
}

export async function getCachedMastermindSnapshot() {
  return getOrSetJson("public:mastermind", SITE_CONTENT_TTL, async () => ({
    mastermind,
  }));
}

export async function getCachedContactSnapshot() {
  return getOrSetJson("public:contact", SITE_CONTENT_TTL, async () => ({
    company,
    leaders,
  }));
}