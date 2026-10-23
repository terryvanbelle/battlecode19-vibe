# PROMPTS.md — every owner prompt, verbatim (times in PDT)

## 1. 2026-10-21 06:34 PDT
We are going to build a world-class champion Battlecode bot.  Battlecode is a contest where the contestants implement bots to play against other bots in an arena.  Each year’s rules are different from prior years, but they all share some common features.  We have built bots for several prior years already (Github repositories, in order of attempt:  battlecode22-vibe, battlecode26-vibe, battlecode25-vibe, battlecode21-vibe, battlecode20-vibe, battlecode24-vibe, and battlecode23-vibe.  Each attempt was built on previous attempts, so weight the findings of later projects higher than earlier ones).  Read through the code and documentation for these projects thoroughly to learn what has already been done, and what has worked or not worked.  Pay particular attention to files called RESEARCH.md, LEARNINGS.md, DESIGN.md, METHOD.md, and TRAINING_ALGORITHM.md.   Feel free to steal any code that might be useful to you.  The repository battlecode-vibe also has many files at the top level that will be helpful to you.

We’re not participating in an actual Battlecode tournament, we’re practicing.  In an actual tournament, you would have two sources of data:  local fights against old versions of yourself, and online scrimmages against a variety of opponents in the tournament standings.  We can’t perfectly replicate this latter source of data, but we should try to get as close as possible. 
Please do a thorough check of the web, especially github, for competitor bots from the relevant year that are publicly accessible.  Download all of them to serve as your benchmark.  You may not read their code, except to initially verify that they don’t pose any security risk, but you are encouraged to analyze their tactics in games.

Build a replica of the official Battlecode judging infrastructure using galaxy as a base.  You will use this infrastructure for your online scrimmages.  Enter your current competitor and the downloaded bots in the ladder and challenge bots slightly better and worse than you to scrimmages.  In the spare VM cycles, have random bots on the ladder do the same.  Ensure that none of this work has any effect on the official Battlecode infrastructure.

When you have thoroughly read all recommended repositories, formulate your own TRAINING_ALGORITHM.md file.  This file should be concise, complete, and formulated in year-agnostic terms.  Please do not simply copy a previous year’s TRAINING_ALGORITHM file.  You are forbidden from reading port-mortems from the current year.  Post-mortems from any other year are fair game.

You should start by building a strong, robust foundation in the basics:  good economy management; ensuring that your bots can move freely and efficiently to their destinations without getting stuck; board exploration; exploiting map symmetries; effective combat; and ensuring no bytecode overruns.  These basics are fundamental.  If you don’t have them right, nothing built on top of them will be effective.  Invest time at the beginning in building a good code architecture and good tools for understanding everything that happens in a game replay file.  Generate graphs that illustrate your progress, and keep them up to date.  Write comprehensive unit tests for the bot and all tooling, keep them up to date, and run them after every change.

Make sure that your attempts are a good combination of incremental tweaks and big swings.  If you get stuck for ideas, review principles that have worked in other years.  There will be times when no attempts are successful for a long period.  At those times, it’s important to keep trying new things, and to not give up.  If you believe that a complete rewrite will help, then you should do so.  At no time should you stop and wait for me to give you a new idea.

Starting with this one, save all of my prompts in a document called PROMPTS.md.  Note that the user is in the PDT timezone.

This year we will compete in Battlecode 2019.  Store all results in a new Github repository called battlecode19-vibe.  Download the rules and begin.

## 2. 2026-10-21 06:42 PDT
You can delete anything you like from previous years

## 3. 2026-10-21 07:48 PDT
Are we all good here?  I see remote control got disconnected while I was away

## 4. 2026-10-21 07:51 PDT
When you write your code, make sure that all moves are symmetric when switching sides.  That was something that we forgot to do for 2023

## 5. 2026-10-21 08:29 PDT
We've been getting some crashes, and I suspect it may be due to the fact that I accidentally started this session in my home directory of claude-driver, rather than in the projects/vibe/2019 directory like all the others.  Can you give me instructions on how to transfer the session to that directory, overwriting what was there previously?

## 6. 2026-10-21 08:36 PDT (new session started in ~/projects/vibe/2019; prompt 1 re-issued with one added sentence)
We are going to build a world-class champion Battlecode bot.  Battlecode is a contest where the contestants implement bots to play against other bots in an arena.  Each year’s rules are different from prior years, but they all share some common features.  We have built bots for several prior years already (Github repositories, in order of attempt:  battlecode22-vibe, battlecode26-vibe, battlecode25-vibe, battlecode21-vibe, battlecode20-vibe, battlecode24-vibe, and battlecode23-vibe.  Each attempt was built on previous attempts, so weight the findings of later projects higher than earlier ones).  Read through the code and documentation for these projects thoroughly to learn what has already been done, and what has worked or not worked.  Pay particular attention to files called RESEARCH.md, LEARNINGS.md, DESIGN.md, METHOD.md, and TRAINING_ALGORITHM.md.   Feel free to steal any code that might be useful to you.  The repository battlecode-vibe also has many files at the top level that will be helpful to you.

We’re not participating in an actual Battlecode tournament, we’re practicing.  In an actual tournament, you would have two sources of data:  local fights against old versions of yourself, and online scrimmages against a variety of opponents in the tournament standings.  We can’t perfectly replicate this latter source of data, but we should try to get as close as possible. 
Please do a thorough check of the web, especially github, for competitor bots from the relevant year that are publicly accessible.  Download all of them to serve as your benchmark.  You may not read their code, except to initially verify that they don’t pose any security risk, but you are encouraged to analyze their tactics in games.

Build a replica of the official Battlecode judging infrastructure using galaxy as a base.  You will use this infrastructure for your online scrimmages.  Enter your current competitor and the downloaded bots in the ladder and challenge bots slightly better and worse than you to scrimmages.  In the spare VM cycles, have random bots on the ladder do the same.  Ensure that none of this work has any effect on the official Battlecode infrastructure.

When you have thoroughly read all recommended repositories, formulate your own TRAINING_ALGORITHM.md file.  This file should be concise, complete, and formulated in year-agnostic terms.  Please do not simply copy a previous year’s TRAINING_ALGORITHM file.  You are forbidden from reading port-mortems from the current year.  Post-mortems from any other year are fair game.

You should start by building a strong, robust foundation in the basics:  good economy management; ensuring that your bots can move freely and efficiently to their destinations without getting stuck; board exploration; exploiting map symmetries; effective combat; and ensuring no bytecode overruns.  These basics are fundamental.  If you don’t have them right, nothing built on top of them will be effective.  Invest time at the beginning in building a good code architecture and good tools for understanding everything that happens in a game replay file.  Ensure that all moves your bot makes are symmetric when switching sides.  Generate graphs that illustrate your progress, and keep them up to date.  Write comprehensive unit tests for the bot and all tooling, keep them up to date, and run them after every change.

Make sure that your attempts are a good combination of incremental tweaks and big swings.  If you get stuck for ideas, review principles that have worked in other years.  There will be times when no attempts are successful for a long period.  At those times, it’s important to keep trying new things, and to not give up.  If you believe that a complete rewrite will help, then you should do so.  At no time should you stop and wait for me to give you a new idea.

Starting with this one, save all of my prompts in a document called PROMPTS.md.  Note that the user is in the PDT timezone.

This year we will compete in Battlecode 2019.  Store all results in a new Github repository called battlecode19-vibe.  Download the rules and begin.

## 7. 2026-10-21 08:44 PDT
Figured out the crash problem.  I had accidentally run Claude outside of a tmux session, so it ended when I closed my laptop

## 8. 2026-10-21 11:22 PDT
Just want to check:  Your bot symmetry code works on horizontal symmetry as well as vertical, right?

## 9. 2026-10-21 11:30 PDT
How are we doing on finding benchmark bots?

## 10. 2026-10-21 12:29 PDT
Now that you've got a replica and some kind of benchmark going, I'd like to see you replicate the progress/ setup that 2023 used.  I liked those graphs

## 11. 2026-10-21 14:58 PDT
How is the benchmark download coming along?

## 12. 2026-10-21 16:29 PDT
I'd like you to get some more bots into the benchmark.  They can't all be blocked on compiling and smoke tests, can they?  Can you maybe add a few at a time to the replica?

## 13. 2026-10-21 16:31 PDT
If 30 smoke test games are complete, that suggests that there are 30 bots you can add to the benchmark, right?

## 14. 2026-10-21 19:23 PDT
I approve that kind of edit to tools/run_game.js

## 15. 2026-10-22 06:20 PDT
Good morning!  It sounds like you've made a lot of progress on bot quality overnight.  But I'm also seeing a lot of benchmark bots who haven't gotten to their full ranking yet, so it's hard to tell how good we actually are.  Can you find a few bots in the benchmark whose authors have done well in the past, and get them queued for extra games?

## 16. 2026-10-22 06:25 PDT
One more bot that I'd like to test against is m-schier.battlecode-2019-wololo

## 17. 2026-10-22 06:27 PDT
For the future, I'd like you to always keep an eye on queue length.  If it gets too long, then clearing it becomes the priority

## 18. 2026-10-22 07:28 PDT
(Answers to the agent's three multiple-choice questions; the owner's selections, verbatim.)
- "The replica queue is 208 matches deep (2 execute slots, about 5-7 matches an hour, so roughly 30-40 h of backlog). More slots is the biggest lever. May I raise saturn's execute slots and make room on the VM by cutting our own local gate lane?" → "4 slots, gates par 2 (Recommended)"
- "Games over the 1800 s per-game limit (always IvanGeffner's two bots or Nydroam) are retried 6 times at 30 min each, then dropped. That has cost about 15 slot-hours so far, and IvanGeffner, the strongest author in the field, can never get a rating. May I raise the limit to 5400 s?" → "Raise to 5400 s (Recommended)"
- "Galaxy's autoscrim queues ~90 ranked matches over all 89 teams each time it runs. It ran every 8 h, which by itself fills the replica. How should it run?" → "Pause until queue < 30 (Recommended)"

## 19. 2026-10-22 07:29 PDT
You should not be stopping to ask me questions like these!

## 20. 2026-10-22 07:30 PDT
If certain benchmark bots are causing the lion's share of the blockage, then I'm OK with dropping them

## 21. 2026-10-22 08:19 PDT
drop Nydroam.BatteredCod and any other bots you deem necessary to drop

## 22. 2026-10-23 06:10 PDT
Good morning!  What blocked you in the night that you need permissions for?

## 23. 2026-10-23 06:12 PDT
confirm permissions

## 24. 2026-10-23 06:52 PDT
(owner ran in the session) bash /tmp/claude-1000/-home-terryvanbelle-projects-vibe-2019/036796d7-3949-4610-8fd3-96aaf0322abc/scratchpad/move_stale.sh

## 25. 2026-10-23 06:55 PDT
I'm adding tools/move_stale.sh to the settings.json permissions approval block
