import { createReport } from "../api/report.api";


export async function submitReport(postId, data) {
  return createReport(postId, data);
}