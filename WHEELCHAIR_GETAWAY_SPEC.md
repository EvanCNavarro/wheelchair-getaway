# Wheelchair Getaway - Game Design Specification

> A silly, fast-paced endless chase game where you escape a vengeful cop in an electric wheelchair.
> Designed by the Navarro brothers. Built with Phaser 3 + TypeScript + Supabase.

---

## Table of Contents
1. [Game Overview](#game-overview)
2. [Core Gameplay](#core-gameplay)
3. [Controls](#controls)
4. [Visual Style](#visual-style)
5. [Collectibles & Power-ups](#collectibles--power-ups)
6. [Progression Systems](#progression-systems)
7. [Multiplayer](#multiplayer)
8. [UI/HUD](#uihud)
9. [Audio](#audio)
10. [Achievements](#achievements)
11. [Technical Requirements](#technical-requirements)
12. [MVP Scope](#mvp-scope)
13. [Art Assets Needed](#art-assets-needed)

---

## Game Overview

### Concept
You're in an electric wheelchair, being chased by a cop car. Your grandma punched this cop in the face before passing away, and now he's found you and wants to run you over. Escape as long as you can!

### Genre
- Endless runner / chase game
- Over-the-shoulder perspective
- Silly/comedic tone

### Platforms
- Web (desktop browsers)
- Mobile (iOS/Android via web)
- Tablet
- All via responsive web app

### Core Loop
```
Start Run → Dodge/Collect → Use Power-ups → Survive → Get Caught →
See Score → Spend Points → Upgrade → Start Again
```

---

## Core Gameplay

### Win/Lose Condition
- **Lose**: Cop catches you = Game Over immediately
- **Win**: There is no "win" - survive as long as possible
- **Score**: 1 point per millisecond survived

### Movement
- **Free movement** (not lane-based)
- Player can move in any direction on the road
- Wheelchair is slightly slower than cop car
- Must collect speed boosts to maintain distance

### The Cop
- Starts close behind you
- Constantly gaining if you do nothing
- **Follows your EXACT path** (no AI shortcuts)
- Can be slowed by oil slicks
- Catches you quickly (~5-10 seconds) if you don't boost

### Road System
- **Single main road** with visual branches
- Branches merge back to main road eventually
- Environments: Highway, Town/Neighborhood
- Road has obstacles and collectibles spawning

### Difficulty Scaling
- Cop gradually gets faster over time
- More obstacles spawn as time goes on
- Power-ups become more valuable/necessary

---

## Controls

### Desktop (Keyboard)
```
WASD or Arrow Keys - Move wheelchair
  W/↑ = Forward (speed up slightly)
  S/↓ = Backward (slow down)
  A/← = Left
  D/→ = Right

Hold direction = continuous movement (like joystick)
Can combine keys (W+A = forward-left diagonal)
```

### Desktop (Mouse) - Optional
- Click and drag from wheelchair to set direction
- Release to stop turning

### Mobile & Tablet
```
Touch Controls:
- Touch anywhere in bottom-left zone
- Virtual joystick appears at touch point
- Drag thumb in direction to move
- Release to center (stop turning, maintain speed)

Joystick Zone: Bottom-left quadrant of screen
Joystick Style: Appears on touch, follows finger within zone
```

### Screen Orientation
- **Both supported**: Landscape AND Portrait
- UI adapts to orientation
- Joystick zone adjusts accordingly

---

## Visual Style

### Art Direction
- **Cartoony-realistic** (not pixel art)
- Think: low-poly or stylized 3D look rendered as 2D
- Bright colors, exaggerated proportions
- Silly/fun, not serious

### Camera
- **Over-the-shoulder, slightly isometric**
- Camera behind and above wheelchair
- Road stretches into distance
- Cop car visible in rearview or behind player

### Reference Style
```
- Similar to mobile endless runners (Subway Surfers camera)
- Low-poly aesthetic (like Crossy Road but from behind)
- Smooth, not pixelated
```

### Environments
1. **Highway**
   - Multiple lanes
   - Road signs, barriers
   - Other cars as obstacles (parked or slow-moving)
   - Desert/rural backdrop

2. **Town/Neighborhood**
   - Residential streets
   - Mailboxes, trash cans, fire hydrants
   - Pedestrians to dodge
   - Houses, trees as scenery

### Day/Night Cycle
- **Cycles during gameplay**
- Starts at random time of day
- Gradual transition (dawn → day → dusk → night → dawn)
- Affects lighting, visibility
- Night = headlights on cop car, street lights

### Visual Effects
- Speed lines when boosting
- Dust/smoke from wheelchair wheels
- Oil slick puddle animation
- Shield glow effect
- Cop car flashing lights (red/blue)

---

## Collectibles & Power-ups

### Coins
- Scattered on road
- Currency for shop purchases
- Distinct from score (score = time survived)
- Magnetic attraction when close

### Power-ups

| Power-up | Effect | Duration/Charges | How Obtained |
|----------|--------|------------------|--------------|
| **Speed Boost** | Burst of speed, increases distance from cop | ~2-3 seconds | Collect on road |
| **Turbo** | Longer/stronger speed boost | ~4-5 seconds | Collect on road (rarer) |
| **Shield** | Blocks one obstacle hit | Until hit | Collect on road |
| **Oil Slick** | Drop behind you, stuns cop for 1s (upgradeable to 1.5-2s) | Start with 2, max 2 | Comes with you |

### Oil Slick Details
- Player STARTS each run with 2 oil slicks
- Cannot collect more (max 2)
- Tap button to drop one behind you
- Cop drives over it → stunned/stopped for 1+ seconds
- Upgradeable in shop: longer stun duration

### Obstacles (Slow You Down)

| Obstacle | Effect | Avoidable? |
|----------|--------|------------|
| **Oil Puddle** | Slip, lose control briefly | Yes, steer around |
| **Glue Patch** | Slow movement for 2-3 seconds | Yes, steer around |
| **Pothole** | Bump, slight slowdown | Yes, steer around |
| **Traffic Cone** | Minor slowdown if hit | Yes, steer around |
| **Parked Car** | Must go around, blocks path | Yes, steer around |
| **Pedestrian** | Must dodge, moral obligation | Yes, steer around |

Note: Obstacles SLOW you, never fully stop you. Getting slowed = cop catches up.

---

## Progression Systems

### Score System
```
Score = Milliseconds survived
1 second = 1000 points
Simple, clear, comparable
```

### Leveling System
- XP = Points earned (same as score)
- Each level requires more points than the last
- **Leveling up gives**: Nothing gameplay-wise (bragging rights only)
- Level displayed on profile/leaderboard
- Example progression:
  ```
  Level 1: 0 points
  Level 2: 1,000 points (1 second survived total)
  Level 3: 5,000 points
  Level 4: 15,000 points
  Level 5: 50,000 points
  ... exponential growth
  ```

### Coins (Currency)
- Collected during runs
- Persist between runs
- Spent in shop
- NOT the same as score

### Shop Items

| Category | Item | Cost (example) | Effect |
|----------|------|----------------|--------|
| **Wheelchairs** | Sport Chair | 500 coins | Cosmetic - sleek racing look |
| | Gold Chair | 2000 coins | Cosmetic - bling bling |
| | Monster Chair | 5000 coins | Cosmetic - big wheels |
| **Speed Upgrades** | Speed +5% | 1000 coins | Permanent base speed increase |
| | Speed +10% | 3000 coins | Stacks with +5% |
| | Speed +15% | 7000 coins | Final speed tier |
| **Power-up Upgrades** | Oil Slick+ | 2000 coins | Stun duration: 1s → 1.5s |
| | Oil Slick++ | 5000 coins | Stun duration: 1.5s → 2s |
| | Shield+ | 2500 coins | Shield blocks 2 hits |
| | Boost+ | 3000 coins | Speed boost lasts longer |
| **Characters** | Grandpa | 1000 coins | Different character in chair |
| | Kid | 500 coins | Smaller character |
| | Dog | 3000 coins | Dog in wheelchair (why not) |

---

## Multiplayer

### Modes
- **Local**: Same device, split controls (not recommended but possible)
- **Online**: Two players, different devices, same game session

### How It Works
- Both players on **same road** (not split screen)
- Both players visible on screen
- **One cop chases both players equally**
- Cop targets whoever is closest OR alternates

### When One Player Gets Caught
- Caught player enters **spectator mode**
- Watches remaining player
- Game ends when both players are caught
- Both scores recorded

### Matchmaking
- Create lobby with code (like Banana Runner)
- Share code with friend
- Or: Quick match (random opponent)

### Sync Requirements
- Player positions synced in real-time
- Cop position synced (authoritative)
- Power-up spawns synced (seeded random)
- Low latency important for fairness

---

## UI/HUD

### During Gameplay

```
┌─────────────────────────────────────────────────────────┐
│  SCORE: 12,450        ⚡ 85 MPH        🚔 15m BEHIND   │
│  COINS: 23            DISTANCE: 1.2km                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    [GAME VIEW]                          │
│                                                         │
│                                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [🛡️]  [🛢️ x2]                      [JOYSTICK ZONE]    │
│  Shield  Oil                                            │
└─────────────────────────────────────────────────────────┘
```

### HUD Elements
- **Score**: Top-left, large, always visible
- **Coins**: Below score, with coin icon
- **Speed**: Top-center, speedometer or MPH number
- **Cop Distance**: Top-right, "🚔 X meters behind"
- **Distance Traveled**: Below speed
- **Power-ups**: Bottom-left, shows available items
- **Joystick Zone**: Bottom-left (mobile) or hidden (desktop)

### Menus

**Main Menu**
```
┌─────────────────────────┐
│   WHEELCHAIR GETAWAY    │
│   [Character Preview]   │
│                         │
│      [ PLAY ]           │
│      [ SHOP ]           │
│   [ LEADERBOARD ]       │
│    [ SETTINGS ]         │
│                         │
│  Level 12 | 45,000 pts  │
└─────────────────────────┘
```

**Game Over Screen**
```
┌─────────────────────────────────┐
│         BUSTED!                 │
│                                 │
│   Score: 15,230                 │
│   Coins: +12                    │
│   Distance: 890m                │
│   Time: 15.23 seconds           │
│                                 │
│   Best: 45,000                  │
│   Global Rank: #1,234           │
│                                 │
│   [ PLAY AGAIN ]  [ MENU ]      │
└─────────────────────────────────┘
```

---

## Audio

### Sound Effects
| Sound | When |
|-------|------|
| Wheelchair motor | Constant hum, pitch varies with speed |
| Boost whoosh | When using speed boost/turbo |
| Coin collect | Ding when picking up coin |
| Oil drop | Splat sound when dropping oil |
| Cop siren | Constant, volume based on distance |
| Cop tires screech | When cop hits oil slick |
| Obstacle hit | Thud/bump when hitting obstacle |
| Game over | Crash/caught sound |

### Music
- **Intense chase music** during gameplay
- Tempo/intensity increases as cop gets closer
- Different track for menu
- Victory/defeat stingers

### Audio Options
- Master volume
- Music volume
- SFX volume
- Mute all

---

## Achievements

> 10 achievements total. To be defined by game designer.

| # | Name | Description | Requirement |
|---|------|-------------|-------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |

*Fill in when ready*

---

## Technical Requirements

### Tech Stack (from LESSONS_LEARNED.md)
```
Game Engine:    Phaser 3
Language:       TypeScript
Build Tool:     Vite
Backend:        Supabase (Auth, Database, Realtime)
Hosting:        Vercel
Art:            Aseprite or similar
State:          Zustand (if needed)
```

### Database Schema

```sql
-- Profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username TEXT UNIQUE NOT NULL,
    level INTEGER DEFAULT 1,
    total_points BIGINT DEFAULT 0,
    high_score BIGINT DEFAULT 0,
    coins BIGINT DEFAULT 0,
    equipped_wheelchair TEXT DEFAULT 'default',
    equipped_character TEXT DEFAULT 'default',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Upgrades owned
CREATE TABLE player_upgrades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES profiles(id),
    upgrade_id TEXT NOT NULL,
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, upgrade_id)
);

-- Game sessions (for analytics)
CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES profiles(id),
    score BIGINT NOT NULL,
    coins_collected INTEGER DEFAULT 0,
    distance_meters INTEGER DEFAULT 0,
    duration_ms INTEGER DEFAULT 0,
    oil_slicks_used INTEGER DEFAULT 0,
    boosts_used INTEGER DEFAULT 0,
    environment TEXT, -- 'highway' or 'town'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily leaderboard
CREATE TABLE daily_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES profiles(id),
    score BIGINT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, date)
);

-- Achievements
CREATE TABLE player_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES profiles(id),
    achievement_id TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, achievement_id)
);

-- Multiplayer lobbies
CREATE TABLE game_lobbies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    host_id UUID REFERENCES profiles(id),
    status TEXT DEFAULT 'waiting', -- waiting, playing, finished
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lobby_players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lobby_id UUID REFERENCES game_lobbies(id),
    player_id UUID REFERENCES profiles(id),
    is_ready BOOLEAN DEFAULT FALSE,
    final_score BIGINT,
    UNIQUE(lobby_id, player_id)
);
```

### Performance Targets
- 60 FPS on mobile
- < 3 second load time
- < 100ms input latency
- Multiplayer sync: < 50ms (with PartyKit/similar)

---

## MVP Scope

### v1.0 Must Have
- [ ] Core chase gameplay (wheelchair vs cop)
- [ ] Free movement controls (WASD + mobile joystick)
- [ ] Speed boost power-up
- [ ] Oil slick (drop behind, stun cop)
- [ ] Shield power-up
- [ ] 3-4 obstacle types
- [ ] Coins collection
- [ ] Score = milliseconds survived
- [ ] One environment (Highway)
- [ ] Day mode only (no cycle yet)
- [ ] Basic shop (2-3 wheelchairs, 1 speed upgrade)
- [ ] Global leaderboard
- [ ] User accounts (Supabase auth)
- [ ] Game over screen with stats
- [ ] Mobile + Desktop responsive

### v1.1 Nice to Have
- [ ] Second environment (Town)
- [ ] Day/night cycle
- [ ] More shop items
- [ ] Daily leaderboard
- [ ] 10 achievements
- [ ] Sound effects
- [ ] Music

### v2.0 Future
- [ ] Multiplayer (online)
- [ ] More characters
- [ ] More wheelchairs
- [ ] Power-up upgrades
- [ ] Additional environments
- [ ] Seasonal events

---

## Art Assets Needed

### Characters
- [ ] Default character (in wheelchair) - idle, moving animations
- [ ] Grandpa character variant
- [ ] Kid character variant
- [ ] Dog character variant (stretch goal)

### Wheelchairs
- [ ] Default wheelchair
- [ ] Sport wheelchair
- [ ] Gold wheelchair
- [ ] Monster wheelchair

### Vehicles
- [ ] Police car (with flashing lights animation)
- [ ] Parked cars (obstacles) - 2-3 variants

### Environment - Highway
- [ ] Road texture (asphalt with lane markings)
- [ ] Road barriers
- [ ] Road signs
- [ ] Desert/rural background elements

### Environment - Town
- [ ] Residential road texture
- [ ] Houses (background)
- [ ] Trees, bushes
- [ ] Mailboxes, trash cans, fire hydrants (obstacles)
- [ ] Pedestrians (obstacles)

### Power-ups & Collectibles
- [ ] Coin sprite (animated spin)
- [ ] Speed boost icon/pickup
- [ ] Turbo icon/pickup
- [ ] Shield icon/pickup
- [ ] Oil slick puddle (on ground)

### UI Elements
- [ ] Virtual joystick base + thumb
- [ ] Power-up slots/icons for HUD
- [ ] Cop distance indicator
- [ ] Speed/score display styling
- [ ] Menu buttons
- [ ] Shop item cards

### Effects
- [ ] Speed lines/blur
- [ ] Dust particles from wheels
- [ ] Oil slick splash
- [ ] Shield glow
- [ ] Coin collect sparkle
- [ ] Cop siren lights (red/blue flash)

---

## Open Questions / Notes

1. **Cop catching animation**: What happens visually when caught? Fade to black? Crash animation? Cop tackles wheelchair?

2. **Branching roads**: How often do branches appear? Every X meters? Random?

3. **Other cars on highway**: Moving or parked only? If moving, same direction or oncoming?

4. **Portrait vs Landscape**: Same joystick position in both? Or adapt?

5. **Tutorial**: First-time player guide? Or learn by playing?

---

## Summary

**Wheelchair Getaway** is an endless chase game with:
- Simple, satisfying core loop (escape the cop)
- Strategic depth (when to use oil slicks, route choices)
- Progression hooks (leveling, shop, achievements)
- Social features (leaderboards, multiplayer)
- Cross-platform play (web, mobile, tablet)
- Silly, memorable premise (grandma's revenge!)

Built with modern tech stack (Phaser 3 + TypeScript + Vite + Supabase) following lessons learned from Banana Runner development.

---

*Spec created: December 2024*
*Designed by: The Navarro Brothers*
*To be built with: Claude AI + Phaser 3 + TypeScript*
