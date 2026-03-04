#!/usr/bin/env node
"use strict";

const net = require("net");
const { spawn } = require("child_process");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

const envPort = Number(process.env.PORT);
const preferred = Number.isInteger(envPort) && envPort > 0 ? envPort : 7777;
const fallbackPorts = [7777, 7778, 7779, 7780, 7790, 2080, 2081, 3001, 3002];
const portCandidates = Array.from(new Set([preferred, ...fallbackPorts]));

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on("error", () => resolve(false));
    // Do not force host. On Windows, checking only 0.0.0.0 can miss IPv6(::) listeners.
    server.listen({ port }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function pickPort() {
  for (const port of portCandidates) {
    // eslint-disable-next-line no-await-in-loop
    if (await canListen(port)) return port;
  }
  return null;
}

async function main() {
  const chosenPort = await pickPort();

  if (!chosenPort) {
    console.error("[dev-safe] 사용 가능한 포트를 찾지 못했습니다.");
    console.error(`[dev-safe] 확인 포트: ${portCandidates.join(", ")}`);
    process.exit(1);
  }

  if (chosenPort !== preferred) {
    console.warn(
      `[dev-safe] 포트 ${preferred}가 사용 중이라 ${chosenPort} 포트로 실행합니다.`
    );
  } else {
    console.log(`[dev-safe] 포트 ${chosenPort}에서 실행합니다.`);
  }

  if (dryRun) {
    console.log(`[dev-safe] dry-run 완료: next dev -p ${chosenPort}`);
    process.exit(0);
  }

  const nextBin = require.resolve("next/dist/bin/next");
  const child = spawn(process.execPath, [nextBin, "dev", "-p", String(chosenPort)], {
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code) => process.exit(code ?? 0));
}

main().catch((err) => {
  console.error("[dev-safe] 실행 중 오류:", err);
  process.exit(1);
});

