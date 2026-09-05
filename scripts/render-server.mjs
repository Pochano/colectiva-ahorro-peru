import { createServer } from "node:http";

const { default: app } = await import("../.output/server/index.mjs");
const port = Number(process.env.PORT ?? 3000);

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  try {
    const protocol = request.headers["x-forwarded-proto"]?.split(",")[0] ?? "http";
    const host = request.headers.host ?? `localhost:${port}`;
    const headers = new Headers();

    for (const [name, value] of Object.entries(request.headers)) {
      if (value) headers.set(name, Array.isArray(value) ? value.join(", ") : value);
    }

    const method = request.method ?? "GET";
    const init = { method, headers };
    if (method !== "GET" && method !== "HEAD") {
      init.body = await readBody(request);
    }

    const webResponse = await app.fetch(
      new Request(`${protocol}://${host}${request.url ?? "/"}`, init),
      {},
      { waitUntil() {} },
    );

    response.writeHead(webResponse.status, Object.fromEntries(webResponse.headers));
    if (webResponse.body) {
      response.end(Buffer.from(await webResponse.arrayBuffer()));
    } else {
      response.end();
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end("Internal Server Error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Render server listening on port ${port}`);
});
