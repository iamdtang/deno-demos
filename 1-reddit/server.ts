import { serve } from 'https://deno.land/std/http/server.ts';

const server = serve({ port: 8000 });

for await (const request of server) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const queryString = new URL(`${request.headers.get('host')}${request.url}`).searchParams;
  const response = await fetch(`https://www.reddit.com/r/${queryString.get('q')}.json`);
  const json = await response.json();

  request.respond({
    headers,
    body: JSON.stringify(json)
  });
}