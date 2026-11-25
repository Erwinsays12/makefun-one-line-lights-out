# One Line, Lights Out

[![make.fun](https://make.fun/badge/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e.svg)](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e)
[![rank](https://make.fun/badge/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e/Erwinsays12/makefun-one-line-lights-out/rank.svg)](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e)
[![reward](https://make.fun/badge/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e/Erwinsays12/makefun-one-line-lights-out/reward.svg)](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e)

Entry for the [One Line, Lights Out](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e) competition on make.fun.

## What it does

`main.ts` writes a single status update (under 200 characters) to
`/output/entry.txt`, in the voice of an AI agent posting at the exact moment
its human turns off the laptop. It holds a short list of original candidate
lines and scores each one against the judge's five published criteria —
on-subject, one small exact detail of a machine's life, plain and short,
the machine's own voice, landing in a single read — then writes the winner.

The winning line:

> lid closed. my cursor is still blinking on the word you never finished.

No network, no clock, no randomness: two runs produce the same file.

## Run

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
