'use client'

import { useState } from 'react'
import Link from 'next/link'

const ZODIAC_SIGNS = [
  { name: 'Capricorn', icon: '♑', element: 'Earth', traits: 'Ambitious · Disciplined · Patient', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, planet: 'Saturn', dates: 'Dec 22 – Jan 19' },
  { name: 'Aquarius', icon: '♒', element: 'Air', traits: 'Independent · Innovative · Humanitarian', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, planet: 'Uranus', dates: 'Jan 20 – Feb 18' },
  { name: 'Pisces', icon: '♓', element: 'Water', traits: 'Intuitive · Artistic · Compassionate', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, planet: 'Neptune', dates: 'Feb 19 – Mar 20' },
  { name: 'Aries', icon: '♈', element: 'Fire', traits: 'Bold · Energetic · Determined', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, planet: 'Mars', dates: 'Mar 21 – Apr 19' },
  { name: 'Taurus', icon: '♉', element: 'Earth', traits: 'Stable · Practical · Devoted', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, planet: 'Venus', dates: 'Apr 20 – May 20' },
  { name: 'Gemini', icon: '♊', element: 'Air', traits: 'Curious · Adaptive · Communicative', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21, planet: 'Mercury', dates: 'May 21 – Jun 21' },
  { name: 'Cancer', icon: '♋', element: 'Water', traits: 'Nurturing · Protective · Intuitive', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22, planet: 'Moon', dates: 'Jun 22 – Jul 22' },
  { name: 'Leo', icon: '♌', element: 'Fire', traits: 'Confident · Generous · Warm-hearted', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, planet: 'Sun', dates: 'Jul 23 – Aug 22' },
  { name: 'Virgo', icon: '♍', element: 'Earth', traits: 'Analytical · Practical · Perfectionist', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, planet: 'Mercury', dates: 'Aug 23 – Sep 22' },
  { name: 'Libra', icon: '♎', element: 'Air', traits: 'Diplomatic · Balanced · Charming', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23, planet: 'Venus', dates: 'Sep 23 – Oct 23' },
  { name: 'Scorpio', icon: '♏', element: 'Water', traits: 'Passionate · Resourceful · Resolute', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22, planet: 'Pluto', dates: 'Oct 24 – Nov 22' },
  { name: 'Sagittarius', icon: '♐', element: 'Fire', traits: 'Optimistic · Freedom-loving · Philosophical', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21, planet: 'Jupiter', dates: 'Nov 23 – Dec 21' },
]

const LUCKY_COLORS: Record<string, string[]> = {
  Aries: ['Red', 'Orange', 'Gold'],
  Taurus: ['Green', 'Yellow', 'Brown'],
  Gemini: ['Yellow', 'Silver', 'Gray'],
  Cancer: ['White', 'Silver', 'Pale Blue'],
  Leo: ['Gold', 'Orange', 'Yellow'],
  Virgo: ['Dark Green', 'Brown', 'Beige'],
  Libra: ['Pink', 'Light Blue', 'White'],
  Scorpio: ['Deep Red', 'Black', 'Purple'],
  Sagittarius: ['Purple', 'Deep Blue', 'Red'],
  Capricorn: ['Black', 'Dark Gray', 'Brown'],
  Aquarius: ['Blue', 'Cyan', 'Purple'],
  Pisces: ['Sea Blue', 'Purple', 'Green'],
}

const LUCKY_DIRECTIONS: Record<string, string[]> = {
  Aries: ['East', 'SE', 'South'],
  Taurus: ['SW', 'NE', 'North'],
  Gemini: ['East', 'SE', 'NW'],
  Cancer: ['North', 'NE', 'East'],
  Leo: ['South', 'SE', 'East'],
  Virgo: ['SW', 'NE', 'West'],
  Libra: ['SE', 'NW', 'East'],
  Scorpio: ['North', 'NE', 'West'],
  Sagittarius: ['SE', 'South', 'East'],
  Capricorn: ['SW', 'NE', 'North'],
  Aquarius: ['North', 'East', 'SE'],
  Pisces: ['North', 'NE', 'East'],
}

const LUCKY_NUMBERS: Record<string, number[]> = {
  Aries: [6, 9, 18, 27, 36],
  Taurus: [1, 4, 11, 22, 33],
  Gemini: [5, 14, 23, 32, 41],
  Cancer: [2, 7, 16, 25, 34],
  Leo: [1, 8, 17, 26, 35],
  Virgo: [5, 14, 23, 32, 44],
  Libra: [4, 13, 22, 31, 40],
  Scorpio: [8, 11, 17, 26, 35],
  Sagittarius: [3, 9, 14, 23, 32],
  Capricorn: [4, 8, 13, 22, 31],
  Aquarius: [4, 7, 16, 25, 34],
  Pisces: [3, 7, 12, 21, 30],
}

const LUCKY_FOODS: Record<string, string[]> = {
  Aries: ['Chili', 'Beef', 'Strawberry', 'Tomato'],
  Taurus: ['Steak', 'Apple', 'Pear', 'Oatmeal'],
  Gemini: ['Nuts', 'Lemon', 'Blueberry', 'Chocolate'],
  Cancer: ['Milk', 'Watermelon', 'Lettuce', 'Crab'],
  Leo: ['Grilled Meat', 'Mango', 'Orange', 'Grape'],
  Virgo: ['Salad', 'Kiwi', 'Yogurt', 'Oatmeal'],
  Libra: ['Strawberry', 'Honey', 'Apple', 'Avocado'],
  Scorpio: ['Coffee', 'Pomegranate', 'Grape', 'Red Wine'],
  Sagittarius: ['Lamb', 'Pineapple', 'Orange', 'Banana'],
  Capricorn: ['Root Vegetables', 'Black Beans', 'Walnut', 'Red Dates'],
  Aquarius: ['Kiwi', 'Almond', 'Green Tea', 'Dragon Fruit'],
  Pisces: ['Seaweed', 'Nori', 'Grape', 'Watermelon'],
}

const LUCKY_ACTIVITIES: Record<string, string[]> = {
  Aries: ['Running', 'Gym', 'Team Sports', 'Outdoor Adventure'],
  Taurus: ['Yoga', 'Gardening', 'Cooking', 'Listening to Music'],
  Gemini: ['Reading', 'Writing', 'Socializing', 'Learning New Skills'],
  Cancer: ['Being with Family', 'Cooking', 'Meditation', 'Watching Films'],
  Leo: ['Performing', 'Hosting', 'Creative Projects', 'Public Speaking'],
  Virgo: ['Organizing', 'Planning', 'Studying', 'Health Check'],
  Libra: ['Art Creation', 'Social Events', 'Shopping', 'Beauty Care'],
  Scorpio: ['Deep Reading', 'Meditation', 'Research', 'Psychology'],
  Sagittarius: ['Travel', 'Learning Languages', 'Outdoor Activities', 'Philosophy'],
  Capricorn: ['Planning Future', 'Hiking', 'Financial Learning', 'Career Development'],
  Aquarius: ['Social Events', 'Volunteering', 'Innovation Projects', 'Attending Shows'],
  Pisces: ['Art Creation', 'Listening to Music', 'Meditation', 'Walking by Water'],
}

const HOROSCOPE_TEMPLATES: Record<string, {
  overall: string[]
  love: string[]
  career: string[]
  money: string[]
  health: string[]
}> = {
  Aries: {
    overall: [
      "Mars burns bright in your chart today — your natural fire runs hotter than usual. Move first; hesitation is the only enemy. The cosmos favors the bold.",
      "Your instincts are sharp as a blade today, though your words may not keep pace. Speak less. Act more. Let results do the talking.",
      "Venus crosses into your sector of relationships. A chance encounter at a gathering could rewrite the next chapter of your love life.",
    ],
    love: [
      "Single: A glance across a crowded room — perhaps at a gallery, a café, a conference — holds more promise than a dozen deliberate introductions. Trust the pull. Attached: Your partner needs space today more than presence. Give it gracefully.",
      "Your directness, usually your greatest asset in love, may wound today. Choose softness over truth when the moment demands it. A gentle word returns tenfold.",
      "Mars stirs the embers beneath the surface. A late-night conversation with someone long familiar could ignite into something you didn't expect.",
    ],
    career: [
      "Your leadership qualities are noticed today — perhaps in a meeting, a group chat, or an unexpected setting. Someone with influence is watching. Rise to the moment.",
      "A creative block may soften by afternoon when Jupiter offers a new angle. Don't force it in the morning; the solution will arrive sideways.",
      "A colleague you underestimated may prove invaluable. Keep your judgment suspended and your collaborations open.",
    ],
    money: [
      "Income is stable, but a windfall whispers on the horizon — perhaps from an unexpected angle: a refund, a commission, or a side venture. Stay alert to overlooked channels.",
      "A small investment in your skills — a course, a tool, a book — pays dividends far beyond its cost. The most profitable investment is always in yourself.",
      "Be cautious of a persuasive pitch today. If it sounds too generous, it probably is. Sleep on any financial commitment before the day ends.",
    ],
    health: [
      "Your energy is high today — the highest in weeks. Channel it into something physical: a run, a gym session, a sport. This is not a day for stillness.",
      "A familiar ache in your neck or shoulders signals accumulated tension. A massage or stretching session now prevents larger problems later.",
      "Mars may push you toward overwork. Set a boundary with yourself today — one hour of genuine rest is more productive than three hours of distracted effort.",
    ],
  },
  Taurus: {
    overall: [
      "Venus, your ruling planet, finds herself comfortably placed today. A good day for finances, aesthetics, and matters of the heart. Beauty finds you if you open the door.",
      "The slower pace of today suits you — and the universe rewards patience over push. What feels like stagnation is actually the ground preparing to bear fruit.",
      "A conversation about shared resources — a joint account, a partnership, an inheritance — may surface today. Approach it with the steadiness only you can provide.",
    ],
    love: [
      "Single: Your earthy charm is at its peak today. Someone drawn to stability and warmth may cross your path in an unexpected setting — perhaps a market, a concert, or a bookstore.",
      "Attached: Romance doesn't require grand gestures today — it lives in the quiet: a meal prepared together, a phone call from the road, a hand held without reason.",
      "A small misunderstanding with your partner can be resolved by simply listening more than you speak. Sometimes the greatest gift is your full attention.",
    ],
    career: [
      "Your practical expertise is recognized today — perhaps in a project review, a client meeting, or an informal conversation with a superior. Substance speaks louder than style, and you have substance.",
      "A financial opportunity requires patience. The decision you make slowly will age better than the one you rush into.",
      "Collaboration may feel friction-heavy today. Choose your partnerships carefully — not everyone shares your commitment to quality.",
    ],
    money: [
      "Venus favors your financial sector today. A previously delayed payment may arrive, or a new source of income may announce itself. Pay attention to the margins of your day.",
      "Your savings instinct is strong today. Use it to review your spending plan and redirect leaks you hadn't noticed.",
      "An investment in something beautiful — art, craft, design — may prove both personally satisfying and financially sound. Buy what you love.",
    ],
    health: [
      "A slow, deliberate morning routine sets the tone for the entire day. Resist the urge to rush — your body rewards patience.",
      "An old tension in the shoulders or back may surface today. Address it now with warmth and movement rather than ignoring it until it becomes pain.",
      "Your appetite may be stronger than usual — particularly for comfort foods. Honor the craving but choose the healthier version when possible.",
    ],
  },
  Gemini: {
    overall: [
      "Mercury accelerates your思维 today. Ideas flow faster than usual, and the connections you make between seemingly unrelated subjects may surprise even you.",
      "A message arrives from an old contact — not the one you expected. What begins as small talk may open a door you'd thought permanently closed.",
      "Your social energy is high today, but choose depth over breadth. Three meaningful conversations outperform ten shallow ones.",
    ],
    love: [
      "Single: Your wit is magnetic today — sharper than usual, more attractive. A conversation that begins as banter may reveal unexpected depth. Stay curious.",
      "Attached: Your mind is elsewhere more than usual today. Bring yourself back to the present; the person beside you deserves your full attention.",
      "Venus highlights your communication sector. The right words — written or spoken — can heal a misunderstanding that's been lingering longer than it should.",
    ],
    career: [
      "Your communication skills are your greatest asset today. A pitch, a presentation, or a written proposal lands with unusual precision. Trust your voice.",
      "A creative solution to an old problem presents itself — not through analysis, but through lateral thinking. Step back to see the whole picture.",
      "Multiple projects may pull at you simultaneously. Resist the urge to multitask; finish one thing before starting the next.",
    ],
    money: [
      "A conversation about money leads somewhere productive today — perhaps a negotiation, a contract review, or a billing question. Your way with words serves you well.",
      "Be cautious of impulse purchases driven by clever marketing. If you didn't need it five minutes ago, you probably don't need it now.",
      "Unexpected income from a creative or intellectual source may appear — a commission, a royalty, a prize. Celebrate it.",
    ],
    health: [
      "Your mind races faster than your body today. A walk outside — without your phone — can ground the mental noise and bring surprising clarity.",
      "Eye strain is a risk if you've been reading or screen-facing for hours. Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
      "Your nervous energy needs an outlet. Something requiring hand-eye coordination — drawing, gaming, a sport — can burn it off productively.",
    ],
  },
  Cancer: {
    overall: [
      "The Moon, your celestial guardian, waxes full in your sector of home and emotion. You're more sensitive than usual — which is both a gift and a responsibility. Tend to yourself gently.",
      "Family matters come to the foreground today. What felt resolved may surface again, asking for a deeper attention. Honor what is old; it shaped you.",
      "An old memory surfaces with unexpected force. Let it pass through rather than holding on — sometimes the past visits to release, not to stay.",
    ],
    love: [
      "Single: The home is where your heart is today — and perhaps where a new heart finds its way in. A gathering at home, a meal shared, could be the beginning of something real.",
      "Attached: Your partner's emotional world needs more care than usual today. Put down your phone, make eye contact, and listen to what's underneath the words.",
      "A conversation with an older family member may illuminate something about your romantic patterns. Listen with openness rather than defensiveness.",
    ],
    career: [
      "Your intuition about a professional matter is unusually sharp today. If something feels wrong, investigate — don't dismiss the feeling as anxiety.",
      "A project related to home, family, or emotional intelligence finds its moment. What you've built quietly may gain public recognition.",
      "Nurture a junior colleague today. Your guidance, offered without agenda, plants seeds that will grow into your greatest professional network.",
    ],
    money: [
      "A shared expense — with family, a partner, or a housemate — requires honest conversation. Handle it today rather than letting it fester.",
      "Your financial intuition is reliable today. Trust your gut on a money decision, particularly one involving property or family assets.",
      "A gift or inheritance from family may surface. Receive it with gratitude — and perhaps a handwritten note.",
    ],
    health: [
      "Your emotional body and physical body are tightly linked today. Stress shows up as physical tension; slow down before your body forces you to.",
      "A familiar craving for comfort food is your body's way of asking for emotional nourishment. Feed it with presence — a warm bath, a loved one's call, a good book.",
      "Your sleep may be deeper or lighter than usual depending on where you are in your lunar cycle. Honor what your body asks for.",
    ],
  },
  Leo: {
    overall: [
      "The Sun illuminates your sector of self and identity. Today is yours — more than most. Whatever you begin with genuine intention has the Sun's blessing.",
      "Someone important is watching how you handle a moment of unexpected pressure. Rise quietly, not loudly. Grace under fire is the mark of a leader.",
      "Your creativity finds an outlet today — perhaps in a form you haven't tried in years. Revisit an old creative love; it still has something to teach you.",
    ],
    love: [
      "Single: Your radiance is hard to miss today. Someone drawn to warmth and confidence may approach — don't deflect their interest with self-deprecation.",
      "Attached: Your desire to be adored may conflict with your partner's need for space. Practice receiving love in the quiet, unshowy moments — they are more real.",
      "A surprise from your partner — small, thoughtful, unexpected — could arrive today. Receive it with genuine surprise rather than expectation.",
    ],
    career: [
      "Your achievements are noticed today — perhaps publicly, perhaps privately by someone with influence. Accept the recognition gracefully; deflection diminishes both of you.",
      "A creative project you've been quietly building may find its audience. Don't second-guess the work you've done — it has more value than you see.",
      "A leadership opportunity asks for volunteers. Step forward. The universe rewards those who claim their power rather than waiting to be invited.",
    ],
    money: [
      "Your earning potential is high today. A conversation about rates, fees, or investment could turn in your favor — advocate for yourself with confidence.",
      "A luxurious purchase calls to you. Ask yourself whether it feeds your spirit or merely your image. Choose accordingly.",
      "Gambling or speculative thinking is unwise today. Steady, conservative decisions outperform bold bets.",
    ],
    health: [
      "Your heart — physical and emotional — asks for attention today. Move it: something rhythmic and joyful. Dancing, running, swimming.",
      "Overexertion is a risk if competition drives you. Know the difference between pushing and punishing your body.",
      "Sunlight is your medicine today. Get outside, even briefly. Its warmth reaches deeper than you realize.",
    ],
  },
  Virgo: {
    overall: [
      "Mercury, your celestial messenger, sharpens every thought today. Your analytical mind is at its most precise — use it to cut through complexity that's been weighing on you.",
      "A detail you've been overlooking may surface today — not to shame you, but to save you. Catch it before it becomes a larger problem.",
      "Your instinct to perfect may tip into perfectionism. Remember: the enemy of good is better. Done and adequate often beats perfect and late.",
    ],
    love: [
      "Single: Your attention to detail may work against you in first impressions — give people a chance before cataloging their flaws. No one is a finished manuscript.",
      "Attached: Your partner may feel under analysis today. Ask how they are before asking what they did. Love first, questions second.",
      "A practical act of service — making their morning easier, handling something they've been avoiding — speaks louder than any declaration of affection.",
    ],
    career: [
      "Your organizational skills are recognized today in a way that feels genuinely satisfying. A system you've built quietly becomes the model others follow.",
      "A health or routine-related project finds its moment. What you've been planning in private can now move into execution.",
      "Your critique of a colleague's work may be correct — but is it kind? Choose truth wrapped in compassion over truth delivered cold.",
    ],
    money: [
      "A spreadsheet you've been avoiding finally demands attention. Handle one section today; the rest can wait. Progress, not perfection.",
      "Your eye for value is sharp today — particularly for practical purchases. What you buy today may age better than anything else you've bought this year.",
      "An overlooked expense may be costing more than you realize. Review a subscription, a membership, an auto-renewal. Small savings compound.",
    ],
    health: [
      "Your health routine is your sanctuary today. The consistency you've built over weeks pays dividends when stress tries to erode it.",
      "Digestive sensitivity is a risk if stress drives you to eat on the run. Prioritize sitting down for at least one real meal today.",
      "A health concern you've been dismissing deserves proper attention. Schedule the check-up you've been postponing — this week, not next month.",
    ],
  },
  Libra: {
    overall: [
      "Venus, your ruling planet, makes a significant aspect today. Matters of beauty, fairness, and relationship flow more smoothly than they have in weeks.",
      "The scales ask for balance — and you may feel the weight of decisions that have no perfect answer. Choose what preserves your peace.",
      "An aesthetic upgrade to your space — a flower, a candle, a rearrangement — may seem small but shifts the energy of everything around it.",
    ],
    love: [
      "Single: Venus highlights your sector of partnerships. Someone who values balance as much as you do may enter your awareness — look for them in spaces of beauty and culture.",
      "Attached: Conflict avoidance serves neither of you today. A small, honest conversation now prevents a larger reckoning later. Choose courage over comfort.",
      "Your natural diplomacy defuses a tense situation between people you care about. You may not realize how much your presence changes the room.",
    ],
    career: [
      "Your ability to see all sides of a situation is your professional gift — and your professional challenge. Use it to build bridges, not to delay decisions.",
      "A partnership or collaboration that's been gestating may move forward today. Trust the process; you built this slowly and deliberately.",
      "An aesthetic or design decision you're deliberating resolves in your favor if you trust your eye rather than polling the room.",
    ],
    money: [
      "Venus favors beauty-related spending today — but buy what endures, not what trends. A few excellent things outlast a closet full of impulse purchases.",
      "A financial negotiation benefits from your diplomatic approach. Listen more than you speak; the other party's real position is usually underneath their opening offer.",
      "A shared expense with a partner or close friend may surface. Handle it with transparency and grace — money and resentment are a dangerous combination.",
    ],
    health: [
      "Balance is your body asks for today — between work and rest, between exertion and recovery. The extremes that usually serve you well may need tempering.",
      "A beauty or self-care ritual is medicine for your soul today. Don't skip it for productivity — this IS productivity.",
      "Your kidneys and lower back may signal accumulated stress. Hydrate, stretch, and take the stairs slowly.",
    ],
  },
  Scorpio: {
    overall: [
      "Pluto, your celestial ruler, deepens your inner world today. Surface activities feel insufficient — what you seek is meaning. Give yourself permission to go slow.",
      "A truth you've been avoiding may surface through a dream, a conversation, or an unexpected encounter. Face it; avoidance has an expiration date.",
      "Your intensity is a gift when directed, a burden when unacknowledged. Channel it into something you can transform — a project, a craft, a hard conversation.",
    ],
    love: [
      "Single: Your magnetic intensity draws people in — and sometimes scares them away. Don't calibrate yourself down. The right person won't be frightened by depth.",
      "Attached: Something beneath the surface of your relationship may come into view. What you've sensed but not named deserves acknowledgment. Not in anger — in honesty.",
      "Your partner's need for lightness today may feel like a dismissal of your depth. It isn't. Sometimes people rest on the surface because they trust you to hold the depth.",
    ],
    career: [
      "Your investigative skills are formidable today. A puzzle that has defeated others yields to your patience and your willingness to look at what others avoid.",
      "A hidden opportunity — something not advertised, not announced, not obvious — may present itself through a private channel. Your network is your treasure map.",
      "Someone powerful has taken note of your work — quietly, without fanfare. What you do next may matter more than what you've already done.",
    ],
    money: [
      "Shared resources — an inheritance, a joint investment, an insurance payout — may surface through channels that require discretion. Handle with confidentiality.",
      "Your instinct about a financial matter is unusually reliable. If something feels wrong, investigate — Scorpio intuition has a near-perfect track record.",
      "Avoid the temptation to tell anyone exactly how much you have or earn. Privacy is its own form of wealth.",
    ],
    health: [
      "Pluto's pressure on your body may manifest as an old ache or pain resurfacing. Don't suppress it — this is your body asking for attention it was previously denied.",
      "Your emotional depth today requires a physical outlet — something intense enough to match your inner weather. A hard workout, a long swim, a demanding hike.",
      "A health concern that's been private may benefit from a professional opinion. Share it with someone qualified — carrying it alone serves no one.",
    ],
  },
  Sagittarius: {
    overall: [
      "Jupiter, your expansive ruling planet, opens a door today. What begins as a small idea may grow beyond anything you'd initially imagined. Think big — the cosmos is listening.",
      "A perspective shift arrives from an unexpected source — perhaps a book, a stranger, a child, or a culture you'd never considered. Receive it with openness.",
      "Your optimism is infectious today — and necessary. Something you've been worried about may resolve more easily than you feared.",
    ],
    love: [
      "Single: Jupiter expands your social world. A gathering, a course, a journey — any of these may introduce you to someone whose worldview broadens yours.",
      "Attached: Your partner craves adventure with you today — not necessarily travel, but novelty. A new restaurant, a spontaneous afternoon, a change of scenery.",
      "Your honesty, usually refreshing, may cut deeper than intended. Consider how truth lands before you deliver it.",
    ],
    career: [
      "Jupiter favors your professional expansion. A course, a certification, or a connection that spans borders may accelerate your trajectory in unexpected ways.",
      "Your philosophical perspective on a work problem may be exactly what the situation needs. Speak it — even if it sounds abstract at first.",
      "An opportunity involving travel, education, or foreign contexts finds its moment. Say yes before overthinking it.",
    ],
    money: [
      "Jupiter's expansion touches your financial sector. A previously stagnant income may find a new channel — a side venture, a referral, an unexpected refund.",
      "Education as investment: a course, a book, a tool that costs money but earns more. Jupiter favors the student.",
      "Your optimism about money may lead to overcommitment. Count twice before committing to anything that stretches your budget.",
    ],
    health: [
      "Jupiter's expansiveness may push you toward overindulgence — in food, drink, or activity. Honor your body with moderation, not deprivation.",
      "Your hips and thighs may carry accumulated tension. A long walk, a yoga class, or a dance session addresses the physical while freeing the mental.",
      "Travel is your medicine today. Even a short journey — a change of scenery, a new neighborhood, a different route — recalibrates something that sitting cannot reach.",
    ],
  },
  Capricorn: {
    overall: [
      "Saturn's steady hand guides your day. What you've been building methodically over months finds a new level — the foundation you laid quietly is now bearing weight.",
      "A responsibility you've been carrying deserves acknowledgment. Don't postpone the acknowledgment — you have earned the recognition, even if it comes quietly.",
      "Your patience is a superpower today. Others rush; you endure. The long game is always won by those who can wait without panic.",
    ],
    love: [
      "Single: Your seriousness about commitment may intimidate those who aren't ready for depth. You aren't looking for easy — you're looking for real. Keep that standard.",
      "Attached: Your partner may need more structure and predictability from you than usual. A small promise kept is worth more than a grand gesture forgotten.",
      "An older family member's wisdom may unexpectedly inform your understanding of your own romantic life. Ask them about their choices.",
    ],
    career: [
      "Saturn rewards disciplined work. The project you've been building with quiet consistency may now receive public recognition. Accept it with grace.",
      "A hierarchy shift — not necessarily a promotion, but a reconfiguration of status or influence — is underway. Navigate it with patience and precision.",
      "Your ability to see long-term consequences gives you an advantage others lack. Trust that vision, even when the short-term data says otherwise.",
    ],
    money: [
      "Saturn's conservative influence is strong today. Save rather than spend; invest rather than speculate. The compound effect rewards the disciplined.",
      "A long-term financial plan you've been avoiding — a will, an investment review, a retirement account — deserves attention now. One hour today saves years of regret.",
      "An older inheritance or family asset may become relevant. Listen to the history; it contains financial wisdom.",
    ],
    health: [
      "Saturn's pressure on your knees, joints, and bones may manifest today. Stretch before any physical activity; your body rewards preparation.",
      "Your discipline in health matters serves you well. The routine you've built is your armor against stress. Don't abandon it because today feels easy.",
"A chronic issue that's been managed deserves a proper check. Don't let 'it's always been this way' be your only diagnostic tool.",
    ],
  },
  Aquarius: {
    overall: [
      "Uranus sparks something unexpected — an idea that doesn't fit your usual patterns, a person whose worldview differs sharply from yours, a disruption that improves everything it touches.",
      "Your humanitarian impulse is strong today. Something larger than yourself — a cause, a community, a collective — may call for your attention and energy.",
      "Independence is your oxygen. But today, a small surrender — a compromise, a collaboration, a moment of dependence — may reveal its unexpected gift.",
    ],
    love: [
      "Single: Your unconventional nature is your most attractive quality today. Lean into what makes you different — the right person will be drawn to your eccentricity, not despite it.",
      "Attached: Your partner may feel excluded from your inner world of ideas and visions. Bring them in — even the most abstract thought can be shared.",
      "A friendship that has always been 'almost something more' may clarify itself today. What was ambiguous may become honest.",
    ],
    career: [
      "An innovation you've been developing in private may find its public moment. The timing feels right — trust the process you've trusted until now.",
      "Your network expands in an unexpected direction — a contact from a field you'd never considered opens a door you didn't know existed.",
      "Working alone serves you better than collaboration today. Honor your need for solitude and unconventional thinking.",
    ],
    money: [
      "Uranus disrupts financial routines. An auto-payment may fail, a billing error may surface — these aren't threats, they're corrections. Use them.",
      "A technological or digital income stream may show unexpected growth. The work you did in this space months ago is now paying dividends.",
      "Speculation is inadvisable today — but a small, experimental investment in something genuinely innovative may be worth the risk.",
    ],
    health: [
      "Your nervous system may be more reactive today than usual. Caffeine, news, and social media will amplify this. Choose stillness over stimulation.",
      "A new health technology or approach may catch your interest — research it with your characteristic skepticism before committing.",
      "Your body's need for routine and unconventional decompression may conflict. Honor both: structure during the day, freedom in the evening.",
    ],
  },
  Pisces: {
    overall: [
      "Neptune softens the edges of the world today. What is real and what is fantasy may blur — a good day for creation, a dangerous day for contracts. Discern carefully.",
      "Your intuition is a compass today — sharper than logic, more reliable than evidence. Follow it, even when it leads somewhere you didn't expect.",
      "A creative work you've been nursing in private may find its audience. The vulnerability of sharing it is part of the gift — give it.",
    ],
    love: [
      "Single: Your romantic imagination may run ahead of reality today. Let fantasy inform desire, but ground commitment in what is actually present.",
      "Attached: Your partner may not speak the same language of love that you do — but that doesn't mean they're not fluent. Look for their fluency in their own dialect.",
      "An old romantic wound, surfaced by Neptune's tide, may need acknowledgment rather than healing. Sometimes witnessing is enough.",
    ],
    career: [
      "Your creative and artistic instincts are powerfully aligned today. A work of genuine beauty may emerge — trust the process even when it feels formless.",
      "Neptune may obscure the true nature of a professional relationship. Look at actions, not words; look at presence, not promises.",
      "Spiritual or healing work finds its natural flow today. What you do in this space may help others more than you realize.",
    ],
    money: [
      "Neptune dissolves financial boundaries in ways that require vigilance. A friendly loan or a generous gift may blur lines that matter. Keep accounts clear.",
      "A creative income source — art, music, writing, healing — may receive unexpected recognition or payment. Celebrate it quietly.",
      "Avoid signing anything today under time pressure. Neptune clouds fine print, and what seems straightforward may carry hidden terms.",
    ],
    health: [
      "Neptune's influence on your feet and skin may manifest as sensitivity or discomfort. Wear what's comfortable; comfort is your medicine today.",
      "Your dream life may be more vivid than usual. If you can, keep a notepad by your bed — the images that surface now may be more meaningful than they first appear.",
      "Addiction or escapism is Neptune's shadow. Notice if you're using food, screens, or substances to dissolve discomfort rather than address it.",
    ],
  },
}

const ZODIAC_MODIFIERS: Record<string, { love: number; career: number; money: number; health: number; overall: number }> = {
  Aries: { overall: 1, love: 0, career: 1, money: 0, health: 1 },
  Taurus: { overall: 0, love: 1, career: 0, money: 1, health: 0 },
  Gemini: { overall: 0, love: 0, career: 1, money: -1, health: 0 },
  Cancer: { overall: 0, love: 1, career: 0, money: 0, health: 0 },
  Leo: { overall: 1, love: 1, career: 1, money: 0, health: 0 },
  Virgo: { overall: 0, love: -1, career: 1, money: 0, health: 0 },
  Libra: { overall: 0, love: 1, career: 0, money: 0, health: 0 },
  Scorpio: { overall: 0, love: 0, career: 1, money: 0, health: -1 },
  Sagittarius: { overall: 1, love: 0, career: 0, money: 0, health: 1 },
  Capricorn: { overall: 0, love: -1, career: 1, money: 1, health: 0 },
  Aquarius: { overall: 0, love: 0, career: 0, money: -1, health: 0 },
  Pisces: { overall: 0, love: 1, career: -1, money: -1, health: 0 },
}

function analyzeTextRating(text: string, baseRating: number, zodiacMod: number): number {
  let rating = baseRating + zodiacMod
  const positiveKeywords = ['excellent', 'high', 'strong', 'bright', 'rising', 'good', 'fortunate', 'beautiful', 'happy', 'growing', 'success', 'ideal', 'auspicious']
  const negativeKeywords = ['challenging', 'tense', 'difficult', 'avoid', 'careful', 'warning', 'risk', 'weak', 'low', 'troubles', 'conflict', 'hard', 'strain']
  let positiveCount = positiveKeywords.filter(kw => text.toLowerCase().includes(kw)).length
  let negativeCount = negativeKeywords.filter(kw => text.toLowerCase().includes(kw)).length
  if (positiveCount > negativeCount + 1) rating = Math.min(5, rating + 1)
  else if (negativeCount > positiveCount) rating = Math.max(1, rating - 1)
  return Math.max(1, Math.min(5, rating))
}

function getZodiacSign(month: number, day: number) {
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === 12 && sign.endMonth === 1) {
      if ((month === 12 && day >= sign.startDay) || (month === 1 && day <= sign.endDay)) return sign
    } else {
      if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) return sign
    }
  }
  return ZODIAC_SIGNS[0]
}

function generateHoroscope(signName: string, birthMonth: number, birthDay: number) {
  const templates = HOROSCOPE_TEMPLATES[signName]
  if (!templates) return null
  const modifiers = ZODIAC_MODIFIERS[signName] || { love: 0, career: 0, money: 0, health: 0, overall: 0 }
  const seed = signName.charCodeAt(0) * 1000 + signName.charCodeAt(1) * 100 + birthMonth * 31 + birthDay

  const pick = (arr: string[]) => arr[(seed % arr.length + arr.length) % arr.length]

  const overallText = pick(templates.overall)
  const loveText = pick(templates.love)
  const careerText = pick(templates.career)
  const moneyText = pick(templates.money)
  const healthText = pick(templates.health)

  const overallRating = analyzeTextRating(overallText, 3, modifiers.overall)
  const loveRating = analyzeTextRating(loveText, 3, modifiers.love)
  const careerRating = analyzeTextRating(careerText, 3, modifiers.career)
  const moneyRating = analyzeTextRating(moneyText, 3, modifiers.money)
  const healthRating = analyzeTextRating(healthText, 3, modifiers.health)

  const pickLucky = <T,>(arr: T[]): T => arr[(seed % arr.length + arr.length) % arr.length]

  return {
    fortunes: [
      { aspect: 'Overall', level: overallRating, desc: overallText },
      { aspect: 'Love', level: loveRating, desc: loveText },
      { aspect: 'Career', level: careerRating, desc: careerText },
      { aspect: 'Finances', level: moneyRating, desc: moneyText },
      { aspect: 'Health', level: healthRating, desc: healthText },
    ],
    lucky: {
      number: pickLucky(LUCKY_NUMBERS[signName] || [7]),
      color: pickLucky(LUCKY_COLORS[signName] || ['Red']),
      direction: pickLucky(LUCKY_DIRECTIONS[signName] || ['East']),
      food: pickLucky(LUCKY_FOODS[signName] || ['Apple']),
      activity: pickLucky(LUCKY_ACTIVITIES[signName] || ['Walking']),
    },
    advice: generateAdvice(overallRating, loveRating, careerRating, moneyRating, healthRating),
  }
}

function generateAdvice(overall: number, love: number, career: number, money: number, health: number): string {
  const avg = (overall + love + career + money + health) / 5
  if (avg >= 4) return "The stars favor bold action today — seize the moment, claim your space, and move with confidence. The cosmos is with you."
  if (avg >= 3) return "A balanced day unfolds. Proceed with steadiness rather than urgency; what you build slowly endures longer than what you rush."
  return "The tide runs lower today. Use this time for reflection and recalibration — the ascent begins when you're clear about where you're going."
}

function StarRating({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`text-base ${n <= level ? 'text-amber-400' : 'text-slate-700'}`}>★</span>
      ))}
    </div>
  )
}

export default function HoroscopePage() {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const m = parseInt(month)
    const d = parseInt(day)
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) return
    const sign = getZodiacSign(m, d)
    const horoscope = generateHoroscope(sign.name, m, d)
    setResult({ sign, horoscope })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]">
      {/* Navigation */}
      <nav className="bg-[#0a0a0f]/80 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-bold text-lg">Æ</div>
            <span className="text-amber-300 font-bold text-xl tracking-[0.2em] uppercase">Aether</span>
          </Link>
          <Link href="/" className="text-slate-500 hover:text-amber-300 transition-colors text-sm">← Return</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-3">Daily Guidance</p>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 mb-4">Stellar Forecast</h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto">Celestial weather for your sign — calibrated to your birth, not to today's date. Every reading is yours alone.</p>
        </div>

        {/* Form */}
        <div className="bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Your Birth Date</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 text-xs mb-1 text-center">Month</label>
                  <input type="number" min="1" max="12" placeholder="1-12" value={month} onChange={(e) => setMonth(e.target.value)} required className="w-full bg-[#0a0a0f]/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-center placeholder-slate-700 focus:border-amber-500/60 focus:outline-none transition-colors"/>
                </div>
                <div>
                  <label className="block text-slate-600 text-xs mb-1 text-center">Day</label>
                  <input type="number" min="1" max="31" placeholder="1-31" value={day} onChange={(e) => setDay(e.target.value)} required className="w-full bg-[#0a0a0f]/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-center placeholder-slate-700 focus:border-amber-500/60 focus:outline-none transition-colors"/>
                </div>
              </div>
              <p className="text-slate-700 text-xs mt-2 text-center">The same reading, every time — your personal celestial signature.</p>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-[#0a0a0f] font-bold py-4 rounded-xl transition-all text-sm tracking-wide shadow-lg shadow-amber-500/20">
              Read My Stars
            </button>
          </form>

          {result && (
            <div className="mt-8 space-y-6">
              {/* Sign Info */}
              <div className="bg-gradient-to-br from-amber-500/8 to-amber-600/5 rounded-2xl border border-amber-500/30 p-8 text-center">
                <div className="text-6xl mb-4">{result.sign.icon}</div>
                <h2 className="text-2xl font-bold text-amber-400 mb-2">{result.sign.name}</h2>
                <p className="text-slate-500 text-sm">{result.sign.dates} · {result.sign.element} Sign · Ruled by {result.sign.planet}</p>
                <p className="text-slate-600 text-xs mt-2 italic">{result.sign.traits}</p>
              </div>

              {/* Fortunes */}
              <div className="space-y-4">
                {result.horoscope.fortunes.map((f: any, i: number) => (
                  <div key={i} className="bg-[#0d1117]/80 rounded-xl p-5 border-l-4 border-amber-500">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-amber-400 font-bold text-lg">{f.aspect}</span>
                      <StarRating level={f.level}/>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Advice */}
              <div className="bg-gradient-to-r from-amber-500/8 to-amber-600/5 rounded-xl p-5 border border-amber-500/30">
                <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2 text-sm">
                  <span>✦</span><span>Your Reading</span>
                </h4>
                <p className="text-slate-400 leading-relaxed text-sm">{result.horoscope.advice}</p>
              </div>

              {/* Lucky */}
              <div className="bg-[#0d1117]/80 rounded-xl p-6 border border-slate-800">
                <h4 className="text-amber-400 font-bold text-center mb-5 text-sm uppercase tracking-widest">Your Lucky Signature</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5 text-center">
                  {[
                    { label: 'Number', value: result.horoscope.lucky.number },
                    { label: 'Color', value: result.horoscope.lucky.color },
                    { label: 'Direction', value: result.horoscope.lucky.direction },
                    { label: 'Food', value: result.horoscope.lucky.food },
                    { label: 'Activity', value: result.horoscope.lucky.activity },
                  ].map((l) => (
                    <div key={l.label}>
                      <div className="text-slate-600 text-xs mb-1.5 uppercase tracking-wider">{l.label}</div>
                      <div className="text-lg font-bold text-amber-400">{l.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sign Grid */}
        <div>
          <h2 className="text-center text-xl font-bold text-slate-300 mb-6 tracking-wide">All Twelve Signs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ZODIAC_SIGNS.map((sign) => (
              <div
                key={sign.name}
                onClick={() => {
                  setMonth(sign.startMonth.toString())
                  setDay(sign.startDay.toString())
                  const h = generateHoroscope(sign.name, sign.startMonth, sign.startDay)
                  setResult({ sign, horoscope: h })
                }}
                className="bg-[#0d1117]/60 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all"
              >
                <div className="text-2xl mb-1.5">{sign.icon}</div>
                <div className="text-slate-300 font-medium text-sm">{sign.name}</div>
                <div className="text-slate-700 text-xs">{sign.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
