import { hcWithType } from "@repo/api/hc";
import { API_URL } from "./constants";

export const client = hcWithType(API_URL);
