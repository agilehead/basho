#!/usr/bin/env node

import "babel-polyfill";
import getStdin from "get-stdin";
import { Seq } from "lazily-async";
import parse from "./parse";
import haikus from "./haikus";

if (process.argv.length > 2) {
  if (process.argv[2] === "-v" || process.argv[2] === "--version") {
    console.log("0.0.7");
    process.exit(0);
  } else {
    getStdin()
      .then(async str => {
        const input = str.replace(/\n$/, "").split("\n");
        const output = await parse(
          input.concat(process.argv.slice(2)),
          [],
          true,
          true,
          x => console.log(x)
        );
        if (output.mustPrint) {
          const results = await output.result.toArray();
          results.forEach(i => console.log(i));
        }
        process.exit(0);
      })
      .catch(error => {
        console.log(error.message);
        process.exit(1);
      });
  }
} else {
  const haiku = haikus[parseInt(Math.random() * haikus.length)];
  console.log(`${haiku.text}\n -${haiku.author}`);
}
